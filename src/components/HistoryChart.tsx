import { useMemo } from 'react';
import { LineChart, Line, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { useHistory } from '../hooks/useHistory';
import { formatCurrency } from '../utils/formatter';
import { calculateFintechRate } from '../utils/finance';

interface HistoryChartProps {
  pair: string;
  spread: number;
  color?: string;
}

export function HistoryChart({ pair, spread, color = '#10b981' }: HistoryChartProps) {
  const { data, isLoading } = useHistory(pair);

  const { chartData, yDomain } = useMemo(() => {
    if (!data || data.length === 0) return { chartData: [], yDomain: [0, 0] };

    const prices = data.map(p => p.price);
    const minMarket = Math.min(...prices);
    const maxMarket = Math.max(...prices);

    const formatted = data.map((point: any, index: number) => {
      const rawDate = point.timestamp || point.date || point.dt || point.time;
      let labelTime = `Ponto ${index + 1}`;

      if (rawDate) {
        const dateObj = new Date(
          typeof rawDate === 'number' 
            ? (rawDate > 10000000000 ? rawDate : rawDate * 1000) 
            : rawDate
        );
        
        if (!isNaN(dateObj.getTime())) {
          labelTime = dateObj.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        }
      }
      
      const currentPrice = calculateFintechRate(point.price, spread);
      
      return {
        ...point,
        time: labelTime,
        yourPrice: currentPrice,
        highProjection: calculateFintechRate(maxMarket * 1.015, spread),
        lowProjection: calculateFintechRate(minMarket * 0.985, spread),
      };
    });

    const domain = [minMarket * 0.95, maxMarket * 1.05];

    return { chartData: formatted, yDomain: domain };
  }, [data, spread]);

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center font-mono text-[10px] text-slate-700 uppercase tracking-widest">
        Sincronizando_Dados...
      </div>
    );
  }

  return (
    <div className="h-[200px] w-full mt-4 flex items-center justify-center overflow-hidden">
      <LineChart 
        width={360} 
        height={180} 
        data={chartData} 
        margin={{ top: 5, right: 5, left: -60, bottom: 5 }}
      >
        {}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.2} />
        
        <XAxis dataKey="time" hide />
        <YAxis hide domain={yDomain} />
        
        <Tooltip 
          content={<CustomTooltip color={color} />} 
          cursor={{ stroke: '#334155', strokeWidth: 1 }} 
          isAnimationActive={false} 
        />

        {}
        <Line 
          type="monotone" 
          dataKey="highProjection" 
          stroke="#3b82f6" 
          strokeWidth={1} 
          strokeDasharray="5 5" 
          dot={false} 
          opacity={0.3}
          isAnimationActive={false}
        />

        {}
        <Line 
          type="monotone" 
          dataKey="lowProjection" 
          stroke="#ef4444" 
          strokeWidth={1} 
          strokeDasharray="5 5" 
          dot={false} 
          opacity={0.3}
          isAnimationActive={false}
        />

        {}
        <Line 
          key={`aetheron-line-${spread}`}
          type="monotone" 
          dataKey="yourPrice" 
          stroke={color} 
          strokeWidth={3} 
          dot={false}
          activeDot={{ r: 5, fill: color, stroke: '#020617', strokeWidth: 2 }}
          isAnimationActive={true}
          animationDuration={400}
        />
      </LineChart>
    </div>
  );
}

function CustomTooltip({ active, payload, color }: any) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-2xl backdrop-blur-md border-l-4" style={{ borderLeftColor: color }}>
        <p className="text-slate-500 text-[9px] font-mono uppercase mb-2 border-b border-slate-800 pb-1 tracking-wider">
          {item.time} • ANÁLISE AETHERON
        </p>
        <div className="space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-[10px] text-blue-400 font-mono">ALTA</span>
            <span className="text-[10px] text-blue-200 font-mono">{formatCurrency(item.highProjection)}</span>
          </div>
          <div className="flex justify-between gap-4 py-1">
            <span className="text-xs font-bold font-mono" style={{ color: color }}>TAXA</span>
            <span className="text-xs font-bold font-mono" style={{ color: color }}>{formatCurrency(payload[0].value)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[10px] text-red-400 font-mono">QUEDA</span>
            <span className="text-[10px] text-red-200 font-mono">{formatCurrency(item.lowProjection)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}