import { HomeIcon, Phone } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Footer.module.css';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import '../animations.css';
import '../index.css';

// Custom styles for phone input to match our theme
const phoneInputCustomStyles = `
  .phone-input-container {
    font-family: inherit;
  }
  .phone-input-container .special-label {
    display: none;
  }
  .phone-input-container .selected-flag {
    background-color: transparent !important;
    border-radius: 6px 0 0 6px !important;
  }
  .phone-input-container .selected-flag:hover,
  .phone-input-container .selected-flag:focus {
    background-color: #fff7ed !important;
  }
  .phone-input-container .country-list {
    margin-top: 2px !important;
    border-radius: 6px !important;
    border: 1px solid #eaeaea !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    max-height: 300px !important;
  }
  .phone-input-container .country-list .country:hover {
    background-color: #fff7ed !important;
  }
  .phone-input-container .country-list .country.highlight {
    background-color: #fff7ed !important;
  }
  .phone-input-container .country-list .country {
    padding: 8px 10px !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }
  .phone-input-container .country-list .search {
    padding: 10px !important;
    border-bottom: 1px solid #eaeaea !important;
  }
  .phone-input-container .country-list .search:focus {
    border-color: #ea580c !important;
  }
  .phone-input-container .react-tel-input .flag-dropdown.open {
    background-color: #fff7ed !important;
  }
  .phone-input-container .selected-flag .arrow {
    border-top-color: #272727 !important;
  }
  .phone-input-container .selected-flag .arrow.up {
    border-bottom-color: #272727 !important;
  }
  .phone-input-container .country-list .country .flag {
    margin-right: 8px !important;
  }
  .phone-input-container .country-list .country-name {
    margin-left: 35px !important;
  }
  .phone-input-container .country-list .dial-code {
    color: #6b7280 !important;
  }
`;

// Email validation functions
const validateEmail = (email: string): boolean => {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  // Basic structural checks
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC 5321
  if (email.length < 3) return false;
  
  // Check for multiple @ symbols
  const atSymbols = email.split('@').length - 1;
  if (atSymbols !== 1) return false;
  
  // Split email into local part and domain
  const [localPart, domain] = email.split('@');
  
  // Local part checks
  if (localPart.length > 64) return false; // RFC 5321
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  if (localPart.includes('..')) return false;
  
  // Domain checks
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (domain.includes('..')) return false;
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) return false;
  
  // Full regex test
  return emailRegex.test(email);
};

const getEmailValidationMessage = (email: string): string => {
  if (!email) return 'Email is required';
  if (email.length > 254) return 'Email is too long';
  if (email.length < 3) return 'Email is too short';
  
  const atSymbols = email.split('@').length - 1;
  if (atSymbols === 0) return 'Email must contain @ symbol';
  if (atSymbols > 1) return 'Email cannot contain multiple @ symbols';
  
  const [localPart, domain] = email.split('@');
  
  if (localPart.length > 64) return 'Local part of email is too long';
  if (localPart.startsWith('.') || localPart.endsWith('.')) return 'Local part cannot start or end with a dot';
  if (localPart.includes('..')) return 'Local part cannot contain consecutive dots';
  
  if (!domain) return 'Domain is required';
  if (domain.startsWith('.') || domain.endsWith('.')) return 'Domain cannot start or end with a dot';
  if (domain.includes('..')) return 'Domain cannot contain consecutive dots';
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) return 'Domain contains invalid characters';
  
  if (!validateEmail(email)) return 'Invalid email format';
  
  return '';
};

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// List of cities for the location dropdown
const cities = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI", "Oklahoma City, OK",
  "Portland, OR", "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD",
  "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA",
  "Mesa, AZ", "Kansas City, MO", "Atlanta, GA", "Long Beach, CA", "Colorado Springs, CO",
  "Raleigh, NC", "Miami, FL", "Virginia Beach, VA", "Omaha, NE", "Oakland, CA",
  "Minneapolis, MN", "Tulsa, OK", "Arlington, TX", "New Orleans, LA", "Wichita, KS",
  "Cleveland, OH", "Tampa, FL", "Bakersfield, CA", "Aurora, CO", "Honolulu, HI",
  "Anaheim, CA", "Santa Ana, CA", "Riverside, CA", "Corpus Christi, TX", "Lexington, KY",
  "Stockton, CA", "Henderson, NV", "Saint Paul, MN", "St. Louis, MO", "Cincinnati, OH",
  "Pittsburgh, PA", "Greensboro, NC", "Anchorage, AK", "Plano, TX", "Lincoln, NE",
  "Orlando, FL", "Irvine, CA", "Newark, NJ", "Toledo, OH", "Durham, NC",
  "Chula Vista, CA", "Fort Wayne, IN", "Jersey City, NJ", "St. Petersburg, FL",
  "Laredo, TX", "Madison, WI", "Chandler, AZ", "Buffalo, NY", "Lubbock, TX",
  "Scottsdale, AZ", "Reno, NV", "Glendale, AZ", "Gilbert, AZ", "Winston-Salem, NC",
  "North Las Vegas, NV", "Norfolk, VA", "Chesapeake, VA", "Garland, TX", "Boise, ID",
  "Baton Rouge, LA", "Richmond, VA", "Spokane, WA", "Des Moines, IA", "Montgomery, AL",
  "Modesto, CA", "Fayetteville, NC", "Shreveport, LA", "Akron, OH", "Tacoma, WA",
  "Aurora, IL"
];

