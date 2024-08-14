import { create } from 'zustand';

// Define the type for the filter data
type FilterDataType = {
  searchId: string;
  currency: string;
};

// Define the state and actions for the store
type FilterDataState = {
  filterRequestData: FilterDataType;
  setFilterRequestData: (newFilterRequestData: FilterDataType) => void;
};

// Create the Zustand store
const useFilterRequestStore = create<FilterDataState>((set) => ({
  filterRequestData: {
    searchId: '',
    currency: ''
  },
  setFilterRequestData: (newFilterRequestData) => set({ filterRequestData: newFilterRequestData }),
}));

export default useFilterRequestStore;
