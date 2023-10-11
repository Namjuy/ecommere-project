import { memo } from "react";
import '../styles/css/home.css'
const Footer = () => {
  return (
    <div className="">
      <footer className="bg-white border-t border-gray-300">
        <div className="container mx-auto my-0">
          <div className="footer__body flex justify-between flex-wrap py-8">
            <div className="footer__item flex-1 w-1/4 mb-8">
              <ul>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Tích điểm <span className="text-red-600">Quà tặng VIP</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Lịch sử mua hàng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Tìm hiểu về mua trả góp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Chính sách bảo hành
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__item flex-1 w-1/4 mb-8">
              <ul>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Giới thiệu công ty (MWG.vn)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Gửi góp ý, khiếu nại
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Tìm siêu thị (3.371 shop)
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__item flex-1 w-1/4 mb-8">
              <ul>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Tổng đài hỗ trợ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Gọi mua: <span className="text-red-600">1800.1060</span>{" "}
                    (7:30 - 22:00)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Khiếu nại: <span className="text-red-600">1800.1062</span>{" "}
                    (8:00 - 21:30)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Bảo hành: <span className="text-red-600">1800.1064</span>{" "}
                    (8:00 - 21:00)
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__item flex-1 w-1/4 mb-8">
              <h3 className="font-robotoBold text-2xl mb-5">
                Thanh toán trực tuyến
              </h3>
              <div className="verify flex flex-wrap gap-4">
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_1.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_2.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_3.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_4.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_5.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_6.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover:bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_7.png" alt="" /> */}
                </a>
                <a
                  href="#"
                  className="verify__link w-1/4 max-w-1/4 bg-gray-300 p-2 rounded-full text-center transition duration-400 hover-bg-gray-400"
                >
                  {/* <img src="../assets/landing-page/payment_8.png" alt="" /> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(Footer);
