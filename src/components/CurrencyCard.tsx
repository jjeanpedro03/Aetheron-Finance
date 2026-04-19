import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Loader2, CheckCircle2, History } from 'lucide-react';
import { calculateFintechRate } from '../utils/finance';
import { formatCurrency } from '../utils/formatter';
import { HistoryChart } from './HistoryChart';

interface Props {
  code: string;
  name: string;
  bid?: string;
  spread: number;
}

export function CurrencyCard({ code, name, bid, spread }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [trades, setTrades] = useState<number>(0);

  if (!bid) return <div className="h-64 bg-slate-900/40 animate-pulse rounded-2xl border border-slate-800/50" />;

  const marketPrice = parseFloat(bid);
  const finalPrice = calculateFintechRate(bid, spread);
  const pair = `${code}-BRL`;

  const handleTrade = async () => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setTrades(prev => prev + 1);
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-5 bg-slate-900/40 border transition-all duration-500 backdrop-blur-md rounded-2xl
        ${status === 'success' ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-slate-800 hover:border-slate-700'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-1">{name}</p>
          <h3 className="text-xl font-bold text-white tracking-tight font-mono">{code} / BRL</h3>
        </div>
        <div className="flex flex-col items-end">
          <TrendingUp className={`w-4 h-4 ${status === 'success' ? 'text-emerald-400' : 'text-slate-600'}`} />
          {trades > 0 && (
            <span className="text-[9px] text-emerald-500 font-mono mt-2 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <History size={10} /> {trades} {trades === 1 ? 'ORDEM' : 'ORDENS'}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-mono text-emerald-400 font-bold tracking-tighter">
          {formatCurrency(finalPrice)}
        </div>
        <p className="text-[10px] text-slate-500 uppercase font-medium mt-1">
          Spread: {spread}% | Mercado: {formatCurrency(marketPrice)}
        </p>
      </div>

      <div className="w-full mb-5 px-1">
        <HistoryChart pair={pair} spread={spread} />
      </div>

      <button 
        onClick={handleTrade}
        disabled={status !== 'idle'}
        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95
          ${status === 'success' 
            ? 'bg-emerald-500 text-slate-900' 
            : 'bg-slate-800 hover:bg-emerald-600 text-white'}
        `}
      >
        {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
        {status === 'success' && <CheckCircle2 size={14} />}
        {status === 'idle' && 'Negociar Ativo'}
        {status === 'loading' && 'Processando...'}
        {status === 'success' && 'Executada com Sucesso'}
        {status === 'idle' && <ArrowRight size={14} />}
      </button>
    </motion.div>
  );
}