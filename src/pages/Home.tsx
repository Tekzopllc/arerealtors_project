import { useState } from 'react';
import { ArrowRight, Search, Star, Users, Home as HomeIcon, Clock, ChevronRight, MapPin, Check, BookOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSlider from '../components/TestimonialsSlider';
import FAQAccordion from '../components/FAQAccordion';
import AgentQuestionnaire, { QuestionnaireData } from '../components/AgentQuestionnaire';

export default function Home() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const handleQuestionnaireSubmit = (data: QuestionnaireData) => {
    // Handle form submission (in a real app, this would send data to an API)
    console.log('Questionnaire submitted:', data);
  };

  return (
    <div className="min-h-screen">
      <AgentQuestionnaire
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onSubmit={handleQuestionnaireSubmit}
      />

      {/* Hero Section */}
      <div
        className="min-h-screen md:h-screen relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("/assets/bg.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative flex flex-col min-h-screen px-4 py-20 md:py-0">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto gap-8 md:h-screen">
            <div className="text-white w-full max-w-2xl text-left px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 px-4">
                Find the Top RealEstate Agents
              </h1>
              <p className="text-xl md:text-2xl mb-12 px-4">
                Expert agents, premium listings, and seamless buying & selling experiences.
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
                  <span className="text-lg">Top 1% Agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-lg">Exclusive Lowest Commision</span>
                </div>
              </div>
            </div>
            <div className="w-full md:max-w-md bg-white rounded-lg shadow-xl p-6 h-[calc(100vh-200px)] max-h-[600px]">
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
              <div className="bg-white rounded-lg p-8 shadow-lg text-center min-h-[240px] flex flex-col justify-between">
                <div>
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Search for Agents</h3>
                  <p className="text-gray-600">Find experienced real estate agents in your area</p>
                </div>
                <div className="hidden md:flex justify-center mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-8 h-8 text-primary">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-white rounded-lg p-8 shadow-lg text-center min-h-[240px] flex flex-col justify-between">
                <div>
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Schedule Consultation</h3>
                  <p className="text-gray-600">Meet with your agent to discuss your needs</p>
                </div>
                <div className="hidden md:flex justify-center mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-8 h-8 text-primary">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-white rounded-lg p-8 shadow-lg text-center min-h-[240px] flex flex-col justify-between">
                <div>
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Close the Deal</h3>
                  <p className="text-gray-600">Buy or sell with confidence</p>
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
              <h3 className="text-5xl font-bold text-white mb-4">$400M</h3>
              <p className="text-xl text-white/80">Transactions Closed</p>
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
                src="/assets/woman-looking-camera-smiling-waving-with-stars-american-flag.jpg"
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
                The best local real estate agents
              </h2>
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
                src="/assets/young-family-with-their-sons-home-having-fun.jpg"
                alt="Happy family in their new home"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">JM</span>
                  </div>
                  <div>
                    <div className="flex text-primary mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">"Great realtors. My home sold in five days!"</p>
                    <p className="text-sm font-semibold mt-1">John M. from Texas</p>
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
                  src="/assets/parents-kids-spending-time-together.jpg"
                  alt="Happy family enjoying their new home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">AC</span>
                  </div>
                  <div>
                    <div className="flex text-primary mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">"I used the website to identify potential agents in the new city I was moving to. I ultimately went with one of the recommended agents and had a very smooth home buying process."</p>
                    <p className="text-sm font-semibold mt-1">Dan K. from New York</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-wrapper">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
                Your trusted partner in real estate
              </h2>
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
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">
            More Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <Link to="/blog/market-trends" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/assets/blog1.jpg"
                   alt="Real Estate Market Trends"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Market Analysis</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Real Estate Market Trends & Property Valuation</h3>
                   <p className="text-gray-600">Learn how to analyze market trends and determine the right price for your property.</p>
                 </div>
               </div>
             </Link>

             <Link to="/blog/mortgage-financing" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/assets/blog2.jpg"
                   alt="Mortgage & Financing"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Home Financing</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Mortgage & Financing Options Guide</h3>
                   <p className="text-gray-600">Navigate the complex world of home loans and financing options.</p>
                 </div>
               </div>
             </Link>

             <Link to="/blog/legal-tax" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/assets/blog3.jpg"
                   alt="Legal and Tax Considerations"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Legal & Tax Guide</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Legal & Tax Considerations in Real Estate</h3>
                   <p className="text-gray-600">Essential legal and tax knowledge for property transactions.</p>
                 </div>
               </div>
             </Link>

             <Link to="/blog/home-inspection" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/assets/blog4.jpg"
                   alt="Home Inspection and Appraisal"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Buyer's Guide</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">Home Inspection & Appraisal Guide</h3>
                   <p className="text-gray-600">Understanding these crucial steps in real estate transactions.</p>
                 </div>
               </div>
             </Link>

             <Link to="/blog/real-estate-agent" className="block">
               <div className="bg-gray-50 rounded-lg overflow-hidden h-full">
                 <img
                   src="/assets/blog5.jpg"
                   alt="Real Estate Agent Role"
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <div className="flex items-center gap-2 text-sm text-primary mb-3">
                     <BookOpen className="w-4 h-4" />
                     <span>Agent Guide</span>
                   </div>
                   <h3 className="text-xl font-semibold mb-3">The Role of a Real Estate Agent</h3>
                   <p className="text-gray-600">Learn about effective selling strategies and agent responsibilities.</p>
                 </div>
               </div>
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
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let our expert agents help you navigate the real estate market.
          </p>
          <button
            onClick={() => setIsQuestionnaireOpen(true)}
            className="bg-primary text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
          >
            Schedule a Consultation
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <HomeIcon className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">AceRealtors</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect home. Expert agents, premium listings, and seamless experiences.
              </p>
              <div className="space-y-3">
                <a href="tel:855-696-1455" className="flex items-center text-gray-400 hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  855-696-1455
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} AceRealtors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}