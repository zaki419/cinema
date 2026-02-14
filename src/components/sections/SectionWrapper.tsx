'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import { ReactNode, useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SectionWrapperProps {
  section: ResolvedSection;
  children: ReactNode;
}

export default function SectionWrapper({ section, children }: SectionWrapperProps) {
  const { animationDurations, colorPalette, content } = section;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based opacity for smooth transitions
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Fade in when entering, fade out when leaving
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.25, 0.25, 0]
  );

  useEffect(() => {
    // Fetch image if section has imageSuggestion
    if (content.imageSuggestion) {
      fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: content.imageSuggestion,
          orientation: 'landscape'
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.url) {
            setImageUrl(data.url);
          }
        })
        .catch(err => {
          console.error('Failed to load image:', err);
        });
    }
  }, [content.imageSuggestion]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: animationDurations.background / 1000,
        ease: 'easeOut'
      }}
      className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 md:py-32 relative overflow-hidden"
      style={{
        color: colorPalette.textPrimary
      }}
    >
      {/* Background Image with Scroll-based Crossfade */}
      {imageUrl && imageLoaded && (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            style={{ opacity: imageOpacity }}
          >
            <Image
              src={imageUrl}
              alt={content.imageSuggestion || 'Section background'}
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              unoptimized // Unsplash images
              priority={false}
            />
          </motion.div>
          {/* Gradient overlay for text readability - also fades with scroll */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              opacity: imageOpacity,
              background: `linear-gradient(135deg, ${colorPalette.gradientStops[0]}cc 0%, ${colorPalette.gradientStops[1]}cc 100%)`
            }}
          />
        </>
      )}

      {/* Preload image invisibly */}
      {imageUrl && !imageLoaded && (
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          <Image
            src={imageUrl}
            alt=""
            fill
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {children}
      </div>
    </motion.section>
  );
}
