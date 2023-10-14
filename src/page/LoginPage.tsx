import { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../slices/userLoginSlice.ts";
import logo from "../assets/image/logo.png";
import { inputStyle } from "../App.tsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spin, message } from "antd";

export const Login = () => {
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const roleLocalStorage = Number(localStorage.getItem("role"));
  const { isLoginSuccess } = useSelector((state) => state.userLogin);

  async function loginClick() {
    const username = nameRef.current?.value;
    const password = passRef.current?.value;
    setLoading(true);
    try {
      const res = await dispatch(login({ username, password })).unwrap();
      if (res.length == 0) {
        message.error("login failed");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isLoginSuccess) {
      if (roleLocalStorage === 1) {
        navigate("/products");
      } else navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoginSuccess]);

  return (
    <>
      <Spin spinning={loading} tip="Loging....">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
            E-commerce
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={inputStyle}
                  ref={nameRef}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={inputStyle}
                  ref={passRef}
                />
              </div>
              <button
                type="submit"
                onClick={loginClick}
                className="bg-sky-400 px-4 py-2 rounded-lg"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to={`/register`}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export const Register = () => {
  let userSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be number and contain 10 digits")
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(2000);
  async function registerUser(data: any) {
    setLoading(true);
    try {
      await dispatch(signUp(data)).unwrap();
      setLoading(false);
      message.success("Registration successful", 2); // 2 seconds duration
      countTime();
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  }

  const countTime = () => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1000);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {}, []);
  return (
    <>
      <Spin spinning={loading} tip="loading....">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
            E-commerce
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit(registerUser)}>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
                </h1>

                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className={inputStyle}
                    {...register("username")}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.username?.message}</p>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    {...register("password")}
                    className={inputStyle}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.password?.message}</p>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    className={inputStyle}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.email?.message}</p>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    className={inputStyle}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.phone?.message}</p>
                <button
                  type="submit"
                  className="bg-sky-400 px-4 py-2 rounded-lg"
                >
                  Sign up
                </button>
              </div>
            </form>{" "}
          </div>
        </div>
      </Spin>
    </>
  );
};
