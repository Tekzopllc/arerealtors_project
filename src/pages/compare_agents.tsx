import { HomeIcon, Phone, MapPin, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Footer.module.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "../animations.css";
import "../index.css";
import "../styles/slider.css";
import { getCityFromUrl } from "../utils/urlUtils";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";

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
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false; // RFC 5321
  if (email.length < 3) return false;

  // Check for multiple @ symbols
  const atSymbols = email.split("@").length - 1;
  if (atSymbols !== 1) return false;

  // Split email into local part and domain
  const [localPart, domain] = email.split("@");

  // Local part checks
  if (localPart.length > 64) return false; // RFC 5321
  if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
  if (localPart.includes("..")) return false;

  // Domain checks
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.includes("..")) return false;
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) return false;

  // Full regex test
  return emailRegex.test(email);
};

const getEmailValidationMessage = (email: string): string => {
  if (!email) return "Email is required";
  if (email.length > 254) return "Email is too long";
  if (email.length < 3) return "Email is too short";

  const atSymbols = email.split("@").length - 1;
  if (atSymbols === 0) return "Email must contain @ symbol";
  if (atSymbols > 1) return "Email cannot contain multiple @ symbols";

  const [localPart, domain] = email.split("@");

  if (localPart.length > 64) return "Local part of email is too long";
  if (localPart.startsWith(".") || localPart.endsWith("."))
    return "Local part cannot start or end with a dot";
  if (localPart.includes(".."))
    return "Local part cannot contain consecutive dots";

  if (!domain) return "Domain is required";
  if (domain.startsWith(".") || domain.endsWith("."))
    return "Domain cannot start or end with a dot";
  if (domain.includes("..")) return "Domain cannot contain consecutive dots";
  if (!/^[a-zA-Z0-9.-]+$/.test(domain))
    return "Domain contains invalid characters";

  if (!validateEmail(email)) return "Invalid email format";

  return "";
};

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Google Places Autocomplete input reference
// Google Maps type declarations
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: typeof google.maps.places.Autocomplete;
        };
      };
    };
  }
}

// Define interface for questionnaire data
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
  const cleanPhone = phone.replace(/^\+/, "").replace(/\D/g, "");

  // Format: Keep last 10 digits together, everything before that is country code
  if (cleanPhone.length > 10) {
    const countryCode = cleanPhone.slice(0, -10);
    const restOfNumber = cleanPhone.slice(-10);
    return `+${countryCode} ${restOfNumber}`;
  }
  // If number is 10 digits or less, assume US (+1)
  return `+1 ${cleanPhone}`;
};

// Format currency with better precision
const formatCurrency = (value: number): string => {
  // Special case for max value
  if (value >= 2000000) {
    return "$2M+";
  }

  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else {
    return `$${(value / 1000).toFixed(0)}K`;
  }
};

// Function to format budget range for display
const formatBudgetRange = (value: number): string => {
  // Calculate the upper range based on value
  let upperValue;
  if (value < 1000000) {
    upperValue = value + 50000;
  } else {
    upperValue = value + 250000;
  }

  return `${formatCurrency(value)} - ${formatCurrency(upperValue)}`;
};

