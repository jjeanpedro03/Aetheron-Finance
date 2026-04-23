import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CurrencyState {
  rates: Record<string, any>;
  userSpread: number;
  setRates: (rates: any) => void;
  setUserSpread: (spread: number) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      rates: {},
      userSpread: 2.5,
      setRates: (rates) => set({ rates }),
      setUserSpread: (userSpread) => set({ userSpread }),
    }),
    {
      name: 'aetheron-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);