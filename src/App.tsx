import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { About } from "./pages/About"
import { Home } from "./pages/Home"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
