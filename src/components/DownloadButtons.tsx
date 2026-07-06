import { useState } from 'react';
import { FileText, Image as ImageIcon, Camera } from 'lucide-react';
import { downloadDocument, type DownloadFormat } from '../lib/download';

interface DownloadButtonsProps {
  getTarget: () => HTMLElement | null;
  baseFilename: string;
  extensions: { pdf: string; png: string; jpg: string };
}

export default function DownloadButtons({ getTarget, baseFilename, extensions }: DownloadButtonsProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const handle = async (fmt: DownloadFormat) => {
    if (busy) return;
    const el = getTarget();
    if (!el) return;
    setBusy(true);
    setProgress(0);
    try {
      await downloadDocument({
        element: el,
        format: fmt,
        filename: `${baseFilename}.${extensions[fmt]}`,
        onProgress: (pct) => setProgress(pct),
      });
      setTimeout(() => setProgress(null), 600);
    } catch (e) {
      console.error(e);
      setProgress(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {progress !== null && (
        <div className="flex flex-col gap-1.5">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 text-center">Memproses {progress}%</p>
        </div>
      )}
      <button onClick={() => handle('pdf')} disabled={busy} className="btn-primary">
        <FileText size={18} />
        Download PDF
      </button>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => handle('png')} disabled={busy} className="btn-ghost">
          <ImageIcon size={16} />
          Download PNG
        </button>
        <button onClick={() => handle('jpg')} disabled={busy} className="btn-ghost">
          <Camera size={16} />
          Download JPG
        </button>
      </div>
    </div>
  );
}
