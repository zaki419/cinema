# Cinema - Dynamic Atmospheric Presentation Engine

Transform ideas into immersive cinematic presentations. Unlike slide-based tools, Cinema generates continuous, scroll-driven storytelling experiences with emotion-aware animations and seamless atmospheric transitions.

## Features

- **AI-Powered Generation**: Transforms topics into structured, emotionally-profiled presentations
- **Cinematic Experience**: Continuous scroll with no hard cuts or slide breaks
- **Atmospheric Backgrounds**: Smoothly morphing gradients that blend between sections
- **Emotion-Driven Design**: Visual style adapts to content's emotional profile
- **30+ Section Types**: Hero statements, deep dives, case studies, quotes, CTAs, and more
- **45+ Visual Variants**: Multiple implementations for each section type
- **Scroll-Bound Animations**: Staggered reveals create depth and professionalism

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating presentations.

## How It Works

### 1. Input Your Topic
Enter any topic, question, or idea you want to present.

### 2. AI Generates Structure
The system:
- Creates a narrative flow with 8-22 sections
- Assigns emotional profiles to each section
- Structures content for cinematic impact

### 3. Visual Rendering
The frontend:
- Selects visual variants based on emotional profiles
- Applies color palettes and animation timings
- Renders a continuous scrolling experience

### 4. Cinematic Presentation
The result:
- Seamless background transitions
- Staggered text animations
- Rhythm-aware pacing
- Professional, Apple keynote-inspired feel

## Architecture

### Core Systems

1. **AI Generation Engine** (`src/app/api/generate/route.ts`)
   - OpenAI GPT-4 with structured outputs
   - Semantic section type assignment
   - Emotional profiling (formality, energy, seriousness, abstraction, urgency, optimism)

2. **Variant Selection Algorithm** (`src/lib/engines/variantSelection.ts`)
   - Maps semantic types to visual variants
   - Scores variants against emotional profiles
   - Prevents repetition with 3-section sliding window
   - Ensures density alternation (sparse → dense → medium)

3. **Color Palette System** (`src/lib/engines/colorPalettes.ts`)
   - 15 curated base palettes
   - Compatibility scoring with emotional dimensions
   - Per-section color evolution

4. **Background Blending** (`src/components/presentation/BackgroundManager.tsx`)
   - Scroll-driven gradient morphing
   - Cubic easing for smooth transitions
   - CSS custom properties updated via RAF

5. **Animation Timing** (`src/lib/engines/animationTiming.ts`)
   - Duration calculated from energy levels
   - Stagger delays based on urgency
   - Easing functions selected by formality

### Section Types (Phase 1)

**Structural**: HeroStatement, ContextBuilder, ProblemStatement, TransitionBridge
**Explanation**: DefinitionBlock, ConceptBreakdown, StepByStepMechanism
**Analytical**: DeepDiveAnalysis, ComparativeAnalysis, DataHighlight
**Real-World**: CaseStudy, RealExample, BeforeAfter
**Insight**: KeyInsights, StrategicImplication, EmergingTrends, BigIdeaEmphasis
**Emotional**: QuoteEmphasis, StatisticImpact, CallToAction

## Technology Stack

- **Framework**: Next.js 16.0.1 with App Router
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Animations**: Framer Motion 11.x
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS 4.0

## Project Structure

```
cinema/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Input interface
│   │   ├── presentation/[id]/        # Presentation viewer
│   │   └── api/generate/             # AI generation endpoint
│   ├── components/
│   │   ├── sections/                 # Section variant components
│   │   └── presentation/             # Core presentation system
│   ├── lib/
│   │   ├── engines/                  # Core algorithms
│   │   ├── utils/                    # Utilities (lerp, easing)
│   │   └── ai/                       # AI prompts
│   └── types/                        # TypeScript definitions
```

## Development Roadmap

### Phase 1 (Current) - MVP Core
✅ 15+ section types with 44 variants
✅ CSS-based background transitions
✅ Framer Motion animations
✅ Basic AI generation
✅ localStorage persistence

### Phase 2 - Enhanced Experience
- Canvas 2D backgrounds with Perlin noise
- 30 section types with 93 variants
- Advanced parallax effects
- Chart/data visualizations

### Phase 3 - Production Polish
- WebGL particle systems
- 50+ section types with 150+ variants
- Save/share with database
- Export to PDF/video/HTML

---

**Cinema** - Where ideas become cinematic experiences
