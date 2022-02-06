import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  quotes: [],
  selectedQuote: undefined,
  loading: false,
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuotes(state, action) {
      state.quotes = action.payload;
    },
    setSelectedQuote(state, action) {
      state.selectedQuote = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const store = configureStore({
  reducer: quotesSlice.reducer,
});

export const quotesActions = quotesSlice.actions;

export default store;
