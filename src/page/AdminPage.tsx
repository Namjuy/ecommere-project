import { yupResolver } from "@hookform/resolvers/yup";
import { Drawer, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import {
  addProductItem,
  editProductItem,
  getProductList,
  removeProductItem,
} from "../slices/productListSlice";
import { inputStyle } from "../App";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useCheckLogin } from "../useCheckLogin";
export const searchStyle =
  " text-center mx-12 bg-gray-50 border border-black border-solid p-4 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

// Display product table
export const ProductsTable = () => {
  useCheckLogin();
  const searchRef = useRef(null);
  const [productsList, setProductsList] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const paginationStyle: string =
    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  ////////////////////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this to the desired number of items per page

  // Calculate the range of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPage = Math.ceil(productsList.length / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //////////////
  // const [productEdit, setProductEdit] = useState([]);

  const dispatch = useDispatch();

  async function searchProduct() {
    setLoading(true);
    const name = searchRef.current?.value;

    if (name.trim() !== "") {
      const findProduct = productsList.filter((product) =>
        product.productName.toLowerCase().includes(name.toLowerCase())
      );
      setProductsList(findProduct);
    } else {
      loadProductList();
    }
    setLoading(false);
  }

  //   get product from api
  async function loadProductList() {
    setLoading(true);
    try {
      const response = await dispatch(getProductList()).unwrap();
      setProductsList(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  // remove products from api
  async function removeProduct(id: number) {
    setLoading(true);
    try {
      await dispatch(removeProductItem(id)).unwrap();
      message.success("Remove product successful", 1);
      setLoading(false);
    } catch (e) {
      alert("something wrong");
    }
    loadProductList();
  }

  function removeProductChoosing() {
    setSelectedProduct(undefined);
  }

  const handleEditClick = (item: any) => {
    setSelectedProduct(item);
    setOpen(true);
  };
  //get list of products

  useEffect(() => {
    loadProductList();
  }, []);

  return (
    <>
      <Header />
      <Spin spinning={loading} tip="loading">
        <ProductDrawer
          product={selectedProduct}
          loadProductList={loadProductList}
          removeProductChoosing={removeProductChoosing}
          open={open} // Pass the open state to the ProductDrawer
          setOpen={setOpen} // Pass the setOpen function to the ProductDrawer
        />{" "}
        <div className="text-center">
          {" "}
          <input
            className={searchStyle}
            placeholder="Input product name here !!"
            ref={searchRef}
          />
          <button
            className="bg-sky-400 px-4 py-1 rounded-lg"
            onClick={searchProduct}
          >
            Tìm kiếm tên sản phẩm
          </button>
        </div>
        <table className="w-full mt-12 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-sky-400 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Sale</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Origin</th>
              <th className="px-6 py-3">Product Image</th>
              <th className="px-6 py-3 text-center" colSpan={3}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.productName}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.sale}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.origin}</td>
                <td className="px-6 py-4">{item.productImage}</td>
                <td className="px-6 py-4">
                  {" "}
                  <button>Details</button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => removeProduct(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ul className="flex items-center -space-x-px h-8 text-smination justify-center">
          {Array.from({ length: totalPage }).map((_, index) => (
            <li
              key={index}
              onClick={() => changePage(index + 1)}
              className={
                currentPage === index + 1
                  ? "active bg-blue-50 " + paginationStyle
                  : paginationStyle
              }
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

const ProductDrawer = ({
  product,
  loadProductList,
  removeProductChoosing,
  open, // Receive the open state from the parent component
  setOpen, // Receive the setOpen function from the parent component
}: {
  product?: object;
  loadProductList: () => void;
  removeProductChoosing: () => void;
  open: boolean; // Declare open as a boolean prop
  setOpen: (open: boolean) => void; // Declare setOpen as a function prop
}) => {
  const dispatch = useDispatch();
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  //check valid product input
  let productSchema = yup.object({
    productName: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().positive().required(),
    sale: yup.number().positive().required(),
    quantity: yup.number().positive().required(),
    origin: yup.string().required(),
    productImage: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    // defaultValues: { productName: "", description: "", price: 0, sale:0, quantity:0,origin:"",productImage:"" }
  });

  const showModal = () => {
    removeProductChoosing();
    setOpen(true);
  };

  const handleOK = (data: any) => {
    product ? editProduct(product.id, data) : addProduct(data);
  };
  const onClose = () => {
    removeProductChoosing();
    setOpen(false);
  };

  const chooseImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      setSelectedImageUrl(file);
    } else {
      setSelectedImageUrl("");
    }
  
  };

  //post products to api

  async function addProduct(productItem: any) {
    setLoading(true);
    try {
      const newProductItem = { ...productItem, productImage: selectedImageUrl };
      await dispatch(addProductItem(newProductItem)).unwrap();
      message.success("Add product successful", 1);
      onClose();
      reset();
      setLoading(false);
      loadProductList();
    } catch (e) {
      alert("something wrong");
    }
  }

  //edit produt to api
  async function editProduct(id: number, productItem: any) {
    setLoading(true);
    console.log(selectedImageUrl);

    try {
      const newProductItem = {
        id,
        ...productItem,
        productImage: selectedImageUrl,
      };

      await dispatch(editProductItem(newProductItem)).unwrap();
      message.success("Edit product successful", 1);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    onClose();
    removeProductChoosing();
    setSelectedImageUrl("");
    loadProductList();
  }

  // console.log(product);

  useEffect(() => {
    // console.log(product);

    if (product === undefined) {
      reset({
        productName: "",
        description: "",
        price: null,
        sale: null,
        quantity: null,
        origin: "",
        productImage: "",
      });
    } else {
      reset({
        productName: product.productName,
        description: product.description,
        price: product.price,
        sale: product.sale,
        quantity: product.quantity,
        origin: product.origin,
        productImage: product.productImage,
      });
    }
  }, [product]);

  return (
    <>
      <button
        className="bg-sky-400 px-4 py-1 rounded-r-lg mt-8 mr-80 "
        onClick={showModal}
      >
        Add new Product
      </button>
      {/* Drawer add product */}
      <Spin spinning={loading} tip="Loading">
        <Drawer
          title={product ? "Chinh sua san pham" : "Thêm mới sản phẩm"}
          placement="right"
          onClose={onClose}
          open={open}
          width="35%"
        >
          <form onSubmit={handleSubmit(handleOK)}>
            <label htmlFor="">Product Name:</label>
            <input className={inputStyle} {...register("productName")} />
            {errors.productName?.type === "required" && (
              <p style={{ color: "red" }}>Please input title!</p>
            )}
            <br />
            <label htmlFor="description">Description:</label>
            <input
              className={inputStyle}
              id="description"
              {...register("description")}
            />
            <p>{errors.description?.message}</p>
            <br />
            <label htmlFor="price">Price:</label>
            <input className={inputStyle} id="price" {...register("price")} />
            <p>{errors.price?.message}</p>
            <br />
            <label htmlFor="sale">Sale:</label>
            <input className={inputStyle} id="sale" {...register("sale")} />
            <p>{errors.sale?.message}</p>
            <br />
            <label htmlFor="quantity">Quantity:</label>
            <input
              className={inputStyle}
              id="quantity"
              {...register("quantity")}
            />
            <p>{errors.quantity?.message}</p>
            <br />
            <label htmlFor="origin">Origin:</label>
            <input className={inputStyle} id="origin" {...register("origin")} />
            <p>{errors.origin?.message}</p>
            <br />
            <div className="form__container">
              <label htmlFor="productImage">Ảnh sản phẩm</label>
              {/* <label className="btn-upload" htmlFor="productImg">
                Tải ảnh lên
              </label> */}
              <br />
              <input
                {...register("productImage")}
                type="file"
                id="productImg"
                onChange={chooseImage}
              />
              <br />
              <p>{errors.image?.message}</p>
              {/* <span id="product-image">{selectedImageUrl}</span>
              {selectedImageUrl &&  <p>{errors.image?.message}</p>} */}
            </div>
            <br />
            <button className="bg-sky-400 px-4 py-2 rounded-lg" type="submit">
              {product ? "Edit" : "Add"}
            </button>
            {/* Use type="submit" */}
          </form>
        </Drawer>
      </Spin>
    </>
  );
};
