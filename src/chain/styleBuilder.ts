import { log } from '../log';
import { NormalizedStyle } from '../core/normalize';

class StyleBuilder {
  private style: NormalizedStyle = {};

  color(value: string): this {
    this.style.color = value;
    return this;
  }

  bg(value: string): this {
    this.style.background = value;
    return this;
  }

  bold(): this {
    this.style.fontWeight = 'bold';
    return this;
  }

  underline(): this {
    this.style.textDecoration = 'underline';
    return this;
  }

  italic(): this {
    this.style.fontStyle = 'italic';
    return this;
  }

  log(message: string): void {
    log(message, this.style);
  }
}

export function styled(): StyleBuilder {
  return new StyleBuilder();
}