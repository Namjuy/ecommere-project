import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { useDispatch } from "react-redux";
import { getProductById } from "../slices/productListSlice";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useCheckLogin } from "../useCheckLogin";
export const ProductDetail = () => {
  useCheckLogin();
  const [product, setProduct] = useState();
  const params = useParams();
  const productId = params.productId;
  const dispatch = useDispatch();
  const cartLocalStorage = localStorage.getItem("cart");
  const cartObjectArray = JSON.parse(cartLocalStorage) || [];


  //add products to cart
  function addProductToCart(item: any) {
    const updateCart = [...cartObjectArray, item];
    localStorage.setItem("cart", JSON.stringify(updateCart));
    console.log(updateCart);
    
  }
  async function getProductDetail(productId: any) {
    try {
      const respone = await dispatch(getProductById(productId)).unwrap();
      setProduct(respone);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    getProductDetail(productId);
  }, []);


  return (
    <>
      <Header />

      <div className="container mx-auto my-10">
        <h2 className="text-2xl font-semibold">Products Detail Page</h2>
      </div>

      <main className="container bg-white mx-auto my-4 mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:order-2">
            {product && (
              <img
                src={product.productImage}
                alt="Product Image"
                className="md:float-right max-w-full h-auto"
              />
            )}
          </div>
          <div className="md:order-1">
            <div className="mb-4">
              <p className="text-xl font-semibold">Name:</p>
              <p>{product?.productName}</p>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">Description:</p>
              <p>{product?.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">Price:</p>
              <p>{product?.price}</p>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">Remain:</p>
              <p>{product?.quantity}</p>
            </div>
          </div>
        </div>
      </main>

      <div className="container max-auto flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => addProductToCart(product)}
        >
          Add to Cart
        </button>
      </div>

      <Footer />
    </>
  );
};
