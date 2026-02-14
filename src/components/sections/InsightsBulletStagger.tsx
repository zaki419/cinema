'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function InsightsBulletStagger({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-4xl mx-auto">
        {content.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.6
            }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            {content.headline}
          </motion.h2>
        )}

        <div className="space-y-8">
          {content.bullets?.map((bullet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: (animationDurations.text + 200 + (index * 150)) / 1000,
                duration: 0.6,
                ease: [0, 0, 0.2, 1]
              }}
              className="flex items-start space-x-6 group"
            >
              {/* Number indicator */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-current/10 flex items-center justify-center">
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                  {bullet}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Fallback to paragraphs if no bullets */}
          {(!content.bullets || content.bullets.length === 0) && content.paragraphs?.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: (animationDurations.text + 300 + (index * 100)) / 1000,
                duration: 0.5
              }}
              className="text-lg md:text-xl leading-relaxed opacity-90"
            >
              {paragraph}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
