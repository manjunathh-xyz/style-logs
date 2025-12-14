export interface NormalizedStyle {
  color?: string;
  background?: string;
  fontWeight?: string;
  textDecoration?: string;
  fontStyle?: string;
}

export function normalizeStyle(style: any): NormalizedStyle {
  if (!style || typeof style !== 'object') {
    return {};
  }

  const normalized: NormalizedStyle = {};

  // Handle color
  if (typeof style.color === 'string') {
    normalized.color = style.color;
  }

  // Handle background
  if (typeof style.background === 'string') {
    normalized.background = style.background;
  } else if (typeof style.bg === 'string') {
    normalized.background = style.bg;
  }

  // Handle fontWeight
  if (style.bold === true) {
    normalized.fontWeight = 'bold';
  } else if (typeof style.fontWeight === 'string') {
    normalized.fontWeight = style.fontWeight;
  }

  // Handle textDecoration
  if (style.underline === true) {
    normalized.textDecoration = 'underline';
  } else if (typeof style.textDecoration === 'string') {
    normalized.textDecoration = style.textDecoration;
  }

  // Handle fontStyle
  if (style.italic === true) {
    normalized.fontStyle = 'italic';
  } else if (typeof style.fontStyle === 'string') {
    normalized.fontStyle = style.fontStyle;
  }

  return normalized;
}