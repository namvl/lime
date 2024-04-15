import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { type RootState } from "../../app/store"
import Layout from "../../components/Layout"
import { fetchProducts } from "./ProductSlice"

export const ProductList = () => {
  const dispatch = useAppDispatch()
  const productList = useAppSelector((state: RootState) => state.products.data)
  const isLoading = useAppSelector(
    (state: RootState) => state.products.isLoading,
  )
  const error = useAppSelector((state: RootState) => state.products.error)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return <h1>... Loading</h1>
  }
  if (error != null) {
    return <h1>... Error</h1>
  }
  
  return (
    <Layout>
      <h1>Product List</h1>
      <ul>
        {productList.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </Layout>
  )
}
