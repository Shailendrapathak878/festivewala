const imageCache = new Map<string, HTMLImageElement>();

export async function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return cached;
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (err) => {
      reject(new Error(`Failed to load image from ${src.substring(0, 60)}...: ${err}`));
    };
    img.src = src;
  });
}

export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.ready;
    } catch (err) {
      console.warn('document.fonts.ready warning:', err);
    }
  }
}

