import { forwardRef } from 'react';
import { formatRupiah, formatDateID } from '../lib/download';

export type ServiceMode = 'pasien' | 'non-pasien';
export type ServiceCategory = '' | 'jaga-bayi' | 'jaga-anak' | 'jaga-lansia';

export const SERVICE_CATEGORIES: { id: Exclude<ServiceCategory, ''>; name: string }[] = [
  { id: 'jaga-bayi', name: 'Jaga Bayi' },
  { id: 'jaga-anak', name: 'Jaga Anak' },
  { id: 'jaga-lansia', name: 'Jaga Lansia' },
];

export const SERVICE_CATEGORY_LABEL: Record<Exclude<ServiceCategory, ''>, string> = {
  'jaga-bayi': 'Jaga Bayi',
  'jaga-anak': 'Jaga Anak',
  'jaga-lansia': 'Jaga Lansia',
};

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  serviceMode: ServiceMode;
  serviceCategory: ServiceCategory;
  ordererName: string;
  whatsappNumber: string;
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
  { id: 'skyblue', name: 'Sky Blue' },
  { id: 'elegant', name: 'Elegant Pink' },
  { id: 'modern', name: 'Modern Gradient' },
  { id: 'professional', name: 'Professional Blue' },
  { id: 'pastel', name: 'Soft Pastel' },
  { id: 'corporate-dark', name: 'Corporate Dark' },
  { id: 'navy-gold', name: 'Navy & Gold' },
  { id: 'sage-clean', name: 'Sage Clean' },
  { id: 'charcoal-executive', name: 'Charcoal Executive' },
  { id: 'royal-burgundy', name: 'Royal Burgundy' },
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
  skyblue: {
    bg: '#eef6fb',
    card: '#ffffff',
    headerBg: 'linear-gradient(135deg, #5ba8e8 0%, #3b82c4 100%)',
    headerText: '#ffffff',
    accent: '#2b7ac4',
    label: '#6a8caa',
    value: '#1a2e3a',
    border: '#cfe4f2',
    tableHead: '#e6f2fa',
    totalBg: '#2b7ac4',
    totalText: '#ffffff',
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
  'corporate-dark': {
    bg: '#1a1d24',
    card: '#252932',
    headerBg: '#0f1115',
    headerText: '#e8eaed',
    accent: '#5b9bd5',
    label: '#8b95a5',
    value: '#e8eaed',
    border: '#363b47',
    tableHead: '#1f2229',
    totalBg: '#5b9bd5',
    totalText: '#ffffff',
    fontFamily: "'Montserrat', sans-serif",
  },
  'navy-gold': {
    bg: '#f5f7fb',
    card: '#ffffff',
    headerBg: '#1a2e4a',
    headerText: '#f5e6c8',
    accent: '#c9a227',
    label: '#6a7a90',
    value: '#1a2e4a',
    border: '#e0e6f0',
    tableHead: '#f0f2f8',
    totalBg: '#c9a227',
    totalText: '#1a2e4a',
    fontFamily: "'Montserrat', sans-serif",
  },
  'sage-clean': {
    bg: '#f4f8f5',
    card: '#ffffff',
    headerBg: '#2d6a4f',
    headerText: '#e8f5ee',
    accent: '#2d6a4f',
    label: '#7a9085',
    value: '#1a2e22',
    border: '#dce8e0',
    tableHead: '#eef5f0',
    totalBg: '#2d6a4f',
    totalText: '#ffffff',
    fontFamily: "'Sora', sans-serif",
  },
  'charcoal-executive': {
    bg: '#f2f3f5',
    card: '#ffffff',
    headerBg: '#2b2d33',
    headerText: '#e8e8ec',
    accent: '#6c7180',
    label: '#9097a3',
    value: '#1a1c22',
    border: '#e0e2e6',
    tableHead: '#f4f5f7',
    totalBg: '#2b2d33',
    totalText: '#e8e8ec',
    fontFamily: "'Poppins', sans-serif",
  },
  'royal-burgundy': {
    bg: '#fbf6f7',
    card: '#ffffff',
    headerBg: '#5c1a2b',
    headerText: '#f8e8ec',
    accent: '#8a2a3d',
    label: '#a07080',
    value: '#3a1a22',
    border: '#f0d8de',
    tableHead: '#f8eef0',
    totalBg: '#5c1a2b',
    totalText: '#f8e8ec',
    fontFamily: "'Playfair Display', serif",
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
        position: 'relative',
      }}
    >
      {/* Watermark layer */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '180%',
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          gap: '36px 28px',
          transform: 'translate(-50%, -50%) rotate(-28deg)',
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 1,
              color: s.accent,
              opacity: 0.07,
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            Dampingcare
          </span>
        ))}
      </div>

      {/* Header */}
      <div
        style={{
          background: s.headerBg,
          color: s.headerText,
          padding: '26px 22px 22px',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            {data.logo && (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 3,
                }}
              >
                <img src={data.logo} alt="logo" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: '50%', position: 'relative', zIndex: 3 }} />
              </div>
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3, lineHeight: 1.1 }}>
                {data.logo ? 'Dampingcare' : 'Dampingcare'}
              </div>
              <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2, letterSpacing: 0.3 }}>
                {data.serviceMode === 'non-pasien' ? 'Invoice Layanan' : 'Invoice Pendampingan'}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1.2 }}>Invoice</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{data.invoiceNumber}</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{formatDateID(data.date)}</div>
          </div>
        </div>
      </div>

      {/* Accent strip */}
      <div style={{ height: 3, background: s.accent, position: 'relative', zIndex: 1 }} />

      {/* Body */}
      <div style={{ padding: '18px 22px', background: s.bg, position: 'relative', zIndex: 1 }}>
        {/* Orderer info */}
        <div
          style={{
            background: s.card,
            borderRadius: 14,
            padding: 14,
            border: `1px solid ${s.border}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 3, height: 12, background: s.accent, borderRadius: 2 }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Informasi Pemesan
            </div>
          </div>
          <Row label="Nama Pemesan" value={data.ordererName || '-'} s={s} />
          <Row label="No. WhatsApp" value={data.whatsappNumber || '-'} s={s} last />
        </div>

        {/* Patient/Client info */}
        <div
          style={{
            background: s.card,
            borderRadius: 14,
            padding: 14,
            border: `1px solid ${s.border}`,
            marginTop: 10,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 3, height: 12, background: s.accent, borderRadius: 2 }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              {data.serviceMode === 'non-pasien' ? 'Informasi Klien' : 'Informasi Pasien'}
            </div>
          </div>
          <Row label={data.serviceMode === 'non-pasien' ? 'Nama Klien' : 'Nama Pasien'} value={data.patientName || '-'} s={s} />
          <Row label={data.serviceMode === 'non-pasien' ? 'Jenis Layanan' : 'Pendampingan'} value={data.serviceMode === 'non-pasien' && data.serviceCategory ? SERVICE_CATEGORY_LABEL[data.serviceCategory] : (data.assistanceType || '-')} s={s} />
          <Row label={data.serviceMode === 'non-pasien' ? 'Lokasi / Alamat' : 'Rumah Sakit / Lokasi'} value={data.hospital || '-'} s={s} />
          <Row label="Nama Pendamping" value={data.companionName || '-'} s={s} />
          <Row label="Durasi" value={data.duration || '-'} s={s} last />
        </div>

        {/* Payment */}
        <div
          style={{
            background: s.card,
            borderRadius: 14,
            padding: 14,
            border: `1px solid ${s.border}`,
            marginTop: 10,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 3, height: 12, background: s.accent, borderRadius: 2 }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Informasi Pembayaran
            </div>
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
              alignItems: 'center',
              padding: '12px 14px',
              marginTop: 10,
              borderRadius: 10,
              background: s.totalBg,
              color: s.totalText,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>Sisa Pembayaran</span>
            <span style={{ fontSize: 16, fontWeight: 800 }}>{formatRupiah(remaining)}</span>
          </div>
        </div>

        {/* Status badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
          {data.paymentStatus === 'lunas' ? (
            <div
              style={{
                background: '#16a34a',
                color: '#fff',
                padding: '10px 28px',
                borderRadius: 999,
                fontSize: 15,
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
                fontSize: 15,
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
          <div
            style={{
              background: s.card,
              borderRadius: 14,
              padding: 14,
              border: `1px solid ${s.border}`,
              marginTop: 12,
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 3, height: 12, background: s.accent, borderRadius: 2 }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Keterangan
              </div>
            </div>
            <div style={{ fontSize: 12, color: s.value, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{data.notes}</div>
          </div>
        )}

        {/* Signature */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: s.label, marginBottom: 6 }}>Tanda Tangan</div>
            {data.signature ? (
              <img src={data.signature} alt="signature" style={{ height: 70, width: 150, objectFit: 'contain' }} />
            ) : (
              <div style={{ height: 70, width: 150, borderBottom: `1px solid ${s.border}` }} />
            )}
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>Rieke Devi Fiana</div>
            <div style={{ fontSize: 10, color: s.label, marginTop: 2 }}>(PJ Dampingcare)</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 16, paddingTop: 14, borderTop: `1px solid ${s.border}` }}>
          <div style={{ fontSize: 11, color: s.label }}>Terima kasih atas kepercayaan Anda.</div>
          <div style={{ fontSize: 10, color: s.label, marginTop: 2 }}>Dampingcare</div>
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
