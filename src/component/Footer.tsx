import { memo } from "react";
import "../styles/css/home.css";
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
                    Get score <span className="text-red-600">Vip gift</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Purchase history
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Learn about purchasing notifications
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Warranty Policy
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
                   Company introduction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Recruitment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                   Send comments and complaints
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Find supermarkets (3,371 shops)
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
                    Support Switchboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                   Call: <span className="text-red-600">1800.1060</span>{" "}
                    (7:30 - 22:00)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Complain: <span className="text-red-600">1800.1062</span>{" "}
                    (8:00 - 21:30)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 transition duration-400 hover:underline font-robotoMedium"
                  >
                    Guarantee: <span className="text-red-600">1800.1064</span>{" "}
                    (8:00 - 21:00)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(Footer);
