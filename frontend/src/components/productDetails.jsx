import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singleproductDetails } from '../features/product/productSlice';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleproductDetails(id));
  }, [dispatch, id]);

  const { loading, products, error, count } = useSelector((state) => state.products);

  const [selectedImage, setSelectedImage] = useState(1);

  const handleChangeImage = (index) => {
    setSelectedImage(index);
  };

  return (
    <div>
      {products && products.map((product) => (
        <div key={product.id}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <span className="text-5xl">{selectedImage}</span>
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div className="flex-1 px-2" key={i}>
                      <button
                        onClick={() => handleChangeImage(i)}
                        className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${selectedImage === i ? 'ring-2 ring-indigo-300 ring-inset' : ''
                          }`}
                      >
                        <span className="text-2xl">{i}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.name}</h2>
                <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">ABC Company</a></p>

                <div className="flex items-center space-x-4 my-4">
                  <div>
                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                      <span className="text-indigo-400 mr-1 mt-1">₹</span>
                      <span className="font-bold text-indigo-600 text-3xl">{product.price}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    {product.stock > 0 ? (
                      <>
                        <p className="text-green-500 text-xl font-semibold">In stock</p>
                        <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                      </>
                    ) : (
                      <p className="text-red-500 text-xl font-semibold">Out of stock</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-500">{product.description}</p>
                {product.stock > 0 ? (
                  <>
                    <div className="flex py-4 space-x-4">
                      <div className="relative">
                        <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
                        <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                      <div>
                        {product.colors && product.colors.length > 0 && (
                          <>
                            <div className="relative">
                              <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Color</div>
                              <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                {product.colors.map((color, index) => (
                                  <option key={index}>{color}</option>
                                ))}
                              </select>
                              <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        {product.size && product.size.length > 0 && (
                          <>
                            <div className="relative">
                              <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">size</div>
                              <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                {product.colors.map((size, index) => (
                                  <option key={index}>{size}</option>
                                ))}
                              </select>
                              <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>

                      <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-gray-800  hover:bg-gray-700 text-white">
                        Add to Cart
                      </button>
                    </div>
                  </>
                ) : <h1 className='pt-5 text-red-500'>not avilable now</h1>}

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;

