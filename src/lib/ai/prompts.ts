import { SectionSemanticType } from '@/types/presentation';

export const SYSTEM_PROMPT = `You are a cinematic presentation generator. Transform user topics into immersive, emotionally-profiled presentations.

CRITICAL INSTRUCTIONS:
1. Vary emotional profiles between sections - never use identical profiles
2. Ensure narrative flow: setup → development → climax → resolution
3. Alternate between sparse, medium, and dense sections for rhythm
4. First section must be high-energy HeroStatement
5. Last section should be motivating CallToAction
6. Include at least one QuoteEmphasis or StatisticImpact for dramatic punctuation
7. Primary idea must be exactly 1 sentence, cinematic summary describes visual/emotional feel
8. Provide rich, comprehensive content for each section

SECTION TYPE GUIDELINES:
- HeroStatement: Bold opening claim, minimal text, high impact
- ContextBuilder: Background information, sets the stage
- ProblemStatement: Defines challenge or tension
- DefinitionBlock: Clear conceptual breakdown
- DeepDiveAnalysis: Detailed investigation with multiple paragraphs
- CaseStudy: Real-world narrative example
- RealExample: Brief concrete illustration
- ComparativeAnalysis: Side-by-side evaluation
- DataHighlight: Statistical emphasis
- KeyInsights: Distilled takeaways
- QuoteEmphasis: Impactful quote for punctuation
- StatisticImpact: Dramatic number reveal
- CallToAction: Motivating conclusion

EMOTIONAL DIMENSIONS (0.0 to 1.0):
- formality: casual vs academic
- energy: calm vs intense
- seriousness: playful vs grave
- abstraction: concrete vs conceptual
- urgency: reflective vs immediate
- optimism: pessimistic vs hopeful

Return valid JSON matching the schema exactly.`;

export function generateUserPrompt(
  topic: string,
  tone: string,
  audience: string,
  targetSections: number
): string {
  return `Create a cinematic presentation on: "${topic}"

Tone: ${tone}
Audience: ${audience}
Target sections: ${targetSections}

Generate ${targetSections} sections with varied emotional profiles, rich content, and compelling narrative flow.`;
}

export const SECTION_TYPES: SectionSemanticType[] = [
  'HeroStatement',
  'FramingQuestion',
  'ThesisDeclaration',
  'ContextBuilder',
  'ProblemStatement',
  'TransitionBridge',
  'TimelineIntroduction',
  'DefinitionBlock',
  'ConceptBreakdown',
  'StepByStepMechanism',
  'SystemArchitecture',
  'PrincipleListing',
  'ProcessFlowNarrative',
  'DeepDiveAnalysis',
  'ComparativeAnalysis',
  'TradeoffAnalysis',
  'DataHighlight',
  'PatternRecognition',
  'CaseStudy',
  'RealExample',
  'BeforeAfter',
  'ScenarioSimulation',
  'KeyInsights',
  'StrategicImplication',
  'EmergingTrends',
  'BigIdeaEmphasis',
  'QuoteEmphasis',
  'StatisticImpact',
  'ProvocativeClaim',
  'CallToAction'
];
