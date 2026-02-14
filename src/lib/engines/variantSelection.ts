import { PresentationSection, SectionSemanticType, EmotionalProfile, VisualWeight } from '@/types/presentation';
import { VisualVariant, ResolvedSection, ColorPalette, BackgroundLayers } from '@/types/visual';
import { selectPalette } from './colorPalettes';
import { calculateAnimationDurations } from './animationTiming';

// Mapping of semantic types to allowed visual variants
const SEMANTIC_TO_VARIANTS: Record<SectionSemanticType, VisualVariant[]> = {
  'HeroStatement': [
    'hero-minimal-gradient',
    'hero-typographic-kinetic',
    'hero-dark-cinematic',
    'hero-immersive-fullbleed',
    'hero-grid-wireframe'
  ],
  'ContextBuilder': [
    'context-timeline',
    'context-column-clean',
    'context-split-visual'
  ],
  'ProblemStatement': [
    'problem-dramatic-center',
    'problem-contrast-split',
    'problem-layered-emphasis'
  ],
  'DefinitionBlock': [
    'definition-clean-structured',
    'definition-visual-breakdown',
    'definition-minimal-elegant'
  ],
  'DeepDiveAnalysis': [
    'deepdive-split-dense',
    'deepdive-column-article',
    'deepdive-layered-overlay',
    'deepdive-progressive-reveal'
  ],
  'CaseStudy': [
    'casestudy-narrative-flow',
    'casestudy-split-story',
    'casestudy-immersive-visual'
  ],
  'RealExample': [
    'example-brief-visual',
    'example-compact-story',
    'example-highlighted-point'
  ],
  'ComparativeAnalysis': [
    'comparative-side-by-side',
    'comparative-animated-divide',
    'comparative-contrast-grid'
  ],
  'DataHighlight': [
    'data-chart-focus',
    'data-statistic-hero',
    'data-visual-emphasis'
  ],
  'KeyInsights': [
    'insights-bullet-stagger',
    'insights-grid-layout',
    'insights-minimal-focus'
  ],
  'QuoteEmphasis': [
    'quote-cinematic-dark',
    'quote-minimal-light',
    'quote-kinetic-typography'
  ],
  'StatisticImpact': [
    'statistic-large-number',
    'statistic-animated-reveal',
    'statistic-context-visual'
  ],
  'CallToAction': [
    'cta-bold-centered',
    'cta-gradient-action',
    'cta-minimal-compelling'
  ],
  'TransitionBridge': [
    'transition-smooth-fade',
    'transition-visual-break'
  ],
  'BigIdeaEmphasis': [
    'bigidea-crystallized',
    'bigidea-emphasized-bold',
    'bigidea-visual-metaphor'
  ],
  // Additional types with fallback variants for Phase 1
  'FramingQuestion': ['hero-minimal-gradient', 'problem-dramatic-center'],
  'ThesisDeclaration': ['bigidea-crystallized', 'hero-typographic-kinetic'],
  'TimelineIntroduction': ['context-timeline', 'context-column-clean'],
  'ConceptBreakdown': ['definition-visual-breakdown', 'deepdive-column-article'],
  'StepByStepMechanism': ['definition-clean-structured', 'context-column-clean'],
  'SystemArchitecture': ['deepdive-layered-overlay', 'definition-visual-breakdown'],
  'PrincipleListing': ['insights-bullet-stagger', 'insights-grid-layout'],
  'ProcessFlowNarrative': ['context-timeline', 'deepdive-column-article'],
  'TradeoffAnalysis': ['comparative-side-by-side', 'comparative-contrast-grid'],
  'PatternRecognition': ['insights-grid-layout', 'data-visual-emphasis'],
  'BeforeAfter': ['comparative-animated-divide', 'casestudy-split-story'],
  'ScenarioSimulation': ['casestudy-narrative-flow', 'example-compact-story'],
  'StrategicImplication': ['bigidea-emphasized-bold', 'insights-minimal-focus'],
  'EmergingTrends': ['data-visual-emphasis', 'insights-grid-layout'],
  'ProvocativeClaim': ['quote-kinetic-typography', 'problem-dramatic-center']
};

