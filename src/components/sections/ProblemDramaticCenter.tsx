'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function ProblemDramaticCenter({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-4xl mx-auto text-center">
        {content.headline && (
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="text-4xl md:text-6xl font-bold mb-10"
          >
            {content.headline}
          </motion.h2>
        )}

        <div className="space-y-6">
          {content.paragraphs?.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: (animationDurations.text + 300 + (index * 100)) / 1000,
                duration: 0.6
              }}
              className="text-xl md:text-2xl leading-relaxed opacity-85"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
