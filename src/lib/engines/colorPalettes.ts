import { ColorPalette } from '@/types/visual';
import { EmotionalProfile } from '@/types/presentation';

// 15 curated base color palettes
export const BASE_PALETTES: ColorPalette[] = [
  {
    id: 'vibrant-tech',
    name: 'Vibrant Tech',
    gradientStops: ['#667eea', '#764ba2'],
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    accentColor: '#a78bfa',
    compatibility: {
      energy: [0.6, 1.0],
      optimism: [0.5, 1.0],
      formality: [0.3, 0.7]
    }
  },
  {
    id: 'warm-optimist',
    name: 'Warm Optimist',
    gradientStops: ['#f093fb', '#f5576c'],
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    accentColor: '#fbbf24',
    compatibility: {
      energy: [0.5, 0.9],
      optimism: [0.7, 1.0],
      formality: [0.2, 0.6]
    }
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    gradientStops: ['#0f2027', '#203a43', '#2c5364'],
    textPrimary: '#e0f2fe',
    textSecondary: 'rgba(224, 242, 254, 0.8)',
    accentColor: '#38bdf8',
    compatibility: {
      energy: [0.3, 0.6],
      optimism: [0.4, 0.7],
      formality: [0.6, 1.0]
    }
  },
  {
    id: 'earth-organic',
    name: 'Earth Organic',
    gradientStops: ['#56ab2f', '#a8e063'],
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    accentColor: '#84cc16',
    compatibility: {
      energy: [0.4, 0.7],
      optimism: [0.6, 0.9],
      formality: [0.4, 0.7]
    }
  },
  {
    id: 'monochrome-elite',
    name: 'Monochrome Elite',
    gradientStops: ['#434343', '#000000'],
    textPrimary: '#f8fafc',
    textSecondary: 'rgba(248, 250, 252, 0.7)',
    accentColor: '#94a3b8',
    compatibility: {
      energy: [0.2, 0.5],
      optimism: [0.3, 0.6],
      formality: [0.7, 1.0]
    }
  },
  {
    id: 'neon-future',
    name: 'Neon Future',
    gradientStops: ['#ff00cc', '#333399'],
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    accentColor: '#e879f9',
    compatibility: {
      energy: [0.8, 1.0],
      optimism: [0.6, 1.0],
      formality: [0.2, 0.5]
    }
  },
  {
    id: 'sunset-calm',
    name: 'Sunset Calm',
    gradientStops: ['#ff6e7f', '#bfe9ff'],
    textPrimary: '#1e293b',
    textSecondary: 'rgba(30, 41, 59, 0.8)',
    accentColor: '#f59e0b',
    compatibility: {
      energy: [0.4, 0.7],
      optimism: [0.7, 1.0],
      formality: [0.3, 0.6]
    }
  },
  {
    id: 'forest-deep',
    name: 'Forest Deep',
    gradientStops: ['#134e4a', '#022c22'],
    textPrimary: '#d1fae5',
    textSecondary: 'rgba(209, 250, 229, 0.8)',
    accentColor: '#10b981',
    compatibility: {
      energy: [0.2, 0.5],
      optimism: [0.4, 0.7],
      formality: [0.6, 0.9]
    }
  },
  {
    id: 'clinical-white',
    name: 'Clinical White',
    gradientStops: ['#e0f2fe', '#f0f9ff'],
    textPrimary: '#0f172a',
    textSecondary: 'rgba(15, 23, 42, 0.7)',
    accentColor: '#3b82f6',
    compatibility: {
      energy: [0.3, 0.6],
      optimism: [0.5, 0.8],
      formality: [0.7, 1.0]
    }
  },
  {
    id: 'fire-energy',
    name: 'Fire Energy',
    gradientStops: ['#f12711', '#f5af19'],
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    accentColor: '#fbbf24',
    compatibility: {
      energy: [0.7, 1.0],
      optimism: [0.5, 0.8],
      formality: [0.2, 0.5]
    }
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    gradientStops: ['#360033', '#0b8793'],
    textPrimary: '#f3e8ff',
    textSecondary: 'rgba(243, 232, 255, 0.8)',
    accentColor: '#c084fc',
    compatibility: {
      energy: [0.4, 0.7],
      optimism: [0.4, 0.7],
      formality: [0.6, 0.9]
    }
  },
  {
    id: 'arctic-cool',
    name: 'Arctic Cool',
    gradientStops: ['#e0f2fe', '#ffffff'],
    textPrimary: '#0c4a6e',
    textSecondary: 'rgba(12, 74, 110, 0.7)',
    accentColor: '#0ea5e9',
    compatibility: {
      energy: [0.2, 0.5],
      optimism: [0.6, 0.9],
      formality: [0.5, 0.8]
    }
  },
  {
    id: 'desert-warm',
    name: 'Desert Warm',
    gradientStops: ['#d4a373', '#c2410c'],
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    accentColor: '#fbbf24',
    compatibility: {
      energy: [0.3, 0.6],
      optimism: [0.5, 0.8],
      formality: [0.4, 0.7]
    }
  },
  {
    id: 'night-sky',
    name: 'Night Sky',
    gradientStops: ['#000000', '#0f172a', '#1e3a8a'],
    textPrimary: '#e0e7ff',
    textSecondary: 'rgba(224, 231, 255, 0.8)',
    accentColor: '#818cf8',
    compatibility: {
      energy: [0.3, 0.6],
      optimism: [0.3, 0.6],
      formality: [0.5, 0.8]
    }
  },
  {
    id: 'spring-fresh',
    name: 'Spring Fresh',
    gradientStops: ['#a8edea', '#fed6e3'],
    textPrimary: '#064e3b',
    textSecondary: 'rgba(6, 78, 59, 0.8)',
    accentColor: '#10b981',
    compatibility: {
      energy: [0.5, 0.8],
      optimism: [0.7, 1.0],
      formality: [0.3, 0.6]
    }
  }
];

