import { useCallback, useContext, useEffect, useState } from "react";

import Header from "../component/Header";
import { Spin } from "antd";
import Footer from "../component/Footer";
import { updateProductList } from "../slices/productListSlice";
import { useDispatch } from "react-redux";
import { useCheckLogin } from "../useCheckLogin";
import "../styles/css/cart.css";
export const Cart = () => {
  useCheckLogin();
  const [resultArray, setResultArray] = useState([]);
  const [checkPayment, setCheckPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartLocalStorage = localStorage.getItem("cart");
  const cartObjectArray = JSON.parse(cartLocalStorage) || [];

  const getCartList = useCallback(() => {
    const uniqueItems = [];

    for (const item of cartObjectArray) {
      const existingItem = uniqueItems.find(
        (uniqueItem) => uniqueItem.id === item.id
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        uniqueItems.push({ ...item, count: 1 });
      }
    }
    return uniqueItems;
  }, [cartObjectArray]);

  const countTotal = useCallback((uniqueItems) => {
    let total = 0;
    for (const uniqueItem of uniqueItems) {
      total += uniqueItem.price * uniqueItem.count;
    }
    return total;
  }, []);

  useEffect(() => {
    const uniqueItems = getCartList();
    setResultArray(uniqueItems);
  }, [cartObjectArray, getCartList]);

  useEffect(() => {
    const total = countTotal(resultArray);
    setTotalPrice(total);
  }, [resultArray]);

  //click payment button
  function doPayment() {
    setLoading(true);
    const cloneResultArray = [...resultArray];

    cloneResultArray.map((item) => {
      updatedCart(item);

      // console.log(cloneItem, quantity);
    });
    localStorage.setItem("cart", JSON.stringify([]));

    setCheckPayment(true);
  }

  //edit produt to api
  async function updatedCart(item: any) {
    try {
      await dispatch(updateProductList(item)).unwrap();
      setLoading(false);
    } catch (error) {
      alert("something wrong");
    }
    // loadProductList();
  }

  //click increase product quantity
  function incrementQuantity(product: any) {
    console.log(product.count, product.quantity);
    if (product.count < product.quantity) {
      const updateCart = [...cartObjectArray, product];
      localStorage.setItem("cart", JSON.stringify(updateCart));
    } else {
      alert(
        "cart item quantity must equal or less than remain product quantity"
      );
    }
  }

  //click decrease product quantity
  function decrementQuantity(product: any) {
    const index = cartObjectArray.findIndex(
      (cartItem: any) => cartItem.id === product.id
    );
    if (index !== -1) {
      const updateCart = [...cartObjectArray];
      updateCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(updateCart));
    }
    localStorage.set("cart", JSON.stringify(cartObjectArray));
  }

  function deleteCartItem(id: number) {
    const updatedCart = cartObjectArray.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
  // useCheckLogin();
  return (
    <>
      <Header />
      <div className="container mx-auto my-10">
        <h2 className="text-2xl text-center font-semibold">Your Cart</h2>
      </div>

      <Spin spinning={loading} tip="Loading...">
        <div className="container mx-auto my-0">
          {cartObjectArray.length === 0 && checkPayment === false ? (
            <p className="text-2xl font-semibold my-4">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
          ) : (
            <div
              hidden={checkPayment}
              id="cart-container"
              className=" w-full mt-12 text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <div>
                {resultArray.map((uniqueItem) => (
                  <ul
                    key={uniqueItem.id}
                    className="list__item flex justify-center items-center flex-wrap"
                  >
                    <li className="product__image w-1/2">
                      <img
                        src={uniqueItem.productImage}
                        alt=""
                        className="w-[200px] h-[200px] object-cover"
                      />
                    </li>
                    <li className="product__detail w-4/12 ">
                      <div>
                        <strong>Name:</strong> {uniqueItem.productName}
                      </div>
                      <div >
                        <strong>Price:</strong>{" "}
                        {uniqueItem.price * uniqueItem.count}
                      </div>
                      <div >
                        <strong>Quantity:</strong>
                        <button
                          onClick={() => incrementQuantity(uniqueItem)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mr-2 ml-2"
                        >
                          +
                        </button>
                        {uniqueItem.count}
                        <button
                          onClick={() => decrementQuantity(uniqueItem)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full ml-2"
                        >
                          -
                        </button>
                        <button
                          onClick={() => deleteCartItem(uniqueItem.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  </ul>
                ))}
                <div className="">
                  <hr className="border-t-2 border-black mt-10" />
                  <div className="flex justify-between mb-5">
                    <span className="font-black font-base ml-[10%]">
                      Total: {totalPrice}
                    </span>
                    {cartObjectArray.length !== 0 && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-[15%]"
                        onClick={doPayment}
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {checkPayment && (
          <div className="container mx-auto mt-4">
            <div className="bg-green-200 border border-green-600 text-green-600 px-4 py-2 rounded-md">
              Thanh toán thành công
            </div>
          </div>
        )}
      </Spin>
      <Footer />
    </>
  );
};
