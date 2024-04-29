import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getuserCartProducts } from '../features/cart/cartSlice';
import { DotLoader } from 'react-spinners';
import Popup from '../components/Popup/Popup'



const Cart = () => {


  const dispatch = useDispatch();
  const { loading, cart, error, count } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getuserCartProducts());
  }, [dispatch]);
  console.log(cart)
 


  const [quantity, setQuantity] = useState(1);
  const incrementQunatity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

  }
  return (
    <div className="bg-gray-100 pt-20">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center ">
        <DotLoader color="#36d7b7" />
      </div>
      ) : (
        <>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6   xl:px-0">
          {cart.map(item => (
            <div key={item._id} className="rounded-lg md:w-2/3">
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.productid.name}</h2>
                    <p className="mt-1 text-xs text-gray-700">{item.productid.price}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={decrementQuantity}> - </button>
                      <span className='p-2'>{item.quantity}</span>
                      <button className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={incrementQunatity} > + </button>
                    </div>
                    <div className="flex items-center space-x-10 w-full">
                      <p className="text-sm">{item.color}</p>
                    <Popup/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">$129.99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
              </div> 
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart
