import { motion } from 'framer-motion';
import { useCurrencyStore } from '../store/useCurrencyStore';
import { formatPercent } from '../utils/formatter'; 

export function SpreadControl() {
  const { userSpread, setUserSpread } = useCurrencyStore();

  return (
    <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <span className="text-slate-400 font-medium text-sm">Taxa Operacional</span>
        
        <motion.span 
          key={userSpread}
          initial={{ scale: 1.2, color: '#10b981' }}
          animate={{ scale: 1, color: '#f1f5f9' }}
          className="text-2xl font-mono font-bold"
        >
          {}
          {formatPercent(userSpread / 100)} 
        </motion.span>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={userSpread}
        onChange={(e) => setUserSpread(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
      />
      
      <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <span>Mínimo (0%)</span>
        <span className="text-emerald-500/50">Ajuste de Margem</span>
        <span>Máximo (10%)</span>
      </div>
    </div>
  );
}