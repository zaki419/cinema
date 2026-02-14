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
            className="text-4xl md:text-6xl font-bold mb-16 leading-tight"
          >
            {content.headline}
          </motion.h2>
        )}

        <div className="space-y-10">
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
              className="text-xl md:text-2xl leading-[1.8] opacity-90"
              style={{ maxWidth: '65ch' }}
            >
              {paragraph}
            </motion.p>
          ))}

          {content.bullets && content.bullets.length > 0 && (
            <div className="mt-12 space-y-6">
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
                  className="flex items-start space-x-6"
                >
                  <div className="w-3 h-3 mt-3 rounded-full bg-current opacity-70 flex-shrink-0" />
                  <p className="text-lg md:text-xl leading-relaxed opacity-85">{bullet}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
