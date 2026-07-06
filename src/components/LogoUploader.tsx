import { useRef, useState, useCallback, useEffect } from 'react';
import { Upload, X, Replace } from 'lucide-react';

interface LogoUploaderProps {
  logo: string | null;
  onLogoChange: (dataUrl: string | null) => void;
  label?: string;
}

const ACCEPTED = '.png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml';

export default function LogoUploader({ logo, onLogoChange, label = 'Upload Logo Bisnis' }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const readFile = useCallback((file: File) => {
    setError('');
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onLogoChange(result);
      }
    };
    reader.readAsDataURL(file);
  }, [onLogoChange]);

  const handleFile = (file?: File) => {
    if (!file) return;
    readFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  if (logo) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf5fa] border border-[#f0d8e6]">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-gray-100" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Logo terunggah</p>
            <p className="text-xs text-gray-400">Siap digunakan</p>
          </div>
          <button
            onClick={() => inputRef.current?.click()}
            className="p-2 rounded-xl bg-white border border-gray-200 text-damping-primary hover:bg-pink-50 transition"
            title="Ganti Logo"
          >
            <Replace size={16} />
          </button>
          <button
            onClick={() => onLogoChange(null)}
            className="p-2 rounded-xl bg-white border border-gray-200 text-red-500 hover:bg-red-50 transition"
            title="Hapus Logo"
          >
            <X size={16} />
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`dropzone ${dragOver ? 'dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-damping-primary/10 flex items-center justify-center text-damping-primary">
            <Upload size={22} />
          </div>
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-xs text-gray-400">PNG, JPG, JPEG, WEBP, SVG · Drag & Drop</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
