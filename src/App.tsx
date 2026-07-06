import { useState } from 'react';
import { FileText, Mail } from 'lucide-react';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ThankYouCardGenerator from './pages/ThankYouCardGenerator';

type Tab = 'invoice' | 'thankyou';

export default function App() {
  const [tab, setTab] = useState<Tab>('invoice');

  return (
    <div className="app-shell">
      {/* Top bar */}
      <header className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: 'rgba(228,228,255,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white" style={{ background: '#FB5EA8', boxShadow: '0 4px 14px rgba(251,94,168,0.35)' }}>
              <FileText size={18} />
            </div>
            <div className="leading-tight">
              <div className="text-base font-extrabold text-gray-900">Dampingcare</div>
              <div className="text-[10px] text-gray-500 font-medium tracking-wide">DOCUMENT GENERATOR</div>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1.5 p-1.5 rounded-3xl bg-white/70" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <button
            className={`tab-btn ${tab === 'invoice' ? 'active' : ''}`}
            onClick={() => setTab('invoice')}
          >
            <FileText size={15} />
            <span>Invoice</span>
          </button>
          <button
            className={`tab-btn ${tab === 'thankyou' ? 'active' : ''}`}
            onClick={() => setTab('thankyou')}
          >
            <Mail size={15} />
            <span>Thank You Card</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 px-4 pb-6">
        <div key={tab} className="page-enter page-enter-active">
          {tab === 'invoice' ? <InvoiceGenerator /> : <ThankYouCardGenerator />}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-5 text-center">
        <p className="text-xs text-gray-400 font-medium">© 2026 Dampingcare. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
