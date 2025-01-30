import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import { userDetailReducer } from '../slices/userDetailSlice';
import  shippingReducer from '../slices/shippingSlice'
import orderReducer from '../slices/orderSlice'
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:cartReducer,
    userDetail:userDetailReducer,
    shipping:shippingReducer,
    order:orderReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
