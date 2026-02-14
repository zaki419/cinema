'use client';

import { motion } from 'framer-motion';
import { ResolvedSection } from '@/types/visual';
import SectionWrapper from './SectionWrapper';

interface Props {
  section: ResolvedSection;
}

export default function CaseStudySplitStory({ section }: Props) {
  const { content, animationDurations } = section;

  return (
    <SectionWrapper section={section}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: animationDurations.text / 1000,
              duration: 0.7
            }}
          >
            {content.headline && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {content.headline}
              </h2>
            )}
            {content.subheadline && (
              <p className="text-xl md:text-2xl opacity-85">
                {content.subheadline}
              </p>
            )}
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: (animationDurations.text + 200) / 1000,
              duration: 0.7
            }}
            className="space-y-6"
          >
            {content.paragraphs?.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: (animationDurations.text + 400 + (index * 100)) / 1000,
                  duration: 0.5
                }}
                className="text-lg md:text-xl leading-relaxed opacity-90"
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
