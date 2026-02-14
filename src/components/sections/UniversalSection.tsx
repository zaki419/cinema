'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

/**
 * Universal fallback section that handles any content type
 * Used when specific variant component is not available
 */
export default function UniversalSection({ section }: Props) {
  const { content, animationDurations } = section;

  const hasStatistic = !!content.statistic;
  const hasQuote = !!content.quote;
  const hasHeadline = !!content.headline;
  const hasParagraphs = (content.paragraphs?.length ?? 0) > 0;
  const hasBullets = (content.bullets?.length ?? 0) > 0;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-4xl mx-auto">
        {/* Statistic Display */}
        {hasStatistic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.7
            }}
            className="text-center mb-12"
          >
            <div className="text-6xl md:text-8xl font-bold mb-4">
              {content.statistic?.value}
            </div>
            <div className="text-2xl md:text-3xl opacity-80">
              {content.statistic?.label}
            </div>
          </motion.div>
        )}

        {/* Quote Display */}
        {hasQuote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.6
            }}
            className="text-center"
          >
            <p className="text-3xl md:text-4xl lg:text-5xl font-serif italic mb-6 leading-relaxed">
              &ldquo;{content.quote}&rdquo;
            </p>
            {content.quoteAttribution && (
              <footer className="text-xl md:text-2xl opacity-70">
                — {content.quoteAttribution}
              </footer>
            )}
          </motion.blockquote>
        )}

        {/* Standard Content */}
        {!hasStatistic && !hasQuote && (
          <>
            {hasHeadline && (
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

            {content.subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: (animationDurations.text + 200) / 1000,
                  duration: 0.5
                }}
                className="text-xl md:text-2xl opacity-85 mb-8"
              >
                {content.subheadline}
              </motion.p>
            )}

            {hasParagraphs && (
              <div className="space-y-6">
                {content.paragraphs?.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: (animationDurations.text + 300 + (index * 80)) / 1000,
                      duration: 0.5
                    }}
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            )}

            {hasBullets && (
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: (animationDurations.text + 400) / 1000
                }}
                className="mt-8 space-y-4"
              >
                {content.bullets?.map((bullet, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: (animationDurations.text + 500 + (index * 100)) / 1000,
                      duration: 0.4
                    }}
                    className="flex items-start space-x-4"
                  >
                    <span className="w-2 h-2 mt-2 rounded-full bg-current opacity-70 flex-shrink-0" />
                    <span className="text-lg md:text-xl opacity-85">{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
