import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

// Google Maps type declarations
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: typeof google.maps.places.Autocomplete;
        };
      };
    }
  }
}

// Custom styles for phone input to match our premium theme
const phoneInputCustomStyles = `
  .phone-input-container {
    font-family: 'Inter', sans-serif;
  }
  .phone-input-container .special-label {
    display: none;
  }
  .phone-input-container .selected-flag {
    background-color: transparent !important;
    border-radius: 8px 0 0 8px !important;
    transition: all 0.3s ease;
  }
  .phone-input-container .selected-flag:hover,
  .phone-input-container .selected-flag:focus {
    background-color: rgba(234, 88, 12, 0.05) !important;
  }
  .phone-input-container .country-list {
    margin-top: 4px !important;
    border-radius: 12px !important;
    border: 1px solid rgba(234, 88, 12, 0.2) !important;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05) !important;
    max-height: 300px !important;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(234, 88, 12, 0.5) transparent;
  }
  .phone-input-container .country-list::-webkit-scrollbar {
    width: 6px;
  }
  .phone-input-container .country-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .phone-input-container .country-list::-webkit-scrollbar-thumb {
    background-color: rgba(234, 88, 12, 0.3);
    border-radius: 20px;
  }
  .phone-input-container .country-list .country:hover {
    background-color: rgba(234, 88, 12, 0.1) !important;
  }
  .phone-input-container .country-list .country.highlight {
    background-color: rgba(234, 88, 12, 0.15) !important;
  }
  .phone-input-container .country-list .country {
    padding: 10px 12px !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    transition: all 0.2s ease;
  }
  .phone-input-container .country-list .search {
    padding: 12px !important;
    border-bottom: 1px solid rgba(234, 88, 12, 0.1) !important;
    margin-bottom: 4px !important;
  }
  .phone-input-container .country-list .search-box {
    margin: 0 !important;
    width: 100% !important;
    border-radius: 8px !important;
    border: 1px solid rgba(234, 88, 12, 0.3) !important;
    padding: 8px 12px !important;
    transition: all 0.3s ease !important;
  }
  .phone-input-container .country-list .search-box:focus {
    border-color: #ea580c !important;
    box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.2) !important;
    outline: none !important;
  }
  .phone-input-container .react-tel-input .flag-dropdown.open {
    background-color: rgba(234, 88, 12, 0.05) !important;
    border-radius: 8px 0 0 0 !important;
  }
  .phone-input-container .selected-flag .arrow {
    border-top-color: #272727 !important;
    transition: all 0.3s ease;
  }
  .phone-input-container .selected-flag .arrow.up {
    border-bottom-color: #272727 !important;
  }
  .phone-input-container .country-list .country .flag {
    margin-right: 10px !important;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  .phone-input-container .country-list .country-name {
    margin-left: 35px !important;
    font-size: 14px !important;
  }
  .phone-input-container .country-list .dial-code {
    color: #6b7280 !important;
    font-size: 13px !important;
  }
  .phone-input-container input[type="tel"] {
    font-size: 16px !important;
    letter-spacing: 0.01em !important;
    transition: all 0.3s ease !important;
    border: none !important; /* Removed the border as requested */
  }
`;

