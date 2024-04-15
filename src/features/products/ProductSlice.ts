import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

// Định nghĩa kiểu dữ liệu cho một sản phẩm
export interface Product {
  id: string
  name: string
  year: number
  color: string
  pantone_value: string
}

// Định nghĩa kiểu dữ liệu cho trạng thái của slice
export interface ProductsState {
  data: Product[],
  isLoading: boolean,
  error: string | null
} 

// Trạng thái ban đầu của slice
const initialState = {
  data: [],
  isLoading: false,
  error: null
} satisfies ProductsState as ProductsState

// Action async để lấy danh sách sản phẩm từ API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://reqres.in/api/products/')
    return (await response.json())
  }
)

// Tạo slice cho sản phẩm
export const productsSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý trạng thái pending khi fetchProducts được gọi
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    // Xử lý trạng thái fulfilled khi fetchProducts hoàn thành thành công
    .addCase(fetchProducts.fulfilled, (state, action) => {      
      state.isLoading = false
      state.error = null
      state.data = action.payload["data"]
    })
    // Xử lý trạng thái rejected khi fetchProducts gặp lỗi
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload + ""
    })
  },
})

// Export action creators và reducer của slice
export const { } = productsSlice.actions;
export default productsSlice.reducer;
