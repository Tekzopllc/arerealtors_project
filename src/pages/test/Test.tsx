import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { cn } from "../../lib/utility";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep = 1, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  // Calculate adjusted progress for the step indicator
  // Keep it slightly away from the end for the last step
  const indicatorProgress =
    currentStep === totalSteps ? Math.min(progress, 95) : progress;

  return (
    <div className="absolute top-0 left-0 w-full h-full">
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

          {/* content of page */}
          <div className="bg-[#FCFCFB] w-[99%] sm:w-[70%] mx-auto min-h-[615px] rounded my-16 relative">
            {/* Example usage of ProgressBar */}

            {/* progress bar */}
            <ProgressBar currentStep={8} totalSteps={8} />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Test;
