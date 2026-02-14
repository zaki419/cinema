'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function DeepDiveColumnArticle({ section }: Props) {
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
          {content.paragraphs?.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: (animationDurations.text + (index * 80)) / 1000,
                duration: 0.5
              }}
              className="text-lg md:text-xl leading-relaxed opacity-90"
            >
              {paragraph}
            </motion.p>
          ))}

          {content.bullets && content.bullets.length > 0 && (
            <div className="mt-8 space-y-4">
              {content.bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: (animationDurations.text + 400 + (index * 100)) / 1000,
                    duration: 0.4
                  }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-current opacity-70 flex-shrink-0" />
                  <p className="text-lg opacity-85">{bullet}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
