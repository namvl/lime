// import { fetchProducts } from "./ProductSlice"
import { useAppSelector } from "../../app/hooks"
import { type RootState } from "../../app/store"
import { useFetchProductsQuery } from "./apiSlice"

export const ProductList = () => {
  //const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state: RootState) => state.users.isLoading)
  console.log(isLoading);
  
  const errorA = useAppSelector((state: RootState) => state.users.error)
  console.log(errorA);
  
  const {
    data: products,
    isFetching,
    isSuccess,
    error,
  } = useFetchProductsQuery()
  console.log(error)

  console.log(products)

  return (
    <>
      <h1>Product List</h1>
    </>
  )
  /*
  const isLoading = useAppSelector(
    (state: RootState) => state.products.isLoading,
  )
  const error = useAppSelector((state: RootState) => state.products.error)
  */
}
