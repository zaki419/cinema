'use client';

import { useEffect, useState, useRef } from 'react';
import { ResolvedSection } from '@/types/visual';
import { lerpColor } from '@/lib/utils/lerp';
import { easeInOutCubic } from '@/lib/utils/easing';

interface Props {
  sections: ResolvedSection[];
}

/**
 * Manages continuous background morphing between sections
 * Phase 1: CSS-based with custom properties
 */
export default function BackgroundManager({ sections }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [blendProgress, setBlendProgress] = useState(0);
  const rafIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate which section we're in
      const sectionHeight = documentHeight / sections.length;
      const currentIndex = Math.floor(scrollY / sectionHeight);
      const sectionProgress = (scrollY % sectionHeight) / sectionHeight;

      setActiveIndex(Math.min(currentIndex, sections.length - 1));
      setBlendProgress(sectionProgress);
    };

    // Throttled scroll listener
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      const currentRaf = rafIdRef.current;
      if (currentRaf !== undefined) {
        cancelAnimationFrame(currentRaf);
      }
    };
  }, [sections.length]);

  // Get current and next section for blending
  const currentSection = sections[activeIndex];
  const nextSection = sections[Math.min(activeIndex + 1, sections.length - 1)];

  if (!currentSection) return null;

  const currentPalette = currentSection.colorPalette;
  const nextPalette = nextSection?.colorPalette || currentPalette;

  // Apply easing to blend progress
  const easedProgress = easeInOutCubic(Math.min(blendProgress, 1));

  // Interpolate colors
  const color1 = lerpColor(
    currentPalette.gradientStops[0],
    nextPalette.gradientStops[0],
    easedProgress
  );
  const color2 = lerpColor(
    currentPalette.gradientStops[1] || currentPalette.gradientStops[0],
    nextPalette.gradientStops[1] || nextPalette.gradientStops[0],
    easedProgress
  );

  // Background style with smooth transitions
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${color1}, ${color2})`,
  };

  return (
    <>
      {/* Base gradient layer - always visible, morphs smoothly */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out"
        style={backgroundStyle}
        aria-hidden="true"
      />
      {/* Noise/texture overlay for depth */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
        aria-hidden="true"
      />
    </>
  );
}
