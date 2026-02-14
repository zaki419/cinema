'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  section: ResolvedSection;
  children: ReactNode;
}

export default function SectionWrapper({ section, children }: SectionWrapperProps) {
  const { animationDurations, colorPalette } = section;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: animationDurations.background / 1000,
        ease: 'easeOut'
      }}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative"
      style={{
        color: colorPalette.textPrimary
      }}
    >
      {children}
    </motion.section>
  );
}
