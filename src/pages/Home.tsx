import { useState } from 'react';
import { ArrowRight, Search, Star, Users, Home as HomeIcon, Clock, ChevronRight, MapPin, Check, BookOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSlider from '../components/TestimonialsSlider';
import FAQAccordion from '../components/FAQAccordion';
import AgentQuestionnaire, { QuestionnaireData } from '../components/AgentQuestionnaire';
import styles from '../styles/Footer.module.css';

export default function Home() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const handleQuestionnaireSubmit = (data: QuestionnaireData) => {
    // Handle form submission (in a real app, this would send data to an API)
    console.log('Questionnaire submitted:', data);
  };

  return (
    <div className="min-h-screen" style={{ marginTop: '-64px' }}> {/* Added negative margin to offset navbar height */}
      <AgentQuestionnaire
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onSubmit={handleQuestionnaireSubmit}
      />

      {/* Hero Section */}
      <div
        className="min-h-screen md:h-screen relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          paddingTop: '64px' /* Add padding equal to navbar height to ensure content doesn't go under navbar */
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative flex flex-col min-h-screen">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto gap-8 md:h-screen px-4">
            
            <div className="text-white w-full max-w-2xl text-left px-4 mt-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 px-4">
                Find the best listing agent
              </h1>
              <p className="text-xl md:text-2xl mb-12 px-4">
                We Negotiate So You Don't Have To - Get the Best Realtor while paying less commissions
              </p>
              <div className="flex flex-col md:flex-row items-start gap-4 mb-12 px-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-lg">100% free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-lg">Takes just 1 minute</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-lg">No strings attached</span>
               </div>
             </div>
             <p className="text-sm text-gray-300 mt-4 px-4">* No spam, your information is 100% safe with us</p>
            </div>
            <div className="w-full md:max-w-md bg-white rounded-lg shadow-xl p-6 h-[calc(100vh-200px)] max-h-[600px] mb-[100px]">
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

      {/* How It Works */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="bg-white rounded-lg p-8 shadow-lg text-center min-h-[324px] flex flex-col justify-between">
                <div>
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Take a Quick Quiz</h3>
                  <p className="text-gray-600">Answer a few simple questions about your home and selling goals to help us understand your needs</p>
                </div>
                <div className="hidden md:flex justify-center mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-8 h-8 text-primary">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-white rounded-lg p-8 shadow-lg text-center min-h-[324px] flex flex-col justify-between">
                <div>
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Get a Personalized Agent List</h3>
                  <p className="text-gray-600">We match you with top-rated realtors in your area, tailored to your preferences and requirements</p>
                </div>
                <div className="hidden md:flex justify-center mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-8 h-8 text-primary">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-white rounded-lg p-8 shadow-lg text-center min-h-[324px] flex flex-col justify-between">
                <div>
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Connect & Save on Commission</h3>
                  <p className="text-gray-600">Choose a pre-vetted realtor with pre-negotiated commissions, so you get the best deal without the hassle</p>
                  <br/>
                </div>
                <div className="hidden md:flex justify-center mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-8 h-8 text-primary">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="reviews_section" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">
            What Our Clients Say
          </h2>
          <TestimonialsSlider />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center px-8 py-6">
              <h3 className="text-5xl font-bold text-white mb-4">800+</h3>
              <p className="text-xl text-white/80">Top 1% Agents Across US</p>
            </div>
            <div className="text-center px-8 py-6 md:border-x border-white/20">
              <h3 className="text-5xl font-bold text-white mb-4">$13.2 M</h3>
              <p className="text-xl text-white/80">Commissions Saved</p>
            </div>
            <div className="text-center px-8 py-6">
              <h3 className="text-5xl font-bold text-white mb-4">4500+</h3>
              <p className="text-xl text-white/80">Happy Sellers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose AceRealtors */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">
            Why Choose AceRealtors?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Agents</h3>
              <p className="text-gray-600">Top-rated professionals in your area</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Listings</h3>
              <p className="text-gray-600">Access to the best properties</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Process</h3>
              <p className="text-gray-600">End-to-end real estate solutions</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Service</h3>
              <p className="text-gray-600">Find homes that match your lifestyle</p>
            </div>
          </div>
        </div>
      </div>

      {/* Find Real Estate Agents for Free section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/woman-looking-camera-smiling-waving-with-stars-american-flag.jpg"
                alt="Professional real estate agent with American flag"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Find the Best RealEstate Agent for Free!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Connect with top-rated local agents who are ready to help you achieve your real estate goals. Our service is 100% free and there's no obligation.
              </p>
              <button
                onClick={() => setIsQuestionnaireOpen(true)}
                className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors whitespace-nowrap"
              >
                SAVE BIG ON COMMISSIONS!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Find Local Agents */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                The right realtor makes all the difference, we handpick one for you.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Not all realtors are equal. A bad one can leave your home unsold for months, while a top agent prices, markets, and sells fast. We connect you with the best, so you don't waste time.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Receive personal agent recommendations</h3>
                    <p className="text-gray-600">We'll match you with agents that best fit your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compare agent profiles for the best fit</h3>
                    <p className="text-gray-600">Review detailed profiles and past performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">No commitment to work with an agent</h3>
                    <p className="text-gray-600">Take your time to find the perfect match</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => setIsQuestionnaireOpen(true)}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  Find an Agent
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/usp1.jpg"
                alt="Happy family in their new home"
                className="rounded-lg shadow-xl h-[350px] md:h-auto w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">MD</span>
                  </div>
                  <div>
                    <div className="flex text-primary mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">"We didn't want to waste time with the wrong realtor, and AceRealtors made sure we didn't. The agent they connected us with sold our home fast and for a great price!"</p>
                    <p className="text-sm font-semibold mt-1">Megan D. from Florida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Testimonial */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="relative">
              <div className="image-container rounded-lg shadow-xl overflow-hidden">
                <img
                  src="/usp2.webp"
                  alt="Happy family enjoying their new home"
                  className="w-full h-[350px] md:h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">TJ</span>
                  </div>
                  <div>
                    <div className="flex text-primary mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">"AceRealtors made selling my home so easy! They matched me with a top agent, and I saved a ton on commission without any awkward negotiations."</p>
                    <p className="text-sm font-semibold mt-1">Tyler J. from Tennessee</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-wrapper">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
                When you save on commissions, we win.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                At AceRealtors, we've already done the hard work—negotiating lower commission rates with top realtors in your area. That means you get the best agents without overpaying. More money in your pocket, less stress on your plate.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Top-rated agents nationwide</h3>
                    <p className="text-gray-600">Access our network of experienced agents with proven track records</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Personalized matching</h3>
                    <p className="text-gray-600">Get matched with agents who understand your unique needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <HomeIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Proven success</h3>
                    <p className="text-gray-600">Join thousands of satisfied homebuyers who found their perfect match</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Resources */}
      <div id="more-resources" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-4">
            More Resources
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Explore our guides and insights to help you navigate the real estate market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <Link to="/blog/market-trends" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/blog1.jpg"
                   alt="Real Estate Market Trends"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Market Analysis</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Real Estate Market Trends & Property Valuation</h3>
                   <p className="text-gray-600 mb-4">Learn how to analyze market trends and determine the right price for your property.</p>
                   <div className="flex justify-end">
                     <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2">
                       Read More <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </Link>

             <Link to="/blog/mortgage-financing" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/blog2.jpg"
                   alt="Mortgage & Financing"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Home Financing</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Mortgage & Financing Options Guide</h3>
                   <p className="text-gray-600 mb-4">Navigate the complex world of home loans and financing options.</p>
                   <div className="flex justify-end">
                     <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2">
                       Read More <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </Link>

             <Link to="/blog/legal-tax" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/blog3.jpg"
                   alt="Legal and Tax Considerations"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Legal & Tax Guide</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Legal & Tax Considerations in Real Estate</h3>
                   <p className="text-gray-600 mb-4">Essential legal and tax knowledge for property transactions.</p>
                   <div className="flex justify-end">
                     <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2">
                       Read More <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </Link>

             <Link to="/blog/home-inspection" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/blog4.jpg"
                   alt="Home Inspection and Appraisal"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Buyer's Guide</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Home Inspection & Appraisal Guide</h3>
                   <p className="text-gray-600 mb-4">Understanding these crucial steps in real estate transactions.</p>
                   <div className="flex justify-end">
                     <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2">
                       Read More <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </Link>

             <Link to="/blog/real-estate-agent" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/blog5.jpg"
                   alt="Real Estate Agent Role"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Agent Guide</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">The Role of a Real Estate Agent</h3>
                   <p className="text-gray-600 mb-4">Learn about effective selling strategies and agent responsibilities.</p>
                   <div className="flex justify-end">
                     <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2">
                       Read More <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </Link>

             <Link to="/blog/social-media-marketing" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/blog6.jpg"
                   alt="Social Media Marketing in Real Estate"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Digital Marketing</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Social Media Marketing in Real Estate</h3>
                   <p className="text-gray-600 mb-4">Master the art of social media marketing for real estate success.</p>
                   <div className="flex justify-end">
                     <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2">
                       Read More <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </Link>
              </div>
              <div className="flex justify-center mt-12">
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
                >
                  View All Blogs
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

      {/* FAQ Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to save big on commissions? 
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let our expert agents help you navigate the real estate market.
          </p>
          <button
            onClick={() => setIsQuestionnaireOpen(true)}
            className="bg-primary text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
          >
            Find an Agent
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <footer className={styles.Footer}>
        <div className={styles.Footer__container}>
          <div className={styles.Footer__top}>
            {/* Company Info */}
            <div className="flex flex-row items-center justify-between md:justify-start gap-4 mb-6 md:mb-0 w-full md:w-auto">
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
              <a href="tel:855-696-1455" className="flex items-center text-gray-400 hover:text-primary transition-colors whitespace-nowrap">
                <Phone className="h-5 w-5 mr-2" />
                855-696-1455
              </a>
            </div>

            {/* Navigation Links */}
            <ul className={styles.Footer__nav}>
              <li><a href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/tos" className="text-gray-400 hover:text-primary transition-colors">Terms of Use</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-primary transition-colors">Agents Join Here</a></li>
              <li><a href="https://www.referralexchange.com/information" className="text-gray-400 hover:text-primary transition-colors">Do Not Sell My Information</a></li>
            </ul>

            {/* Certification Logos */}
            <div className={styles.Footer__icons}>
              <div className={styles.Footer__icon}>
                <img src="/Your_paragraph_text.png" alt="Customer Reviews" width="90" height="35" />
              </div>
              <div className={styles.Footer__icon}>
                <img alt="Verisign" src="/verisign.webp" width="63" height="37" />
              </div>
              <div className={styles.Footer__icon}>
                <img alt="Realtor" src="/office_R_white.webp" width="34" height="38" />
              </div>
            </div>
          </div>
          <div className={styles.Footer__bottom}>
            <div className={styles.Footer__copyright}>
              A REALTOR is a member of the National Association of REALTORS® ©2005 - 2025, AceRealtors.com. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

