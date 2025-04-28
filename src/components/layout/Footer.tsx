import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.Footer} bg-[#12151a]`}>
      <div className={`${styles.Footer__container} max-w-7xl mx-auto px-4`}>
        <div className={`${styles.Footer__top} py-6 sm:py-12`}>
          {/* Mobile view */}
          <div className="flex flex-col gap-5 md:hidden">
            {/* Company Logo */}
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center gap-2">
                <Link to="/" className="block">
                  <img
                    src="/new_logo.png"
                    alt="RealEstateAgents.com"
                    className="w-[120px] sm:w-[140px] h-[24px] sm:h-[28px] mix-blend-screen brightness-200 contrast-200"
                  />
                </Link>
                <img
                  src="/Flag-United-States-of-America.webp"
                  alt="USA Flag"
                  className="w-[25px] sm:w-[30px] h-auto object-contain"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-center w-full">
              <a
                href="tel:855-696-1455"
                className="flex items-center text-gray-400 hover:text-primary whitespace-nowrap group"
              >
                <div className="bg-gray-800 p-1.5 sm:p-2 rounded-full mr-2">
                  <Phone className="w-4 h-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="text-sm sm:text-base">855-696-1455</span>
              </a>
            </div>

            {/* White Border */}
            <div className="w-full my-1 border-t border-white opacity-30"></div>

            {/* Certification Logos */}
            <div className="flex flex-row items-center justify-center w-full gap-4">
              <div className={`${styles.Footer__icon}`}>
                <img
                  src="/Your_paragraph_text.png"
                  alt="Customer Reviews"
                  width="75"
                  height="29"
                  className="sm:w-[90px] sm:h-[35px]"
                />
              </div>
              <div className={`${styles.Footer__icon}`}>
                <img
                  alt="Verisign"
                  src="/verisign.webp"
                  width="52"
                  height="31"
                  className="sm:w-[63px] sm:h-[37px]"
                />
              </div>
              <div className={`${styles.Footer__icon}`}>
                <img
                  alt="Realtor"
                  src="/office_R_white.webp"
                  width="28"
                  height="31"
                  className="sm:w-[34px] sm:h-[38px]"
                />
              </div>
            </div>

            {/* Copyright Text */}
            <div className="mt-2 mb-4 text-xs text-center text-gray-500">
              A REALTOR is a member of the National Association of REALTORS®
              ©2005 - 2025, AceRealtors.com. All Rights Reserved.
            </div>

            {/* Links */}
            <div className="flex items-center justify-center w-full">
              <nav className="flex flex-wrap justify-center">
                <a
                  href="/about"
                  className="px-2 text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  About Us
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="/contact"
                  className="px-2 text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Contact Us
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="/tos"
                  className="px-2 text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Terms of Use
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="/privacy"
                  className="px-2 text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Privacy Policy
                </a>
              </nav>
            </div>

            <div className="flex items-center justify-center w-full">
              <nav className="flex flex-wrap justify-center">
                <a
                  href="/contact"
                  className="px-2 text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Agents Join Here
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="https://www.referralexchange.com/information"
                  className="px-2 text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Do Not Sell Info
                </a>
              </nav>
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden md:grid md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-x-4 md:gap-y-2">
            {/* Logo and flag */}
            <div className="flex items-start col-span-3 row-span-1">
              <div className="flex items-center gap-2">
                <Link to="/" className="block">
                  <img
                    src="/new_logo.png"
                    alt="RealEstateAgents.com"
                    className="w-[180px] h-[30px] mix-blend-screen brightness-200 contrast-200"
                  />
                </Link>
                <img
                  src="/Flag-United-States-of-America.webp"
                  alt="USA Flag"
                  className="w-[40px] h-auto object-contain"
                />
              </div>
            </div>

            {/* Links sections */}
            <div className="col-span-3 row-span-1">
              <ul className="w-full space-y-2">
                <li className="flex justify-start">
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1"
                  >
                    About Us
                  </a>
                </li>
                <li className="flex justify-start">
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-3 row-span-1">
              <ul className="w-full space-y-2">
                <li className="flex justify-start">
                  <a
                    href="/tos"
                    className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1"
                  >
                    Terms of Use
                  </a>
                </li>
                <li className="flex justify-start">
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Certification Logos */}
            <div className="flex flex-row items-start justify-end col-span-3 row-span-1 gap-4">
              <div className={`${styles.Footer__icon}`}>
                <img
                  src="/Your_paragraph_text.png"
                  alt="Customer Reviews"
                  width="90"
                  height="35"
                />
              </div>
              <div className={`${styles.Footer__icon}`}>
                <img
                  alt="Verisign"
                  src="/verisign.webp"
                  width="63"
                  height="37"
                />
              </div>
              <div className={`${styles.Footer__icon}`}>
                <img
                  alt="Realtor"
                  src="/office_R_white.webp"
                  width="34"
                  height="38"
                />
              </div>
            </div>

            {/* Phone number */}
            <div
              className="flex items-center col-span-3 row-span-1"
              style={{ marginTop: "-3rem" }}
            >
              <a
                href="tel:855-696-1455"
                className="flex items-center text-gray-400 hover:text-primary whitespace-nowrap group"
              >
                <div className="p-2 mr-2 bg-gray-800 rounded-full">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-base">855-696-1455</span>
              </a>
            </div>

            {/* Additional links */}
            <div className="flex items-center col-span-3 row-span-1">
              <a
                href="/contact"
                className="text-xs text-gray-400 hover:text-primary sm:text-sm"
              >
                Agents Join Here
              </a>
            </div>

            <div className="flex items-center col-span-3 row-span-1">
              <a
                href="https://www.referralexchange.com/information"
                className="text-xs text-gray-400 hover:text-primary sm:text-sm"
              >
                Do Not Sell Info
              </a>
            </div>

            <div className="col-span-3 row-span-1"></div>
          </div>
        </div>

        {/* Desktop copyright */}
        <div
          className={`${styles.Footer__bottom} border-t border-gray-800 py-3 sm:py-6 hidden md:block`}
        >
          <div
            className={`${styles.Footer__copyright} text-gray-500 text-xs text-center`}
          >
            A REALTOR is a member of the National Association of REALTORS® ©2005
            - 2025, AceRealtors.com. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
