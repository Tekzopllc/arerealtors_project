import { useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { cn } from "../../lib/utility";
import { Check } from "lucide-react";
import BuyingIcon from "./svg/sell.svg";
import SellingIcon from "./svg/home.svg";
import BothIcon from "./svg/both.svg";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

interface FormData {
  transactionType: string;
  budget?: number;
  location?: string;
  timeframe?: string;
  propertyType?: string;
  address?: string;
}

const options = [
  { text: "I'm Buying", icon: SellingIcon, value: "buying" },
  { text: "I'm Selling", icon: BuyingIcon, value: "selling" },
  { text: "I'm Buying & Selling", icon: BothIcon, value: "both" },
];

const InitialStep = ({ onSelect }: { onSelect: (value: string) => void }) => {
  return (
    <div>
      <h1 className="text-[40px] font-semibold text-customblack text-center">
        Find The Best REALTORS® For You
      </h1>
      <p className="text-[20px] text-customblack text-center mt-5">
        Instantly see a personalized list of great agents to choose from.
      </p>

      <div className="grid grid-cols-3 gap-10 mt-14">
        {options.map((option) => {
          return (
            <div
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="text-[22px] font-medium text-customblack text-center p-11 cursor-pointer border-2 border-[#E0E0E0] rounded-[5px] transition-all duration-300 hover:border-[#EA580C] hover:shadow-[0_0_28px_rgba(30,41,59,0.08)]"
            >
              <img
                src={option.icon}
                alt={option.text}
                className="w-16 h-16 mx-auto mb-4"
              />
              {option.text}
            </div>
          );
        })}
      </div>

      <div className="w-full h-[0.5px] bg-[#E0E0E0] my-10" />

      <div className="px-2 mt-2 mb-4 text-center sm:px-0">
        {[
          "We've worked with over 10k happy home buyers & sellers",
          "We only recommend the top agents in your area",
          "Get a free custom list of top agents in your area in less than 2 minutes",
        ].map((option) => (
          <div
            key={option}
            className="flex items-start gap-2 mb-3 text-left sm:items-center sm:text-center bg-[#FFFFFF]"
          >
            <div className="bg-[#047857] rounded-full p-1 shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-[12px] sm:text-[16px] text-[#272727] leading-snug sm:leading-normal">
              {option}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  const indicatorProgress =
    currentStep === totalSteps ? Math.min(progress, 95) : progress;

  if (currentStep === 1) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="relative">
        <div className="w-full h-[12px] bg-[#E0E0E0] rounded">
          <div
            className="h-[12px] bg-orange-500 rounded-tl-[5px] rounded-r-[5px] transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {currentStep !== 1 && (
          <div
            className="flex justify-center transition-all duration-300 ease-in-out"
            style={{
              marginLeft: `${indicatorProgress}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className={cn(
                "relative mt-2",
                currentStep === totalSteps && "me-8"
              )}
            >
              <div className="absolute w-3 h-3 transform rotate-45 -translate-x-1/2 bg-orange-500 left-1/2 -top-1" />
              <div className="min-w-[120px] inline-flex items-center justify-center px-4 py-1 text-[16px] text-[#EA580C] font-semibold border border-orange-500 rounded-full bg-white relative">
                {currentStep === totalSteps
                  ? "Last Step!"
                  : `Step ${currentStep} / ${totalSteps}`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Page Component
function Test() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    transactionType: "",
  });

  const getTotalSteps = (type: string) => {
    switch (type) {
      case "buying":
        return 6; // Adjust based on your buying flow
      case "selling":
        return 7; // Adjust based on your selling flow
      case "both":
        return 8; // Adjust based on your buying & selling flow
      default:
        return 8;
    }
  };

  const handleOptionSelect = (value: string) => {
    setFormData({ ...formData, transactionType: value });
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div
          className="relative min-h-screen overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url(/new-bg.jpg)",
            backgroundAttachment: "fixed",
          }}
        >
          <Header />
          <div className="absolute inset-0 from-black/70 via-black/50 to-black/60" />

          <div className="bg-[#FCFCFB] w-[99%] sm:w-[70%] mx-auto min-h-[615px] rounded my-16 relative p-10 shadow-[0_0_28px_rgba(30,41,59,0.08)]">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={getTotalSteps(formData.transactionType)}
            />
            {currentStep === 1 ? (
              <InitialStep onSelect={handleOptionSelect} />
            ) : (
              // Add other steps here based on currentStep and formData.transactionType
              <div>Next steps will go here</div>
            )}
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Test;
