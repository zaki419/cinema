'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function ContextColumnClean({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-3xl mx-auto">
        {content.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.6
            }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            {content.headline}
          </motion.h2>
        )}

        <div className="space-y-6">
          {content.paragraphs?.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: (animationDurations.text + (index * 100)) / 1000,
                duration: 0.5
              }}
              className="text-lg md:text-xl leading-relaxed opacity-90"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
