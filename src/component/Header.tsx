import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageLogo from "../assets/image/logo.png";
import { logout } from "../slices/userLoginSlice";
import { memo, useContext } from "react";
import { ProductContext } from "../App";
import "../styles/css/home.css";
import { Button, Dropdown, MenuProps } from "antd";

const Header = () => {
  const dispatch = useDispatch();
  // const userLogin = useSelector((state) => state.userLogin);
  const userLocalStorage = localStorage.getItem("username");
  const roleLocalStorage = localStorage.getItem("role");
  const cart = useContext(ProductContext);
  // console.log(userLogin);

  function logoutUser() {
    cart.setProductCart([]);
    dispatch(logout());
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to={`/cart`} className="navbar__link">
          <span className="mr-1">
            <i className="fa-solid fa-pager"></i>
          </span>
          <span>Cart</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={`/account`} className="navbar__link">
          <span className="mr-1">
            <i className="fa-solid fa-pager"></i>
          </span>
          <span>Account</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          to="/login"
          onClick={logoutUser}
          className="navbar__link cursor-pointer"
        >
          <span className="mr-1">
            <i className="fa-solid fa-pager"></i>
          </span>
          <span>Log out</span>
        </Link>
      ),
    },  
  ];
  if (Number(roleLocalStorage) === 1) {
    // If the user has role 1, add the "Product" item to the dropdown menu
    items.push({
      key: "4",
      label: (
        <Link to={`/product`} className="navbar__link">
          <span className="mr-1">
            <i className="fa-solid fa-pager"></i>
          </span>
          <span>Product</span>
        </Link>
      ),
    });
  }
  return (
    <>
      {" "}
      <div id="navbar">
        <div className="container navbar__container">
          <div className="navbar__logo">
            <Link to={`/`} className="navbar__link">
              <img src={ImageLogo} alt="" />
            </Link>
          </div>
          <ul className="navbar__menu">
            {Number(roleLocalStorage) === 1 ? (
              <li>
                <Link to={`/products`} className="navbar__link">
                  <span className="mr-1">
                    <i className="fa-solid fa-pager"></i>
                  </span>
                  <span>Product</span>
                </Link>
              </li>
            ) : (
              <>
                {" "}
                <li>
                  <Link to={`/cart`} className="navbar__link">
                    <span className="mr-1">
                      <i className="fa-solid fa-pager"></i>
                    </span>
                    <span>Cart</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/account`} className="navbar__link">
                    <span className="mr-1">
                      <i className="fa-solid fa-pager"></i>
                    </span>
                    <span>Account</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/login"
                onClick={logoutUser}
                className="navbar__link cursor-pointer"
              >
                <span className="mr-1">
                  <i className="fa-solid fa-pager"></i>
                </span>
                <span>Log out</span>
              </Link>
            </li>
            <li>
              <a className="navbar__link">
                <span className="mr-1">
                  <i className="fa-solid fa-pager"></i>
                </span>
                <span>Welcome : {userLocalStorage} </span>
              </a>
            </li>
          </ul>

          <Dropdown
            className="menuButton"
            menu={{ items }}
            placement="bottomRight"
            arrow
          >
            <Button>Menu</Button>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default memo(Header);
