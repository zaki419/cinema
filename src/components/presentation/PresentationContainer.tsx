'use client';

import { useMemo } from 'react';
import { PresentationData } from '@/types/presentation';
import { resolveAllSections } from '@/lib/engines/variantSelection';
import BackgroundManager from './BackgroundManager';
import SectionRenderer from './SectionRenderer';

interface Props {
  data: PresentationData;
}

/**
 * Main presentation container
 * Resolves sections and orchestrates the cinematic experience
 */
export default function PresentationContainer({ data }: Props) {
  // Resolve all sections with visual decisions
  const resolvedSections = useMemo(
    () => resolveAllSections(data.narrativeFlow),
    [data]
  );

  return (
    <div className="relative">
      {/* Background morphing system */}
      <BackgroundManager sections={resolvedSections} />

      {/* Sections */}
      <main className="relative z-10">
        {resolvedSections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-white text-sm">Scroll to explore</div>
      </div>
    </div>
  );
}
