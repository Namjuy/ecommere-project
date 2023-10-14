import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductList } from "../slices/productListSlice";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../styles/css/home.css";
import { Spin } from "antd";
import { useCheckLogin } from "../useCheckLogin";

export const Home = () => {
  useCheckLogin();
  
  const [loading, setLoading] = useState(false);
  const paginationStyle: string =
    "px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
 
  const [productsList, setProductsList] = useState([]);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // You can change this to the desired number of items per page

  // Calculate the range of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPage = Math.ceil(productsList.length / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //   get product from api
  async function loadProductList() {
    setLoading(true);
    try {
      const response = await dispatch(getProductList()).unwrap();

      setProductsList(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  // get list of products

  useEffect(() => {
    loadProductList();
  }, []);

  return (
    <>
      <Header />
      <div
        className="home relative overflow-hidden bg-cover bg-no-repeat bg-{50%} h-80 bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/17993841/pexels-photo-17993841/free-photo-of-d-ng-nhi-u-may-d-ng-ph-ph-ng-ti-n-cong-c-ng.jpeg")',
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 text-5xl font-bold">E-commerce</h1>
              <h3 className="mb-8 text-3xl font-bold">Choose your fashion</h3>
              {/* <button
                type="button"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Get started
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Spin spinning={loading} tip="Loading....">
        <div className="container mx-auto my-0">
          <div id="products">
            <div className="text-2xl text-center font-semibold my-[20px]">Clothes</div>

            <div className="products__list" id="products__list">
              {currentItems.map((item) => (
                <div className="products__item">
                  <small className="absolute top-0 left-0 bg-red-500 text-white inline-block py-1 px-2 rounded-br-lg">
                    Sale {item.sale}%
                  </small>
                  <div className="flex justify-center items-center hover:scale-115 transform transition-transform duration-400">
                    <a href="#" className="mb-30 block text-center h-224">
                      <img
                        className="h-[200px] inline-block"
                        src={item.productImage}
                        alt=""
                      />
                    </a>
                  </div>
                  <p>
                    <a href="#" className="products__title">
                      {item?.productName}
                    </a>
                  </p>
                  <p className="text-red-500 text-base">
                    <span>Cost: {item.price} đ</span>
                  </p>
                  <div className="text-orange-500 font-roboto-medium text-[13.5px]">
                    <span className="text-orange-500 font-roboto-medium text-[13.5px]">
                      Remain: {item.quantity}{" "}
                    </span>
                    <br />
                    <span className="inline-block ">
                      {" "}
                      Made from: {item.origin}{" "}
                    </span>
                  </div>
                  <br />
                  <Link to={`/products/${item.id}`}>
                    <button className="bg-sky-400 px-4 py-2 rounded-lg">
                      Detail
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <ul className="flex items-center -space-x-px h-8 text-smination justify-center">
          {Array.from({ length: totalPage }).map((_, index) => (
            <li
              key={index}
              onClick={() => changePage(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-blue-500 text-black"
                  : "bg-white text-gray-500"
              } ${paginationStyle}`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </Spin>

      <Footer />
    </>
  );
};
