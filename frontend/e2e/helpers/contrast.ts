import type { Page } from '@playwright/test';

/**
 * Reads an element's text colour and its nearest painted background, resolved
 * to plain RGB. Tailwind v4 emits `oklch(...)`, which no naive parser handles —
 * painting onto a canvas lets the browser do the conversion.
 */
export async function readColours(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const toRgb = (color: string): [number, number, number] => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b];
    };

    const el = document.querySelector(sel) as HTMLElement;
    let node: HTMLElement | null = el;
    let background: string | null = null;
    while (node) {
      const value = getComputedStyle(node).backgroundColor;
      if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
        background = value;
        break;
      }
      node = node.parentElement;
    }

    return {
      text: toRgb(getComputedStyle(el).color),
      background: background ? toRgb(background) : null,
    };
  }, selector);
}

function luminance([r, g, b]: [number, number, number]): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(
  text: [number, number, number],
  background: [number, number, number],
): number {
  const lighter = Math.max(luminance(text), luminance(background));
  const darker = Math.min(luminance(text), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

/** Resolves the contrast of a selector against whatever it's painted on. */
export async function contrastOf(page: Page, selector: string): Promise<number> {
  const { text, background } = await readColours(page, selector);
  if (!background) throw new Error(`${selector} does not sit on a painted background`);
  return contrastRatio(text, background);
}
