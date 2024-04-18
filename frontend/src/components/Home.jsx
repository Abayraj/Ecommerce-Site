import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getallProducts } from "../features/product/productSlice";
import { DotLoader } from 'react-spinners'
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, count } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getallProducts());
  }, [dispatch]);
  console.log(loading, "productss");
  console.log(products,"productssss")

  const [sortedProducts, setSortedProducts] = useState([]); // State to hold sorted products
  useEffect(()=>{
    setSortedProducts(products);
  },[products])
  console.log(products)


  async function login() {
    try {
      const data = await axios.post("http://localhost:4000/api/v1/login", {
        name: "hemant34",
        email: "abayunni5@gmail.com",
        password: "abayraj",
      });
    } catch (error) {
      console.log(error);
    }
  }
  login();

  const sortProducts = (option) => {
    let sortedProducts = [...products];
    if (option === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
   
    
    setSortedProducts(sortedProducts);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    if(!selectedOption){
      setSortedProducts(products)
    }
    sortProducts(selectedOption);
  }

  return (
    <>
      {loading ? <div className="min-h-screen flex items-center justify-center ">
        <DotLoader color="#36d7b7" />
      </div> :
        <>
          <MetaData title={"Buy Best Products Online"} />
          <section className="text">
            <div className="container px-6 py-8 mx-auto">
              <div className="lg:flex lg:-mx-2">
                <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                  <a
                    href="#"
                    className="block font-medium  hover:underline"
                  >
                    Jackets & Coats
                  </a>
                  <a
                    href="#"
                    className="block font-medium  hover:underline"
                  >
                    Hoodies
                  </a>
                  <a
                    href="#"
                    className="block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    T-shirts & Vests
                  </a>
                  <a
                    href="#"
                    className="block font-medium  hover:underline"
                  >
                    Shirts
                  </a>
                  <a
                    href="#"
                    className="block font-medium  hover:underline"
                  >
                    Blazers & Suits
                  </a>
                  <a
                    href="#"
                    className="block font-medium text-gray-500hover:underline"
                  >
                    Jeans
                  </a>
                  <a
                    href="#"
                    className="block font-medium text-gray-500hover:underline"
                  >
                    Trousers
                  </a>
                  <a
                    href="#"
                    className="block font-medium  hover:underline"
                  >
                    Shorts
                  </a>
                  <a
                    href="#"
                    className="block font-medium hover:underline"
                  >
                    Underwear
                  </a>
                </div>


                <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
                  <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                    <p className="">{count} Items</p>
                    <div className="flex items-center">
                      <p className="">Sort</p>
                      <select className="font-mediumfocus:outline-none" onChange={handleSortChange}>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {sortedProducts && sortedProducts.map((product) => (
                      <div key={product._id} className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                        <img
                          className="object-cover w-full rounded-md h-72 xl:h-80"
                          src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                          alt="T-Shirt"
                        />
                        <h4 className="mt-2 text-lg font-medium ">
                          {product.name}
                        </h4>
                        <p className="text-blue-500">₹ {product.price}</p>

                        <Link to={`/product/${product._id}`} className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mx-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"

                          >
                            <path className="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          <span className="mx-1">view product</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      }

    </>
  );
};
