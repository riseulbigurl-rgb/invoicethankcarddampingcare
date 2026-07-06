import { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Eraser, RotateCcw, Check } from 'lucide-react';

interface SignaturePadInputProps {
  onSave: (dataUrl: string | null) => void;
}

export default function SignaturePadInput({ onSave }: SignaturePadInputProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
      if (padRef.current) {
        padRef.current.clear();
      }
    };

    resize();
    const pad = new SignaturePad(canvas, {
      backgroundColor: '#ffffff',
      penColor: '#0a0a0a',
      minWidth: 0.8,
      maxWidth: 2.6,
    });
    padRef.current = pad;

    const onResize = () => {
      const data = pad.toData();
      resize();
      pad.fromData(data);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      pad.off();
    };
  }, []);

  const clear = () => {
    padRef.current?.clear();
    setSaved(false);
    onSave(null);
  };

  const undo = () => {
    const pad = padRef.current;
    if (!pad) return;
    const data = pad.toData();
    if (data.length > 0) {
      data.pop();
      pad.fromData(data);
      setSaved(false);
      onSave(null);
    }
  };

  const save = () => {
    const pad = padRef.current;
    if (!pad || pad.isEmpty()) return;
    const dataUrl = pad.toDataURL('image/png');
    onSave(dataUrl);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <canvas ref={canvasRef} className="sig-canvas" style={{ height: 180 }} />
      <div className="grid grid-cols-3 gap-2">
        <button onClick={clear} className="btn-ghost" style={{ padding: '10px' }}>
          <Eraser size={15} />
          <span className="text-xs">Bersihkan</span>
        </button>
        <button onClick={undo} className="btn-ghost" style={{ padding: '10px' }}>
          <RotateCcw size={15} />
          <span className="text-xs">Ulangi</span>
        </button>
        <button onClick={save} className="btn-primary" style={{ padding: '10px' }}>
          <Check size={15} />
          <span className="text-xs">{saved ? 'Tersimpan' : 'Simpan'}</span>
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center">Tanda tangan dengan jari, mouse, atau stylus</p>
    </div>
  );
}
