import { setLoading, setProducts, setError, setPagination, setFavorites, setFavoritesToggled } from '../slices/product';
import axios from 'axios';

export const getProducts = (page, favoriteToggle) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`/api/products/${page}/${10}`);
    const { products, pagination } = data;
    dispatch(setProducts({ products }));
   await dispatch(setPagination({ pagination }));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.'
      )
    );
  }
};


export const addToFavorites = (id) => async (dispatch, getState) => {
  const { product: { favorites } } = getState();

  const newFavorites = [...favorites, id];
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
}

export const removeFromFavorites = (id) => async (dispatch, getState) => {
  const { product: { favorites } } = getState();

  const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
}
export const toggleFavorites = (toggle) => async (dispatch, getState) => {
  const { product: { favorites, products } } = getState();

  if(toggle){
    const filteredProducts = products.filter((product) => favorites.includes(product._id));
    dispatch(setFavoritesToggled(toggle));
    dispatch(setProducts({ products: filteredProducts }));
  }else{
    dispatch(setFavoritesToggled(false));
    dispatch(getProducts(1));
  }

}