// Variant emotional compatibility scores
interface VariantCompatibility {
  energy: [number, number];
  optimism: [number, number];
  formality: [number, number];
  density: VisualWeight;
}

const VARIANT_COMPATIBILITY: Record<VisualVariant, VariantCompatibility> = {
  'hero-minimal-gradient': { energy: [0.6, 1.0], optimism: [0.7, 1.0], formality: [0.3, 0.7], density: 'sparse' },
  'hero-typographic-kinetic': { energy: [0.7, 1.0], optimism: [0.5, 0.9], formality: [0.5, 0.9], density: 'sparse' },
  'hero-dark-cinematic': { energy: [0.4, 0.7], optimism: [0.3, 0.6], formality: [0.6, 1.0], density: 'sparse' },
  'hero-immersive-fullbleed': { energy: [0.5, 0.9], optimism: [0.6, 1.0], formality: [0.2, 0.6], density: 'sparse' },
  'hero-grid-wireframe': { energy: [0.6, 0.9], optimism: [0.4, 0.7], formality: [0.7, 1.0], density: 'sparse' },
  'context-timeline': { energy: [0.4, 0.7], optimism: [0.5, 0.8], formality: [0.5, 0.8], density: 'medium' },
  'context-column-clean': { energy: [0.3, 0.6], optimism: [0.5, 0.8], formality: [0.6, 1.0], density: 'medium' },
  'context-split-visual': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.4, 0.7], density: 'medium' },
  'problem-dramatic-center': { energy: [0.6, 0.9], optimism: [0.2, 0.5], formality: [0.4, 0.7], density: 'medium' },
  'problem-contrast-split': { energy: [0.5, 0.8], optimism: [0.3, 0.6], formality: [0.5, 0.8], density: 'medium' },
  'problem-layered-emphasis': { energy: [0.7, 1.0], optimism: [0.3, 0.6], formality: [0.3, 0.6], density: 'medium' },
  'definition-clean-structured': { energy: [0.3, 0.6], optimism: [0.5, 0.8], formality: [0.7, 1.0], density: 'medium' },
  'definition-visual-breakdown': { energy: [0.4, 0.7], optimism: [0.6, 0.9], formality: [0.5, 0.8], density: 'medium' },
  'definition-minimal-elegant': { energy: [0.2, 0.5], optimism: [0.5, 0.8], formality: [0.6, 1.0], density: 'medium' },
  'deepdive-split-dense': { energy: [0.5, 0.8], optimism: [0.4, 0.7], formality: [0.6, 0.9], density: 'dense' },
  'deepdive-column-article': { energy: [0.3, 0.6], optimism: [0.5, 0.8], formality: [0.7, 1.0], density: 'dense' },
  'deepdive-layered-overlay': { energy: [0.6, 0.9], optimism: [0.5, 0.8], formality: [0.4, 0.7], density: 'dense' },
  'deepdive-progressive-reveal': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.5, 0.8], density: 'dense' },
  'casestudy-narrative-flow': { energy: [0.4, 0.7], optimism: [0.5, 0.8], formality: [0.4, 0.7], density: 'medium' },
  'casestudy-split-story': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.3, 0.6], density: 'medium' },
  'casestudy-immersive-visual': { energy: [0.6, 0.9], optimism: [0.7, 1.0], formality: [0.2, 0.5], density: 'medium' },
  'example-brief-visual': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.3, 0.6], density: 'medium' },
  'example-compact-story': { energy: [0.4, 0.7], optimism: [0.5, 0.8], formality: [0.5, 0.8], density: 'medium' },
  'example-highlighted-point': { energy: [0.6, 0.9], optimism: [0.6, 0.9], formality: [0.3, 0.6], density: 'medium' },
  'comparative-side-by-side': { energy: [0.4, 0.7], optimism: [0.5, 0.8], formality: [0.6, 0.9], density: 'dense' },
  'comparative-animated-divide': { energy: [0.6, 0.9], optimism: [0.5, 0.8], formality: [0.4, 0.7], density: 'dense' },
  'comparative-contrast-grid': { energy: [0.5, 0.8], optimism: [0.4, 0.7], formality: [0.7, 1.0], density: 'dense' },
  'data-chart-focus': { energy: [0.4, 0.7], optimism: [0.5, 0.8], formality: [0.7, 1.0], density: 'medium' },
  'data-statistic-hero': { energy: [0.7, 1.0], optimism: [0.6, 0.9], formality: [0.3, 0.6], density: 'sparse' },
  'data-visual-emphasis': { energy: [0.6, 0.9], optimism: [0.6, 0.9], formality: [0.5, 0.8], density: 'medium' },
  'insights-bullet-stagger': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.5, 0.8], density: 'medium' },
  'insights-grid-layout': { energy: [0.6, 0.9], optimism: [0.7, 1.0], formality: [0.4, 0.7], density: 'medium' },
  'insights-minimal-focus': { energy: [0.3, 0.6], optimism: [0.6, 0.9], formality: [0.6, 0.9], density: 'sparse' },
  'quote-cinematic-dark': { energy: [0.4, 0.7], optimism: [0.3, 0.6], formality: [0.6, 0.9], density: 'sparse' },
  'quote-minimal-light': { energy: [0.3, 0.6], optimism: [0.7, 1.0], formality: [0.5, 0.8], density: 'sparse' },
  'quote-kinetic-typography': { energy: [0.7, 1.0], optimism: [0.5, 0.8], formality: [0.3, 0.6], density: 'sparse' },
  'statistic-large-number': { energy: [0.7, 1.0], optimism: [0.6, 0.9], formality: [0.4, 0.7], density: 'sparse' },
  'statistic-animated-reveal': { energy: [0.8, 1.0], optimism: [0.7, 1.0], formality: [0.2, 0.5], density: 'sparse' },
  'statistic-context-visual': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.5, 0.8], density: 'medium' },
  'cta-bold-centered': { energy: [0.7, 1.0], optimism: [0.8, 1.0], formality: [0.3, 0.6], density: 'sparse' },
  'cta-gradient-action': { energy: [0.8, 1.0], optimism: [0.9, 1.0], formality: [0.2, 0.5], density: 'sparse' },
  'cta-minimal-compelling': { energy: [0.5, 0.8], optimism: [0.7, 1.0], formality: [0.5, 0.8], density: 'sparse' },
  'transition-smooth-fade': { energy: [0.2, 0.5], optimism: [0.5, 0.8], formality: [0.5, 0.8], density: 'sparse' },
  'transition-visual-break': { energy: [0.4, 0.7], optimism: [0.6, 0.9], formality: [0.3, 0.6], density: 'sparse' },
  'bigidea-crystallized': { energy: [0.6, 0.9], optimism: [0.7, 1.0], formality: [0.5, 0.8], density: 'sparse' },
  'bigidea-emphasized-bold': { energy: [0.7, 1.0], optimism: [0.8, 1.0], formality: [0.3, 0.6], density: 'sparse' },
  'bigidea-visual-metaphor': { energy: [0.5, 0.8], optimism: [0.6, 0.9], formality: [0.4, 0.7], density: 'sparse' }
};