// Define interface for questionnaire data
export interface QuestionnaireData {
  timeframe: string;
  location: string;
  budget: number;
  propertyType: string;
  name: string;
  email: string;
  phone: string;
}

// Define props for questionnaire component
interface QuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuestionnaireData) => void;
  showOtherPropertyTypePopup: boolean;
  setShowOtherPropertyTypePopup: React.Dispatch<React.SetStateAction<boolean>>;
  isPopupClosing: boolean;
  setIsPopupClosing: React.Dispatch<React.SetStateAction<boolean>>;
  otherPropertyType: string;
  setOtherPropertyType: React.Dispatch<React.SetStateAction<string>>;
  formData: QuestionnaireData;
  setFormData: React.Dispatch<React.SetStateAction<QuestionnaireData>>;
  onNextStep: () => void;
  onPrevStep: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}

// Function to format phone number with spaces
const formatPhoneNumber = (phone: string): string => {
  // Remove the '+' if it exists and any non-digits
  const cleanPhone = phone.replace(/^\+/, '').replace(/\D/g, '');
  
  // Format: Keep last 10 digits together, everything before that is country code
  if (cleanPhone.length > 10) {
    const countryCode = cleanPhone.slice(0, -10);
    const restOfNumber = cleanPhone.slice(-10);
    return `+${countryCode} ${restOfNumber}`;
  }
  // If number is 10 digits or less, assume US (+1)
  return `+1 ${cleanPhone}`;
};

