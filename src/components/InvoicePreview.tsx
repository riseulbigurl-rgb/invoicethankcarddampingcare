import { forwardRef } from 'react';
import { formatRupiah, formatDateID } from '../lib/download';

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  patientName: string;
  assistanceType: string;
  hospital: string;
  companionName: string;
  duration: string;
  totalAmount: number;
  useDP: boolean;
  dpAmount: number;
  paymentStatus: 'lunas' | 'belum';
  notes: string;
  logo: string | null;
  signature: string | null;
}

export const INVOICE_TEMPLATES = [
  { id: 'minimal', name: 'Minimalis Putih' },
  { id: 'elegant', name: 'Elegant Pink' },
  { id: 'modern', name: 'Modern Gradient' },
  { id: 'professional', name: 'Professional Blue' },
  { id: 'pastel', name: 'Soft Pastel' },
] as const;

export type InvoiceTemplateId = (typeof INVOICE_TEMPLATES)[number]['id'];

interface InvoicePreviewProps {
  data: InvoiceData;
  template: InvoiceTemplateId;
}

const TPL_STYLES: Record<InvoiceTemplateId, {
  bg: string;
  card: string;
  headerBg: string;
  headerText: string;
  accent: string;
  label: string;
  value: string;
  border: string;
  tableHead: string;
  totalBg: string;
  totalText: string;
  fontFamily: string;
}> = {
  minimal: {
    bg: '#ffffff',
    card: '#ffffff',
    headerBg: '#ffffff',
    headerText: '#111111',
    accent: '#111111',
    label: '#888888',
    value: '#111111',
    border: '#eeeeee',
    tableHead: '#f7f7f7',
    totalBg: '#f7f7f7',
    totalText: '#111111',
    fontFamily: "'Poppins', sans-serif",
  },
  elegant: {
    bg: '#fff5f8',
    card: '#ffffff',
    headerBg: '#fb5ea8',
    headerText: '#ffffff',
    accent: '#fb5ea8',
    label: '#b0708a',
    value: '#2a1a25',
    border: '#f5d8e4',
    tableHead: '#fff0f6',
    totalBg: '#fb5ea8',
    totalText: '#ffffff',
    fontFamily: "'Poppins', sans-serif",
  },
  modern: {
    bg: '#f0f4ff',
    card: '#ffffff',
    headerBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    headerText: '#ffffff',
    accent: '#667eea',
    label: '#7a8aaa',
    value: '#1a1a2e',
    border: '#e0e6f5',
    tableHead: '#f0f4ff',
    totalBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    totalText: '#ffffff',
    fontFamily: "'Sora', sans-serif",
  },
  professional: {
    bg: '#f4f8fb',
    card: '#ffffff',
    headerBg: '#1e4d72',
    headerText: '#ffffff',
    accent: '#1e4d72',
    label: '#6a8caa',
    value: '#1a2a3a',
    border: '#dce8f0',
    tableHead: '#eef4f9',
    totalBg: '#1e4d72',
    totalText: '#ffffff',
    fontFamily: "'Montserrat', sans-serif",
  },
  pastel: {
    bg: '#fef9f0',
    card: '#ffffff',
    headerBg: '#ffd6a5',
    headerText: '#5a3a1a',
    accent: '#ff9a6c',
    label: '#b89878',
    value: '#3a2a1a',
    border: '#f5e8d5',
    tableHead: '#fff5e8',
    totalBg: '#ffd6a5',
    totalText: '#5a3a1a',
    fontFamily: "'Fredoka', sans-serif",
  },
};

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data, template }, ref) => {
  const s = TPL_STYLES[template];
  const remaining = data.totalAmount - (data.useDP ? data.dpAmount : 0);

  return (
    <div
      ref={ref}
      style={{
        width: 380,
        background: s.bg,
        fontFamily: s.fontFamily,
        color: s.value,
        padding: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: s.headerBg,
          color: s.headerText,
          padding: '24px 22px',
          borderRadius: 0,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {data.logo ? (
              <img src={data.logo} alt="logo" style={{ maxHeight: 52, maxWidth: 140, objectFit: 'contain', marginBottom: 10, display: 'block' }} />
            ) : (
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Dampingcare</div>
            )}
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Invoice Pendampingan</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1 }}>Invoice</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{data.invoiceNumber}</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{formatDateID(data.date)}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px', background: s.bg }}>
        {/* Patient info */}
        <div style={{ background: s.card, borderRadius: 14, padding: 16, border: `1px solid ${s.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
            Informasi Pasien
          </div>
          <Row label="Nama Pasien" value={data.patientName || '-'} s={s} />
          <Row label="Pendampingan" value={data.assistanceType || '-'} s={s} />
          <Row label="Rumah Sakit / Lokasi" value={data.hospital || '-'} s={s} />
          <Row label="Nama Pendamping" value={data.companionName || '-'} s={s} />
          <Row label="Durasi Pendampingan" value={data.duration || '-'} s={s} last />
        </div>

        {/* Payment */}
        <div style={{ background: s.card, borderRadius: 14, padding: 16, border: `1px solid ${s.border}`, marginTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
            Informasi Pembayaran
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${s.border}` }}>
            <span style={{ fontSize: 12, color: s.label }}>Total Tagihan</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{formatRupiah(data.totalAmount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${s.border}` }}>
            <span style={{ fontSize: 12, color: s.label }}>DP</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              {data.useDP ? formatRupiah(data.dpAmount) : 'Tidak Ada'}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 14px',
              marginTop: 10,
              borderRadius: 10,
              background: s.totalBg,
              color: s.totalText,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>Sisa Pembayaran</span>
            <span style={{ fontSize: 15, fontWeight: 800 }}>{formatRupiah(remaining)}</span>
          </div>
        </div>

        {/* Status badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          {data.paymentStatus === 'lunas' ? (
            <div
              style={{
                background: '#16a34a',
                color: '#fff',
                padding: '10px 28px',
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1.5,
                boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
              }}
            >
              LUNAS
            </div>
          ) : (
            <div
              style={{
                background: '#dc2626',
                color: '#fff',
                padding: '10px 28px',
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1.5,
                boxShadow: '0 4px 14px rgba(220,38,38,0.3)',
              }}
            >
              BELUM LUNAS
            </div>
          )}
        </div>

        {/* Notes */}
        {data.notes && data.notes.trim() && (
          <div style={{ background: s.card, borderRadius: 14, padding: 16, border: `1px solid ${s.border}`, marginTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
              Keterangan
            </div>
            <div style={{ fontSize: 12, color: s.value, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{data.notes}</div>
          </div>
        )}

        {/* Signature */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: s.label, marginBottom: 6 }}>Tanda Tangan</div>
            {data.signature ? (
              <img src={data.signature} alt="signature" style={{ height: 70, width: 150, objectFit: 'contain' }} />
            ) : (
              <div style={{ height: 70, width: 150, borderBottom: `1px solid ${s.border}` }} />
            )}
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{data.companionName || 'Pendamping'}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 18, paddingTop: 14, borderTop: `1px solid ${s.border}` }}>
          <div style={{ fontSize: 11, color: s.label }}>Terima kasih atas kepercayaan Anda.</div>
          <div style={{ fontSize: 10, color: s.label, marginTop: 2 }}>Dampingcare · Pendampingan Medis Profesional</div>
        </div>
      </div>
    </div>
  );
});

function Row({ label, value, s, last }: { label: string; value: string; s: any; last?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
        padding: '7px 0',
        borderBottom: last ? 'none' : `1px solid ${s.border}`,
      }}
    >
      <span style={{ fontSize: 12, color: s.label, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: s.value, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

InvoicePreview.displayName = 'InvoicePreview';
export default InvoicePreview;
