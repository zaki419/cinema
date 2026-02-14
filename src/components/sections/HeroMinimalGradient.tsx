'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function HeroMinimalGradient({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: animationDurations.text / 1000,
            duration: 0.8,
            ease: 'easeOut'
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          {content.headline}
        </motion.h1>

        {content.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 200) / 1000,
              duration: 0.6,
              ease: 'easeOut'
            }}
            className="text-xl md:text-2xl lg:text-3xl opacity-90 max-w-4xl mx-auto"
          >
            {content.subheadline}
          </motion.p>
        )}
      </div>
    </SectionWrapper>
  );
}
