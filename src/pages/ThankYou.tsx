import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const ThankYou = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen border bg-[url('/bg.jpg')] bg-cover bg-center">
        <div className="flex items-center justify-center flex-grow p-4">
          <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-xl sm:p-12">
            <div className="text-center success-animation">
              <div className="flex justify-center mb-6 success-icon">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="40"
                    fill="rgba(234, 88, 12, 0.1)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="rgba(234, 88, 12, 0.15)"
                  />
                  <circle cx="40" cy="40" r="24" fill="#ea580c" />
                  <path
                    d="M32 40L38 46L48 34"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-[#272727] mb-4">
                Thank you!
              </div>
              <div className="mb-8 text-gray-600">
                We've received your information and will reach out to you
                shortly to discuss your property needs.
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default ThankYou;
