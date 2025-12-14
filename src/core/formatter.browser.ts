import { NormalizedStyle } from './normalize';

export function formatStyleForBrowser(style: NormalizedStyle): string {
  const css: string[] = [];

  if (style.color) {
    css.push(`color: ${style.color}`);
  }

  if (style.background) {
    css.push(`background: ${style.background}`);
  }

  if (style.fontWeight) {
    css.push(`font-weight: ${style.fontWeight}`);
  }

  if (style.textDecoration) {
    css.push(`text-decoration: ${style.textDecoration}`);
  }

  if (style.fontStyle) {
    css.push(`font-style: ${style.fontStyle}`);
  }

  return css.join('; ') + (css.length > 0 ? ';' : '');
}