// Handle step size change for slider
const handleSliderChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<QuestionnaireData>>,
  formData: QuestionnaireData
) => {
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

// AgentQuestionnaire Component
function AgentQuestionnaire({
  isOpen,
  onClose,
  onSubmit,
  setShowOtherPropertyTypePopup,
  setIsPopupClosing,
  setOtherPropertyType,
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
}: QuestionnaireProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [cityName, setCityName] = useState("");
  const totalSteps = 6; // Each input is now a separate page
  const [searchParams] = useSearchParams();

  // Reference to store and clear timeouts
  const closeTimeoutRef = useRef<number | null>(null);
  const [city, setCity] = useState("");
  const country = searchParams.get("country");

  useEffect(() => {
    const fetchCity = async () => {
      const city = await getCityFromUrl();
      setCity(city);
    };
    fetchCity();
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

      // Only reset form if it's the initial open
      if (currentStep === 1) {
        setFormData({
          timeframe: "",
          location: "",
          budget: 300000,
          propertyType: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "+1", // Initialize with +1 for US
        });
      }

      setSubmitError(null);
      setShowSuccess(false);
      setIsClosing(false);
      setShowOtherPropertyTypePopup(false);
      setIsPopupClosing(false);
      setOtherPropertyType("");
    }
  }, [isOpen, currentStep]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Log the form data before submission
      console.log("Form data before submission:", formData);

      // Check for property type in both form data and localStorage
      const savedPropertyType = localStorage.getItem("propertyType");
      if (!formData.propertyType && savedPropertyType) {
        setFormData((prev) => ({
          ...prev,
          propertyType: savedPropertyType,
        }));
      }

      // Validate property type
      if (!formData.propertyType && !savedPropertyType) {
        setSubmitError("Please select a property type");
        setIsSubmitting(false);
        return;
      }

      // Format the data for Supabase - Update budget range formatting
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formatPhoneNumber(formData.phone),
        budget:
          formData.budget < 1000000
            ? `${formData.budget} - ${formData.budget + 50000}`
            : `${formData.budget} - ${formData.budget + 250000}`,
        location: formData.location,
        propertytype: formData.propertyType,
        timeframe: formData.timeframe,
      };

      console.log("Submission data:", submissionData);

      // Insert data into Supabase
      const { error } = await supabase
        .from("submitted_data")
        .insert([submissionData]);

      if (error) {
        console.error("Error submitting form:", error);
        setSubmitError("Failed to submit your information. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Navigate to thank-you page using useNavigate
      navigate("/thank-you");
    } catch (err) {
      console.error("Unexpected error:", err);
      setSubmitError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Log current state before moving to next step
      console.log("Current state before next step:", {
        step: currentStep,
        formData: formData,
      });

      // Special handling for step 2 (property type)
      if (currentStep === 2) {
        // Ensure property type is selected
        if (!formData.propertyType) {
          console.log("Preventing next step - no property type selected");
          return;
        }

        // Store property type in local storage to prevent loss
        localStorage.setItem("propertyType", formData.propertyType);
      }

      // If moving past step 2, ensure property type is preserved
      if (currentStep > 2) {
        const savedPropertyType = localStorage.getItem("propertyType");
        if (savedPropertyType && !formData.propertyType) {
          setFormData((prev) => ({
            ...prev,
            propertyType: savedPropertyType,
          }));
        }
      }

      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      // If returning to step 2, restore property type from storage
      if (currentStep - 1 === 2) {
        const savedPropertyType = localStorage.getItem("propertyType");
        if (savedPropertyType) {
          setFormData((prev) => ({
            ...prev,
            propertyType: savedPropertyType,
          }));
        }
      }
      setCurrentStep(currentStep - 1);
    }
  };

  // Cleanup localStorage on unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("propertyType");
    };
  }, []);

  const getProgressWidth = () => {
    return `${(currentStep / totalSteps) * 100}%`;
  };

  if (!isOpen) return null;

  // Log initial mount and state
  useEffect(() => {
    console.log("AgentQuestionnaire mounted");
    console.log("Initial formData:", formData);
  }, []);

  // Monitor propertyType changes
  useEffect(() => {
    console.log("Property type changed:", formData.propertyType);
  }, [formData.propertyType]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityName = await getCityFromUrl();
        console.log("City name from URL:", cityName);

        if (cityName) {
          setCityName(cityName);
        }
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };

    fetchCity();
  }, []);

  return (
    <div className="bg-white rounded-lg w-full h-auto min-h-[550px] overflow-hidden shadow-lg border border-[#eaeaea] relative">
      {" "}
      {/* Success message overlay with higher z-index */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-[150] ">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#272727] mb-4">
              Thank you for your time
            </div>
            <div className="text-gray-600">
              We will hand select a realtor for you from your area within next
              few minutes and have them reach out to you.
            </div>
          </div>
        </div>
      )}
      <div className="MessageAgentForm --funnel h-full flex flex-col text-[rgba(39,39,39,0.8)] text-sm md:text-base font-normal relative">
        {/* Progress header */}
        <div className="MessageAgentForm__progress-header relative z-[3] bg-[#f8f8f8] ">
          <div className="ProgressBar bg-[#eaeaea] h-3 w-full rounded-none">
            <div
              className="ProgressBar__inner bg-[#ea580c] h-full rounded-none transition-all duration-200 ease-in-out"
              style={{ maxWidth: getProgressWidth() }}
            />
          </div>
        </div>

        {/* Step 1: Budget (Slider) */}
        <div
          className={`MessageAgentForm__screen ${
            currentStep === 1 ? "block" : "hidden"
          }
  absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[30px] md:pt-[40px] md:px-9`}
        >
          {/* Heading - Hidden on mobile, visible on desktop */}
          <div className="flex-col items-center hidden mb-4 md:flex">
            <div
              className="MessageAgentForm__screen-heading text-lg md:text-[2.5rem] font-bold text-[#272727] mb-1 pt-6 md:pt-0"
              style={{ marginBottom: "1rem" }}
            >
              Find The Best Realtors
            </div>
            <div className="MessageAgentForm__screen-heading text-lg md:text-[2.5rem] font-bold text-[#272727] mb-1">
              {city ? city : `In Your City`}
            </div>
            <p className="mt-4 mb-2 text-base md:text-xl">
              Instantly see a personalized list of great agents to choose from.
            </p>
          </div>

          <div
            className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-3 md:mb-4 text-center"
            style={{
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            What price are you hoping to sell at?
          </div>
          <div>
            <div
              className="text-center text-2xl md:text-3xl font-bold text-[#ea580c] mb-4"
              style={{
                marginBottom: "2rem",
              }}
            >
              {formatBudgetRange(formData.budget)}
            </div>

            <div className="mb-3">
              <input
                type="range"
                min="50000"
                max="2000000"
                step="1000" // Use a small step for smooth slider movement
                value={formData.budget}
                onChange={(e) => handleSliderChange(e, setFormData, formData)}
                className="w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ea580c 0%, #ea580c ${
                    ((formData.budget - 50000) / (2000000 - 50000)) * 100
                  }%, #eaeaea ${
                    ((formData.budget - 50000) / (2000000 - 50000)) * 100
                  }%, #eaeaea 100%)`,
                }}
              />
            </div>

            <div
              className="flex justify-between mb-3 text-xs text-gray-500"
              style={{
                marginBottom: "1rem",
              }}
            >
              <span>$50K</span>
              <span>$500K</span>
              <span>$1M</span>
              <span>$2M+</span>
            </div>
          </div>

          <div className="flex items-center justify-center mt-2 MessageAgentForm__screen-controls">
            <button
              onClick={nextStep}
              className="bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors hover:bg-[#d24b09]"
              style={{
                marginBottom: "2.5rem",
              }}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Step 2: Property Type */}
        <div
          className={`MessageAgentForm__screen ${
            currentStep === 2 ? "block animate-fadeInRight" : "hidden"
          }
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}
        >
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What kind of property are you selling?
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {["Single Family", "Condo", "Land/Lot", "Other"].map((option) => (
              <button
                key={option}
                onClick={() => {
                  if (option === "Other") {
                    setFormData((prevData) => ({
                      ...prevData,
                      propertyType: "Other",
                    }));
                    setShowOtherPropertyTypePopup(true);
                  } else {
                    // Update form data and navigate in a single operation
                    setFormData((prevData) => ({
                      ...prevData,
                      propertyType: option,
                    }));
                    // Store in localStorage to prevent loss of selection
                    localStorage.setItem("propertyType", option);
                    // Immediately proceed to next step
                    setCurrentStep((prev) => prev + 1);
                  }
                }}
                className={`flex items-center justify-between p-4 border rounded-md hover:border-[#ea580c] transition-all duration-200
                  ${
                    formData.propertyType === option
                      ? "border-2 border-[#ea580c] shadow-[0_0_0_1px_#ea580c]"
                      : "border-[#eaeaea]"
                  }`}
              >
                <span className="text-[#272727]">{option}</span>
                {formData.propertyType === option && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                      fill="#ea580c"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Popup is now handled in parent component */}

          <div className="flex items-center justify-between pt-4 mt-6 MessageAgentForm__screen-controls">
            <button
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
          </div>
        </div>

        {/* Step 3: Location */}
        <div
          className={`MessageAgentForm__screen ${
            currentStep === 3 ? "block animate-fadeInRight" : "hidden"
          }
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}
        >
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What is the address of your property?
          </div>
          <p>So we can recommend experts who have sold similar properties.</p>

          <div className="relative mt-4">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <div className="absolute z-10 text-gray-500 transform -translate-y-1/2 left-4 top-1/2">
                <MapPin className="w-5 h-5" />
              </div>
              <GooglePlacesAutocomplete
                selectProps={{
                  placeholder: "Enter your address...",
                  value: formData.location
                    ? { label: formData.location, value: formData.location }
                    : null,
                  onChange: async (
                    place: { label: string; value: string } | null
                  ) => {
                    if (!place) {
                      setFormData({
                        ...formData,
                        location: "",
                      });
                      return;
                    }

                    try {
                      const results = await geocodeByAddress(place.label);
                      if (results && results.length > 0) {
                        const addressComponents = results[0].address_components;
                        const streetNumber = addressComponents.find(
                          (component) =>
                            component.types.includes("street_number")
                        )?.long_name;
                        const streetName = addressComponents.find((component) =>
                          component.types.includes("route")
                        )?.long_name;
                        const city = addressComponents.find((component) =>
                          component.types.includes("locality")
                        )?.long_name;
                        const state = addressComponents.find((component) =>
                          component.types.includes(
                            "administrative_area_level_1"
                          )
                        )?.short_name;
                        const zipCode = addressComponents.find((component) =>
                          component.types.includes("postal_code")
                        )?.long_name;

                        const formattedAddress = `${
                          streetNumber ? streetNumber + " " : ""
                        }${streetName ? streetName + ", " : ""}${
                          city ? city + ", " : ""
                        }${state ? state + " " : ""}${zipCode ? zipCode : ""}`;

                        setFormData({
                          ...formData,
                          location: formattedAddress,
                        });
                      } else {
                        setFormData({
                          ...formData,
                          location: place.label,
                        });
                      }
                    } catch (error) {
                      console.error("Error geocoding address:", error);
                      setFormData({
                        ...formData,
                        location: place.label,
                      });
                    }
                  },
                  onBlur: () => {
                    if (!formData.location) {
                      setFormData({
                        ...formData,
                        location: "",
                      });
                    }
                  },
                  components: {
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  },
                  openMenuOnClick: false,
                  openMenuOnFocus: false,
                  styles: {
                    control: (provided: any) => ({
                      ...provided,
                      border: "1.5px solid rgba(234, 88, 12, 0.2)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      paddingLeft: "52px",
                      fontSize: "16px",
                      minHeight: "unset",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
                      cursor: "text",
                      "&:hover": {
                        borderColor: "rgba(234, 88, 12, 0.4)",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.05)",
                      },
                      "&:focus-within": {
                        borderColor: "#ea580c",
                        boxShadow: "0 0 0 3px rgba(234, 88, 12, 0.15)",
                      },
                    }),
                    menu: (provided: any) => ({
                      ...provided,
                      borderRadius: "12px",
                      border: "1px solid rgba(234, 88, 12, 0.2)",
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)",
                      marginTop: "4px",
                      padding: "8px",
                    }),
                    option: (provided: any, state: { isFocused: boolean }) => ({
                      ...provided,
                      padding: "12px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      backgroundColor: state.isFocused
                        ? "rgba(234, 88, 12, 0.1)"
                        : "transparent",
                      color: "#272727",
                      fontSize: "14px",
                      "&:hover": {
                        backgroundColor: "rgba(234, 88, 12, 0.1)",
                      },
                      "&:active": {
                        backgroundColor: "rgba(234, 88, 12, 0.15)",
                      },
                    }),
                    input: (provided: any) => ({
                      ...provided,
                      margin: "0",
                      padding: "0",
                    }),
                    valueContainer: (provided: any) => ({
                      ...provided,
                      padding: "0",
                    }),
                  },
                }}
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                autocompletionRequest={{
                  types: ["address"],
                  componentRestrictions: { country: "us" },
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-6 MessageAgentForm__screen-controls">
            <button
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.location.trim()}
              className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${
                !formData.location.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#d24b09]"
              }`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Step 4: Full Name */}
        <div
          className={`MessageAgentForm__screen ${
            currentStep === 4 ? "block animate-fadeInRight" : "hidden"
          }
         absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}
        >
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What's your name?
          </div>
          <p>Our recommendations are free. No strings attached.</p>

          <div className="mt-4 space-y-4">
            <div className="relative">
              <div className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="Enter your first name"
                className="w-full px-4 py-3 pl-12 border border-[#eaeaea] rounded-md focus:border-[#ea580c] hover:border-[#ea580c] transition-colors outline-none"
              />
            </div>
            <div className="relative">
              <div className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Enter your last name"
                className="w-full px-4 py-3 pl-12 border border-[#eaeaea] rounded-md focus:border-[#ea580c] hover:border-[#ea580c] transition-colors outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-6 MessageAgentForm__screen-controls">
            <button
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.firstName.trim() || !formData.lastName.trim()}
              className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${
                !formData.firstName.trim() || !formData.lastName.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#d24b09]"
              }`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Step 5: Email */}
        <div
          className={`MessageAgentForm__screen ${
            currentStep === 5 ? "block animate-fadeInRight" : "hidden"
          }
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}
        >
          <style>{phoneInputCustomStyles}</style>
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What's your email address?
          </div>

          <div className="">
            <p className="text-xs text-gray-500 ">
              <img
                src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg"
                alt="checkmark"
                className="inline-block w-4 h-4 mr-1"
              />{" "}
              Get a list of great local agents in your inbox today
            </p>
            <p className="mt-2 mb-5 text-xs text-gray-500">
              <img
                src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg"
                alt="checkmark"
                className="inline-block w-4 h-4 mr-1"
              />{" "}
              We or your carefully selected agents may email you to help with
              your transaction
            </p>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-[#eaeaea] rounded-md focus:border-[#ea580c] hover:border-[#ea580c] transition-colors outline-none"
            />
            {formData.email && (
              <p
                className={`text-xs mt-1 ${
                  validateEmail(formData.email)
                    ? "text-green-500"
                    : "text-red-500"
                } transition-colors`}
              >
                {getEmailValidationMessage(formData.email)}
              </p>
            )}
            {/* Email validation function */}
          </div>

          <div className="flex items-center justify-between pt-4 mt-6 MessageAgentForm__screen-controls">
            <button
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={
                !formData.email.trim() || !validateEmail(formData.email)
              }
              className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${
                !formData.email.trim() || !validateEmail(formData.email)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#d24b09]"
              }`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Step 6: Phone */}
        <div
          className={`MessageAgentForm__screen ${
            currentStep === 6 ? "block animate-fadeInRight" : "hidden"
          }
          absolute top-0 left-0 w-full h-full flex flex-col px-5 pt-[70px] md:px-9 md:pt-[70px]`}
        >
          <div className="MessageAgentForm__screen-heading text-lg md:text-2xl font-bold text-[#272727] mb-6 md:mb-10">
            What's your phone number?
          </div>
          <p>
            <img
              src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg"
              alt="checkmark"
              className="inline-block w-4 h-4 mr-1"
            />{" "}
            A phone consultation with your recommended agents is the best way to
            get help
          </p>

          <p>
            <img
              src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg"
              alt="checkmark"
              className="inline-block w-4 h-4 mr-1"
            />{" "}
            We or your carefully selected agents may call you to assist with
            your transaction
          </p>

          <div className="mt-4">
            <PhoneInput
              country={"us"}
              value={formData.phone}
              onChange={(phone) => {
                console.log("Phone changed:", phone);
                setFormData({ ...formData, phone: `+${phone}` });
              }}
              // defaultCountry={'us'}
              preferredCountries={["us"]}
              containerClass="!w-full phone-input-container"
              inputClass="!w-full !h-[46px] !py-3 !text-[#272727] !border-[#eaeaea] !rounded-md focus:!ring-[#ea580c] focus:!border-[#ea580c]"
              buttonClass="!border-[#eaeaea] !h-[46px] !rounded-l-md hover:!border-[#ea580c]"
              dropdownClass="!rounded-b-md !border-[#eaeaea] !text-[#272727]"
              searchClass="!rounded-t-md !m-0 !py-2"
              enableSearch={true}
              countryCodeEditable={false}
              specialLabel=""
            />
            <p className="mt-2 text-xs text-gray-500">
              By clicking "Accept", I am providing my esign and express written
              consent to allow ReferralExchange and our affiliated Participating
              Agents, or parties calling on their behalf, to contact me at the
              phone number above for marketing purposes, including through the
              use of calls, SMS/MMS, prerecorded and/or artificial voice
              messages using an automated dialing system to provide agent info,
              even if your number is listed on a corporate, state or federal
              Do-Not-Call list. Consent is not a condition for our service and
              you can revoke it at any time.
            </p>
          </div>

          {submitError && (
            <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 rounded-md">
              {submitError}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 mt-6 MessageAgentForm__screen-controls">
            <button
              onClick={prevStep}
              className="bg-white border border-[#eaeaea] rounded-md text-[#1e293b] px-6 py-3.5 md:min-w-[100px] font-bold transition-all duration-200 hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                !formData.phone || formData.phone.length < 8 || isSubmitting
              }
              className={`ml-auto bg-[#ea580c] rounded-md text-white px-6 py-3.5 md:min-w-[150px] font-bold font-mulish text-base transition-colors ${
                !formData.phone || formData.phone.length < 8 || isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#d24b09]"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function CompareAgentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showOtherPropertyTypePopup, setShowOtherPropertyTypePopup] =
    useState(false);
  const [isPopupClosing, setIsPopupClosing] = useState(false);
  const [otherPropertyType, setOtherPropertyType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [cityName, setCityName] = useState("");
  const [formData, setFormData] = useState<QuestionnaireData>({
    timeframe: "",
    location: "",
    budget: 300000,
    propertyType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1", // Initialize with +1 for US
  });
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityName = await getCityFromUrl();
        console.log("City name from URL:", cityName);

        if (cityName) {
          setCityName(cityName);
        }
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };

    fetchCity();
  }, []);

  const city = searchParams.get("city");

  const totalSteps = 6; // Each input is a separate page

  const handleSubmitQuestionnaire = (data: QuestionnaireData) => {
    console.log("Questionnaire submitted with data:", data);
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div
          className="w-full min-h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url(/bg.jpg)" }}
        >
          {/* Header Container */}
          <div className="py-4 Header_Header__container__ZX38g">
            <div className="px-4 mx-auto Header_Header__brand__sztra max-w-7xl md:px-8">
              <div className="flex items-center justify-between">
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
                  <a href="tel:+18556961455" className="text-sm font-medium text-white transition-colors md:text-base hover:text-orange-500 whitespace-nowrap">
                    +1 (855) 696-1455
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full max-w-[900px] mx-auto py-6 md:py-10 relative px-4 md:px-8">
            {/* Page Heading - Outside form for mobile */}
            <div className="block mb-6 text-center md:hidden">
              <h1 className="mb-2 text-2xl font-bold text-white">
                Find The Best Realtors
              </h1>
              <h2 className="mb-4 text-2xl font-bold text-white">
                {city ? city : `In Your City`}
              </h2>
              <p
                className="text-sm text-white/90"
                style={{ marginBottom: "3.5rem" }}
              >
                Instantly see a personalized list of great agents to choose
                from.
              </p>
            </div>
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
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ zIndex: 999999 }}
              >
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                <div
                  className={`relative bg-white rounded-lg p-6 w-full max-w-md mx-4 ${
                    isPopupClosing ? "animate-slideOut" : "animate-slideIn"
                  }`}
                  style={{ zIndex: 1000000 }}
                >
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
                          setOtherPropertyType("");
                          // Don't reset property type on cancel, keep the "Other" selection
                          setIsPopupClosing(false);
                        }, 300);
                      }}
                      className="px-4 py-2 border border-[#eaeaea] rounded-md text-[#1e293b] hover:border-[#ea580c] hover:text-[#ea580c]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!otherPropertyType.trim()) return;

                        const newPropertyType = `Other: ${otherPropertyType.trim()}`;
                        console.log(
                          "Setting Other property type to:",
                          newPropertyType
                        );

                        // Update form data first
                        setFormData((prevData) => {
                          const updatedData = {
                            ...prevData,
                            propertyType: newPropertyType,
                          };
                          console.log("Updated form data:", updatedData);
                          return updatedData;
                        });

                        // Ensure the form data is updated before proceeding
                        setIsPopupClosing(true);
                        setTimeout(() => {
                          setShowOtherPropertyTypePopup(false);
                          setOtherPropertyType("");
                          setIsPopupClosing(false);
                          // Add slight delay to ensure state is updated
                          setTimeout(() => {
                            nextStep();
                          }, 100);
                        }, 300);
                      }}
                      disabled={!otherPropertyType.trim()}
                      className={`px-4 py-2 bg-[#ea580c] rounded-md text-white ${
                        !otherPropertyType.trim()
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#d24b09]"
                      }`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className={`${styles.Footer} bg-[#12151a]`}>
            <div
              className={`${styles.Footer__container} max-w-7xl mx-auto px-4`}
            >
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
                    A REALTOR is a member of the National Association of
                    REALTORS® ©2005 - 2025, AceRealtors.com. All Rights
                    Reserved.
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
      </main>
    </div>
  );
}
