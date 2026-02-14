/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Interpolate between two color values (hex format)
 */
export function lerpColor(startColor: string, endColor: string, progress: number): string {
  // Convert hex to RGB
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  if (!start || !end) return startColor;

  const r = Math.round(lerp(start.r, end.r, progress));
  const g = Math.round(lerp(start.g, end.g, progress));
  const b = Math.round(lerp(start.b, end.b, progress));

  return rgbToHex(r, g, b);
}

/**
 * Interpolate between two arrays of colors
 */
export function lerpColorArray(
  startColors: string[],
  endColors: string[],
  progress: number
): string[] {
  const maxLength = Math.max(startColors.length, endColors.length);
  const result: string[] = [];

  for (let i = 0; i < maxLength; i++) {
    const startColor = startColors[i] || startColors[startColors.length - 1];
    const endColor = endColors[i] || endColors[endColors.length - 1];
    result.push(lerpColor(startColor, endColor, progress));
  }

  return result;
}

// Helper functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