/**
 * Calculate compatibility score between variant and emotional profile
 */
function calculateCompatibilityScore(
  variant: VisualVariant,
  profile: EmotionalProfile
): number {
  const compat = VARIANT_COMPATIBILITY[variant];

  const energyDist = Math.min(
    Math.abs(profile.energy - compat.energy[0]),
    Math.abs(profile.energy - compat.energy[1]),
    profile.energy >= compat.energy[0] && profile.energy <= compat.energy[1] ? 0 : 1
  );

  const optimismDist = Math.min(
    Math.abs(profile.optimism - compat.optimism[0]),
    Math.abs(profile.optimism - compat.optimism[1]),
    profile.optimism >= compat.optimism[0] && profile.optimism <= compat.optimism[1] ? 0 : 1
  );

  const formalityDist = Math.min(
    Math.abs(profile.formality - compat.formality[0]),
    Math.abs(profile.formality - compat.formality[1]),
    profile.formality >= compat.formality[0] && profile.formality <= compat.formality[1] ? 0 : 1
  );

  // Lower distance = better score (negate for sorting)
  return -(energyDist + optimismDist + formalityDist);
}

/**
 * Get alternating density preferences
 */
function getAlternatingDensities(lastDensity?: VisualWeight): VisualWeight[] {
  if (!lastDensity) return ['sparse', 'medium', 'dense'];

  if (lastDensity === 'dense') return ['sparse', 'medium'];
  if (lastDensity === 'sparse') return ['medium', 'dense'];
  return ['sparse', 'dense']; // Last was medium, prefer extremes
}

