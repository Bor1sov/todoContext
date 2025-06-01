import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    searchTerm: '',
    sortAlphabetically: false,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleSort: (state) => {
      state.sortAlphabetically = !state.sortAlphabetically;
    },
  },
});

export const { setSearchTerm, toggleSort } = uiSlice.actions;
export default uiSlice.reducer;