import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    question: 'What is AceRealtors?',
    answer: 'AceRealtors is a premier agent selection service that vets top 1% agents according to their performance in the last 10 years so your property gets sold within 45 days. We also work with top 1% agents to lower their commissions and secure an exclusive deal for you.',
  },
  {
    question: 'How does AceRealtors work?',
    answer: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-primary mb-2">Buying & Selling</h4>
          <p className="text-gray-600 leading-relaxed">
            Move into your new home with peace of mind using Buy Before You Sell. Make a strong offer without a sale contingency and sell your current home on your timeline.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">Selling a Home</h4>
          <p className="text-gray-600 leading-relaxed">
            AceRealtors connects sellers with top agents for faster, higher sales. You can also explore all-cash offers through our Simple Sale platform.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">Buying a Home</h4>
          <p className="text-gray-600 leading-relaxed">
            AceRealtors matches buyers with top local agents and loan officers, helping you buy confidently with our nationwide network of 30,000+ trusted professionals.
          </p>
        </div>
      </div>
    ),
  },
  {
    question: 'Does AceRealtors charge a fee to get exclusive low commission deals from agents?',
    answer: 'No, AceRealtors does not charge any fees for exclusive low commission deals. Our service is completely free. We connect you with top agents who offer reduced commission rates, ensuring you get expert help and savings without any hidden costs.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-xl font-semibold text-secondary">{faq.question}</h3>
            <ChevronDown
              className={`w-6 h-6 text-primary transition-transform duration-200 ${
                openIndex === index ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`px-8 transition-all duration-200 ease-in-out ${
              openIndex === index ? 'max-h-[1000px] py-6' : 'max-h-0 overflow-hidden'
            }`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}