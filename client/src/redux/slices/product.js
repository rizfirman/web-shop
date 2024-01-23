import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggled: false,
  favorites: JSON.parse(localStorage.getItem('favorites')) ?? [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload.products;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setPagination: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.pagination = payload;
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
      // localStorage.setItem('favorites', JSON.stringify(payload));
    },
    setFavoritesToggled: (state, { payload }) => {
      state.favoritesToggled = payload;
    },
  },
});

export const { setLoading, setProducts, setError, setPagination, setFavorites, setFavoritesToggled } =
  productsSlice.actions;

export default productsSlice.reducer;

export const productSelector = (state) => state.products;
