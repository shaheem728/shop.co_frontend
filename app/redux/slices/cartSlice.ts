import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//Define the CartItem interface
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  size: string;
  color: string;
}
// Initial state
interface CartState {
  items: CartItem[];
}
// Helper function to load cart Items from localStorage
const loadCartFromLocalStorage = ()=> {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};
// Helper function to save cart Items to localStorage
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
};
const initialState: CartState = {
  items: typeof window !== "undefined" ? loadCartFromLocalStorage() : [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items); // Update localStorage
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items); // Update localStorage
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (
        productIndex !== -1 &&
        state.items[productIndex].quantity < state.items[productIndex].stock
      ) {
        state.items[productIndex].quantity += 1;
        saveCartToLocalStorage(state.items); // Update localStorage
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (productIndex !== -1) {
        if (state.items[productIndex].quantity > 1) {
          state.items[productIndex].quantity -= 1;
        } else {
          state.items.splice(productIndex, 1); // Remove item
        }
        saveCartToLocalStorage(state.items); // Update localStorage
      }
    },
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
