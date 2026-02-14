// Emotional profile (0.0 to 1.0 for each dimension)
export interface EmotionalProfile {
  formality: number;      // 0.0 = casual, 1.0 = academic
  energy: number;         // 0.0 = calm, 1.0 = intense
  seriousness: number;    // 0.0 = playful, 1.0 = grave
  abstraction: number;    // 0.0 = concrete, 1.0 = conceptual
  urgency: number;        // 0.0 = reflective, 1.0 = immediate
  optimism: number;       // 0.0 = pessimistic, 1.0 = hopeful
}

// Section semantic types (30 types for full implementation)
export type SectionSemanticType =
  | 'HeroStatement'
  | 'FramingQuestion'
  | 'ThesisDeclaration'
  | 'ContextBuilder'
  | 'ProblemStatement'
  | 'TransitionBridge'
  | 'TimelineIntroduction'
  | 'DefinitionBlock'
  | 'ConceptBreakdown'
  | 'StepByStepMechanism'
  | 'SystemArchitecture'
  | 'PrincipleListing'
  | 'ProcessFlowNarrative'
  | 'DeepDiveAnalysis'
  | 'ComparativeAnalysis'
  | 'TradeoffAnalysis'
  | 'DataHighlight'
  | 'PatternRecognition'
  | 'CaseStudy'
  | 'RealExample'
  | 'BeforeAfter'
  | 'ScenarioSimulation'
  | 'KeyInsights'
  | 'StrategicImplication'
  | 'EmergingTrends'
  | 'BigIdeaEmphasis'
  | 'QuoteEmphasis'
  | 'StatisticImpact'
  | 'ProvocativeClaim'
  | 'CallToAction';

// Visual weight and layout hints
export type VisualWeight = 'sparse' | 'medium' | 'dense';
export type LayoutBias = 'centered' | 'split' | 'grid' | 'immersive' | 'column';

// Content structure for a section
export interface SectionContent {
  headline?: string;
  subheadline?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
  quoteAttribution?: string;
  statistic?: {
    value: string;
    label: string;
  };
  imageSuggestion?: string;    // Description for future image gen
  diagramSuggestion?: string;  // Description for future diagram
}

// Individual section
export interface PresentationSection {
  id: string;
  semanticType: SectionSemanticType;
  importance: number;          // 0.0 to 1.0
  primaryIdea: string;         // One-sentence summary
  cinematicSummary: string;    // Emotional/visual description
  content: SectionContent;
  visualHints: {
    visualWeight: VisualWeight;
    preferredLayoutBias: LayoutBias;
  };
  emotionalProfile: EmotionalProfile;
}

// Complete presentation
export interface PresentationData {
  meta: {
    title: string;
    subtitle?: string;
    audience?: string;
    estimatedReadTime: string;
    globalEmotionalProfile: EmotionalProfile;
  };
  narrativeFlow: PresentationSection[];
}
