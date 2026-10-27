import { useState, useRef } from 'react';
import { FileText, CreditCard, CheckCircle2, Clock, StickyNote, PenTool, Eye, Image as ImageIcon, Settings2, Heart } from 'lucide-react';
import LogoUploader from '../components/LogoUploader';
import SignaturePadInput from '../components/SignaturePadInput';
import DownloadButtons from '../components/DownloadButtons';
import InvoicePreview, { INVOICE_TEMPLATES, SERVICE_CATEGORIES, type InvoiceData, type InvoiceTemplateId, type ServiceMode, type ServiceCategory } from '../components/InvoicePreview';
import {
  formatRupiah,
  parseRupiahInput,
  todayISO,
  generateInvoiceNumber,
} from '../lib/download';

export default function InvoiceGenerator() {
  const [template, setTemplate] = useState<InvoiceTemplateId>('elegant');
  const [data, setData] = useState<InvoiceData>({
    invoiceNumber: generateInvoiceNumber(),
    date: todayISO(),
    serviceMode: 'pasien',
    serviceCategory: '',
    patientName: '',
    assistanceType: '',
    hospital: '',
    companionName: '',
    duration: '',
    totalAmount: 0,
    useDP: false,
    dpAmount: 0,
    paymentStatus: 'belum',
    notes: '',
    logo: '/cropped_circle_image_(1).png',
    signature: null,
  });
  const [totalInput, setTotalInput] = useState('');
  const [dpInput, setDpInput] = useState('');

  const previewRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const onTotalChange = (v: string) => {
    setTotalInput(v);
    update('totalAmount', parseRupiahInput(v));
  };

  const onDPChange = (v: string) => {
    setDpInput(v);
    update('dpAmount', parseRupiahInput(v));
  };

  const remaining = data.totalAmount - (data.useDP ? data.dpAmount : 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="text-center px-2 pt-2">
        <h1 className="text-xl font-extrabold text-gray-900 leading-tight">Invoice Generator Dampingcare</h1>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">Buat invoice profesional dengan cepat, lengkap, dan siap diunduh.</p>
      </div>

      {/* Service Mode */}
      <Section icon={<Heart size={16} />} title="Jenis Layanan">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            className={`toggle-pill ${data.serviceMode === 'pasien' ? 'active' : ''}`}
            onClick={() => update('serviceMode', 'pasien')}
          >
            Pendamping Pasien
          </button>
          <button
            className={`toggle-pill ${data.serviceMode === 'non-pasien' ? 'active' : ''}`}
            onClick={() => update('serviceMode', 'non-pasien')}
          >
            Non-Pasien
          </button>
        </div>
        {data.serviceMode === 'non-pasien' && (
          <div className="mt-3">
            <label className="field-label">Kategori Layanan</label>
            <div className="grid grid-cols-3 gap-2">
              {SERVICE_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className={`toggle-pill ${data.serviceCategory === c.id ? 'active' : ''}`}
                  onClick={() => update('serviceCategory', c.id as ServiceCategory)}
                  style={{ fontSize: 12 }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Template */}
      <Section icon={<Settings2 size={16} />} title="Template Invoice">
        <div className="grid grid-cols-2 gap-2.5">
          {INVOICE_TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`tpl-chip ${template === t.id ? 'active' : ''}`}
              onClick={() => setTemplate(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </Section>

      {/* Logo */}
      <Section icon={<ImageIcon size={16} />} title="Logo Bisnis">
        <LogoUploader logo={data.logo} onLogoChange={(v) => update('logo', v)} />
      </Section>

      {/* Data Invoice */}
      <Section icon={<FileText size={16} />} title="Data Invoice">
        <div className="flex flex-col gap-3">
          <div>
            <label className="field-label">Nomor Invoice</label>
            <input className="field-input" value={data.invoiceNumber} onChange={(e) => update('invoiceNumber', e.target.value)} />
          </div>
          <div>
            <label className="field-label">Tanggal</label>
            <input type="date" className="field-input" value={data.date} onChange={(e) => update('date', e.target.value)} />
          </div>
          <div>
            <label className="field-label">{data.serviceMode === 'non-pasien' ? 'Nama Klien' : 'Nama Pasien'}</label>
            <input className="field-input" value={data.patientName} onChange={(e) => update('patientName', e.target.value)} placeholder={data.serviceMode === 'non-pasien' ? 'Nama klien' : 'Nama pasien'} />
          </div>
          {data.serviceMode === 'pasien' && (
            <div>
              <label className="field-label">Pendampingan</label>
              <input className="field-input" value={data.assistanceType} onChange={(e) => update('assistanceType', e.target.value)} placeholder="Jenis pendampingan" />
            </div>
          )}
          <div>
            <label className="field-label">{data.serviceMode === 'non-pasien' ? 'Lokasi / Alamat' : 'Rumah Sakit / Lokasi'}</label>
            <input className="field-input" value={data.hospital} onChange={(e) => update('hospital', e.target.value)} placeholder={data.serviceMode === 'non-pasien' ? 'Lokasi / alamat' : 'Rumah sakit / lokasi'} />
          </div>
          <div>
            <label className="field-label">Nama Pendamping</label>
            <input className="field-input" value={data.companionName} onChange={(e) => update('companionName', e.target.value)} placeholder="Nama pendamping" />
          </div>
          <div>
            <label className="field-label">Durasi</label>
            <input className="field-input" value={data.duration} onChange={(e) => update('duration', e.target.value)} placeholder="Contoh: 8 jam" />
          </div>
        </div>
      </Section>

      {/* Payment */}
      <Section icon={<CreditCard size={16} />} title="Informasi Pembayaran">
        <div className="flex flex-col gap-3">
          <div>
            <label className="field-label">Total Tagihan</label>
            <input
              className="field-input"
              value={totalInput}
              onChange={(e) => onTotalChange(e.target.value)}
              placeholder="Rp 0"
              inputMode="numeric"
            />
          </div>

          <div>
            <label className="field-label">DP</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button className={`toggle-pill ${!data.useDP ? 'active' : ''}`} onClick={() => update('useDP', false)}>
                Tidak DP
              </button>
              <button className={`toggle-pill ${data.useDP ? 'active' : ''}`} onClick={() => update('useDP', true)}>
                Menggunakan DP
              </button>
            </div>
          </div>

          {data.useDP && (
            <div>
              <label className="field-label">Nominal DP</label>
              <input
                className="field-input"
                value={dpInput}
                onChange={(e) => onDPChange(e.target.value)}
                placeholder="Rp 0"
                inputMode="numeric"
              />
            </div>
          )}

          <div className="rounded-2xl bg-damping-primary/8 p-3.5 flex flex-col gap-1" style={{ background: 'rgba(251,94,168,0.08)' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Sisa Pembayaran</span>
              <span className="text-base font-extrabold text-damping-primary">{formatRupiah(remaining)}</span>
            </div>
            {!data.useDP && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">DP</span>
                <span className="text-xs font-semibold text-gray-400">Tidak Ada</span>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Status */}
      <Section icon={<CheckCircle2 size={16} />} title="Status Pembayaran">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            className={`toggle-pill flex items-center justify-center gap-1.5 ${data.paymentStatus === 'lunas' ? 'active' : ''}`}
            onClick={() => update('paymentStatus', 'lunas')}
            style={data.paymentStatus === 'lunas' ? { borderColor: '#16a34a', color: '#16a34a', background: 'rgba(22,163,74,0.08)' } : {}}
          >
            <CheckCircle2 size={15} />
            <span>Lunas</span>
          </button>
          <button
            className={`toggle-pill flex items-center justify-center gap-1.5 ${data.paymentStatus === 'belum' ? 'active' : ''}`}
            onClick={() => update('paymentStatus', 'belum')}
            style={data.paymentStatus === 'belum' ? { borderColor: '#dc2626', color: '#dc2626', background: 'rgba(220,38,38,0.08)' } : {}}
          >
            <Clock size={15} />
            <span>Belum Lunas</span>
          </button>
        </div>
        <div className="flex justify-center mt-3">
          {data.paymentStatus === 'lunas' ? (
            <span className="px-5 py-2 rounded-full text-sm font-extrabold text-white tracking-wider" style={{ background: '#16a34a' }}>
              LUNAS
            </span>
          ) : (
            <span className="px-5 py-2 rounded-full text-sm font-extrabold text-white tracking-wider" style={{ background: '#dc2626' }}>
              BELUM LUNAS
            </span>
          )}
        </div>
      </Section>

      {/* Notes */}
      <Section icon={<StickyNote size={16} />} title="Keterangan (Opsional)">
        <textarea
          className="field-input"
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Keterangan tambahan (opsional)"
        />
      </Section>

      {/* Signature */}
      <Section icon={<PenTool size={16} />} title="Tanda Tangan">
        <SignaturePadInput onSave={(v) => update('signature', v)} />
      </Section>

      {/* Preview */}
      <Section icon={<Eye size={16} />} title="Preview">
        <div className="flex justify-center overflow-x-auto pb-2">
          <div style={{ width: 380, flexShrink: 0 }} className="rounded-2xl overflow-hidden soft-shadow-lg">
            <InvoicePreview ref={previewRef} data={data} template={template} />
          </div>
        </div>
      </Section>

      {/* Download */}
      <Section icon={<FileText size={16} />} title="Download">
        <DownloadButtons
          getTarget={() => previewRef.current}
          baseFilename={`Invoice_Dampingcare_${data.invoiceNumber}`}
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
