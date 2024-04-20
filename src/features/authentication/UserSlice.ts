/**
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../../app/store';
import { loginApi } from '../../app/api'; 
import { createAppSlice } from '../../app/createAppSlice';

// Action creator để thực hiện đăng nhập
export const loginAsync = createAsyncThunk(
  'user/login',
  async (userData: { username: string, password: string }, thunkAPI) => {
    try {
      // Gửi yêu cầu đăng nhập đến API và nhận token
      const response = await loginApi(userData);
      
      // Xử lý kết quả thành công, trả về token
      return response; // Giả sử API trả về token khi đăng nhập thành công
    } catch (error) {
      // Xử lý lỗi
      return thunkAPI.rejectWithValue(error); // Trả về lỗi và thông báo cho Redux Toolkit
    }
  }
);

// Slice để quản lý state của user
const userSlice = createAppSlice({
  name: 'user',
  initialState: {
    token: null as string | null, // Chỉ định kiểu dữ liệu cho token
    isLoading: false,
    error: null as string | null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token; // Lưu token vào state khi đăng nhập thành công
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Login Failed"; // Sử dụng thông điệp mặc định nếu không có lỗi được trả về từ API
      });
  }
});

export default userSlice.reducer;

// Action creators
export const { } = userSlice.actions;

// Selector để truy cập state user từ RootState
export const selectUser = (state: RootState) => state.user;
*/

import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { type LoginResponse } from "../../app/loginApi"
import axios from "axios"

// Định nghĩa kiểu dữ liệu cho một sản phẩm
export interface User {
  id: string
  email: string
  password: string
}

// Định nghĩa kiểu dữ liệu cho trạng thái của slice
export interface UserState {
  accessToken: string
  user: User
  isLoading: boolean
  error: string | null
}

// Trạng thái ban đầu của slice
const initialState = {
  accessToken: "",
  user: { id: "", email: "", password: "" },
  isLoading: false,
  error: null,
} satisfies UserState as UserState

// Action async để login lay token
export const authenticate = createAsyncThunk("auth/login", async () => {

  try {
    const response = await axios.post<LoginResponse>('https://backengine-on48.fly.dev/login', { email: "namvl@hotmail.com", password: "Conmeo123-", });
    console.log(JSON.stringify(response));
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to login: ' + error);
  }
})

// Tạo slice cho sản phẩm
export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action){
      //
      state.accessToken = "test"
    }
  },
  extraReducers: builder => {
    // Xử lý trạng thái pending khi authenticate được gọi
    builder
      .addCase(authenticate.pending, state => {
        state.isLoading = true
        state.error = null
      })
      // Xử lý trạng thái fulfilled khi authenticate hoàn thành thành công
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.accessToken = action.payload.accessToken

        
        //console.log("authenticate.fulfilled accessToken: "+ state.accessToken);
        
      })
      // Xử lý trạng thái rejected khi authenticate gặp lỗi
      .addCase(authenticate.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload + ""
      })
  },
})

// Export action creators và reducer của slice
export const {} = usersSlice.actions
export default usersSlice.reducer
