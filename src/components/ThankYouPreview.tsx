import { forwardRef } from 'react';
import { formatDateID } from '../lib/download';

export interface ThankYouData {
  to: string;
  message: string;
  from: string;
  role: string;
  date: string;
  logo: string | null;
}

export interface ThankYouStyle {
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
  letterSpacing: number;
  lineHeight: number;
  outline: boolean;
  shadow: boolean;
  opacity: number;
  textColor: string;
}

export const THANKYOU_TEMPLATES = [
  { id: 'elegant-white', name: 'Elegant White', bg: '#ffffff', accent: '#c9a227', text: '#222222' },
  { id: 'soft-pink', name: 'Soft Pink', bg: '#ffeef4', accent: '#fb5ea8', text: '#4a2030' },
  { id: 'lavender', name: 'Lavender Dream', bg: '#f0e6ff', accent: '#9b7ed8', text: '#3a2a4a' },
  { id: 'baby-blue', name: 'Baby Blue', bg: '#e6f2ff', accent: '#5b9bd5', text: '#1a3a5a' },
  { id: 'minimal-beige', name: 'Minimal Beige', bg: '#f5efe0', accent: '#a89060', text: '#3a2e1a' },
  { id: 'modern-gradient', name: 'Modern Gradient', bg: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', accent: '#d63384', text: '#3a1a2a' },
  { id: 'floral-pastel', name: 'Floral Pastel', bg: '#fef5f0', accent: '#ff8fa3', text: '#4a2a3a' },
  { id: 'medical-clean', name: 'Medical Clean', bg: '#f4faf7', accent: '#2da88a', text: '#1a3a2a' },
  { id: 'luxury-gold', name: 'Luxury Gold', bg: '#1a1a1a', accent: '#d4af37', text: '#f5e6c8' },
  { id: 'dark-elegant', name: 'Dark Elegant', bg: '#1e1e2e', accent: '#a78bfa', text: '#e8e8f0' },
] as const;

export type ThankYouTemplateId = (typeof THANKYOU_TEMPLATES)[number]['id'];

export const FONT_OPTIONS = [
  { id: 'poppins', name: 'Poppins ExtraBold', family: "'Poppins', sans-serif", weight: 800 },
  { id: 'montserrat', name: 'Montserrat ExtraBold', family: "'Montserrat', sans-serif", weight: 800 },
  { id: 'outfit', name: 'Outfit', family: "'Outfit', sans-serif", weight: 700 },
  { id: 'league', name: 'League Spartan', family: "'League Spartan', sans-serif", weight: 700 },
  { id: 'bebas', name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", weight: 400 },
  { id: 'anton', name: 'Anton', family: "'Anton', sans-serif", weight: 400 },
  { id: 'fredoka', name: 'Fredoka', family: "'Fredoka', sans-serif", weight: 600 },
  { id: 'lilita', name: 'Lilita One', family: "'Lilita One', sans-serif", weight: 400 },
  { id: 'sora', name: 'Sora', family: "'Sora', sans-serif", weight: 700 },
  { id: 'playfair', name: 'Playfair Display Bold', family: "'Playfair Display', serif", weight: 700 },
] as const;

export type FontId = (typeof FONT_OPTIONS)[number]['id'];

export const COLOR_PRESETS = [
  { name: 'Soft Pink', value: '#fb5ea8' },
  { name: 'Lavender', value: '#9b7ed8' },
  { name: 'Baby Blue', value: '#5b9bd5' },
  { name: 'Mint', value: '#2da88a' },
  { name: 'Peach', value: '#ff9a6c' },
  { name: 'Pink', value: '#ff5e8a' },
  { name: 'Hitam', value: '#000000' },
  { name: 'Putih', value: '#ffffff' },
  { name: 'Royal Blue', value: '#1e3a8a' },
  { name: 'Emerald', value: '#059669' },
];

interface ThankYouPreviewProps {
  data: ThankYouData;
  style: ThankYouStyle;
  template: ThankYouTemplateId;
}

const ThankYouPreview = forwardRef<HTMLDivElement, ThankYouPreviewProps>(({ data, style, template }, ref) => {
  const tpl = THANKYOU_TEMPLATES.find((t) => t.id === template) ?? THANKYOU_TEMPLATES[0];
  const font = FONT_OPTIONS.find((f) => f.id === style.fontFamily) ?? FONT_OPTIONS[0];

  const textShadow = style.shadow ? '2px 2px 8px rgba(0,0,0,0.25)' : 'none';
  const textStroke = style.outline ? `1px ${tpl.id === 'luxury-gold' || tpl.id === 'dark-elegant' ? '#000' : '#fff'}` : 'none';
  const opacity = style.opacity / 100;

  const messageStyle: React.CSSProperties = {
    fontFamily: font.family,
    fontWeight: style.bold ? font.weight : 400,
    fontStyle: style.italic ? 'italic' : 'normal',
    fontSize: `${style.fontSize}px`,
    textAlign: style.align,
    letterSpacing: `${style.letterSpacing}px`,
    lineHeight: style.lineHeight,
    color: style.textColor,
    textShadow,
    WebkitTextStroke: textStroke,
    opacity,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  return (
    <div
      ref={ref}
      style={{
        width: 380,
        minHeight: 520,
        background: tpl.bg,
        padding: '36px 28px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: tpl.accent,
        }}
      />

      {/* Logo */}
      {data.logo && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img src={data.logo} alt="logo" style={{ maxHeight: 56, maxWidth: 140, objectFit: 'contain' }} />
        </div>
      )}

      {/* "Terima Kasih" heading */}
      <div
        style={{
          fontFamily: font.family,
          fontWeight: font.weight,
          fontSize: '30px',
          textAlign: 'center',
          color: tpl.accent,
          marginBottom: 6,
          letterSpacing: '-0.5px',
        }}
      >
        Terima Kasih
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{ width: 40, height: 3, background: tpl.accent, borderRadius: 999 }} />
      </div>

      {/* To */}
      {data.to && (
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: tpl.text, opacity: 0.6, marginBottom: 2, fontFamily: "'Poppins', sans-serif" }}>Kepada Yth.</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: tpl.text, fontFamily: "'Poppins', sans-serif" }}>{data.to}</div>
        </div>
      )}

      {/* Message */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
        <div style={messageStyle}>{data.message || 'Pesan ucapan akan tampil di sini.'}</div>
      </div>

      {/* From */}
      <div style={{ textAlign: 'center', marginTop: 18, paddingTop: 16, borderTop: `1px solid ${tpl.accent}40` }}>
        <div style={{ fontSize: 11, color: tpl.text, opacity: 0.6, marginBottom: 2, fontFamily: "'Poppins', sans-serif" }}>Dari,</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: tpl.accent, fontFamily: "'Poppins', sans-serif" }}>{data.from || '-'}</div>
        {data.role && (
          <div style={{ fontSize: 12, color: tpl.text, opacity: 0.75, marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{data.role}</div>
        )}
        {data.date && (
          <div style={{ fontSize: 11, color: tpl.text, opacity: 0.55, marginTop: 6, fontFamily: "'Poppins', sans-serif" }}>{formatDateID(data.date)}</div>
        )}
      </div>
    </div>
  );
});

ThankYouPreview.displayName = 'ThankYouPreview';
export default ThankYouPreview;
