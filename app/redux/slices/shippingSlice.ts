import { createSlice } from "@reduxjs/toolkit";
// Define the Shipping interface
export interface Shipping {
  country: string;
  state: string;
  city: string;
  postalCode: string;
}
// Define the shipping state interface
interface ShippingState {
  items: Shipping;
}
// Helper function to load shipping address from localStorage
const loadShippingAddressFromLocalStorage = (): Shipping => {
  if (typeof window !== "undefined") {
    const storedShipping = localStorage.getItem("shippingAddress");
    return storedShipping ? JSON.parse(storedShipping) : {
      country: "",
      state: "",
      city: "",
      postalCode: "",
    };
  }
  // Return a default Shipping object if running on the server
  return {
    country: "",
    state: "",
    city: "",
    postalCode: "",
  };
};
// Helper function to save shipping address to localStorage
const saveShippingAddressToLocalStorage = (shippingAddress: Shipping) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  }
};
// Initial state
const initialState: ShippingState = {
  items: loadShippingAddressFromLocalStorage(),
};
// Create the shipping slice
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addShippingAddress(state, action) {
      state.items =action.payload;
      saveShippingAddressToLocalStorage(state.items);
    },
  },
});
// Export actions and reducer
export const { addShippingAddress } = shippingSlice.actions;
export default shippingSlice.reducer;
