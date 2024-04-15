import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { ProductList } from "./features/products/ProductList"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
