'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function DataChartFocus({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-5xl mx-auto">
        {content.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.6
            }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            {content.headline}
          </motion.h2>
        )}

        {/* Data visualization placeholder - Phase 2 will add actual charts */}
        {content.statistic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.visual) / 1000,
              duration: 0.8
            }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8 border border-white/10"
          >
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold mb-4">
                {content.statistic.value}
              </div>
              <div className="text-xl md:text-2xl opacity-80">
                {content.statistic.label}
              </div>
            </div>
          </motion.div>
        )}

        {content.paragraphs && content.paragraphs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 400) / 1000,
              duration: 0.6
            }}
            className="text-center space-y-4"
          >
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg md:text-xl opacity-85 max-w-3xl mx-auto">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
