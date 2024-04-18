
import "./App.css";
import { Footer } from "./components/layout/Footer.jsx";
import { Home } from "./components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headerr from "./components/layout/Headerr.jsx";
import  ProductDetails  from "../src/components/ProductDetails.jsx"
import Cart from "./components/Cart.jsx"

function App() {
  return (
    <Router>
        <Headerr/>
        <Routes> {/* Use <Routes> instead of <Router> */}
          <Route path="/" element={<Home/>} /> {/* Use 'element' prop instead of 'component' */}
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
