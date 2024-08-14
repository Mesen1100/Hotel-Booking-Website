import {create} from 'zustand';

type Currency = {
  code: string;
  label: string;
};

type CurrencyState = {
  currencies: Currency[];
  selectedCurrency: string;
  setSelectedCurrency: (newCurrency: string) => void;
};

const useCurrencyStore = create<CurrencyState>((set) => ({
  currencies: [
   
    { code: 'EUR', label: 'Euro' },
    { code: 'GBP', label: 'British Pound' },
    { code: 'TRY', label: 'Turkish Lira' },
  ],
  selectedCurrency: 'EUR',
  setSelectedCurrency: (newCurrency: string) => set({ selectedCurrency: newCurrency }),
}));

export default useCurrencyStore;
