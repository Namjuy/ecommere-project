import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const getProductList = createAsyncThunk(
  "productList/fetchProduct",
  async () => {
    const response = await api.get(`/Products`);

    return response.data;
  }
);
export const removeProductItem = createAsyncThunk(
  "productList/removeProduct",
  async (id) => {
    const response = await api.delete(`/Products/${id}`);
    return response.data;
  }
);

export const updateProductList = createAsyncThunk(
  "productList/updateProductQuantity",
  async (data) => {
    const cloneItem = { ...data };
    const cartQuantity = cloneItem.count;
    delete cloneItem.count;
    console.log(cloneItem, data.count);

    const response = await api.put(`/Products/${data.id}`, {
      productName: cloneItem.productName,
      description: cloneItem.description,
      price: cloneItem.price,
      sale: cloneItem.sale,
      quantity: cloneItem.quantity - cartQuantity,
      origin: cloneItem.origin,
      productImage: cloneItem.productImage,
    });

    console.log(cloneItem.quantity, cartQuantity);
    return response.data;
  }
);
export const addProductItem = createAsyncThunk(
  "productList/addProduct",
  async (data) => {
    const response = await api.post("/Products", {
      productName: data.productName,
      description: data.description,
      price: data.price,
      sale: data.sale,
      quantity: data.quantity,
      origin: data.origin,
      productImage: data.productImage,
    });

    return response.data;
  }
);
export const editProductItem = createAsyncThunk(
  "productList/editProduct",
  async (data) => {
    const response = await api.put(`/Products/${data.id}`, {
      productName: data.productName,
      description: data.description,
      price: data.price,
      sale: data.sale,
      quantity: data.quantity,
      origin: data.origin,
      productImage: data.productImage,
    });
   
    
  
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "productList/getProductById",
  async (data) => {
    const response = await api.get(`/Products/${data}`);
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: "productList",
  initialState: {
    value: [],
  },
  reducers: {
    paymentSuccess:()=>{
        localStorage.removeItem('cart');
    },
    
    
  },
  extraReducers(builder) {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(removeProductItem.fulfilled, (state, action) => {
        state.value = state.value.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(addProductItem.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(editProductItem.fulfilled, (state, action) => {
        state.value = state.value.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
        const productIndex = state.value.findIndex(
          (product) => product.id === action.payload.id
        );

        if (productIndex !== -1) {
          // Update the product at the found index
          state.value[productIndex] = action.payload;
        }
      })
      .addCase(updateProductList.fulfilled, (state, action) => {
        const productIndex = state.value.findIndex(
          (product) => product.id === action.payload.id
        );

        if (productIndex !== -1) {
          // Update the product at the found index
          state.value[productIndex] = action.payload;
        }
      });
  },
});
export const {paymentSuccess} = productListSlice.actions
export default productListSlice.reducer;
