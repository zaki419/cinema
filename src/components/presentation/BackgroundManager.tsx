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

  // Background style
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${color1}, ${color2})`,
    transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div
      className="fixed inset-0 -z-10"
      style={backgroundStyle}
      aria-hidden="true"
    />
  );
}
