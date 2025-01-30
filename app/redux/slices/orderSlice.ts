import { API_URL } from "@/components/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAuthTokens} from '@/utils/actions/auth'
import axios from "axios";
// Define the Order interface
export interface Order {
  uuid: string;
  totalPrice: number;
  isDelivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
  isPaid: boolean;
  paidAt: string | null;
  order_items: [
    {
      name: string;
      quantity: number;
      price: number;
      image: string;
      order: string;
      product: number;
    }
  ];
}
// Define the Order state interface
interface OrderState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
// Initial state
const initialState: OrderState = {
  orders: [],
  status: "idle",
  error: null,
};
//  fetch Order Details
export const fetchOrdrDetail = createAsyncThunk(
  "order/fetchOrdrDetail",
  async (id: string) => {
    const {access_token} = await getAuthTokens()
    const response = await axios.get(`${API_URL}/api/ordersItem/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdrDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdrDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdrDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});
export default orderSlice.reducer;
