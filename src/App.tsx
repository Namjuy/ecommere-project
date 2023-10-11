import { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home";
import { Cart } from "./page/Cart";

import { ProductDetail } from "./page/ProductDetail";
// import Login from "./page/LoginPage";
import { loginSuccess } from "./slices/userLoginSlice";
import { Login, Register } from "./page/LoginPage";
import { ProductsTable } from "./page/AdminPage";
import { Account } from "./page/Account";


export const UserContext = createContext(null);
export const ProductContext = createContext(null);
export const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductsTable />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);

function App() {
  const [productCart, setProductCart] = useState([]);
console.log(1);

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("username");
    const passwordLocalStorage = localStorage.getItem("password");
    const idLocalStorage = localStorage.getItem("id");
    const roleLocalStorage = localStorage.getItem("role");
    const cartLocalStorage = localStorage.getItem("cart");
    if (userLocalStorage) {
      const cartArray = JSON.parse(cartLocalStorage);
      // set user from localstorage into reducer
      store.dispatch(
        loginSuccess({
          name: userLocalStorage,
          password: passwordLocalStorage,
          id: idLocalStorage,
          role: roleLocalStorage,
          cart: cartLocalStorage,
        })
      );
      if(cartArray === null){
        setProductCart([]);
      }
     
    }
  }, []);
  return (
    <ProductContext.Provider value={{ productCart, setProductCart }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ProductContext.Provider>
  );
}

export default App;
