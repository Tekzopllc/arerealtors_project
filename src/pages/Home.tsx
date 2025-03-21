import { useState, useEffect } from 'react';
import { ArrowRight, Search, Star, Users, Home as HomeIcon, Clock, ChevronRight, MapPin, Check, BookOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TestimonialsSlider from '../components/TestimonialsSlider';
import FAQAccordion from '../components/FAQAccordion';
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
        <div className="absolute inset-0  from-black/70 via-black/50 to-black/60" />
        <div className="relative flex flex-col min-h-screen">
          <div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto gap-4 md:gap-8 py-6 md:py-8 md:h-screen px-4 sm:px-6">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white w-full max-w-[55rem] text-left px-0 sm:px-4 mt-2 md:mt-[-250px] space-y-4 md:space-y-8"
              style={{letterSpacing: '1px'}}
            >
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white"
                style={{lineHeight: isMobile ? '2.5rem' : '4rem'}}
              >
                Find the best listing agent
              </motion.h1>
              <motion.p
                variants={fadeInUp} 
                className="text-base sm:text-xl md:text-2xl mb-6 font-light"
              >
                We Negotiate So You Don't Have To - Get the Best Realtor while paying less commissions
              </motion.p>
              <motion.div 
                variants={staggerContainer}
                className="flex flex-col items-start gap-3 mb-6"
              >
                <motion.div 
                  variants={scaleUp}
                  className="flex items-center gap-2 group"
                >
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <span className="text-sm sm:text-lg">100% free</span>
                </motion.div>
                <motion.div 
                  variants={scaleUp}
                  className="flex items-center gap-2 group"
                >
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <span className="text-sm sm:text-lg">Takes just 1 minute</span>
                </motion.div>
                <motion.div 
                  variants={scaleUp}
                  className="flex items-center gap-2 group"
                >
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <span className="text-sm sm:text-lg">No strings attached</span>
               </motion.div>
             </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-[100%] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 h-[570px] sm:h-[calc(100vh-200px)] sm:max-h-[37rem] mb-[30px] sm:mb-[100px] border border-white/20"
            >
              <div className="h-full overflow-y-auto">
                <AgentQuestionnaire
                  isOpen={true}
                  onClose={() => {}}
                  onSubmit={handleQuestionnaireSubmit}
                  embedded={true}
                />
              </div>
              <p className="text-xs text-white mt-8 text-left">
                * No spam, your information is 100% safe with us
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works - Mobile optimized */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-3xl font-bold text-center text-secondary mb-6 sm:mb-10 relative inline-block mx-auto w-full"
          >
            <span className="relative inline-block">
              How It Works
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-20 h-1 bg-primary rounded-full"></span>
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative text-center px-6 sm:px-8 py-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">800+</h3>
              <p className="text-lg sm:text-xl text-white/80">Top 1% Agents Across US</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-white/20 hidden sm:block md:hidden"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative text-center px-6 sm:px-8 py-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">$13.2 M</h3>
              <p className="text-lg sm:text-xl text-white/80">Commissions Saved</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-white/20 hidden md:block"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center px-6 sm:px-8 py-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 sm:col-span-2 md:col-span-1"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">4500+</h3>
              <p className="text-lg sm:text-xl text-white/80">Happy Sellers</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* More Resources - Mobile optimized grid */}
      <div id="more-resources" className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-12"
          >
            <h2 className="text-xl sm:text-3xl font-bold text-center text-secondary mb-2 inline-block relative">
              More Resources
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Explore our guides and insights to help you navigate the real estate market.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Only show first 3 blog cards on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/blog/market-trends" className="block group">
                <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-100 shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src="/blog1.jpg"
                      alt="Real Estate Market Trends"
                      className="w-full h-36 sm:h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary mb-2">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Market Analysis</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">Real Estate Market Trends & Property Valuation</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-3">Learn how to analyze market trends and determine the right price for your property.</p>
                    <div className="flex justify-end">
                      <span className="text-primary font-semibold flex items-center gap-1 text-xs sm:text-sm">
                        Read More 
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/blog/mortgage-financing" className="block group">
                <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-100 shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src="/blog2.jpg"
                      alt="Mortgage & Financing"
                      className="w-full h-36 sm:h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary mb-2">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Home Financing</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">Mortgage & Financing Options Guide</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-3">Navigate the complex world of home loans and financing options.</p>
                    <div className="flex justify-end">
                      <span className="text-primary font-semibold flex items-center gap-1 text-xs sm:text-sm">
                        Read More 
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/blog/legal-tax" className="block group">
                <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-100 shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src="/blog3.jpg"
                      alt="Legal and Tax Considerations"
                      className="w-full h-36 sm:h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary mb-2">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Legal & Tax Guide</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">Legal & Tax Considerations in Real Estate</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-3">Essential legal and tax knowledge for property transactions.</p>
                    <div className="flex justify-end">
                      <span className="text-primary font-semibold flex items-center gap-1 text-xs sm:text-sm">
                        Read More 
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Hidden on mobile, visible on SM+ screens */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden sm:block"
            >
              <Link to="/blog/home-inspection" className="block group">
                <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-100 shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src="/blog4.jpg"
                      alt="Home Inspection and Appraisal"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>Buyer's Guide</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">Home Inspection & Appraisal Guide</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">Understanding these crucial steps in real estate transactions.</p>
                    <div className="flex justify-end">
                      <span className="text-primary font-semibold flex items-center gap-2 text-sm">
                        Read More 
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Hidden on mobile and tablet, visible on LG+ screens */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:block"
            >
              <Link to="/blog/real-estate-agent" className="block group">
                <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-100 shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src="/blog5.jpg"
                      alt="Real Estate Agent Role"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>Agent Guide</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">The Role of a Real Estate Agent</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">Learn about effective selling strategies and agent responsibilities.</p>
                    <div className="flex justify-end">
                      <span className="text-primary font-semibold flex items-center gap-2 text-sm">
                        Read More 
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hidden lg:block"
            >
              <Link to="/blog/social-media-marketing" className="block group">
                <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-100 shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src="/blog6.jpg"
                      alt="Social Media Marketing in Real Estate"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>Digital Marketing</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">Social Media Marketing in Real Estate</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">Master the art of social media marketing for real estate success.</p>
                    <div className="flex justify-end">
                      <span className="text-primary font-semibold flex items-center gap-2 text-sm">
                        Read More 
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 sm:mt-12"
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-5 py-2 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base"
            >
              View All Blogs
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer - Mobile optimized */}
      <footer className={`${styles.Footer} bg-[#12151a]`}>
        <div className={`${styles.Footer__container} max-w-7xl mx-auto px-4`}>
          <div className={`${styles.Footer__top} py-6 sm:py-12`}>
            <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-4">
              {/* Column 1: Company Info - Name and Number on same line for mobile */}
              <div className="flex flex-col md:flex-col gap-4 w-full">
                <div className="flex justify-between items-center md:items-start">
                  <div className="flex items-center gap-2">
                    <Link to="/" className="block">
                      <img
                        src="/new_logo.png"
                        alt="RealEstateAgents.com"
                        className="w-[100px] sm:w-[120px] md:w-[180px] h-[20px] sm:h-[24px] md:h-[30px] mix-blend-screen brightness-200 contrast-200"
                      />
                    </Link>
                    <img
                      src="/Flag-United-States-of-America.webp"
                      alt="USA Flag"
                      className="w-[25px] sm:w-[30px] md:w-[40px] h-auto object-contain"
                    />
                  </div>
                  <a href="tel:855-696-1455" className="flex items-center text-gray-400 hover:text-primary whitespace-nowrap group md:hidden">
                    <div className="bg-gray-800 p-1.5 sm:p-2 rounded-full mr-2">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base">855-696-1455</span>
                  </a>
                </div>
                <a href="tel:855-696-1455" className="hidden md:flex items-center text-gray-400 hover:text-primary whitespace-nowrap group">
                  <div className="bg-gray-800 p-1.5 sm:p-2 rounded-full mr-2">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base">855-696-1455</span>
                </a>
              </div>

              {/* Links Container - Stack on mobile, grid on desktop */}
              <div className="flex flex-col items-center md:items-start md:col-span-2 space-y-2 w-full">
                <ul className="space-y-2 w-full">
                  <li className="flex justify-center md:justify-start">
                    <a href="/about" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      About Us
                    </a>
                  </li>
                  <li className="flex justify-center md:justify-start">
                    <a href="/contact" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      Contact Us
                    </a>
                  </li>
                  <li className="flex justify-center md:justify-start">
                    <a href="/tos" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      Terms of Use
                    </a>
                  </li>
                  <li className="flex justify-center md:justify-start">
                    <a href="/privacy" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      Privacy Policy
                    </a>
                  </li>
                  <li className="flex justify-center md:justify-start">
                    <a href="/contact" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      Agents Join Here
                    </a>
                  </li>
                  <li className="flex justify-center md:justify-start">
                    <a href="https://www.referralexchange.com/information" className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs sm:text-sm py-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      Do Not Sell Info
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Certification Logos */}
              <div className="flex flex-row md:flex-col justify-center items-center md:items-start gap-4 w-full">
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
            </div>
          </div>
          <div className={`${styles.Footer__bottom} border-t border-gray-800 py-3 sm:py-6`}>
            <div className={`${styles.Footer__copyright} text-gray-500 text-xs text-center`}>
              A REALTOR is a member of the National Association of REALTORS® ©2005 - 2025, AceRealtors.com. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}