import { useState, useEffect } from "react";
import {
  ArrowRight,
  Search,
  Star,
  Users,
  Home as HomeIcon,
  Clock,
  ChevronRight,
  MapPin,
  Check,
  BookOpen,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import TestimonialsSlider from "../components/TestimonialsSlider";
import FAQAccordion from "../components/FAQAccordion";
import AgentQuestionnaire, {
  QuestionnaireData,
} from "../components/AgentQuestionnaire";
import styles from "../styles/Footer.module.css";
import { TestimonialsCard } from "../components";
import { getCityFromUrl } from "../utils/urlUtils";

const features = [
  { text: "100% free" },
  { text: "Takes just 1 minute" },
  { text: "No strings attached" },
];

export default function Home() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial checks
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleQuestionnaireSubmit = (data: QuestionnaireData) => {
    console.log("Questionnaire submitted:", data);
  };

  const handleFindAgentClick = () => {
    setIsQuestionnaireOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ marginTop: "-64px" }}>
      <AgentQuestionnaire
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onSubmit={handleQuestionnaireSubmit}
      />

      {/* Hero Section - Optimized for mobile */}
      <div
        className="relative min-h-screen overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          paddingTop: "64px",
          // backgroundAttachment: isMobile ? 'scroll' : 'fixed' // Remove fixed background on mobile for better performance
        }}
      >
        <div className="absolute inset-0 from-black/70 via-black/50 to-black/60" />
        <div className="relative flex flex-col min-h-screen">
          <div className="grid w-full grid-cols-1 gap-4 px-4 py-6 mx-auto lg:grid-cols-2 md:flex-row max-w-7xl md:gap-8 md:py-8 md:h-screen sm:px-6">
            <div
              className="text-white w-full max-w-[55rem] text-left px-0 sm:px-4 mt-2 space-y-4 md:space-y-8"
              style={{ letterSpacing: "1px" }}
            >
              <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:mb-6 md:text-7xl ">
                Find the best listing agent{" "}
              </h1>
              <p className="mb-6 text-base font-light sm:text-xl md:text-2xl">
                We negotiate so you don't have to - get the best realtor while
                paying less commissions.
              </p>
              <div className="flex flex-col items-start gap-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className="p-1 bg-white rounded-full">
                      <Check className="w-4 h-4 text-black sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-sm sm:text-xl">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[100%] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 h-auto min-h-[500px] sm:h-[640px] md:h-[640px] mb-[30px] sm:mb-[100px] border border-white/20">
              <div className="h-full overflow-y-auto">
                <AgentQuestionnaire
                  isOpen={true}
                  onClose={() => {}}
                  onSubmit={handleQuestionnaireSubmit}
                  embedded={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Optimized for all screens */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="relative inline-block w-full mx-auto mb-6 text-xl font-bold text-center sm:text-3xl text-secondary sm:mb-12 lg:mb-20">
            <span className="relative inline-block text-3xl sm:text-4xl lg:text-5xl">
              How It Works
              <span className="absolute w-12 h-1 transform -translate-x-1/2 rounded-full -bottom-5 left-1/2 sm:w-20 bg-primary"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-8">
            <div className="flex flex-col">
              <div className="flex flex-col justify-between h-full p-5 text-center bg-white border border-gray-100 shadow-lg rounded-xl sm:p-8 group">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white rounded-full bg-primary sm:w-16 sm:h-16 sm:mb-6">
                    1
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-2xl lg:text-xl xl:text-2xl">
                    Take a Quick Quiz
                  </h3>
                  <p className="text-base text-gray-600 lg:text-sm xl:text-base">
                    Answer a few simple questions about your home and selling
                    goals to help us understand your needs
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col justify-between h-full p-5 text-center bg-white border border-gray-100 shadow-lg rounded-xl sm:p-8 group">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white rounded-full bg-primary sm:w-16 sm:h-16 sm:mb-6">
                    2
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-2xl lg:text-xl xl:text-2xl">
                    Get a Personalized Agent List
                  </h3>
                  <p className="text-base text-gray-600 lg:text-sm xl:text-base">
                    We match you with top-rated realtors in your area, tailored
                    to your preferences and requirements
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col justify-between h-full p-5 text-center bg-white border border-gray-100 shadow-lg rounded-xl sm:p-8 group">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white rounded-full bg-primary sm:w-16 sm:h-16 sm:mb-6">
                    3
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-2xl lg:text-xl xl:text-2xl">
                    Connect & Save on Commission
                  </h3>
                  <p className="text-base text-gray-600 lg:text-sm xl:text-base">
                    Choose a pre-vetted realtor with pre-negotiated commissions,
                    so you get the best deal without the hassle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div id="reviews_section" className="py-16 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="relative inline-block w-full mx-auto mb-8 text-2xl font-bold text-center sm:text-3xl text-secondary sm:mb-10 lg:mb-20">
            <span className="relative inline-block text-[2.5rem] leading-[2.6rem]">
              Homeowners Love AceRealtors
              <span className="absolute w-16 h-1 transform -translate-x-1/2 rounded-full -bottom-5 left-1/2 sm:w-20 bg-primary"></span>
            </span>
          </h2>

          <div>
            <TestimonialsCard />
          </div>
        </div>
      </div>

      {/* Find Local Agents */}
      <div className="py-5 xxs:py-10 sm:py-24 bg-gradient-to-r from-white to-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 sm:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-2xl font-bold sm:text-4xl text-secondary sm:mb-6">
                The right realtor makes all the difference, we handpick one for
                you.
              </h2>
              <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-xl sm:mb-8">
                Not all realtors are equal. A bad one can leave your home unsold
                for months, while a top agent prices, markets, and sells fast.
                We connect you with the best, so you don't waste time.
              </p>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={handleFindAgentClick}
                  className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg w-fit bg-gradient-to-r from-primary to-primary/90 sm:py-4 hover:shadow-lg hover:shadow-primary/20 sm:text-base"
                >
                  Find an Agent
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </button>
              </div>
            </div>

            <div className="relative order-1 group md:order-2">
              <div className="absolute transition duration-500 opacity-50 -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur group-hover:opacity-100"></div>
              <div className="relative">
                <img
                  src="/usp1.jpg"
                  alt="Happy family in their new home"
                  className="rounded-xl shadow-xl h-[250px] sm:h-[350px] md:h-auto w-full object-cover "
                />
                <div className="absolute p-3 shadow-lg bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm sm:p-5 rounded-xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 rounded-full bg-primary/10 sm:w-14 sm:h-14 border-primary/20">
                      <span className="text-base font-bold sm:text-xl text-primary">
                        MD
                      </span>
                    </div>
                    <div>
                      <div className="flex mb-1 text-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-current sm:w-4 sm:h-4"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 sm:text-sm line-clamp-3">
                        "We didn't want to waste time with the wrong realtor,
                        and AceRealtors made sure we didn't. The agent they
                        connected us with sold our home fast and for a great
                        price!"
                      </p>
                      <p className="mt-1 text-xs font-semibold sm:text-sm text-secondary">
                        Megan D. from Florida
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Testimonial */}
      <div className="py-5 xxs:py-10 sm:py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:items-start md:grid-cols-2 lg:gap-12">
            <div className="relative group">
              <div className="absolute transition duration-500 opacity-50 -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur group-hover:opacity-100"></div>
              <div className="relative">
                <div className="overflow-hidden shadow-xl image-container rounded-xl">
                  <img
                    src="/usp2.webp"
                    alt="Happy family enjoying their new home"
                    className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover transform "
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center h-full content-wrapper">
              <h2 className="mb-4 text-2xl font-bold sm:text-4xl text-secondary sm:mb-6">
                When you save on commissions, we win.
              </h2>
              <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-xl sm:mb-8">
                At AceRealtors, we've already done the hard work—negotiating
                lower commission rates with top realtors in your area. That
                means you get the best agents without overpaying. More money in
                your pocket, less stress on your plate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 sm:py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-12">
            {/* First Stat */}
            <div className="relative px-6 py-6 text-center backdrop-blur-sm rounded-xl">
              <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-6xl sm:mb-4">
                800+
              </h3>
              <p className="text-lg sm:text-xl text-white/80">
                Top 1% Agents Across US
              </p>
              <div className="absolute bottom-0 w-2/3 h-px -translate-x-1/2 left-1/2 bg-white/20 lg:hidden"></div>
            </div>

            {/* Second Stat */}
            <div className="relative px-6 py-6 text-center backdrop-blur-sm rounded-xl">
              <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-6xl sm:mb-4">
                $13.2 M
              </h3>
              <p className="text-lg sm:text-xl text-white/80">
                Commissions Saved
              </p>
              <div className="absolute bottom-0 w-2/3 h-px -translate-x-1/2 left-1/2 bg-white/20 lg:hidden"></div>
            </div>

            {/* Third Stat */}
            <div className="px-6 py-6 text-center backdrop-blur-sm rounded-xl sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-6xl sm:mb-4">
                4500+
              </h3>
              <p className="text-lg sm:text-xl text-white/80">Happy Sellers</p>
            </div>
          </div>
        </div>
      </div>

      {/* More Resources - Mobile optimized grid */}
      <div id="more-resources" className="py-12 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6 text-center sm:mb-12">
            <h2
              className="relative inline-block mb-2 text-xl font-bold text-center sm:text-3xl text-secondary"
              style={{ fontSize: "2.5rem" }}
            >
              More Resources
              <span className="absolute w-12 h-1 transform -translate-x-1/2 rounded-full -bottom-2 left-1/2 sm:w-16 bg-primary"></span>
            </h2>
            <p className="mx-auto mt-4 text-sm text-center text-gray-600 sm:text-xl">
              Explore our guides and insights to help you navigate the real
              estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {/* Only show first 3 blog cards on mobile */}
            <div>
              <Link to="/blog/market-trends" className="block group">
                <div className="h-full overflow-hidden border border-gray-100 shadow-md bg-gray-50 rounded-xl">
                  <div className="overflow-hidden">
                    <img
                      src="/blog1.jpg"
                      alt="Real Estate Market Trends"
                      className="object-cover w-full h-36 sm:h-48"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-primary">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Market Analysis</span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold transition-colors duration-300 sm:text-xl group-hover:text-primary line-clamp-2">
                      Real Estate Market Trends & Property Valuation
                    </h3>
                    <p className="mb-3 text-xs text-gray-600 sm:text-sm line-clamp-2 sm:line-clamp-3">
                      Learn how to analyze market trends and determine the right
                      price for your property.
                    </p>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">
                        Read More
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div>
              <Link to="/blog/mortgage-financing" className="block group">
                <div className="h-full overflow-hidden border border-gray-100 shadow-md bg-gray-50 rounded-xl">
                  <div className="overflow-hidden">
                    <img
                      src="/blog2.jpg"
                      alt="Mortgage & Financing"
                      className="object-cover w-full h-36 sm:h-48"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-primary">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Home Financing</span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold transition-colors duration-300 sm:text-xl group-hover:text-primary line-clamp-2">
                      Mortgage & Financing Options Guide
                    </h3>
                    <p className="mb-3 text-xs text-gray-600 sm:text-sm line-clamp-2 sm:line-clamp-3">
                      Navigate the complex world of home loans and financing
                      options.
                    </p>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">
                        Read More
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div>
              <Link to="/blog/legal-tax" className="block group">
                <div className="h-full overflow-hidden border border-gray-100 shadow-md bg-gray-50 rounded-xl">
                  <div className="overflow-hidden">
                    <img
                      src="/blog3.jpg"
                      alt="Legal and Tax Considerations"
                      className="object-cover w-full h-36 sm:h-48"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-primary">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Legal & Tax Guide</span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold transition-colors duration-300 sm:text-xl group-hover:text-primary line-clamp-2">
                      Legal & Tax Considerations in Real Estate
                    </h3>
                    <p className="mb-3 text-xs text-gray-600 sm:text-sm line-clamp-2 sm:line-clamp-3">
                      Essential legal and tax knowledge for property
                      transactions.
                    </p>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">
                        Read More
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Hidden on mobile, visible on SM+ screens */}
            <div className="hidden sm:block">
              <Link to="/blog/home-inspection" className="block group">
                <div className="h-full overflow-hidden border border-gray-100 shadow-md bg-gray-50 rounded-xl">
                  <div className="overflow-hidden">
                    <img
                      src="/blog4.jpg"
                      alt="Home Inspection and Appraisal"
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span>Buyer's Guide</span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-primary line-clamp-2">
                      Home Inspection & Appraisal Guide
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      Understanding these crucial steps in real estate
                      transactions.
                    </p>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Hidden on mobile and tablet, visible on LG+ screens */}
            <div className="hidden lg:block">
              <Link to="/blog/real-estate-agent" className="block group">
                <div className="h-full overflow-hidden border border-gray-100 shadow-md bg-gray-50 rounded-xl">
                  <div className="overflow-hidden">
                    <img
                      src="/blog5.jpg"
                      alt="Real Estate Agent Role"
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span>Agent Guide</span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-primary line-clamp-2">
                      The Role of a Real Estate Agent
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      Learn how real estate agents streamline transactions,
                      maximize profits, and implement winning strategies for
                      selling your home.
                    </p>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden lg:block">
              <Link to="/blog/social-media-marketing" className="block group">
                <div className="h-full overflow-hidden border border-gray-100 shadow-md bg-gray-50 rounded-xl">
                  <div className="overflow-hidden">
                    <img
                      src="/blog6.jpg"
                      alt="Social Media Marketing in Real Estate"
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span>Digital Marketing</span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-primary line-clamp-2">
                      Staging Your Home Like a Pro
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      Learn how proper staging can showcase your home's
                      potential, attract more buyers, and maximize your selling
                      price.
                    </p>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-12">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-primary to-primary/90 sm:px-8 sm:py-3 sm:text-base"
            >
              View All Blogs
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 sm:py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-center text-secondary">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </div>

      <div className="relative py-12 overflow-hidden sm:py-20 md:py-24 bg-[#374151]">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-5xl sm:mb-6">
            Ready to save big on commissions?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-base text-gray-300 sm:text-xl sm:mb-8">
            Let our expert agents help you navigate the real estate market.
          </p>
          <button
            onClick={handleFindAgentClick}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors bg-orange-500 rounded-lg shadow-xl sm:px-8 sm:py-4 sm:text-lg hover:bg-orange-600 hover:shadow-2xl shadow-black/10"
          >
            Find an Agent
            <ArrowRight className="w-4 h-4 sm:h-5 sm:w-5 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Footer - Mobile optimized */}
      <footer className={`${styles.Footer} bg-[#12151a]`}>
        <div className={`${styles.Footer__container} max-w-7xl mx-auto px-4`}>
          <div className={`${styles.Footer__top} py-6 sm:py-12`}>
            {/* Mobile view - restructured */}
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

              {/* Certification Logos - centered */}
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

              {/* Links - First Row */}
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

              {/* Links - Second Row */}
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

            {/* Desktop view - grid structure (with fixes for spacing) */}
            <div className="hidden md:grid md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-x-4 md:gap-y-2">
              {/* Row 1: Logo in first cell, links spread over middle, logos at end */}
              {/* Logo and flag - First row, first column */}
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

              {/* First set of links - First row, columns 4-6 */}
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

              {/* Second set of links - First row, columns 7-9 */}
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

              {/* Certification Logos - First row, columns 10-12, horizontal */}
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

              {/* Row 2: Phone number in first cell, more links in middle - FIXED SPACING */}
              {/* Phone number - Second row, first column */}
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

              {/* Agents Join Here - Fixed */}
              <div className="flex items-center col-span-3 row-span-1">
                <a
                  href="/contact"
                  className="text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Agents Join Here
                </a>
              </div>

              {/* Do Not Sell Info - Fixed */}
              <div className="flex items-center col-span-3 row-span-1">
                <a
                  href="https://www.referralexchange.com/information"
                  className="text-xs text-gray-400 hover:text-primary sm:text-sm"
                >
                  Do Not Sell Info
                </a>
              </div>

              {/* Empty space for row 2, columns 10-12 */}
              <div className="col-span-3 row-span-1"></div>
            </div>
          </div>
          {/* Only show this copyright section in desktop view */}
          <div
            className={`${styles.Footer__bottom} border-t border-gray-800 py-3 sm:py-6 hidden md:block`}
          >
            <div
              className={`${styles.Footer__copyright} text-gray-500 text-xs text-center`}
            >
              A REALTOR is a member of the National Association of REALTORS®
              ©2005 - 2025, AceRealtors.com. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
