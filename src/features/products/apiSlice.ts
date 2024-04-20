import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { type RootState } from "../../app/store"


// Tạo một hàm fetchBaseQuery được tùy chỉnh để thêm accessToken vào header
const baseQuery =  fetchBaseQuery({
  baseUrl: "https://backengine-on48.fly.dev/",
  prepareHeaders: (headers, { getState }) => {
    
    const rootState = getState() as RootState
    const accessToken = rootState.users.accessToken

    if (accessToken) {
      // Thêm accessToken vào header
      headers.set("Authorization", `Bearer ${accessToken}`)
    }
    return headers
  },
})

// Tạo một API client với fetchBaseQuery được tùy chỉnh
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: builder => ({
    fetchProducts: builder.query<any, void>({
      query: () => "products",
    }),
  }),
})

export const { useFetchProductsQuery } = apiSlice
