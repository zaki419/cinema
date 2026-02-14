'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function ComparativeSideBySide({ section }: Props) {
  const { content, animationDurations } = section;

  // Split content into two sides for comparison
  const midpoint = Math.ceil((content.paragraphs?.length || 0) / 2);
  const leftContent = content.paragraphs?.slice(0, midpoint) || [];
  const rightContent = content.paragraphs?.slice(midpoint) || [];

  return (
    <SectionWrapper section={section}>
      <div className="max-w-6xl mx-auto">
        {content.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.6
            }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            {content.headline}
          </motion.h2>
        )}

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 300) / 1000,
              duration: 0.6
            }}
            className="space-y-6 md:pr-6 md:border-r border-current/20"
          >
            {leftContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: (animationDurations.text + 500 + (index * 80)) / 1000,
                  duration: 0.5
                }}
                className="text-lg md:text-xl leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 400) / 1000,
              duration: 0.6
            }}
            className="space-y-6 md:pl-6"
          >
            {rightContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: (animationDurations.text + 600 + (index * 80)) / 1000,
                  duration: 0.5
                }}
                className="text-lg md:text-xl leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
