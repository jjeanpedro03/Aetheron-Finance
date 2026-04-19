import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface HistoryData {
  date: string;
  price: number;
}

/**
@param pair 
 **/

export function useHistory(pair: string) {
  const [data, setData] = useState<HistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const rawData = await api.getHistory(pair);
        const formattedData = rawData.map((item: any) => ({
          date: new Date(parseInt(item.timestamp) * 1000).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short'
          }),

          price: parseFloat(item.bid)
        })).reverse(); 

        setData(formattedData);
      } catch (error) {
        console.error(`Erro ao carregar histórico de ${pair}:`, error);
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, [pair]); 

  return { data, isLoading };
}