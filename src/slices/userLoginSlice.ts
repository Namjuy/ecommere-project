import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const login = createAsyncThunk("login", async (data) => {
  const response = await api.get(
    `/user?username=${data.username}&&password=${data.password}`
  );
  return response.data;
});
export const signUp = createAsyncThunk("user/addUser", async (data) => {
  const response = await api.post("/user", {
    username: data.username,
    password: data.password,
    email: data.email,
    phone: data.phone,
    role: 2,
  });
  return response.data;
});

export const updateUser = createAsyncThunk("user/update", async (data) => {
  const response = await api.put(`/user/${data.id}`, {
    username: data.username,
    password: data.password,
    email: data.email,
    phone: data.phone,
    role: 2,
  });
  return response.data;
});
export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    username: "",
    password: "",
    id: "",
    role: "",
    email: "",
    phone: "",
    isLoginSuccess: false,
    // loading: false,
    cart: [], ///new edit here
  },
  reducers: {
    showLoading: (state) => {
      // state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.phone = action.payload.phone;
      state.isLoginSuccess = true;
      state.cart = [];
    },
    logout: (state) => {
      state.isLoginSuccess = false;
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("cart");
      localStorage.removeItem("phone");
      localStorage.removeItem("email");

      // localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.username = action.payload[0].username;
          state.password = action.payload[0].password;
          state.id = action.payload[0].id;
          state.role = action.payload[0].role;
          state.email = action.payload[0].email;
          state.phone = action.payload[0].phone;
          state.isLoginSuccess = true;
          localStorage.setItem("username", action.payload[0].username);
          localStorage.setItem("password", action.payload[0].password);
          localStorage.setItem("id", action.payload[0].id);
          localStorage.setItem("role", action.payload[0].role);
          localStorage.setItem("phone", action.payload[0].phone);
          localStorage.setItem("email", action.payload[0].email);
        } else {
          state.isLoginSuccess = false;
        }
      })
      .addCase(signUp.fulfilled, (state, action) => {
        // state.username = action.payload.username;
        // state.password = action.payload.password;
        // state.id = action.payload.id;
        // state.role = action.payload.role;
        // state.isLoginSuccess = true;
        // state.cart = [];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.id = action.payload.id;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.isLoginSuccess = true;
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("password", action.payload.password);
        localStorage.setItem("id", action.payload.id);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("phone", action.payload.phone);
        localStorage.setItem("email", action.payload.email);
      });
  },
});

export const { loginSuccess, logout, showLoading } = userLoginSlice.actions;
export default userLoginSlice.reducer;