/**
 * Select variant for a section
 */
export function selectVariant(
  section: PresentationSection,
  previousSections: ResolvedSection[]
): VisualVariant {
  // 1. Get allowed variants for semantic type
  const allowedVariants = SEMANTIC_TO_VARIANTS[section.semanticType] || ['hero-minimal-gradient'];

  // 2. Score each variant
  const scoredVariants = allowedVariants.map(variant => ({
    variant,
    score: calculateCompatibilityScore(variant, section.emotionalProfile)
  }));

  // Sort by score (highest first)
  scoredVariants.sort((a, b) => b.score - a.score);

  // 3. Apply repetition guard
  const recentVariants = previousSections.slice(-3).map(s => s.selectedVariant);
  const filteredVariants = scoredVariants.filter(
    sv => !recentVariants.includes(sv.variant)
  );

  // 4. Apply density alternation
  const lastDensity = previousSections[previousSections.length - 1]?.visualHints.visualWeight;
  const preferredDensities = getAlternatingDensities(lastDensity);

  const finalVariants = (filteredVariants.length > 0 ? filteredVariants : scoredVariants).filter(sv =>
    preferredDensities.includes(VARIANT_COMPATIBILITY[sv.variant].density)
  );

  // 5. Return best match or fallback
  return (finalVariants[0] || scoredVariants[0])?.variant || 'hero-minimal-gradient';
}

/**
 * Create background layers for a section
 */
function createBackgroundLayers(
  palette: ColorPalette,
  profile: EmotionalProfile
): BackgroundLayers {
  return {
    baseGradient: {
      stops: palette.gradientStops,
      angle: 135
    },
    noise: {
      opacity: profile.abstraction * 0.3,
      scale: 1.0
    },
    glow: {
      color: palette.accentColor,
      intensity: profile.energy * 0.5,
      position: { x: 50, y: 50 }
    }
  };
}

/**
 * Resolve a section with all visual decisions
 */
export function resolveSection(
  section: PresentationSection,
  previousSections: ResolvedSection[]
): ResolvedSection {
  const selectedVariant = selectVariant(section, previousSections);
  const colorPalette = selectPalette(section.emotionalProfile);
  const backgroundLayers = createBackgroundLayers(colorPalette, section.emotionalProfile);
  const animationDurations = calculateAnimationDurations(section.emotionalProfile);

  return {
    ...section,
    selectedVariant,
    colorPalette,
    backgroundLayers,
    animationDurations
  };
}

/**
 * Resolve all sections in a presentation
 */
export function resolveAllSections(
  sections: PresentationSection[]
): ResolvedSection[] {
  const resolved: ResolvedSection[] = [];

  for (const section of sections) {
    resolved.push(resolveSection(section, resolved));
  }

  return resolved;
}
