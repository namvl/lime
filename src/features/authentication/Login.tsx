import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { authenticate } from "./UserSlice"
import { type RootState } from "../../app/store"


export const Login = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state: RootState) => {        
        return state.users.accessToken
    } )
    //const productList = useAppSelector((state: RootState) => state.products.data)
    useEffect(() => {
        dispatch(authenticate())
      }, [dispatch])

    console.log(token);
    
    return(
        <>
            Login Page
        </>
    )
}