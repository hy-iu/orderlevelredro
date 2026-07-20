import katex from 'katex';
import katexCss from 'katex/dist/katex.min.css?raw';

// Cache for SVG DataURI Images rendered by KaTeX
const spriteCache = new Map();
let onSpriteLoadedCallback = null;

export function setSpriteLoadCallback(cb) {
  onSpriteLoadedCallback = cb;
}

/**
 * Render a LaTeX string into an HTMLImageElement using SVG foreignObject
 * Injecting full KaTeX CSS into SVG guarantees exact subscript/superscript typesetting
 */
export function getKatexSprite(latexStr, color = '#0f172a', fontSize = 13) {
  const cacheKey = `${latexStr}_${color}_${fontSize}`;
  if (spriteCache.has(cacheKey)) {
    return spriteCache.get(cacheKey);
  }

  try {
    const htmlStr = katex.renderToString(latexStr, {
      displayMode: false,
      throwOnError: false
    });

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="180" height="40">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: ${fontSize}px; color: ${color}; font-family: KaTeX_Main, 'STIX Two Text', 'Times New Roman', serif; white-space: nowrap; line-height: 1;">
            <style>
              ${katexCss}
              .katex { font-size: ${fontSize}px !important; color: ${color} !important; }
            </style>
            ${htmlStr}
          </div>
        </foreignObject>
      </svg>
    `;

    const img = new Image();
    img.onload = () => {
      if (onSpriteLoadedCallback) {
        onSpriteLoadedCallback();
      }
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    spriteCache.set(cacheKey, img);
    return img;
  } catch (err) {
    console.error('Sprite generation failed for:', latexStr, err);
    return null;
  }
}