// AgentQuestionnaire Component
function AgentQuestionnaire({
  isOpen,
  onClose,
  onSubmit,
  showOtherPropertyTypePopup,
  setShowOtherPropertyTypePopup,
  isPopupClosing,
  setIsPopupClosing,
  otherPropertyType,
  setOtherPropertyType,
  formData,
  setFormData,
  onNextStep,
  currentStep,
  setCurrentStep
}: QuestionnaireProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const totalSteps = 6; // Each input is now a separate page
  
  // Reference to store and clear timeouts
  const closeTimeoutRef = useRef<number | null>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownVisible(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Clean up any lingering timeouts when component unmounts or isOpen changes
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      // Clear any pending close timeouts when opening
      if (closeTimeoutRef.current !== null) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      
      setCurrentStep(1);
      setFormData({
        timeframe: '',
        location: '',
        budget: 500000,
        propertyType: '',
        name: '',
        email: '',
        phone: '+1', // Initialize with +1 for US
      });
      setSubmitError(null);
      setShowSuccess(false);
      setIsClosing(false);
      setShowOtherPropertyTypePopup(false);
      setIsPopupClosing(false);
      setOtherPropertyType('');
    }
  }, [isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Format the data for Supabase
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formatPhoneNumber(formData.phone),
        budget: `${formData.budget.toString()} - ${formData.budget + 50000}`,
        location: formData.location,
        propertytype: formData.propertyType,
        timeframe: formData.timeframe
      };
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('submitted_data')
        .insert([submissionData]);
      
      if (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Failed to submit your information. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      // Show success message
      setShowSuccess(true);
      setIsSubmitting(false);
      onSubmit(formData);
      
      // Start closing animation after 2 seconds
      setTimeout(() => {
        setIsClosing(true);
        // Close after animation completes and reset states
        closeTimeoutRef.current = window.setTimeout(() => {
          // Reset form data and states
          setFormData({
            timeframe: '',
            location: '',
            budget: 500000,
            propertyType: '',
            name: '',
            email: '',
            phone: '+1', // Initialize with +1 for US
          });
          setCurrentStep(1);
          setShowSuccess(false);
          setIsClosing(false);
          onClose();
          closeTimeoutRef.current = null;
        }, 500);
      }, 2000);
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    // Store the timeout ID so we can clear it if needed
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 500);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getProgressWidth = () => {
    return `${(currentStep / totalSteps) * 100}%`;
  };

  const formatCurrency = (value: number): string => {
    // Special case for max value
    if (value >= 2000000) {
      return "$2M+";
    }

    // Format the range
    const rangeEnd = value + 50000;
    
    // Format start of range
    const startValue = value >= 1000000
      ? `$${(value / 1000000).toFixed(1)}M`
      : `$${(value / 1000).toFixed(0)}K`;
    
    // Format end of range
    const endValue = rangeEnd >= 1000000
      ? `$${(rangeEnd / 1000000).toFixed(1)}M`
      : `$${(rangeEnd / 1000).toFixed(0)}K`;
    
    return `${startValue} - ${endValue}`;
  };

  if (!isOpen) return null;

  // Log initial mount and state
  useEffect(() => {
    console.log('AgentQuestionnaire mounted');
    console.log('Initial formData:', formData);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full h-auto min-h-[650px] overflow-hidden shadow-lg border border-[#eaeaea] relative">
      {/* Success message overlay with higher z-index */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-[150] animate-fadeIn">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#272727] mb-4">Thank you for your time</div>
            <div className="text-gray-600">We will hand select a realtor for you from your area within next few minutes and have them reach out to you.</div>
          </div>
        </div>
      )}
      <div className="MessageAgentForm --funnel h-full flex flex-col text-[rgba(39,39,39,0.8)] text-sm md:text-base font-normal relative">
        {/* Progress header */}
        <div className="MessageAgentForm__progress-header relative z-[3] bg-[#f8f8f8] animate-fadeInDown">
          <div className="ProgressBar bg-[#eaeaea] h-3 w-full rounded-none">
            <div
              className="ProgressBar__inner bg-[#ea580c] h-full rounded-none transition-all duration-200 ease-in-out"
              style={{ maxWidth: getProgressWidth() }}
            />
          </div>
        </div>

        {/* Step 1: Budget (Slider) */}
        <div className={`MessageAgentForm__screen ${currentStep === 1 ? 'block animate-fadeInRight' : 'hidden'}
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What price are you hoping to sell at?
          </div>

          <div className="mt-4">
            <div className="text-center text-2xl md:text-3xl font-bold text-[#ea580c] mb-8">
              {formatCurrency(formData.budget)}
            </div>
            
            <div className="mb-4">
              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                className="w-full h-2 bg-[#eaeaea] rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ea580c 0%, #ea580c ${((formData.budget - 50000) / (2000000 - 50000)) * 100}%, #eaeaea ${((formData.budget - 50000) / (2000000 - 50000)) * 100}%, #eaeaea 100%)`,
                }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>$50K - $100K</span>
              <span>$500K - $550K</span>
              <span>$1M - $1.05M</span>
              <span>$2M+</span>
            </div>
          </div>
          
          <div className="MessageAgentForm__screen-controls flex justify-end items-center mt-4">
            <button
              onClick={nextStep}
              className="bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors hover:bg-[#d24b09]"
            >
              Continue
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-4 px-5 md:px-9 pb-6 bg-white">
            <p className="text-sm md:text-base text-gray-500">
              <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> We've worked with over 10K happy home buyers & sellers across the U.S.
            </p>
            <p className="text-sm md:text-base text-gray-500">
              <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> We hand select the top agents from your area
            </p>
            <p className="text-sm md:text-base text-gray-500">
              <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> Get a free custom list of top agents and get connected within 2 minutes.
            </p>
          </div>
        </div>

        {/* Step 2: Property Type */}
        <div className={`MessageAgentForm__screen ${currentStep === 2 ? 'block animate-fadeInRight' : 'hidden'}
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What kind of property are you selling?
          </div>
          
          <div className="flex flex-col gap-4 mt-4">
            {["Single Family", "Condo", "Land/Lot", "Other"].map((option) => (
              <button
                key={option}
                onClick={() => {
                  if (option === "Other") {
                    setShowOtherPropertyTypePopup(true);
                    setFormData({ ...formData, propertyType: "Other" });
                  } else {
                    setFormData({ ...formData, propertyType: option });
                    nextStep();
                  }
                }}
                className={`flex items-center justify-between p-4 border rounded-md hover:border-[#ea580c] transition-all duration-200
                  ${formData.propertyType === option ? 'border-2 border-[#ea580c] shadow-[0_0_0_1px_#ea580c]' : 'border-[#eaeaea]'}`}
              >
                <span className="text-[#272727]">{option}</span>
                {formData.propertyType === option && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#ea580c"/>
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Popup is now handled in parent component */}
          
          <div className="MessageAgentForm__screen-controls flex justify-between items-center mt-6 pt-4">
            <button 
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
          </div>
        </div>

        {/* Step 3: Location */}
        <div className={`MessageAgentForm__screen ${currentStep === 3 ? 'block animate-fadeInRight' : 'hidden'}
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
          What is the address of your property?
          </div>
          <p>So we can recommend experts who have sold similar properties.</p>
          
          <div className="mt-4 relative">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setIsDropdownVisible(true);
                }}
                onFocus={() => setIsDropdownVisible(true)}
                placeholder="Type to search cities..."
                className="w-full px-4 py-3 border border-[#eaeaea] rounded-md focus:ring-[#ea580c] focus:border-[#ea580c] bg-white hover:border-[#ea580c] transition-colors"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {isDropdownVisible && (
                <div
                  className="absolute z-10 w-full mt-1 bg-white border border-[#eaeaea] rounded-md shadow-lg max-h-60 overflow-auto"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {cities
                    .filter(city =>
                      city.toLowerCase().includes(formData.location.toLowerCase())
                    )
                    .map((city) => (
                      <div
                        key={city}
                        onClick={() => {
                          setFormData({ ...formData, location: city });
                          setIsDropdownVisible(false);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        className={`px-4 py-2 cursor-pointer transition-colors ${
                          formData.location === city
                            ? 'bg-[#fff7ed] text-[#ea580c] font-medium'
                            : 'text-[#272727] hover:bg-[#fff7ed]'
                        }`}
                      >
                        {city}
                      </div>
                    ))}
                  {cities.filter(city =>
                    city.toLowerCase().includes(formData.location.toLowerCase())
                  ).length === 0 && (
                    <div className="px-4 py-2 text-gray-500 italic">
                      No cities found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="MessageAgentForm__screen-controls flex justify-between items-center mt-6 pt-4">
            <button
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.location.trim()}
              className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${!formData.location.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d24b09]'}`}
            >
              Continue
            </button>
          </div>
        </div>

        

        {/* Step 4: Full Name */}
        <div className={`MessageAgentForm__screen ${currentStep === 4 ? 'block animate-fadeInRight' : 'hidden'}
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What's your name?
          </div>
          <p>Our recommendations are free. No strings attached.</p>
          
          <div className="mt-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-[#eaeaea] rounded-md focus:ring-[#ea580c] focus:border-[#ea580c]"
            />
          </div>
          
          <div className="MessageAgentForm__screen-controls flex justify-between items-center mt-6 pt-4">
            <button 
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
            <button 
              onClick={nextStep}
              disabled={!formData.name.trim()}
              className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${!formData.name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d24b09]'}`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Step 5: Email */}
        <div className={`MessageAgentForm__screen ${currentStep === 5 ? 'block animate-fadeInRight' : 'hidden'}
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}>
          <style>{phoneInputCustomStyles}</style>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What's your email address?
          </div>
          
          <div className="mt-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-[#eaeaea] rounded-md focus:ring-[#ea580c] focus:border-[#ea580c]"
            />
            <p className="text-xs text-gray-500 mt-2">
            <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> Get a list of great local agents in your inbox today
            </p>
            <p className="text-xs text-gray-500 mt-2">
            <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> We or your carefully selected agents may email you to help with your transaction
            </p>
            {/* Email validation function */}
            {formData.email && (
              <p className={`text-xs mt-1 ${validateEmail(formData.email) ? 'text-green-500' : 'text-red-500'} transition-colors`}>
                {getEmailValidationMessage(formData.email)}
              </p>
            )}
          </div>
          
          <div className="MessageAgentForm__screen-controls flex justify-between items-center mt-6 pt-4">
                      <button
                        onClick={prevStep}
                        className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        disabled={!formData.email.trim() || !validateEmail(formData.email)}
                        className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${!formData.email.trim() || !validateEmail(formData.email) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d24b09]'}`}
                      >
                        Continue
                      </button>
                    </div>
        </div>

        {/* Step 6: Phone */}
        <div className={`MessageAgentForm__screen ${currentStep === 6 ? 'block animate-fadeInRight' : 'hidden'}
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What's your phone number?
          </div>
          <p><img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> A phone consultation with your recommended agents is the best way to get help</p>

              <p><img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> We or your carefully selected agents may call you to assist with your transaction</p>
          
          <div className="mt-4">
          <PhoneInput
            country={'us'}
            value={formData.phone}
            onChange={(phone) => {
              console.log('Phone changed:', phone);
              setFormData({ ...formData, phone: `+${phone}` });
            }}
            onCountryChange={(country) => {
              console.log('Country changed:', country);
            }}
            defaultCountry={'us'}
            preferredCountries={['us']}
            containerClass="!w-full phone-input-container"
            inputClass="!w-full !h-[46px] !py-3 !text-[#272727] !border-[#eaeaea] !rounded-md focus:!ring-[#ea580c] focus:!border-[#ea580c]"
            buttonClass="!border-[#eaeaea] !h-[46px] !rounded-l-md hover:!border-[#ea580c]"
            dropdownClass="!rounded-b-md !border-[#eaeaea] !text-[#272727]"
            searchClass="!rounded-t-md !m-0 !py-2"
            enableSearch={true}
            countryCodeEditable={false}
            specialLabel=""
          />
            <p className="text-xs text-gray-500 mt-2">
            By clicking “Accept”, I am providing my esign and express written consent to allow ReferralExchange and our affiliated Participating Agents, or parties calling on their behalf, to contact me at the phone number above for marketing purposes, including through the use of calls, SMS/MMS, prerecorded and/or artificial voice messages using an automated dialing system to provide agent info, even if your number is listed on a corporate, state or federal Do-Not-Call list. Consent is not a condition for our service and you can revoke it at any time.
            </p>
          </div>
          
          {submitError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {submitError}
            </div>
          )}
          
          <div className="MessageAgentForm__screen-controls flex justify-between items-center mt-6 pt-4">
                      <button
                        onClick={prevStep}
                        className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.phone || formData.phone.length < 8 || isSubmitting}
                        className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${(!formData.phone || formData.phone.length < 8 || isSubmitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d24b09]'}`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function CompareAgentsPage() {
  const [showOtherPropertyTypePopup, setShowOtherPropertyTypePopup] = useState(false);
  const [isPopupClosing, setIsPopupClosing] = useState(false);
  const [otherPropertyType, setOtherPropertyType] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireData>({
    timeframe: '',
    location: '',
    budget: 500000,
    propertyType: '',
    name: '',
    email: '',
    phone: '+1', // Initialize with +1 for US
  });

  const totalSteps = 6; // Each input is a separate page

  const handleSubmitQuestionnaire = (data: QuestionnaireData) => {
    console.log('Questionnaire submitted with data:', data);
    // Handle the submission data as needed
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitQuestionnaire(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="w-full max-w-[900px] mx-auto py-10 relative">
        {/* Agent Questionnaire */}
        <AgentQuestionnaire
          isOpen={true}
          onClose={() => {}}
          onSubmit={handleSubmitQuestionnaire}
          showOtherPropertyTypePopup={showOtherPropertyTypePopup}
          setShowOtherPropertyTypePopup={setShowOtherPropertyTypePopup}
          isPopupClosing={isPopupClosing}
          setIsPopupClosing={setIsPopupClosing}
          otherPropertyType={otherPropertyType}
          setOtherPropertyType={setOtherPropertyType}
          formData={formData}
          setFormData={setFormData}
          onNextStep={nextStep}
          onPrevStep={prevStep}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalSteps={totalSteps}
        />
        
        {/* Other Property Type Popup Portal */}
        {showOtherPropertyTypePopup && (
          <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 999999 }}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className={`relative bg-white rounded-lg p-6 w-full max-w-md mx-4 ${isPopupClosing ? 'animate-slideOut' : 'animate-slideIn'}`} style={{ zIndex: 1000000 }}>
              <div className="text-lg font-bold text-[#272727] mb-4">
                Please specify the property type
              </div>
              <input
                type="text"
                value={otherPropertyType}
                onChange={(e) => setOtherPropertyType(e.target.value)}
                placeholder="Enter property type"
                className="w-full px-4 py-3 border border-[#eaeaea] rounded-md focus:ring-[#ea580c] focus:border-[#ea580c] mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsPopupClosing(true);
                    setTimeout(() => {
                      setShowOtherPropertyTypePopup(false);
                      setOtherPropertyType('');
                      setFormData({ ...formData, propertyType: '' });
                      setIsPopupClosing(false);
                    }, 300);
                  }}
                  className="px-4 py-2 border border-[#eaeaea] rounded-md text-[#1e293b] hover:border-[#ea580c] hover:text-[#ea580c]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsPopupClosing(true);
                    setTimeout(() => {
                      setFormData({ ...formData, propertyType: `Other: ${otherPropertyType}` });
                      setShowOtherPropertyTypePopup(false);
                      setOtherPropertyType('');
                      setIsPopupClosing(false);
                      nextStep();
                    }, 300);
                  }}
                  disabled={!otherPropertyType.trim()}
                  className={`px-4 py-2 bg-[#ea580c] rounded-md text-white ${!otherPropertyType.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d24b09]'}`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className={styles.Footer}>
        <div className={styles.Footer__container}>
          <div className={styles.Footer__top}>
            <ul className={styles.Footer__nav}>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/tos">Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="#">Agents Join Here</a></li>
              <li><a href="#">Do Not Sell My Information</a></li>
            </ul>
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
              {/* <div className={`${styles.Footer__icon} ${styles.bbbContainer}`}>
                <img src="/referralexchange-458879.png" alt="BBB Logo" width="89" height="34" />
              </div> */}
            </div>
          </div>
          <div className={styles.Footer__bottom}>
            <div className={styles.Footer__copyright}>
              A REALTOR is a member of the National Association of REALTORS® ©2005 - 2025, AceRealtors.com. All Rights Reserved.
            </div>
            <select className={styles.LanguageSelector}>
              <option value="/" selected>ENG</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>
      </footer>
    </>
  );
}