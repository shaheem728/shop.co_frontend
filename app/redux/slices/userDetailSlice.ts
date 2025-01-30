import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {getAuthTokens ,isTokenExpired} from '@/utils/actions/auth'
import {API_URL} from '@/components/config'
export interface UserDetail {
    email: string;
    first_name:string;
    last_name:string;
    profile: { 
        mobile?:string;
        address: string;
        order_mobile:string;
    };
}
interface userDetailState {
    userInfo : UserDetail | null;
    status: 'idle' | 'loading' |'succeeded' | 'failed';
    error: string | null;
}
const initialState: userDetailState = {
    userInfo: null,
    status: 'idle',
    error:null,
}
export const fetchuserDetail = createAsyncThunk('userDetail/fetchuserDetail', async (id:number) => {
        const  token = await getAuthTokens()
        const response = await fetch(`${API_URL}/api/user/`+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token.access_token}`
            },
        });
        if (!response.ok) {
            isTokenExpired()
            throw new Error('Failed to fetch user details');
        }
        const data: UserDetail = await response.json(); // Ensure the data is of type User
        return data; // Return the fetched user data

    }
);
const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchuserDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchuserDetail.fulfilled, (state, action: PayloadAction<UserDetail>) => {
                state.status = "succeeded";
                state.userInfo = action.payload;
            })
            .addCase(fetchuserDetail.rejected, (state, action) => {
                state.status = "failed";
                if (action.error && typeof action.error.message === 'string') {
                    state.error = action.error.message;
                } else {
                    state.error = 'something went wrong';
                }
            });
    }
});
export const userDetailReducer = userDetailSlice.reducer;