/**
 * Calculate compatibility score between a palette and emotional profile
 */
function calculateCompatibilityScore(
  palette: ColorPalette,
  profile: EmotionalProfile
): number {
  const energyMatch = profile.energy >= palette.compatibility.energy[0] &&
                      profile.energy <= palette.compatibility.energy[1];
  const optimismMatch = profile.optimism >= palette.compatibility.optimism[0] &&
                        profile.optimism <= palette.compatibility.optimism[1];
  const formalityMatch = profile.formality >= palette.compatibility.formality[0] &&
                         profile.formality <= palette.compatibility.formality[1];

  // Calculate distance from ideal range
  const energyDist = energyMatch ? 0 : Math.min(
    Math.abs(profile.energy - palette.compatibility.energy[0]),
    Math.abs(profile.energy - palette.compatibility.energy[1])
  );
  const optimismDist = optimismMatch ? 0 : Math.min(
    Math.abs(profile.optimism - palette.compatibility.optimism[0]),
    Math.abs(profile.optimism - palette.compatibility.optimism[1])
  );
  const formalityDist = formalityMatch ? 0 : Math.min(
    Math.abs(profile.formality - palette.compatibility.formality[0]),
    Math.abs(profile.formality - palette.compatibility.formality[1])
  );

  // Lower distance = better score
  return -(energyDist + optimismDist + formalityDist);
}

/**
 * Select the best color palette based on emotional profile
 */
export function selectPalette(profile: EmotionalProfile): ColorPalette {
  const scoredPalettes = BASE_PALETTES.map(palette => ({
    palette,
    score: calculateCompatibilityScore(palette, profile)
  }));

  // Sort by score (highest/closest first)
  scoredPalettes.sort((a, b) => b.score - a.score);

  return scoredPalettes[0].palette;
}

/**
 * Apply emotional adjustments to a base palette
 */
export function adjustPaletteForEmotion(
  palette: ColorPalette
): ColorPalette {
  // For Phase 1, return palette as-is
  // Phase 2 will add algorithmic saturation/hue adjustments
  return { ...palette };
}

/**
 * Generate per-section color variation
 * Slightly shifts hue for continuous evolution
 */
export function evolveColorForSection(
  basePalette: ColorPalette
): ColorPalette {
  // For Phase 1, return palette with minor modifications
  // Phase 2 will implement actual color space transformations
  return { ...basePalette };
}
