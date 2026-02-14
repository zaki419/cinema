# Cinema Setup Guide

## Prerequisites

- **Node.js 18+** and npm
- **OpenAI API Key** - Get yours at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Usage

### Creating a Presentation

1. **Enter your topic** - Any topic, question, or idea (minimum 10 characters)
2. **Choose options**:
   - **Tone**: Professional, Inspirational, Educational, or Bold
   - **Audience**: General, Technical, Business, or Academic
   - **Length**: Short (8-10 sections), Medium (12-15), or Long (18-22)
3. **Click "Generate Presentation"**
4. **Wait 15-30 seconds** for AI generation
5. **Scroll through your cinematic presentation**

### Navigation

- **Scroll** to navigate through sections
- **ESC key** or **Home button** to return to input page
- Presentations are stored in browser localStorage

## Features

### What You Get

- ✨ **Cinematic scrolling experience** with smooth transitions
- 🎨 **Dynamic background morphing** between sections
- 📝 **15+ semantic section types** (Hero, Context, Problem, Analysis, etc.)
- 🎭 **45+ visual variants** automatically selected
- 🎬 **Emotion-driven animations** based on content
- 🌈 **15 curated color palettes** matched to emotional profile
- ⚡ **Staggered text reveals** for professional feel

### Section Types Available

**Structural**: HeroStatement, ContextBuilder, ProblemStatement
**Explanation**: DefinitionBlock, ConceptBreakdown
**Analytical**: DeepDiveAnalysis, ComparativeAnalysis, DataHighlight
**Real-World**: CaseStudy, RealExample
**Insight**: KeyInsights, BigIdeaEmphasis
**Emotional**: QuoteEmphasis, StatisticImpact, CallToAction

## Troubleshooting

### API Key Issues

**Error**: "API configuration error"
**Solution**: Check that your `.env.local` file exists and contains a valid `OPENAI_API_KEY`

**Error**: "Rate limit hit"
**Solution**: Wait a moment and try again, or check your OpenAI account usage

### Build Issues

**Error**: "Missing credentials" during build
**Solution**: This is expected. Use a dummy key for build:
```bash
OPENAI_API_KEY=sk-dummy npm run build
```

### Generation Issues

**Error**: "Topic must be at least 10 characters"
**Solution**: Enter a more detailed topic

**Error**: "Generation timeout"
**Solution**: Try again with a shorter or simpler topic

### Browser Issues

- **Animations not smooth**: Try Chrome/Edge for best performance
- **Backgrounds not morphing**: Check browser supports CSS gradients and transitions
- **Layout issues on mobile**: Some sections optimized for desktop; mobile improvements coming in Phase 2

## Performance Tips

- First generation may take 20-30 seconds
- Subsequent generations are similar speed (depends on OpenAI API)
- Close other browser tabs if animations lag
- Desktop experience is optimal; mobile support improving

## Architecture Overview

### Core Systems

1. **AI Generation** (`/api/generate`) - OpenAI GPT-4 with structured JSON output
2. **Variant Selection** - Algorithmic matching of sections to visual styles
3. **Color System** - 15 palettes with emotional compatibility scoring
4. **Background Blending** - Scroll-driven gradient morphing
5. **Animation Timing** - Energy-based duration calculation

### Data Flow

```
User Input → API Route → OpenAI GPT-4
    ↓
Structured JSON (sections + emotional profiles)
    ↓
Variant Selection Algorithm
    ↓
Resolved Sections (variants + colors + animations)
    ↓
Presentation Container → Section Renderer
    ↓
Cinematic Scroll Experience
```

## Development

### Project Structure

```
src/
├── app/              # Next.js pages and API routes
├── components/       # React components
│   ├── sections/     # Visual section variants
│   └── presentation/ # Core presentation system
├── lib/
│   ├── engines/      # Core algorithms (selection, colors, timing)
│   ├── utils/        # Utilities (lerp, easing)
│   └── ai/           # OpenAI prompts
└── types/            # TypeScript definitions
```

### Key Files

- `src/app/page.tsx` - Input interface
- `src/app/presentation/[id]/page.tsx` - Presentation viewer
- `src/app/api/generate/route.ts` - AI generation endpoint
- `src/components/presentation/BackgroundManager.tsx` - Background morphing
- `src/lib/engines/variantSelection.ts` - Section-to-variant algorithm

### Adding New Section Variants

1. Create component in `src/components/sections/`
2. Add variant ID to `src/types/visual.ts`
3. Map semantic type to variant in `src/lib/engines/variantSelection.ts`
4. Add variant compatibility scores
5. Import and route in `src/components/presentation/SectionRenderer.tsx`

## Roadmap

### Phase 1 (Current) ✅
- 15+ section types with 44 variants
- CSS-based transitions
- Framer Motion animations
- OpenAI generation
- localStorage persistence

### Phase 2 (Next)
- Canvas 2D backgrounds with Perlin noise
- 30 section types, 93 variants
- Advanced parallax effects
- Chart/data visualizations
- Improved mobile experience

### Phase 3 (Future)
- WebGL particle systems
- 50+ section types, 150+ variants
- Database persistence & sharing
- Export to PDF/video/HTML
- User customization
- Performance optimization

## Support

For issues or questions:
1. Check this guide first
2. Review `README.md` for architecture details
3. Check browser console for errors
4. Verify OpenAI API key is valid

## License

MIT License - See LICENSE file
