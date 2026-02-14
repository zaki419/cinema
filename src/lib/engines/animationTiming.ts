import { EmotionalProfile } from '@/types/presentation';
import { mapRange } from '@/lib/utils/easing';

export interface AnimationDurations {
  background: number;
  visual: number;
  text: number;
  accent: number;
}

/**
 * Calculate animation durations based on emotional profile
 */
export function calculateAnimationDurations(profile: EmotionalProfile): AnimationDurations {
  // Energy controls overall speed
  // 0.0 energy → 1.4s (slow, calm)
  // 1.0 energy → 0.6s (fast, dynamic)
  const baseDuration = mapRange(profile.energy, 0, 1, 1.4, 0.6);

  // Urgency modifies delays
  const urgencyModifier = profile.urgency > 0.7 ? 0.8 : 1.0;

  return {
    background: baseDuration * 1.2 * urgencyModifier,
    visual: baseDuration * urgencyModifier,
    text: baseDuration * 0.8 * urgencyModifier,
    accent: baseDuration * 0.6 * urgencyModifier
  };
}

/**
 * Calculate stagger delay for text elements
 */
export function calculateStaggerDelay(
  profile: EmotionalProfile,
  elementType: 'paragraph' | 'bullet' | 'word'
): number {
  const baseDelays = {
    paragraph: 50,
    bullet: 100,
    word: 20
  };

  const baseDelay = baseDelays[elementType];

  // Higher energy = faster staggers
  const energyModifier = mapRange(profile.energy, 0, 1, 1.5, 0.5);

  return baseDelay * energyModifier;
}

/**
 * Select easing function based on emotional profile
 */
export function getEasingFunction(profile: EmotionalProfile): string {
  // High formality → predictable easing
  if (profile.formality > 0.7) {
    return 'cubic-bezier(0.4, 0, 0.2, 1)'; // easeInOutCubic
  }

  // Low formality → playful easing
  if (profile.formality < 0.3) {
    return 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // easeOutBack
  }

  // High energy → quick start
  if (profile.energy > 0.7) {
    return 'cubic-bezier(0, 0, 0.2, 1)'; // easeOut
  }

  // Default smooth
  return 'cubic-bezier(0.4, 0, 0.2, 1)';
}

/**
 * Calculate scroll snap intensity
 */
export function getScrollSnapType(profile: EmotionalProfile): string {
  // High urgency → mandatory snapping
  if (profile.urgency > 0.7) {
    return 'y mandatory';
  }

  // Default gentle snapping
  return 'y proximity';
}
