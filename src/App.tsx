import { CurrencyCard } from './components/CurrencyCard';
import { SpreadControl } from './components/SpreadControl';
import { useCurrency } from './hooks/useCurrency';
import { useCurrencyStore } from './store/useCurrencyStore';
import { LayoutGrid, RefreshCw, Activity, Globe, ShieldCheck } from 'lucide-react';

const ASSETS = [
  { code: 'USD', name: 'Dólar Americano' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Libra Esterlina' },
  { code: 'BTC', name: 'Bitcoin' },
];

export default function App() {
  const { rates } = useCurrency();
  const { userSpread } = useCurrencyStore();

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 p-8 lg:p-12 selection:bg-emerald-500/30">
      <div className="max-w-[1800px] mx-auto">
        
        <header className="flex justify-between items-center mb-16 border-b border-slate-800 pb-12">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <LayoutGrid className="text-emerald-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-white uppercase leading-none">Aetheron Finance</h1>
              <p className="text-slate-500 text-[10px] font-mono tracking-[0.6em] uppercase mt-3">Quantum Terminal v4</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end font-mono text-[10px]">
              <span className="text-emerald-500 font-bold flex items-center gap-2">
                <ShieldCheck size={14} /> ENCRYPTED_NODE
              </span>
              <span className="text-slate-600">STABILITY_LOCKED</span>
            </div>
            <RefreshCw size={24} className="animate-spin text-emerald-500" style={{ animationDuration: '5s' }} />
          </div>
        </header>

        <main className="flex flex-col xl:flex-row gap-20">
          <aside className="w-full xl:w-80 shrink-0">
            <div className="flex items-center gap-3 text-slate-500 uppercase text-[10px] font-black tracking-widest mb-8 border-l-2 border-emerald-500 pl-4">
              <Activity size={16} /> <span>Margin Engine</span>
            </div>
            <SpreadControl />
          </aside>

          <section className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-10 text-slate-500 uppercase text-[10px] font-black tracking-widest border-l-2 border-slate-800 pl-4">
              <Globe size={16} /> <span>Real-Time Assets</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {ASSETS.map((asset) => (
                <CurrencyCard
                  key={asset.code}
                  code={asset.code}
                  name={asset.name}
                  spread={userSpread}
                  bid={rates[`${asset.code}BRL`]?.bid}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}