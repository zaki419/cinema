'use client';

import { ResolvedSection } from '@/types/visual';
import HeroMinimalGradient from '../sections/HeroMinimalGradient';
import ContextColumnClean from '../sections/ContextColumnClean';
import ProblemDramaticCenter from '../sections/ProblemDramaticCenter';
import DeepDiveColumnArticle from '../sections/DeepDiveColumnArticle';
import CTABoldCentered from '../sections/CTABoldCentered';
import QuoteCinematicDark from '../sections/QuoteCinematicDark';
import StatisticLargeNumber from '../sections/StatisticLargeNumber';
import CaseStudySplitStory from '../sections/CaseStudySplitStory';
import ComparativeSideBySide from '../sections/ComparativeSideBySide';
import InsightsBulletStagger from '../sections/InsightsBulletStagger';
import DataChartFocus from '../sections/DataChartFocus';
import UniversalSection from '../sections/UniversalSection';

interface Props {
  section: ResolvedSection;
}

/**
 * Routes section to appropriate variant component
 */
export default function SectionRenderer({ section }: Props) {
  const { selectedVariant } = section;

  // Route to specific variant components
  switch (selectedVariant) {
    // Hero variants
    case 'hero-minimal-gradient':
    case 'hero-typographic-kinetic':
    case 'hero-dark-cinematic':
    case 'hero-immersive-fullbleed':
    case 'hero-grid-wireframe':
      return <HeroMinimalGradient section={section} />;

    // Context variants
    case 'context-timeline':
    case 'context-column-clean':
    case 'context-split-visual':
      return <ContextColumnClean section={section} />;

    // Problem variants
    case 'problem-dramatic-center':
    case 'problem-contrast-split':
    case 'problem-layered-emphasis':
      return <ProblemDramaticCenter section={section} />;

    // DeepDive variants
    case 'deepdive-split-dense':
    case 'deepdive-column-article':
    case 'deepdive-layered-overlay':
    case 'deepdive-progressive-reveal':
      return <DeepDiveColumnArticle section={section} />;

    // CaseStudy variants
    case 'casestudy-narrative-flow':
    case 'casestudy-split-story':
    case 'casestudy-immersive-visual':
      return <CaseStudySplitStory section={section} />;

    // Example variants
    case 'example-brief-visual':
    case 'example-compact-story':
    case 'example-highlighted-point':
      return <CaseStudySplitStory section={section} />;

    // Comparative variants
    case 'comparative-side-by-side':
    case 'comparative-animated-divide':
    case 'comparative-contrast-grid':
      return <ComparativeSideBySide section={section} />;

    // Data variants
    case 'data-chart-focus':
    case 'data-statistic-hero':
    case 'data-visual-emphasis':
      return <DataChartFocus section={section} />;

    // Insights variants
    case 'insights-bullet-stagger':
    case 'insights-grid-layout':
    case 'insights-minimal-focus':
      return <InsightsBulletStagger section={section} />;

    // Quote variants
    case 'quote-cinematic-dark':
    case 'quote-minimal-light':
    case 'quote-kinetic-typography':
      return <QuoteCinematicDark section={section} />;

    // Statistic variants
    case 'statistic-large-number':
    case 'statistic-animated-reveal':
    case 'statistic-context-visual':
      return <StatisticLargeNumber section={section} />;

    // CTA variants
    case 'cta-bold-centered':
    case 'cta-gradient-action':
    case 'cta-minimal-compelling':
      return <CTABoldCentered section={section} />;

    // All other variants use universal fallback
    default:
      return <UniversalSection section={section} />;
  }
}
