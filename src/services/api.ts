const BASE_URL = 'https://economia.awesomeapi.com.br';

export const api = {
  getLiveRates: async (pairs: string) => {
    const response = await fetch(`${BASE_URL}/last/${pairs}`);
    if (!response.ok) throw new Error('Falha na API de cotações');
    return response.json();
  },

  getHistory: async (pair: string, days: number = 7) => {
    const response = await fetch(`${BASE_URL}/json/daily/${pair}/${days}`);
    if (!response.ok) throw new Error('Falha na API de histórico');
    return response.json();
  }
};