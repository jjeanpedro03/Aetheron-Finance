import { useEffect } from 'react';
import { useCurrencyStore } from '../store/useCurrencyStore';

const API_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL';

export function useCurrency() {
  const { setRates, rates } = useCurrencyStore();

  const fetchRates = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRates(data);
    } catch (error) {
      console.error("Falha ao atualizar cotações. Usando cache.", error);
    }
  };

  useEffect(() => {
    fetchRates(); 
    const interval = setInterval(fetchRates, 30000); 
    return () => clearInterval(interval);
  }, []);

  return { rates };
}