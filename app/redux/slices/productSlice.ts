import {API_URL} from '@/components/config'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Define the ProductImage interface
export interface ProductImage {
  color_name: string;
  images: {
    image: string;
  }[];
}
// Define the Product interface
export interface Product {
  id: number;
  discount:number;
  uuid: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: string;
  colors:ProductImage[];
  category: string;
  style: string;
  sizes:[];
}
// Define the Products state interface
interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number; 
  pages: number; 
}
// Initial state
const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  page: 1, 
  pages: 1, 
};
// fetch Products data
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({page = 1, search}: {page?: number, search: string | null}) => {
  const response = await axios.get(`${API_URL}/api/products/?page=${page}&search=${search}`);
  return response.data;
 
});
// Define the productsSlice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.products=[]
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products; 
        state.page = action.payload.page; 
        state.pages = action.payload.pages; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
export default productsSlice.reducer;
