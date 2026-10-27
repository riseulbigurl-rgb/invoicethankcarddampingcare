import { useState, useRef } from 'react';
import { Mail, Image as ImageIcon, Eye, Type, Palette, SlidersHorizontal, FileText } from 'lucide-react';
import LogoUploader from '../components/LogoUploader';
import DownloadButtons from '../components/DownloadButtons';
import ThankYouPreview, {
  THANKYOU_TEMPLATES,
  FONT_OPTIONS,
  COLOR_PRESETS,
  type ThankYouData,
  type ThankYouStyle,
  type ThankYouTemplateId,
  type FontId,
} from '../components/ThankYouPreview';
import { todayStamp } from '../lib/download';

export default function ThankYouCardGenerator() {
  const [template, setTemplate] = useState<ThankYouTemplateId>('soft-pink');
  const [data, setData] = useState<ThankYouData>({
    to: '',
    message: '',
    from: '',
    role: '',
    date: '',
    logo: '/cropped_circle_image_(1).png',
  });
  const [style, setStyle] = useState<ThankYouStyle>({
    fontFamily: 'poppins',
    fontSize: 18,
    bold: true,
    italic: false,
    align: 'center',
    letterSpacing: 0,
    lineHeight: 1.5,
    outline: false,
    shadow: false,
    opacity: 100,
    textColor: '#4a2030',
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ThankYouData>(key: K, value: ThankYouData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const updateStyle = <K extends keyof ThankYouStyle>(key: K, value: ThankYouStyle[K]) => {
    setStyle((s) => ({ ...s, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="text-center px-2 pt-2">
        <h1 className="text-xl font-extrabold text-gray-900 leading-tight">Thank You Card Generator Dampingcare</h1>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">Buat kartu ucapan terima kasih yang elegan dan siap dibagikan.</p>
      </div>

      {/* Template */}
      <Section icon={<Palette size={16} />} title="Tema Kartu">
        <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
          {THANKYOU_TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`tpl-chip flex items-center gap-2 ${template === t.id ? 'active' : ''}`}
              onClick={() => setTemplate(t.id)}
              style={{ justifyContent: 'flex-start', padding: '10px 10px' }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 6,
                  background: t.bg,
                  border: '1.5px solid #00000020',
                  flexShrink: 0,
                }}
              />
              <span className="text-left leading-tight">{t.name}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Logo */}
      <Section icon={<ImageIcon size={16} />} title="Logo Bisnis (Opsional)">
        <LogoUploader logo={data.logo} onLogoChange={(v) => update('logo', v)} />
      </Section>

      {/* Data */}
      <Section icon={<Mail size={16} />} title="Isi Kartu Ucapan">
        <div className="flex flex-col gap-3">
          <div>
            <label className="field-label">Untuk</label>
            <input className="field-input" value={data.to} onChange={(e) => update('to', e.target.value)} placeholder="Contoh: Ibu Siti" />
          </div>
          <div>
            <label className="field-label">Isi Ucapan</label>
            <textarea
              className="field-input"
              value={data.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="Tuliskan ucapan terima kasih..."
              style={{ minHeight: 120 }}
            />
          </div>
          <div>
            <label className="field-label">Dari</label>
            <input className="field-input" value={data.from} onChange={(e) => update('from', e.target.value)} placeholder="Salah satu pelaksana Dampingcare" />
          </div>
          <div>
            <label className="field-label">Jabatan (Opsional)</label>
            <input className="field-input" value={data.role} onChange={(e) => update('role', e.target.value)} placeholder="Contoh: Pendamping Dampingcare" />
          </div>
          <div>
            <label className="field-label">Tanggal (Opsional)</label>
            <input type="date" className="field-input" value={data.date} onChange={(e) => update('date', e.target.value)} />
          </div>
        </div>
      </Section>

      {/* Font */}
      <Section icon={<Type size={16} />} title="Font">
        <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.id}
              className={`font-opt ${style.fontFamily === f.id ? 'active' : ''}`}
              onClick={() => updateStyle('fontFamily', f.id as FontId)}
              style={{ fontFamily: f.family, fontWeight: f.weight }}
            >
              {f.name}
            </button>
          ))}
        </div>
      </Section>

      {/* Color */}
      <Section icon={<Palette size={16} />} title="Warna Teks">
        <div className="flex flex-wrap gap-2.5 mb-3">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c.name}
              className={`color-swatch ${style.textColor === c.value ? 'active' : ''}`}
              style={{ background: c.value }}
              onClick={() => updateStyle('textColor', c.value)}
              title={c.name}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="field-label mb-0 flex-shrink-0">Custom</label>
          <input
            type="color"
            value={style.textColor}
            onChange={(e) => updateStyle('textColor', e.target.value)}
            className="w-12 h-10 rounded-xl border border-gray-200 cursor-pointer"
          />
          <span className="text-sm text-gray-500 font-mono">{style.textColor}</span>
        </div>
      </Section>

      {/* Settings */}
      <Section icon={<SlidersHorizontal size={16} />} title="Pengaturan Teks">
        <div className="flex flex-col gap-4">
          {/* Font size */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="field-label mb-0">Ukuran Font</label>
              <span className="text-xs font-semibold text-damping-primary">{style.fontSize}px</span>
            </div>
            <input type="range" min="10" max="48" value={style.fontSize} onChange={(e) => updateStyle('fontSize', Number(e.target.value))} />
          </div>

          {/* Letter spacing */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="field-label mb-0">Letter Spacing</label>
              <span className="text-xs font-semibold text-damping-primary">{style.letterSpacing}px</span>
            </div>
            <input type="range" min="-2" max="10" step="0.5" value={style.letterSpacing} onChange={(e) => updateStyle('letterSpacing', Number(e.target.value))} />
          </div>

          {/* Line height */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="field-label mb-0">Line Height</label>
              <span className="text-xs font-semibold text-damping-primary">{style.lineHeight.toFixed(2)}</span>
            </div>
            <input type="range" min="1" max="3" step="0.05" value={style.lineHeight} onChange={(e) => updateStyle('lineHeight', Number(e.target.value))} />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="field-label mb-0">Opacity</label>
              <span className="text-xs font-semibold text-damping-primary">{style.opacity}%</span>
            </div>
            <input type="range" min="10" max="100" value={style.opacity} onChange={(e) => updateStyle('opacity', Number(e.target.value))} />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-2.5">
            <button className={`toggle-pill ${style.bold ? 'active' : ''}`} onClick={() => updateStyle('bold', !style.bold)}>
              <span style={{ fontWeight: 800 }}>Bold</span>
            </button>
            <button className={`toggle-pill ${style.italic ? 'active' : ''}`} onClick={() => updateStyle('italic', !style.italic)}>
              <span style={{ fontStyle: 'italic' }}>Italic</span>
            </button>
            <button className={`toggle-pill ${style.outline ? 'active' : ''}`} onClick={() => updateStyle('outline', !style.outline)}>
              Outline
            </button>
            <button className={`toggle-pill ${style.shadow ? 'active' : ''}`} onClick={() => updateStyle('shadow', !style.shadow)}>
              Shadow
            </button>
          </div>

          {/* Alignment */}
          <div>
            <label className="field-label">Alignment</label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['left', 'center', 'right'] as const).map((a) => (
                <button key={a} className={`toggle-pill ${style.align === a ? 'active' : ''}`} onClick={() => updateStyle('align', a)}>
                  {a === 'left' ? 'Kiri' : a === 'center' ? 'Tengah' : 'Kanan'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Preview */}
      <Section icon={<Eye size={16} />} title="Preview">
        <div className="flex justify-center overflow-x-auto pb-2">
          <div style={{ width: 380, flexShrink: 0 }} className="rounded-2xl overflow-hidden soft-shadow-lg">
            <ThankYouPreview ref={previewRef} data={data} style={style} template={template} />
          </div>
        </div>
      </Section>

      {/* Download */}
      <Section icon={<FileText size={16} />} title="Download">
        <DownloadButtons
          getTarget={() => previewRef.current}
          baseFilename={`ThankYou_Dampingcare_${todayStamp()}`}
          extensions={{ pdf: 'pdf', png: 'png', jpg: 'jpg' }}
        />
      </Section>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="section-title">
        <span className="text-damping-primary">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}