// Animation styles
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }

  @keyframes fadeInDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeInRight {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes fadeInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 100% 0; }
  }

  .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
  .animate-fadeOut { animation: fadeOut 0.4s ease-out forwards; }
  .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
  .animate-slideOut { animation: slideOut 0.5s ease-out forwards; }
  .animate-fadeInDown { animation: fadeInDown 0.5s ease-out forwards; }
  .animate-fadeInRight { animation: fadeInRight 0.4s ease-out forwards; }
  .animate-fadeInLeft { animation: fadeInLeft 0.4s ease-out forwards; }
  .animate-pulse { animation: pulse 2s infinite; }

  .hover-scale {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .hover-scale:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .shimmer-bg {
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.8) 50%, 
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  /* Custom form elements */
  .premium-input {
    transition: all 0.3s ease;
    border: 1.5px solid rgba(234, 88, 12, 0.2);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    font-size: 16px;
    padding: 14px 16px;
    padding-left: 48px; /* Increased left padding to prevent text overlapping with icon */
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }
  
  .premium-input:hover {
    border-color: rgba(234, 88, 12, 0.4);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  }
  
  .premium-input:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.15);
  }

  .option-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: linear-gradient(145deg, rgba(234, 88, 12, 0.95), rgba(234, 88, 12, 0.85));
    color: white;
    border-radius: 12px;
    border: none;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.2);
  }
  
  .option-button:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 6px 20px rgba(234, 88, 12, 0.25);
  }
  
  .option-button:active {
    transform: translateY(1px);
  }
  
  .option-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 60%,
      transparent 100%
    );
    transition: all 0.6s ease;
    transform: translateX(-100%);
  }
  
  .option-button:hover::after {
    transform: translateX(100%);
  }
  
  .selected-option {
    background: linear-gradient(145deg, rgba(234, 88, 12, 1), rgba(210, 75, 9, 0.9));
    transform: scale(1.03);
    box-shadow: 0 8px 25px rgba(234, 88, 12, 0.3);
  }

  .primary-button {
    background: linear-gradient(145deg, #ea580c, #d24b09);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(234, 88, 12, 0.2);
  }
  
  .primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(234, 88, 12, 0.3);
  }
  
  .primary-button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(234, 88, 12, 0.2);
  }
  
  .primary-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 60%,
      transparent 100%
    );
    transition: all 0.6s ease;
    transform: translateX(-100%);
  }
  
  .primary-button:hover::after {
    transform: translateX(100%);
  }
  
  .secondary-button {
    background: white;
    color: #272727;
    border: 1.5px solid rgba(234, 88, 12, 0.2);
    border-radius: 12px;
    padding: 13px 24px;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .secondary-button:hover {
    border-color: #ea580c;
    color: #ea580c;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
  
  .secondary-button:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  /* Progress bar styling */
  .premium-progress-container {
    width: 100%;
    height: 6px;
    background: rgba(234, 88, 12, 0.1);
    border-radius: 0;
    overflow: hidden;
    position: relative;
  }
  
  .premium-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #ea580c, #f97316);
    border-radius: 0;
    transition: width 0.5s cubic-bezier(0.44, 0.13, 0.25, 1);
    position: relative;
  }
  
  .premium-progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.3));
    animation: pulse 2s infinite;
  }
  
  /* Slider customization */
  .premium-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 6px;
    outline: none;
    background: rgba(234, 88, 12, 0.15);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .premium-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ea580c, #d24b09);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 10px rgba(234, 88, 12, 0.4);
    transition: all 0.3s ease;
  }
  
  .premium-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ea580c, #d24b09);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 10px rgba(234, 88, 12, 0.4);
    transition: all 0.3s ease;
  }
  
  .premium-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 15px rgba(234, 88, 12, 0.5);
  }
  
  .premium-slider::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 15px rgba(234, 88, 12, 0.5);
  }
  
  .premium-slider:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }
  
  .premium-slider:active::-moz-range-thumb {
    transform: scale(1.2);
  }

  /* Modal backdrop and container */
  .modal-backdrop {
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-container {
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: white;
    overflow: hidden;
  }

  /* Success animation */
  @keyframes successPulse {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .success-animation {
    animation: successPulse 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  /* Base typography */
  .heading-text {
    font-weight: 700;
    color: #272727;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  
  .body-text {
    color: rgba(39, 39, 39, 0.8);
    line-height: 1.6;
  }
  
  .hint-text {
    color: rgba(39, 39, 39, 0.6);
    font-size: 0.875rem;
    line-height: 1.5;
  }

  /* Fix for input icon overlapping */
  .input-icon-wrapper {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
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

interface QuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuestionnaireData) => void;
}

export interface QuestionnaireData {
  timeframe: string;
  location: string;
  budget: number;
  propertyType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function AgentQuestionnaire({ isOpen, onClose, onSubmit, embedded = false }: QuestionnaireProps & { embedded?: boolean }) {
  const [formData, setFormData] = useState<QuestionnaireData>({
    timeframe: '',
    location: '',
    budget: 500000, // Default value for the slider
    propertyType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showOtherPropertyTypePopup, setShowOtherPropertyTypePopup] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isPopupClosing, setIsPopupClosing] = useState(false);
  const [otherPropertyType, setOtherPropertyType] = useState('');
  const totalSteps = 7; // Each input is now a separate page
  
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

  // Focus phone input when step 7 becomes active
  useEffect(() => {
    if (currentStep === 7) {
      const phoneInput = document.querySelector('.phone-input-container input[type="tel"]');
      if (phoneInput) {
        (phoneInput as HTMLInputElement).focus();
      }
    }
  }, [currentStep]);

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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
      setSubmitError(null);
      setShowSuccess(false);
      setIsClosing(false);
      setShowOtherPropertyTypePopup(false);
      setIsPopupClosing(false);
      setOtherPropertyType('');
    }
  }, [isOpen]);

  // Function to format phone number with spaces
  const formatPhoneNumber = (phone: string): string => {
    // Remove any existing formatting (spaces, parentheses, etc.)
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Format the data for Supabase - Update budget range formatting
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formatPhoneNumber(formData.phone),
        budget: formData.budget < 1000000 
          ? `${formData.budget} - ${formData.budget + 50000}`
          : `${formData.budget} - ${formData.budget + 250000}`,
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
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
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
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value}`;
    }
  };

  // Handle step size change for slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    // Determine the closest valid step
    let adjustedValue;
    if (value < 1000000) {
      // Below 1M: steps of 50K
      adjustedValue = Math.round(value / 50000) * 50000;
    } else {
      // Above 1M: steps of 250K
      adjustedValue = Math.round(value / 250000) * 250000;
    }
    
    setFormData({ ...formData, budget: adjustedValue });
  };

  // Function to format budget range for display
  const formatBudgetRange = (value: number): string => {
    if (value >= 2000000) {
      return "$2M+";
    }
    
    // Calculate the upper range based on value
    let upperValue;
    if (value < 1000000) {
      upperValue = value + 50000;
    } else {
      upperValue = value + 250000;
    }
    
    return `${formatCurrency(value)} - ${formatCurrency(upperValue)}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{animationStyles}</style>
      <div className={embedded ? 'w-full h-full' : `fixed inset-0 modal-backdrop z-50 flex items-center justify-center ${isClosing ? 'animate-fadeOut' : ''}`}>
        <div className={embedded ? 'w-full h-full' : `modal-container max-w-[900px] w-full h-[650px] relative ${isClosing ? 'animate-slideOut' : ''}`}>
          {/* Success message overlay with higher z-index */}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-[150] ">
              <div className="text-center success-animation">
                <div className="success-icon mb-6 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="rgba(234, 88, 12, 0.1)"/>
                    <circle cx="40" cy="40" r="32" fill="rgba(234, 88, 12, 0.15)"/>
                    <circle cx="40" cy="40" r="24" fill="#ea580c"/>
                    <path d="M32 40L38 46L48 34" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-[#272727] mb-4">Thank you!</div>
                <div className="text-gray-600 max-w-md mx-auto">
                  We've received your information and will reach out to you shortly to discuss your property needs.
                </div>
              </div>
            </div>
          )}
          
          <div className="MessageAgentForm h-full flex flex-col text-[rgba(39,39,39,0.8)] text-sm md:text-base font-normal relative">
            {/* Progress header */}
            <div className="relative z-[3] bg-[#f8f8f8] border-b border-[rgba(234,88,12,0.1)]">
              <div className="px-6 flex items-center justify-between">
                {/* <div className="flex items-center">
                  <span className="text-sm font-medium text-[#ea580c]">Step {currentStep} of {totalSteps}</span>
                </div> */}
                {!embedded && (
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-full hover:bg-[rgba(234,88,12,0.1)] transition-all duration-300 transform hover:rotate-90"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-[#272727]" />
                  </button>
                )}
              </div>
              <div className="premium-progress-container" style={{borderRadius: "25px"}}>
                <div
                  className="premium-progress-bar"
                  style={{ width: getProgressWidth(), borderRadius: "25px" }}
                />
              </div>
            </div>

            {/* Step 1: Timeframe */}
            <div className={`${currentStep === 1 ? 'block' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 md:px-10 md:pt-10 overflow-hidden`} style={{paddingTop: '1.5rem'}}>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl" style={{marginBottom: '2rem', marginTop: '-2rem'}}>
                When would you like to sell your house?
              </div>
              
              <div className="flex flex-col gap-4 mt-2 mb-4">
                {["ASAP", "1-3 months", "3-6 months", "6-12 months", "12+ months"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFormData({ ...formData, timeframe: option });
                      nextStep();
                    }}
                    className={`option-button ${formData.timeframe === option ? 'selected-option' : ''}`}
                  >
                    <span>{option}</span>
                    {formData.timeframe === option && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="white"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {currentStep === 1 && (
                <p className="text-xs text-gray-500 mt-auto text-center py-2" style={{marginBottom: '2rem'}}>
                  * No spam, your information is 100% safe with us
                </p>
              )}
             </div>

            {/* Step 2: Location */}
            <div className={`${currentStep === 2 ? 'block animate-fadeInRight' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 pt-8 md:px-10 md:pt-10 overflow-hidden`}>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl mb-4" style={{'fontSize': '1.55srem'}}>
                What is the address of your property?
              </div>
              <p className="body-text mb-6">So we can recommend experts who have sold similar properties in your area.</p>
              
              <div className="mt-4 relative">
                <div className="relative group">
                  <div className="input-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ea580c]">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter your property address..."
                    className="premium-input"
                    ref={(input) => {
                      if (input && !input.getAttribute('data-places-initialized')) {
                        if (window.google && window.google.maps && window.google.maps.places) {
                          const autocomplete = new window.google.maps.places.Autocomplete(input, {
                            types: ['address'],
                            componentRestrictions: { country: 'us' }
                          });
                          
                          autocomplete.addListener('place_changed', () => {
                            const place = autocomplete.getPlace();
                            if (place.formatted_address) {
                              setFormData({ ...formData, location: place.formatted_address });
                            }
                          });
                          
                          input.setAttribute('data-places-initialized', 'true');
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div
                className="MessageAgentForm__screen-controls flex justify-between items-center mt-2"
                style={{
                  marginBottom: '4rem',
                }}
              >
                <button
                  onClick={prevStep}
                  className="secondary-button"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors hover:bg-[#d24b09]"
                >
                  Continue
                </button>
              </div>
              
              {/* <div className="flex flex-col gap-2 mt-2 px-4 md:px-9 pb-4 md:pb-6 bg-white mt-auto">
                <p className="text-sm text-gray-500 flex items-start">
                  <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="w-4 h-4 mr-2 mt-1 flex-shrink-0"/>
                  <span>We've worked with over 10K happy home buyers & sellers across the U.S.</span>
                </p>
                <p className="text-sm text-gray-500 flex items-start">
                  <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="w-4 h-4 mr-2 mt-1 flex-shrink-0"/>
                  <span>We hand select the top agents from your area</span>
                </p>
                <p className="text-sm text-gray-500 flex items-start">
                  <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="w-4 h-4 mr-2 mt-1 flex-shrink-0"/>
                  <span>Get a free custom list of top agents and get connected within 2 minutes.</span>
                </p>
              </div> */}
            </div>

            {/* Step 3: Budget (Slider) */}
            <div className={`${currentStep === 3 ? 'block animate-fadeInRight' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 pt-8 md:px-10 md:pt-10 overflow-hidden`}>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl mb-6">
                What price are you hoping to sell at?
              </div>

              <div className="mt-6">
                <div className="text-center text-3xl md:text-4xl font-bold text-[#ea580c] mb-8">
                  {formatBudgetRange(formData.budget)}
                </div>
                
                <div className="mb-6 px-2">
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="1000" // Set a small step so the slider moves smoothly
                    value={formData.budget}
                    onChange={handleSliderChange}
                    className="premium-slider"
                    style={{
                      background: `linear-gradient(to right, #ea580c 0%, #ea580c ${((formData.budget - 50000) / (2000000 - 50000)) * 100}%, rgba(234, 88, 12, 0.15) ${((formData.budget - 50000) / (2000000 - 50000)) * 100}%, rgba(234, 88, 12, 0.15) 100%)`,
                    }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>$50K</span>
                  <span>$500K</span>
                  <span>$1M</span>
                  <span>$2M+</span>
                </div>
              </div>
              
              <div className="mt-auto pb-6 flex justify-between items-center">
                <button 
                  onClick={prevStep}
                  className="secondary-button"
                >
                  Back
                </button>
                <button 
                  onClick={nextStep}
                  className="primary-button"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Step 4: Property Type */}
            <div className={`${currentStep === 4 ? 'block animate-fadeInRight' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 pt-8 md:px-10 md:pt-10 overflow-hidden`}>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl mb-6">
                What kind of property are you selling?
              </div>
              
              <div className="flex flex-col gap-4 mt-2">
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
                    className={`option-button ${formData.propertyType === option ? 'selected-option' : ''}`}
                  >
                    <span>{option}</span>
                    {formData.propertyType === option && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="white"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Other Property Type Popup */}
              {showOtherPropertyTypePopup && (
                <div className={`fixed inset-0 modal-backdrop z-[60] flex items-center justify-center ${isPopupClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                  <div className={`bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl ${isPopupClosing ? 'animate-slideOut' : 'animate-slideIn'}`}>
                    <div className="heading-text text-xl mb-4">
                      Please specify the property type
                    </div>
                    <input
                      type="text"
                      value={otherPropertyType}
                      onChange={(e) => setOtherPropertyType(e.target.value)}
                      placeholder="Enter property type"
                      className="premium-input mb-6"
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
                        className="secondary-button"
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
                        className={`primary-button ${!otherPropertyType.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-auto pb-6 flex justify-between items-center">
                <button 
                  onClick={prevStep}
                  className="secondary-button"
                >
                  Back
                </button>
              </div>
            </div>

            {/* Step 5: Full Name */}
            <div className={`${currentStep === 5 ? 'block animate-fadeInRight' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 pt-8 md:px-10 md:pt-10 overflow-hidden`}>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl mb-6">
                What's your name?
              </div>
              
              <p className="body-text mb-6">
                Our recommendations are free, No strings attached.
              </p>

              <div className="mt-4 space-y-4">
                <div className="relative group">
                  <div className="input-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ea580c]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter your first name"
                    className="premium-input"
                  />
                </div>
                
                <div className="relative group">
                  <div className="input-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ea580c]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Enter your last name"
                    className="premium-input"
                  />
                </div>
              </div>
              
              <div className="mt-auto pb-6 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  className="secondary-button"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.firstName.trim() || !formData.lastName.trim()}
                  className={`primary-button ${!formData.firstName.trim() || !formData.lastName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Step 6: Email */}
            <div className={`${currentStep === 6 ? 'block animate-fadeInRight' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 pt-8 md:px-10 md:pt-10 overflow-hidden`}>
              <style>{phoneInputCustomStyles}</style>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl mb-6">
                What's your email address?
              </div>
              
              <div className="mt-4">
                <div className="relative group">
                  <div className="input-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ea580c]">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="premium-input"
                  />
                </div>
                <p className="hint-text mt-2">
                  We'll send your property matches to this email
                </p>
                {/* Email validation function */}
                {formData.email && (
                  <p className={`text-xs mt-1 ${validateEmail(formData.email) ? 'text-green-500' : 'text-red-500'} transition-colors`}>
                    {validateEmail(formData.email) ? '✓ Valid email' : getEmailValidationMessage(formData.email)}
                  </p>
                )}
              </div>
              
              <div className="mt-auto pb-6 flex justify-between items-center">
                <button 
                  onClick={prevStep}
                  className="secondary-button"
                >
                  Back
                </button>
                <button 
                  onClick={nextStep}
                  disabled={!formData.email.trim() || !validateEmail(formData.email)}
                  className={`primary-button ${!formData.email.trim() || !validateEmail(formData.email) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Step 7: Phone */}
            <div className={`${currentStep === 7 ? 'block animate-fadeInRight' : 'hidden'}
              absolute top-[65px] left-0 right-0 bottom-0 flex flex-col px-6 pt-8 md:px-10 md:pt-10 overflow-hidden`}>
              <div className="heading-text text-xl md:text-2xl lg:text-3xl mb-6">
                What's your phone number?
              </div>
              
              <div className="mt-4">
                <div className={`relative z-[100] ${showSuccess ? 'animate-fadeOut' : ''}`}>
                  <PhoneInput
                    country={'us'}
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone: `+${phone}` })}
                    containerClass="!w-full phone-input-container"
                    inputClass="!w-full !h-[54px] !py-3.5 !text-[#272727] !rounded-lg focus:!border-[#ea580c] !text-base"
                    buttonClass="!border-[rgba(234,88,12,0.2)] !h-[54px] !rounded-l-lg !bg-white"
                    dropdownClass="!rounded-lg !border-[rgba(234,88,12,0.2)] !text-[#272727]"
                    searchClass="!rounded-t-lg !m-0 !py-2"
                    enableSearch={true}
                    dropdownStyle={{ zIndex: 999 }}
                    inputProps={{
                      name: "phone",
                      required: true
                    }}
                    preferredCountries={['us']}
                  />
                </div>
                <p className="hint-text mt-2">
                  Your agent will call you at this number
                </p>
              </div>
              
              {submitError && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 animate-fadeIn">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}
              
              <div className={`mt-auto pb-6 flex justify-between items-center ${embedded ? '' : ''}`}>
                <button 
                  onClick={prevStep}
                  className="secondary-button"
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.phone || formData.phone.length < 8 || isSubmitting}
                  className={`primary-button ${(!formData.phone || formData.phone.length < 8 || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}