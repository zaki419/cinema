import { PresentationSection } from './presentation';

// Visual variant identifiers (Phase 1: 3-5 per section type)
export type VisualVariant =
  // Hero variants
  | 'hero-minimal-gradient'
  | 'hero-typographic-kinetic'
  | 'hero-dark-cinematic'
  | 'hero-immersive-fullbleed'
  | 'hero-grid-wireframe'
  // Context variants
  | 'context-timeline'
  | 'context-column-clean'
  | 'context-split-visual'
  // Problem variants
  | 'problem-dramatic-center'
  | 'problem-contrast-split'
  | 'problem-layered-emphasis'
  // Definition variants
  | 'definition-clean-structured'
  | 'definition-visual-breakdown'
  | 'definition-minimal-elegant'
  // DeepDive variants
  | 'deepdive-split-dense'
  | 'deepdive-column-article'
  | 'deepdive-layered-overlay'
  | 'deepdive-progressive-reveal'
  // CaseStudy variants
  | 'casestudy-narrative-flow'
  | 'casestudy-split-story'
  | 'casestudy-immersive-visual'
  // RealExample variants
  | 'example-brief-visual'
  | 'example-compact-story'
  | 'example-highlighted-point'
  // Comparative variants
  | 'comparative-side-by-side'
  | 'comparative-animated-divide'
  | 'comparative-contrast-grid'
  // Data variants
  | 'data-chart-focus'
  | 'data-statistic-hero'
  | 'data-visual-emphasis'
  // Insights variants
  | 'insights-bullet-stagger'
  | 'insights-grid-layout'
  | 'insights-minimal-focus'
  // Quote variants
  | 'quote-cinematic-dark'
  | 'quote-minimal-light'
  | 'quote-kinetic-typography'
  // Statistic variants
  | 'statistic-large-number'
  | 'statistic-animated-reveal'
  | 'statistic-context-visual'
  // CTA variants
  | 'cta-bold-centered'
  | 'cta-gradient-action'
  | 'cta-minimal-compelling'
  // TransitionBridge variants
  | 'transition-smooth-fade'
  | 'transition-visual-break'
  // BigIdea variants
  | 'bigidea-crystallized'
  | 'bigidea-emphasized-bold'
  | 'bigidea-visual-metaphor';

// Selected color palette
export interface ColorPalette {
  id: string;
  name: string;
  gradientStops: string[];     // CSS color values
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  compatibility: {
    energy: [number, number];
    optimism: [number, number];
    formality: [number, number];
  };
}

// Background layer configuration
export interface BackgroundLayers {
  baseGradient: {
    stops: string[];
    angle: number;
  };
  noise: {
    opacity: number;
    scale: number;
  };
  glow: {
    color: string;
    intensity: number;
    position: { x: number; y: number };
  };
  pattern?: {
    type: 'geometric' | 'organic' | 'particle';
    density: number;
    opacity: number;
  };
}

// Resolved section with visual decisions
export interface ResolvedSection extends PresentationSection {
  selectedVariant: VisualVariant;
  colorPalette: ColorPalette;
  backgroundLayers: BackgroundLayers;
  animationDurations: {
    background: number;
    visual: number;
    text: number;
    accent: number;
  };
}
