
import "./App.css";
import { Footer } from "./components/layout/Footer.jsx";
import  Home  from "./components/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Headerr from "./components/layout/Headerr.jsx";
import Cart from "./components/Cart.jsx"
import  SignUp  from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import ProductDetails from "./components/productDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./features/user/userSlice.js";
import { useEffect } from "react";





function App() {
  
  const dispatch = useDispatch();
  const { loading, user, error, count } = useSelector((state) => state.user);
  console.log(user)


  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const isAuthenticated = Object.keys(user).length > 0 ? (true):(false)
  console.log(isAuthenticated)



  return (
    <Router>
        <Headerr/>
        <Routes> {/* Use <Routes> instead of <Router> */}
          <Route path="/" element={<Home/>} /> {/* Use 'element' prop instead of 'component' */}
          <Route path="/product/:id" element={<ProductDetails/>}/>
          {isAuthenticated ? (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element ={<Navigate to="/"/>}/>
          </>
        ) : (
          <>
            <Route path="/cart" element={<Navigate to="/login" />} />
          </>
        )}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element ={<Login/>}/>
    

        </Routes>
        <Footer />
    </Router>
  );
}



export default App;
