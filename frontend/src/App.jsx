
import "./App.css";
import { Footer } from "./components/layout/Footer.jsx";
import  Home  from "./components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headerr from "./components/layout/Headerr.jsx";
import Cart from "./components/Cart.jsx"
import { SignUp } from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import ProductDetails from "./components/productDetails.jsx";


function App() {
  return (
    <Router>
        <Headerr/>
        <Routes> {/* Use <Routes> instead of <Router> */}
          <Route path="/" element={<Home/>} /> {/* Use 'element' prop instead of 'component' */}
          <Route path="/product/:id" element={<ProductDetails/>}/>

          <Route path="/cart" element={<Cart/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element ={<Login/>}/>
    

        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
