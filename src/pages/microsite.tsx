import { useState, useEffect } from 'react';
import { ArrowRight, Search, Star, Users, Home as HomeIcon, Clock, ChevronRight, MapPin, Check, BookOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSlider from '../components/TestimonialsSlider';
// import FAQAccordion from '../components/FAQAccordion';
import AgentQuestionnaire, { QuestionnaireData } from '../components/AgentQuestionnaire';
import styles from '../styles/Footer.module.css';

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
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Simplified animations for mobile
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4 } 
    }
  };

  const handleQuestionnaireSubmit = (data: QuestionnaireData) => {
    console.log('Questionnaire submitted:', data);
  };

  return (
    <div className="min-h-screen" style={{ marginTop: '-64px' }}>
      <AgentQuestionnaire
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onSubmit={handleQuestionnaireSubmit}
      />

      {/* Hero Section - Optimized for mobile */}
      <div
        className="min-h-screen relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          paddingTop: '64px',
          // backgroundAttachment: isMobile ? 'scroll' : 'fixed' // Remove fixed background on mobile for better performance
        }}
      >
        <div className="Header_Header__container__ZX38g py-4 max-w-[95rem] mx-auto">
                    <div className="Header_Header__brand__sztra px-4 sm:px-6">
                      <div className="flex justify-between items-center" style={{marginLeft: isMobile? '0rem':'1rem'}}>
                        <div className="flex items-center gap-3">
                          <Link to="/" className="block">
                          <img
                            src="/new_logo.png"
                            alt="RealEstateAgents.com"
                            className="w-[120px] md:w-[180px] h-auto mix-blend-screen brightness-200 contrast-200"
                          />
                          </Link>
                          <img
                            src="/Flag-United-States-of-America.webp"
                            alt="USA Flag"
                            className="w-[30px] md:w-[40px] h-auto object-contain"
                          />
                        </div>
                        {/* <div className="Header_Header__phone__rT5_y flex flex-col md:flex-row items-end md:items-center gap-0.5 md:gap-2">
                          <div className="text-white text-[10px] md:text-sm text-right">Questions? Call:</div>
                          <a href="tel:+18556961455" className="text-white text-sm md:text-base font-medium hover:text-orange-500 transition-colors whitespace-nowrap">
                            +1 (855) 696-1455
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
        <div className="absolute inset-0  from-black/70 via-black/50 to-black/60" />
                <div className="relative flex flex-col min-h-screen">
                  <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[95rem] mx-auto gap-4 md:gap-8 py-6 md:py-8 md:h-screen px-4 sm:px-6">
                    
                    <div 
                      className="text-white w-full max-w-[55rem] text-left px-0 sm:px-4 mt-2 md:mt-[-250px] space-y-4 md:space-y-8"
                      style={{letterSpacing: '1px'}}
                    >
                      <h1
                        className="text-2xl sm:text-4xl md:text-4 font-bold mb-4 md:mb-6 text-white"
                        style={{lineHeight: isMobile ? '2.5rem' : '4.5rem', fontSize: isMobile ? '2.5rem' : '4.5rem'}}
                      >
                        Find the best listing agent
                      </h1>
                      <p
                        className="text-base sm:text-xl md:text-2xl mb-6 font-light" style={{fontSize: isMobile ? '1rem' : '1.6rem'}}
                      >
                        We negotiate so you don't have to - get the best realtor while paying less commissions
                      </p>
                      <div 
                        className="flex flex-col items-start gap-3 mb-6"
                      >
                        <div 
                          className="flex items-center gap-2 group"
                        >
                          <div className="bg-white p-1 rounded-full">
                            <Check className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
                          </div>
                          <span className="text-sm sm:text-lg">100% free</span>
                        </div>
                        <div 
                          className="flex items-center gap-2 group"
                        >
                          <div className="bg-white p-1 rounded-full">
                            <Check className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
                          </div>
                          <span className="text-sm sm:text-lg">Takes just 1 minute</span>
                        </div>
                        <div 
                          className="flex items-center gap-2 group"
                        >
                          <div className="bg-white p-1 rounded-full">
                            <Check className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
                          </div>
                          <span className="text-sm sm:text-lg">No strings attached</span>
                       </div>
                     </div>
                    </div>
        
                    <div 
                      className="w-[100%] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 h-[570px] md:h-[640px] mb-[30px] sm:mb-[100px] border border-white/20"
                    >
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

      {/* How It Works - Mobile optimized */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-xl sm:text-3xl font-bold text-center text-secondary mb-6 sm:mb-10 relative inline-block mx-auto w-full"
          >
            <span className="relative inline-block" style={{fontSize: '2.5rem'}}>
              How It Works
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-20 h-1 bg-primary rounded-full"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            <div 
              className="flex flex-col"
            >
              <div className="bg-white rounded-xl p-5 sm:p-8 shadow-lg text-center min-h-[240px] sm:min-h-[324px] flex flex-col justify-between group border border-gray-100">
                <div>
                  <div className="bg-primary text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-secondary">Take a Quick Quiz</h3>
                  <p className="text-sm text-gray-600">Answer a few simple questions about your home and selling goals to help us understand your needs</p>
                </div>
              </div>
            </div>
            
            <div 
              className="flex flex-col"
            >
              <div className="bg-white rounded-xl p-5 sm:p-8 shadow-lg text-center min-h-[240px] sm:min-h-[324px] flex flex-col justify-between group border border-gray-100">
                <div>
                  <div className="bg-primary text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-secondary">Get a Personalized Agent List</h3>
                  <p className="text-sm text-gray-600">We match you with top-rated realtors in your area, tailored to your preferences and requirements</p>
                </div>
              </div>
            </div>
            
            <div 
              className="flex flex-col"
            >
              <div className="bg-white rounded-xl p-5 sm:p-8 shadow-lg text-center min-h-[240px] sm:min-h-[324px] flex flex-col justify-between group border border-gray-100">
                <div>
                  <div className="bg-primary text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-secondary">Connect & Save on Commission</h3>
                  <p className="text-sm text-gray-600">Choose a pre-vetted realtor with pre-negotiated commissions, so you get the best deal without the hassle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
            <div id="reviews_section" className="py-16 sm:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-center text-secondary mb-8 sm:mb-10 relative inline-block mx-auto w-full"
                >
                  <span className="relative inline-block" style={{fontSize: '2.5rem'}}>
                    Homeowners Love Acerealtors
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-primary rounded-full"></span>
                  </span>
                </h2>
                
                <div
                >
                  <TestimonialsSlider />
                </div>
              </div>
            </div>
      
            {/* Find Local Agents */}
            <div className="py-16 sm:py-24 bg-gradient-to-r from-white to-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div
                    className="order-2 md:order-1"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4 sm:mb-6">
                      The right realtor makes all the difference, we handpick one for you.
                    </h2>
                    <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                      Not all realtors are equal. A bad one can leave your home unsold for months, while a top agent prices, markets, and sells fast. We connect you with the best, so you don't waste time.
                    </p>
                    
                    <div className="mt-6 sm:mt-8">
                      <button
                        onClick={() => setIsQuestionnaireOpen(true)}
                        className="w-full bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 sm:py-4 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                      >
                        Find an Agent
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      </button>
                    </div>
                  </div>
                  
                  <div
                    className="relative group order-1 md:order-2"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                      <img
                        src="/usp1.jpg"
                        alt="Happy family in their new home"
                        className="rounded-xl shadow-xl h-[250px] sm:h-[350px] md:h-auto w-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 sm:p-5 rounded-xl shadow-lg">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="bg-primary/10 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                            <span className="text-base sm:text-xl font-bold text-primary">MD</span>
                          </div>
                          <div>
                            <div className="flex text-primary mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                              ))}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">"We didn't want to waste time with the wrong realtor, and AceRealtors made sure we didn't. The agent they connected us with sold our home fast and for a great price!"</p>
                            <p className="text-xs sm:text-sm font-semibold mt-1 text-secondary">Megan D. from Florida</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Additional Testimonial */}
            <div className="py-16 sm:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <div
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                      <div className="image-container rounded-xl shadow-xl overflow-hidden">
                        <img
                          src="/usp2.webp"
                          alt="Happy family enjoying their new home"
                          className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover transform "
                        />
                      </div>
                      
                    </div>
                  </div>
                  
                  <div
                    className="content-wrapper flex flex-col justify-center h-full"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4 sm:mb-6">
                      When you save on commissions, we win.
                    </h2>
                    <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                      At AceRealtors, we've already done the hard work—negotiating lower commission rates with top realtors in your area. That means you get the best agents without overpaying. More money in your pocket, less stress on your plate.
                    </p>
                  </div>
                </div>
              </div>
            </div>

      {/* Statistics Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div
              className="relative text-center px-6 sm:px-8 py-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">800+</h3>
              <p className="text-lg sm:text-xl text-white/80">Top 1% Agents Across US</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-white/20 hidden sm:block md:hidden"></div>
            </div>
            
            <div
              className="relative text-center px-6 sm:px-8 py-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">$13.2 M</h3>
              <p className="text-lg sm:text-xl text-white/80">Commissions Saved</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-white/20 hidden md:block"></div>
            </div>
            
            <div
              className="text-center px-6 sm:px-8 py-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 sm:col-span-2 md:col-span-1"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">4500+</h3>
              <p className="text-lg sm:text-xl text-white/80">Happy Sellers</p>
            </div>
          </div>
        </div>
      </div>


      {/* Footer - Mobile optimized */}
      <footer className={`${styles.Footer} bg-[#12151a]`}>
  <div className={`${styles.Footer__container} max-w-7xl mx-auto px-4`}>
    <div className={`${styles.Footer__top} py-6 sm:py-12`}>
      {/* Mobile view - restructured */}
      <div className="flex flex-col gap-5 md:hidden">
        {/* Company Logo */}
        <div className="flex justify-center items-center w-full">
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
        <div className="flex justify-center items-center w-full">
          <a href="tel:855-696-1455" className="flex items-center text-gray-400 hover:text-primary whitespace-nowrap group">
            <div className="bg-gray-800 p-1.5 sm:p-2 rounded-full mr-2">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <span className="text-sm sm:text-base">855-696-1455</span>
          </a>
        </div>

        {/* White Border */}
        <div className="w-full border-t border-white opacity-30 my-1"></div>

        {/* Certification Logos - centered */}
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <div className={`${styles.Footer__icon}`}>
            <img src="/Your_paragraph_text.png" alt="Customer Reviews" width="75" height="29" className="sm:w-[90px] sm:h-[35px]" />
          </div>
          <div className={`${styles.Footer__icon}`}>
            <img alt="Verisign" src="/verisign.webp" width="52" height="31" className="sm:w-[63px] sm:h-[37px]" />
          </div>
          <div className={`${styles.Footer__icon}`}>
            <img alt="Realtor" src="/office_R_white.webp" width="28" height="31" className="sm:w-[34px] sm:h-[38px]" />
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-gray-500 text-xs text-center mt-2 mb-4">
          A REALTOR is a member of the National Association of REALTORS® ©2005 - 2025, AceRealtors.com. All Rights Reserved.
        </div>

        {/* Links - First Row */}
        <div className="flex justify-center items-center w-full">
          <nav className="flex flex-wrap justify-center">
            <a href="/about" className="text-gray-400 hover:text-primary text-xs sm:text-sm px-2">About Us</a>
            <span className="text-gray-400">|</span>
            <a href="/contact" className="text-gray-400 hover:text-primary text-xs sm:text-sm px-2">Contact Us</a>
            <span className="text-gray-400">|</span>
            <a href="/tos" className="text-gray-400 hover:text-primary text-xs sm:text-sm px-2">Terms of Use</a>
            <span className="text-gray-400">|</span>
            <a href="/privacy" className="text-gray-400 hover:text-primary text-xs sm:text-sm px-2">Privacy Policy</a>
          </nav>
        </div>

        {/* Links - Second Row */}
        <div className="flex justify-center items-center w-full">
          <nav className="flex flex-wrap justify-center">
            <a href="/contact" className="text-gray-400 hover:text-primary text-xs sm:text-sm px-2">Agents Join Here</a>
            <span className="text-gray-400">|</span>
            <a href="https://www.referralexchange.com/information" className="text-gray-400 hover:text-primary text-xs sm:text-sm px-2">Do Not Sell Info</a>
          </nav>
        </div>
      </div>

      {/* Desktop view - grid structure (with fixes for spacing) */}
      <div className="hidden md:grid md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-x-4 md:gap-y-2">
        {/* Row 1: Logo in first cell, links spread over middle, logos at end */}
        {/* Logo and flag - First row, first column */}
        <div className="col-span-3 row-span-1 flex items-start">
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
          <ul className="space-y-2 w-full">
            <li className="flex justify-start">
              <a href="/about" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1">
                About Us
              </a>
            </li>
            <li className="flex justify-start">
              <a href="/contact" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Second set of links - First row, columns 7-9 */}
        <div className="col-span-3 row-span-1">
          <ul className="space-y-2 w-full">
            <li className="flex justify-start">
              <a href="/tos" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1">
                Terms of Use
              </a>
            </li>
            <li className="flex justify-start">
              <a href="/privacy" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1 pt-[4px] sm:pt-1">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Certification Logos - First row, columns 10-12, horizontal */}
        <div className="col-span-3 row-span-1 flex flex-row justify-end items-start gap-4">
          <div className={`${styles.Footer__icon}`}>
            <img src="/Your_paragraph_text.png" alt="Customer Reviews" width="90" height="35" />
          </div>
          <div className={`${styles.Footer__icon}`}>
            <img alt="Verisign" src="/verisign.webp" width="63" height="37" />
          </div>
          <div className={`${styles.Footer__icon}`}>
            <img alt="Realtor" src="/office_R_white.webp" width="34" height="38" />
          </div>
        </div>

        {/* Row 2: Phone number in first cell, more links in middle - FIXED SPACING */}
        {/* Phone number - Second row, first column */}
        <div className="col-span-3 row-span-1 flex items-center" style={{marginTop: '-3rem'}}>
          <a href="tel:855-696-1455" className="flex items-center text-gray-400 hover:text-primary whitespace-nowrap group">
            <div className="bg-gray-800 p-2 rounded-full mr-2">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base">855-696-1455</span>
          </a>
        </div>

        {/* Agents Join Here - Fixed */}
        <div className="col-span-3 row-span-1 flex items-center">
          <a href="/contact" className="text-gray-400 hover:text-primary text-xs sm:text-sm">
            Agents Join Here
          </a>
        </div>

        {/* Do Not Sell Info - Fixed */}
        <div className="col-span-3 row-span-1 flex items-center">
          <a href="https://www.referralexchange.com/information" className="text-gray-400 hover:text-primary text-xs sm:text-sm">
            Do Not Sell Info
          </a>
        </div>

        {/* Empty space for row 2, columns 10-12 */}
        <div className="col-span-3 row-span-1"></div>
      </div>
    </div>
    {/* Only show this copyright section in desktop view */}
    <div className={`${styles.Footer__bottom} border-t border-gray-800 py-3 sm:py-6 hidden md:block`}>
      <div className={`${styles.Footer__copyright} text-gray-500 text-xs text-center`}>
        A REALTOR is a member of the National Association of REALTORS® ©2005 - 2025, AceRealtors.com. All Rights Reserved.
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}