'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function StatisticLargeNumber({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-4xl mx-auto text-center">
        {content.statistic && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: animationDurations.text / 1000,
                duration: 0.8,
                ease: [0, 0, 0.2, 1]
              }}
              className="mb-8"
            >
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4">
                {content.statistic.value}
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl opacity-80">
                {content.statistic.label}
              </div>
            </motion.div>

            {content.paragraphs && content.paragraphs[0] && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: (animationDurations.text + 500) / 1000,
                  duration: 0.6
                }}
                className="text-lg md:text-xl max-w-2xl mx-auto"
              >
                {content.paragraphs[0]}
              </motion.p>
            )}
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
