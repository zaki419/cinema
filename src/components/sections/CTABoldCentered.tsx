'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function CTABoldCentered({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-4xl mx-auto text-center">
        {content.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.7,
              ease: [0, 0, 0.2, 1]
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
          >
            {content.headline}
          </motion.h2>
        )}

        {content.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 300) / 1000,
              duration: 0.6
            }}
            className="text-xl md:text-2xl opacity-90 mb-12"
          >
            {content.subheadline}
          </motion.p>
        )}

        {content.paragraphs && content.paragraphs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 500) / 1000,
              duration: 0.5
            }}
            className="text-lg md:text-xl opacity-85 max-w-3xl mx-auto"
          >
            {content.paragraphs[0]}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
