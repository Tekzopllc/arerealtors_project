import { useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { cn } from "../../lib/utility";
import { Check, Plus, Minus } from "lucide-react";
import BuyingIcon from "./svg/sell.svg";
import SellingIcon from "./svg/home.svg";
import BothIcon from "./svg/both.svg";
import "./test.css";

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

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const PriceRange = ({ onNext, onBack, formData, setFormData }: StepProps) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    let adjustedValue;
    if (value < 1000000) {
      adjustedValue = Math.round(value / 50000) * 50000;
    } else {
      adjustedValue = Math.round(value / 250000) * 250000;
    }
    setFormData({ ...formData, budget: adjustedValue });
  };

  const incrementPrice = () => {
    if (!formData.budget) return;
    const increment = formData.budget < 1000000 ? 50000 : 250000;
    const newValue = Math.min(5000000, formData.budget + increment);
    setFormData({ ...formData, budget: newValue });
  };

  const decrementPrice = () => {
    if (!formData.budget) return;
    const decrement = formData.budget <= 1000000 ? 50000 : 250000;
    const newValue = Math.max(100000, formData.budget - decrement);
    setFormData({ ...formData, budget: newValue });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-250px)] relative">
      <div className="flex-1">
        <h1 className="text-[40px] font-semibold text-customblack text-center mt-10">
          What price are you <br /> hoping to buy at?
        </h1>

        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 w-full lg:w-[70%] mx-auto">
            <button
              onClick={decrementPrice}
              className="p-2 transition-shadow bg-white rounded-full shadow-md hover:shadow-lg"
            >
              <Minus className="w-5 h-5 text-[#272727]" />
            </button>
            <p className="text-3xl font-bold text-center text-black md:text-[44px]">
              {formData.budget
                ? `${formatCurrency(formData.budget)} - ${formatCurrency(
                    formData.budget +
                      (formData.budget < 1000000 ? 50000 : 250000)
                  )}`
                : "$600K - $650K"}
            </p>
            <button
              onClick={incrementPrice}
              className="p-2 transition-shadow bg-white rounded-full shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 text-[#272727]" />
            </button>
          </div>

          <div className="px-2 mb-6">
            <div className="w-full lg:w-[70%] mx-auto">
              <input
                type="range"
                min="100000"
                max="5000000"
                step="1000"
                value={formData.budget || 600000}
                onChange={handleSliderChange}
                className="w-full h-2 bg-[rgba(234,88,12,0.2)] rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #EA580C 0%, #EA580C ${
                    ((formData.budget || 600000) / 5000000) * 100
                  }%, rgba(234, 88, 12, 0.2) ${
                    ((formData.budget || 600000) / 5000000) * 100
                  }%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-[18px] text-gray-500">$100K</span>
                <span className="text-[18px] text-gray-500">$5M+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full py-6 mt-auto">
        <button
          onClick={onBack}
          className="px-12 py-4 text-[20px] font-semibold text-[#272727] bg-white border-2 border-[#E0E0E0] rounded transition-all hover:border-[#EA580C]"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-12 py-4 text-[20px] font-semibold text-white bg-[#EA580C] rounded transition-all hover:bg-[#EA580C]/90"
        >
          Next
        </button>
      </div>
    </div>
  );
};

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
    budget: 600000,
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

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
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
              <PriceRange
                onNext={handleNext}
                onBack={handleBack}
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Test;
