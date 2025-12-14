import { normalizeStyle, NormalizedStyle } from './core/normalize';
import { isBrowser } from './core/env';
import { formatStyleForBrowser } from './core/formatter.browser';
import { formatStyleForNode } from './core/formatter.nodejs';

export type LogSegment = [string, NormalizedStyle];

export function log(message: string | LogSegment[], style?: any): void {
  try {
    if (typeof message === 'string') {
      // Single message with optional style
      const normalizedStyle = style ? normalizeStyle(style) : {};
      const segments: LogSegment[] = [[message, normalizedStyle]];
      outputSegments(segments);
    } else if (Array.isArray(message)) {
      // Multiple segments
      const segments: LogSegment[] = message.map(([text, style]) => [text, normalizeStyle(style || {})]);
      outputSegments(segments);
    }
  } catch {
    // Zero-crash guarantee: fallback to plain console.log
    console.log(typeof message === 'string' ? message : message.map(([text]) => text).join(''));
  }
}

function outputSegments(segments: LogSegment[]): void {
  if (isBrowser) {
    const texts: string[] = [];
    const styles: string[] = [];
    segments.forEach(([text, style]) => {
      texts.push(`%c${text}`);
      styles.push(formatStyleForBrowser(style));
    });
    console.log(texts.join(''), ...styles);
  } else {
    // Node: join with ANSI
    let result = '';
    segments.forEach(([text, style]) => {
      const ansi = formatStyleForNode(style);
      result += ansi + text + (ansi ? '\x1b[0m' : '');
    });
    console.log(result);
  }
}