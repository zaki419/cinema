'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';

interface SectionWrapperProps {
  section: ResolvedSection;
  children: ReactNode;
}

export default function SectionWrapper({ section, children }: SectionWrapperProps) {
  const { animationDurations, colorPalette, content } = section;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      {/* Background Image with Overlay */}
      {imageUrl && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={content.imageSuggestion || 'Section background'}
              fill
              className="object-cover"
              style={{
                opacity: imageLoaded ? 0.25 : 0,
                transition: 'opacity 0.8s ease-in-out'
              }}
              onLoad={() => setImageLoaded(true)}
              unoptimized // Unsplash images
            />
          </div>
          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(135deg, ${colorPalette.gradientStops[0]}dd 0%, ${colorPalette.gradientStops[1]}dd 100%)`
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {children}
      </div>
    </motion.section>
  );
}
