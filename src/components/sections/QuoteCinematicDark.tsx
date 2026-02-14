'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function QuoteCinematicDark({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: animationDurations.text / 1000,
            duration: 1.0,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className="relative"
        >
          {/* Opening quote mark */}
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 0.3, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.6
            }}
            className="absolute -top-8 left-0 text-8xl md:text-9xl font-serif leading-none"
          >
            &ldquo;
          </motion.span>

          <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-relaxed mb-8 px-4 md:px-12">
            {content.quote}
          </p>

          {content.quoteAttribution && (
            <motion.footer
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: (animationDurations.text + 400) / 1000,
                duration: 0.6
              }}
              className="text-xl md:text-2xl font-sans"
            >
              — {content.quoteAttribution}
            </motion.footer>
          )}
        </motion.blockquote>
      </div>
    </SectionWrapper>
  );
}
