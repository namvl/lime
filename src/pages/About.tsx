//src/pages/About.tsx

import Layout from "../components/Layout"
import { useAppSelector } from "../app/hooks"
import { type RootState } from "../app/store"

export const About = () => {
 
  const token = useAppSelector((state: RootState) => state.users.accessToken)
  console.log(token);
  
  return (
    <Layout>
      <h1>This is about page</h1>
      <h3>{token}</h3>
    </Layout>
  )
}
