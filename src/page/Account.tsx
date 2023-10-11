import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { useCheckLogin } from "../useCheckLogin";
import * as yup from "yup";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/userLoginSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spin, message } from "antd";
export const Account = () => {
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username") || "";
  const password = localStorage.getItem("password") || "";
  const email = localStorage.getItem("email") || "";
  const phone = localStorage.getItem("phone") || "";
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    username: username,
    password: password,
    email: email,
    phone: phone,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let userSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required(),
  });
  const inputInfor =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  useCheckLogin();
  console.log(username, password, email, phone,id);

  function changeForm() {
    setEdit(false);
  }
  function handleOk(data: any) {
    editProfile(data);
  }
  async function editProfile(data: any) {
    setLoading(true);
    try {
      const cloneUser = { id, ...data };
      console.log(cloneUser);
      await dispatch(updateUser(cloneUser)).unwrap();
      message.success("Update profile successful", 1);
      setUser(cloneUser);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    changeForm();
  }

  useEffect(() => {}, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    // defaultValues: { productName: "", description: "", price: 0, sale:0, quantity:0,origin:"",productImage:"" }
  });
  return (
    <>
      <Header />
      <Spin spinning={loading} tip="Loading">
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                  <form onSubmit={handleSubmit(handleOk)}>
                    <MDBRow className="g-0">
                      <MDBCol
                        md="4"
                        className="gradient-custom flex justify-center rounded-full text-white"
                      >
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="Avatar"
                          className="my-5"
                          style={{ width: "80px" }}
                          fluid
                        />

                        {/* <MDBIcon far icon="edit mb-5" /> */}
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody className="p-4">
                          <MDBTypography className="font-bold" tag="h6">
                            Profile{" "}
                          </MDBTypography>

                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography
                                className="flex items-center justify-center"
                                tag="h6"
                              >
                                Username:{" "}
                                {edit ? (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.username}
                                    readOnly={false}
                                    defaultValue={user.username}
                                    {...register("username")}
                                  />
                                ) : (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.username}
                                    readOnly
                                  />
                                )}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography
                                className="flex items-center justify-center"
                                tag="h6"
                              >
                                Password:{" "}
                                {edit ? (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.password}
                                    readOnly={false}
                                    defaultValue={user.password}
                                    {...register("password")}
                                  />
                                ) : (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.password}
                                    readOnly
                                  />
                                )}
                              </MDBTypography>
                            </MDBCol>
                          </MDBRow>

                          <MDBTypography tag="h6" className="font-bold">
                            Contact
                          </MDBTypography>
                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography
                                className="flex items-center justify-center"
                                tag="h6"
                              >
                                Email:{" "}
                                {edit ? (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.email}
                                    readOnly={false}
                                    defaultValue={user.email}
                                    {...register("email")}
                                  />
                                ) : (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.email}
                                    readOnly
                                  />
                                )}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography
                                className="flex items-center justify-center"
                                tag="h6"
                              >
                                Phone:{" "}
                                {edit ? (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.phone}
                                    readOnly={false}
                                    defaultValue={user.phone}
                                    {...register("phone")}
                                  />
                                ) : (
                                  <input
                                    className={`border-solid border-black ${inputInfor}`}
                                    type="text"
                                    placeholder={user.phone}
                                    readOnly
                                  />
                                )}
                              </MDBTypography>
                            </MDBCol>
                          </MDBRow>

                          <div className="d-flex justify-content-start">
                            <a href="facebook.com">
                              <MDBIcon fab icon="facebook me-3" size="lg" />
                            </a>
                            <a href="#!">
                              <MDBIcon fab icon="twitter me-3" size="lg" />
                            </a>
                            <a href="#!">
                              <MDBIcon fab icon="instagram me-3" size="lg" />
                            </a>
                          </div>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                    {edit ? (
                      <>
                        <button
                          type="submit"
                          className="float-right w-36 h-8 border-solid bg-sky-500 text-white"
                        >
                          Update
                        </button>
                        <button
                          onClick={changeForm}
                          className="float-right w-36 h-8 border-solid bg-sky-500 text-white"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEdit(true)}
                        className="float-right w-36 h-8 border-solid bg-sky-500 text-white"
                      >
                        Edit Profile
                      </button>
                    )}
                  </form>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Spin>
      <Footer />
    </>
  );
};
