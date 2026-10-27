import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type DownloadFormat = 'pdf' | 'png' | 'jpg';

export interface DownloadOptions {
  element: HTMLElement;
  format: DownloadFormat;
  filename: string;
  onProgress?: (pct: number) => void;
}

const SCALE = 2;

export async function downloadDocument(opts: DownloadOptions): Promise<void> {
  const { element, format, filename, onProgress } = opts;
  onProgress?.(10);

  const canvas = await html2canvas(element, {
    scale: SCALE,
    useCORS: true,
    allowTaint: false,
    imageTimeout: 15000,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  onProgress?.(60);

  if (format === 'pdf') {
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width / SCALE, canvas.height / SCALE],
    });
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / SCALE, canvas.height / SCALE);
    onProgress?.(85);
    pdf.save(filename);
  } else {
    const mime = format === 'png' ? 'image/png' : 'image/jpeg';
    const quality = format === 'jpg' ? 0.95 : undefined;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, quality));
    if (!blob) throw new Error('Gagal menyiapkan file gambar');

    onProgress?.(85);
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }

  onProgress?.(100);
}

export function formatRupiah(value: number): string {
  if (!value || isNaN(value)) return 'Rp 0';
  return 'Rp ' + value.toLocaleString('id-ID');
}

export function parseRupiahInput(value: string): number {
  const cleaned = value.replace(/[^\d]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export function formatRupiahInput(value: string): string {
  const num = parseRupiahInput(value);
  if (!num) return '';
  return 'Rp ' + num.toLocaleString('id-ID');
}

export function todayISO(): string {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function formatDateID(iso: string): string {
  if (!iso) return '-';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

export function generateInvoiceNumber(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INV-${ymd}-${rand}`;
}

export function todayStamp(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
