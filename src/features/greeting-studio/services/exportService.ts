import type { GreetingTemplate, OutputFormat } from '../types/template';
import type { CardCustomization } from '../types/editor';
import { renderCardToCanvas } from './canvasRenderer';

export async function exportCardToBlob(
  template: GreetingTemplate,
  customization: CardCustomization,
  format: OutputFormat
): Promise<Blob> {
  const offscreenCanvas = document.createElement('canvas');
  await renderCardToCanvas({
    canvas: offscreenCanvas,
    template,
    customization,
    format,
    scale: 1.0, // High-res native export (1080x1080, 1080x1920, etc.)
  });

  return new Promise((resolve, reject) => {
    offscreenCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create PNG blob from canvas'));
        }
      },
      'image/png',
      1.0
    );
  });
}

export function downloadCard(blob: Blob, templateId: string, format: OutputFormat) {
  const filename = `festivewala-diwali-${templateId}-${format}-2026.png`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function shareCard(
  blob: Blob,
  templateId: string,
  format: OutputFormat,
  title: string,
  message: string
): Promise<{ success: boolean; mode: 'native' | 'download_and_copy' | 'cancelled' }> {
  const filename = `festivewala-diwali-${templateId}-${format}-2026.png`;
  const file = new File([blob], filename, { type: 'image/png' });

  // 1. Try Native Web Share API with File
  if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title,
        text: message,
        files: [file],
      });
      return { success: true, mode: 'native' };
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') {
        return { success: false, mode: 'cancelled' };
      }
      // If user aborted or error, fall through to download + copy
    }
  }

  // 2. Fallback: Download PNG + Copy accompanying message to clipboard
  downloadCard(blob, templateId, format);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(message);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  } catch (clipErr) {
    console.warn('Clipboard copy fallback warning:', clipErr);
  }

  return { success: true, mode: 'download_and_copy' };
}

