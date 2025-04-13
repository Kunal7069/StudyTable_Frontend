import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

type FormStep = {
  id: string;
  question: string | ((data: Record<string, any>) => string);
  type: 'text' | 'email' | 'tel' | 'radio' | 'multi-select' | 'password';
  options?: string[];
  maxSelect?: number;
  showIf?: (formData: Record<string, any>) => boolean;
  validation?: (value: string) => boolean;
  required?: boolean;
};

const formSteps: FormStep[] = [
  { id: "name", question: "What is your name?", type: "text" },
  { id: "city", question: "Where are you from?", type: "text" },
  { id: "email", question: "What's your email address?", type: "email" },
  { 
    id: "class", 
    question: "Which class are you joining for Academic year 2025-2026?", 
    type: "radio", 
    options: ["10th", "11th", "12th"] 
  },
  {
    id: "subjects",
    question: (data) => `Select your subjects for Class ${data.class} (Select up to 6)`,
    type: "multi-select",
    options: [
      "Physics", "Chemistry", "Maths", "Biology",
      "Hindi", "English",
      "Infor Practices", "Computer Sci"],
    maxSelect: 6,
    required: true
  },
  {
    id: "10th_marks_overall",
    question: "What was your overall percentage in Class 10th?",
    type: "radio",
    options: ["Above 90%", "Between 75 to 90%", "Between 55 to 75%", "Below 55%"],
    showIf: (data) => data.class === "11th" || data.class === "12th"
  },
  {
    id: "10th_marks_maths",
    question: "What was your Mathematics performance in Class 10th?",
    type: "radio",
    options: ["Above 90%", "Between 75 to 90%", "Between 55 to 75%", "Below 55%"],
    showIf: (data) => data.class === "11th" || data.class === "12th"
  },
  {
    id: "10th_marks_science",
    question: "What was your Science performance in Class 10th?",
    type: "radio",
    options: ["Above 90%", "Between 75 to 90%", "Between 55 to 75%", "Below 55%"],
    showIf: (data) => data.class === "11th" || data.class === "12th"
  },
  {
    id: "11th_marks_overall",
    question: "What was your overall percentage in Class 11th?",
    type: "radio",
    options: ["Above 90%", "Between 75 to 90%", "Between 55 to 75%", "Below 55%"],
    showIf: (data) => data.class === "12th"
  },
  {
    id: "11th_marks_maths",
    question: "What was your Mathematics performance in Class 11th?",
    type: "radio",
    options: ["Above 90%", "Between 75 to 90%", "Between 55 to 75%", "Below 55%"],
    showIf: (data) => data.class === "12th"
  },
  {
    id: "11th_marks_science",
    question: "What was your Science performance in Class 11th?",
    type: "radio",
    options: ["Above 90%", "Between 75 to 90%", "Between 55 to 75%", "Below 55%"],
    showIf: (data) => data.class === "12th"
  },
  {
    id: "competitive_exams",
    question: "Which competitive exams are you preparing for? (Select up to 2)",
    type: "multi-select",
    options: ["Engineering", "Medical", "Olympiads"],
    maxSelect: 2,
    required: true
  },
  {
    id: "interesting_fact",
    question: "Tell us something about yourself!",
    type: "text",
    required: true
  },
  { 
    id: "password",
    question: "Create a password",
    type: "password",
    validation: (value) => value.length >= 8,
    required: true
  },
  {
    id: "confirmPassword",
    question: "Confirm your password",
    type: "password",
    required: true
  },
  {
    id: "phone",
    question: "What's your phone number?",
    type: "tel",
    validation: (value) => /^\d{10}$/.test(value),
    required: true
  }
];

interface FormDataStructure {
  [key: string]: any;
  name?: string;
  city?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  studentClass?: string;
  subjects?: string[];
  competitive_exams?: string[];
  about?: string;
  marks?: {
    '10th'?: {
      maths?: string;
      science?: string;
      overall?: string;
    };
    '11th'?: {
      maths?: string;
      physics?: string;
      chemistry?: string;
      overall?: string;
    };
  };
}

export const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [activeInputs, setActiveInputs] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdmissionCard, setShowAdmissionCard] = useState(false);
  const [admissionNumber, setAdmissionNumber] = useState("");
  
  const totalSteps = formSteps.length;
  const currentQuestion = formSteps[currentStep];

  // Calculate progress based on visible questions and class selection
  const calculateProgress = () => {
    const visibleSteps = formSteps.filter(step => {
      if (step.id === "otp") return showOtpField;
      return !step.showIf || step.showIf(formData);
    });
    
    const currentIndex = visibleSteps.findIndex(step => step.id === currentQuestion.id);
    const totalSteps = visibleSteps.length;

    // Return 100 if we're at the last visible step
    if (currentIndex === totalSteps - 1) return 100;
    
    return ((currentIndex + 1) / totalSteps) * 100;
  };
  
  const progress = calculateProgress();
  
  const handlePrevious = () => {
    const prevStep = getPreviousStep(currentStep);
    if (prevStep >= 0) {
      setCurrentStep(prevStep);
    }
  };
  
  const handleNext = () => {
    if (currentQuestion.type === "tel" && !showOtpField) {
      handleSendOTP();
      return;
    }

    if (currentQuestion.type === "tel" && showOtpField) {
      handleVerifyOTP();
      return;
    }

    const nextStep = getNextStep(currentStep);
    if (nextStep < formSteps.length) {
      setCurrentStep(nextStep);
    }
  };
  
  // Modified password validation to avoid infinite loop
  const validatePassword = (password: string, isConfirm = false) => {
    if (!password) return false;
    
    if (!isConfirm && password.length < 8) {
      return false;
    }
    if (isConfirm && password !== formData.password) {
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Clear password error when typing
    if (id === 'password' || id === 'confirmPassword') {
      setPasswordError(null);
    }

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Set password error messages on change
    if (id === 'password' && value) {
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      }
    } else if (id === 'confirmPassword' && value) {
      if (value !== formData.password) {
        setPasswordError("Passwords do not match");
      }
    }
  };
  
  const handleFocus = (id: string) => {
    setActiveInputs({
      ...activeInputs,
      [id]: true
    });
  };
  
  const handleBlur = (id: string) => {
    setActiveInputs({
      ...activeInputs,
      [id]: !!formData[id]
    });
  };
  
  const handleSelectOption = (fieldId: string, option: string) => {
    setFormData({
      ...formData,
      [fieldId]: option
    });
  };
  
  
  const isActive = (id: string) => activeInputs[id] || !!formData[id];
  
  // Check if current step is complete
  const isCurrentStepComplete = () => {
    if (!currentQuestion) return false;

    if (currentQuestion.type === "tel") {
      if (!showOtpField) {
        return formData[currentQuestion.id]?.length === 10;
      }
      return formData.otp?.length === 4;
    }

    if (currentQuestion.type === "multi-select") {
      const selectedOptions = formData[currentQuestion.id]?.split(',').filter(Boolean) || [];
      if (currentQuestion.id === "competitive_exams") {
        return selectedOptions.length > 0 && selectedOptions.length <= 2;
      }
      return selectedOptions.length > 0;
    }

    // Modified password validation check
    if (currentQuestion.id === 'password') {
      return validatePassword(formData[currentQuestion.id] || '');
    }

    if (currentQuestion.id === 'confirmPassword') {
      return validatePassword(formData[currentQuestion.id] || '', true);
    }

    return currentQuestion.validation 
      ? currentQuestion.validation(formData[currentQuestion.id] || "")
      : !!formData[currentQuestion.id];
  };
  
  const isNextDisabled = !isCurrentStepComplete();

  // Modified to handle conditional questions more accurately
  const getNextStep = (currentStep: number): number => {
    let nextStep = currentStep + 1;
    while (nextStep < formSteps.length) {
      const nextQuestion = formSteps[nextStep];
      if (!nextQuestion.showIf || nextQuestion.showIf(formData)) {
        return nextStep;
      }
      nextStep++;
    }
    return nextStep;
  };

  const getPreviousStep = (currentStep: number): number => {
    let prevStep = currentStep - 1;
    while (prevStep >= 0) {
      const prevQuestion = formSteps[prevStep];
      if (!prevQuestion.showIf || prevQuestion.showIf(formData)) {
        return prevStep;
      }
      prevStep--;
    }
    return prevStep;
  };

  const handleMultiSelect = (fieldId: string, option: string) => {
    const currentSelections = formData[fieldId]?.split(',').filter(Boolean) || [];
    const maxSelect = formSteps.find(step => step.id === fieldId)?.maxSelect || 1;
    
    if (currentSelections.includes(option)) {
      const newSelections = currentSelections.filter(item => item !== option);
      setFormData({
        ...formData,
        [fieldId]: newSelections.join(',')
      });
    } else if (currentSelections.length < maxSelect) {
      setFormData({
        ...formData,
        [fieldId]: [...currentSelections, option].join(',')
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOTP = async () => {
    if (formData.phone?.length === 10) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/otp/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            phoneNumber: `+91${formData.phone}` 
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to send OTP');
        }

        if (data.status === 'pending') {
          setShowOtpField(true);
          setError(null);
          toast.success('OTP sent successfully!');
        } else {
          throw new Error('Failed to send OTP');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send OTP';
        toast.error(message);
        setError(message);
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/otp/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `+91${formData.phone}`,
          otpCode: formData.otp 
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      toast.success('OTP verified successfully!');
      
      // Proceed with signup
      const transformedData = transformFormData();
      const signupResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/student/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      const signupData = await signupResponse.json();
      if (!signupResponse.ok) {
        throw new Error(signupData.error || 'Signup failed');
      }

      setAdmissionNumber(signupData.admissionNumber);
      setShowAdmissionCard(true);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      toast.error(message);
      setError(message);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 10) { 
      setFormData(prev => ({
        ...prev,
        [e.target.id]: value
      }));
    }
  };

  // Function to transform form data to API format
  const transformFormData = (): FormDataStructure => {
    const transformedData: FormDataStructure = {
      name: formData.name,
      city: formData.city,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      studentClass: formData.class,
      subjects: formData.subjects?.split(','),
      competitive_exams: formData.competitive_exams?.split(','),
      about: formData.interesting_fact,
      marks: {}
    };

    // Add marks based on class
    if (formData.class === '11th' || formData.class === '12th') {
      transformedData.marks!['10th'] = {
        maths: formData['10th_marks_maths'],
        science: formData['10th_marks_science'],
        overall: formData['10th_marks_overall']
      };
    }

    if (formData.class === '12th') {
      transformedData.marks!['11th'] = {
        maths: formData['11th_marks_maths'],
        physics: formData['11th_marks_science'],
        chemistry: formData['11th_marks_science'],
        overall: formData['11th_marks_overall']
      };
    }

    return transformedData;
  };

  // Add admission card component
  const AdmissionCard = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Registration Successful!</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Please save your admission number</p>
            <p className="text-2xl font-bold text-blue-600">{admissionNumber}</p>
          </div>
          <Button
            className="w-full bg-[#155dfc] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              localStorage.setItem('admissionNumber', admissionNumber);
              navigate('/signin');
            }}
          >
            Proceed to Login
          </Button>
        </div>
      </div>
    </div>
  );

  const renderQuestionContent = () => {
    if (currentQuestion.type === "radio") {
      const options = currentQuestion.options || [];
      const useGrid = options.length > 3;
      
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#070707] mb-6 [font-family:'Instrument_Sans',Helvetica]">
            {typeof currentQuestion.question === 'function' 
              ? currentQuestion.question(formData)
              : currentQuestion.question}
          </h2>
          <div className={`grid ${useGrid ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelectOption(currentQuestion.id, option)}
                className={`flex items-center justify-between p-3 md:p-4 rounded-lg border transition-all w-full ${
                  formData[currentQuestion.id] === option 
                    ? 'border-[#155dfc] bg-[#155dfc0d] text-[#155dfc]' 
                    : 'border-gray-200 hover:border-[#155dfc] hover:bg-[#155dfc05]'
                }`}
              >
                <span className="text-[15px] md:text-[16px] font-medium">{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                  formData[currentQuestion.id] === option 
                    ? 'border-[#155dfc] bg-[#155dfc]' 
                    : 'border-gray-300'
                }`}>
                  {formData[currentQuestion.id] === option && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentQuestion.type === "multi-select") {
      const selectedOptions = formData[currentQuestion.id]?.split(',').filter(Boolean) || [];
      const options = currentQuestion.options || [];
      const useGrid = options.length > 3;

      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#070707] mb-6 [font-family:'Instrument_Sans',Helvetica]">
            {typeof currentQuestion.question === 'function' 
              ? currentQuestion.question(formData)
              : currentQuestion.question}
          </h2>
          <div className={`grid ${useGrid ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleMultiSelect(currentQuestion.id, option)}
                disabled={!selectedOptions.includes(option) && selectedOptions.length >= (currentQuestion.maxSelect || 1)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  selectedOptions.includes(option)
                    ? 'border-[#155dfc] bg-[#155dfc0d] text-[#155dfc]' 
                    : 'border-gray-200 hover:border-[#155dfc] hover:bg-[#155dfc05]'
                } ${!selectedOptions.includes(option) && selectedOptions.length >= (currentQuestion.maxSelect || 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-[17px] font-medium">{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOptions.includes(option)
                    ? 'border-[#155dfc] bg-[#155dfc]' 
                    : 'border-gray-300'
                }`}>
                  {selectedOptions.includes(option) && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
          {currentQuestion.maxSelect && (
            <p className="text-sm text-gray-500 mt-2">
              Select up to {currentQuestion.maxSelect} options
            </p>
          )}
        </div>
      );
    }

    if (currentQuestion.type === "text" || currentQuestion.type === "email" || currentQuestion.type === "tel") {
      if (currentQuestion.type === "tel") {
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#070707] mb-6 [font-family:'Instrument_Sans',Helvetica]">
              {typeof currentQuestion.question === 'function'
                ? currentQuestion.question(formData)
                : currentQuestion.question}
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  className="border-0 border-b border-[#838383] rounded-none focus-visible:ring-0 px-0 h-auto pb-2 bg-transparent text-[#191919]"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData[currentQuestion.id] || ""}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  placeholder="Enter your 10-digit phone number"
                  disabled={showOtpField}
                  id={currentQuestion.id}
                />
              </div>
              
              {showOtpField && (
                <div className="space-y-4">
                  <Input
                    className="border-0 border-b border-[#838383] rounded-none focus-visible:ring-0 px-0 h-auto pb-2 bg-transparent text-[#191919]"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.otp || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setFormData(prev => ({ ...prev, otp: value }));
                      }
                    }}
                    maxLength={6}
                    placeholder="Enter 4-digit OTP"
                  />
                  <span
                    onClick={handleSendOTP}
                    className="text-base md:text-[15px] text-[#155dfc] cursor-pointer"
                  >
                    Resend OTP
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="relative">
          <Input
            className={`border-0 border-b border-[#838383] rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-within:outline-none outline-none px-0 h-12 transition-all duration-300 ease-out ${
              isActive(currentQuestion.id) ? 'pt-2' : ''
            }`}
            type={currentQuestion.type}
            value={formData[currentQuestion.id] || ""}
            onChange={handleChange}
            onFocus={() => handleFocus(currentQuestion.id)}
            onBlur={() => handleBlur(currentQuestion.id)}
            id={currentQuestion.id}
            style={{ boxShadow: 'none' }}
          />
          <label 
            htmlFor={currentQuestion.id}
            className={`absolute pointer-events-none transition-all duration-200 ease-in-out ${
              isActive(currentQuestion.id)
                ? '-top-6 left-0 text-[#155dfc] text-sm font-medium'
                : 'top-3 left-0 text-[#838383] text-[18px]'
            }`}
          >
            {typeof currentQuestion.question === 'function' 
              ? currentQuestion.question(formData)
              : currentQuestion.question}
          </label>
          <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#155dfc] transform origin-left transition-transform duration-200 ease-in-out ${
            isActive(currentQuestion.id) ? 'scale-x-100' : 'scale-x-0'
          }`} />
        </div>
      );
    }

    if (currentQuestion.type === "password") {
      return (
        <div className="space-y-4">
          <div className="relative">
            <Input
              className={`border-0 border-b border-[#838383] rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-within:outline-none outline-none px-0 h-12 transition-all duration-300 ease-out pr-10 ${
                isActive(currentQuestion.id) ? 'pt-2' : ''
              }`}
              type={showPassword ? "text" : "password"}
              value={formData[currentQuestion.id] || ""}
              onChange={handleChange}
              onFocus={() => handleFocus(currentQuestion.id)}
              onBlur={() => handleBlur(currentQuestion.id)}
              id={currentQuestion.id}
              style={{ boxShadow: 'none' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#838383] hover:text-[#155dfc] transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            <label 
              htmlFor={currentQuestion.id}
              className={`absolute pointer-events-none transition-all duration-200 ease-in-out ${
                isActive(currentQuestion.id)
                  ? '-top-6 left-0 text-[#155dfc] text-sm font-medium'
                  : 'top-3 left-0 text-[#838383] text-[18px]'
              }`}
            >
              {typeof currentQuestion.question === 'function' 
                ? currentQuestion.question(formData)
                : currentQuestion.question}
            </label>
            <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#155dfc] transform origin-left transition-transform duration-200 ease-in-out ${
              isActive(currentQuestion.id) ? 'scale-x-100' : 'scale-x-0'
            }`} />
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
          {currentQuestion.id === 'password' && formData.password && !passwordError && (
            <p className="text-green-600 text-sm mt-1">Password meets requirements</p>
          )}
        </div>
      );
    }

    if (currentQuestion.id === "interesting_fact") {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#070707] mb-6 [font-family:'Instrument_Sans',Helvetica]">
            {typeof currentQuestion.question === 'function' 
              ? currentQuestion.question(formData)
              : currentQuestion.question}
          </h2>
          <div className="relative">
            <textarea
              className="w-full border-0 border-b border-[#838383] rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-within:outline-none outline-none px-0 py-2 min-h-[100px] resize-none text-[17px]"
              value={formData[currentQuestion.id] || ""}
              onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
              onFocus={() => handleFocus(currentQuestion.id)}
              onBlur={() => handleBlur(currentQuestion.id)}
              id={currentQuestion.id}
              placeholder="Share something interesting about yourself..."
              style={{ boxShadow: 'none' }}
            />
            <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#155dfc] transform origin-left transition-transform duration-200 ease-in-out ${
              isActive(currentQuestion.id) ? 'scale-x-100' : 'scale-x-0'
            }`} />
          </div>
        </div>
      );
    }

    // Default text input handling
    return (
      <div className="relative [font-family:'Instrument_Sans',Helvetica] group">
        <div className="flex flex-col gap-1 w-full">
          <label 
            htmlFor={currentQuestion.id}
            className="text-[#848484] text-[22px] leading-[27px] font-normal"
          >
            {typeof currentQuestion.question === 'function'
              ? currentQuestion.question({ class: formData["class"] || "" })
              : currentQuestion.question}
          </label>
          <Input
            className="border-0 border-b border-[#838383] rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-within:outline-none outline-none px-0 h-8 transition-all duration-300 ease-out"
            type={currentQuestion.type}
            value={formData[currentQuestion.id] || ""}
            onChange={handleChange}
            onFocus={() => handleFocus(currentQuestion.id)}
            onBlur={() => handleBlur(currentQuestion.id)}
            id={currentQuestion.id}
            style={{ boxShadow: 'none' }}
          />
        </div>
      </div>
    );
  };

  return (
    <main className="bg-[#f7f7f7] flex flex-row justify-center w-full min-h-screen overflow-hidden [font-family:'Instrument_Sans',Helvetica]">
      <Toaster position="top-right" richColors />
      {showAdmissionCard && <AdmissionCard />}
      <div className="bg-[#f7f7f7] w-full max-w-[1440px] relative px-4 sm:px-6 md:px-8 flex flex-col justify-center min-h-screen -mt-32 md:mt-0">
        {/* Error message */}
        {error && (
          <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md">
            {error}
          </div>
        )}

        {/* Background blur effects */}
        <div className="hidden md:block w-[383px] h-[270px] top-[-98px] left-[-178px] rounded-[191.5px/135px] absolute bg-[#155dfc14] blur-[117px] opacity-90" />
        <div className="hidden md:block w-[286px] h-[202px] top-[198px] left-[-178px] rounded-[143px/101px] absolute bg-[#155dfc29] blur-[147px] opacity-70" />
        <div className="hidden md:block w-[286px] h-[202px] top-[449px] right-[-119px] rounded-[143px/101px] absolute bg-[#155dfc1f] blur-[167px] opacity-80" />

        {/* Content wrapper with glass effect */}
        <div className="relative w-full flex flex-col items-center backdrop-blur-[2px] [font-family:'Instrument_Sans',Helvetica] py-4 md:py-0">
          {/* Logo */}
          <header className="text-center mb-16 md:mb-24 pt-8 md:pt-0">
            <Link to="/">
              <h1 className="font-normal text-2xl md:text-[42px] tracking-[0] leading-[51px]">
                <span className="text-[#191919]">STUDY</span>
                <span className="font-bold text-[#191919]">table</span>
              </h1>
            </Link>
          </header>

          {/* Form content */}
          <div className="flex-1 flex flex-col items-center w-full max-w-[495px] px-4 sm:px-0 [font-family:'Instrument_Sans',Helvetica] -mt-4 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderQuestionContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation and progress with centered positioning */}
            <div className="w-full mt-12 md:mt-24">
              <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-[495px] relative h-1 bg-[#ccdbfe] rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-[#155dfc] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3 }}
                    style={{ maxWidth: '100%' }}
                  />
                </div>

                <div className="flex w-full justify-between items-center">
                  <Button
                    variant="outline"
                    className={`h-[42px] !bg-[#155dfc0d] text-[#155dfc] font-semibold text-[17px] rounded-[5px] px-6 flex items-center gap-0.5 [font-family:'Instrument_Sans',Helvetica] ${
                      currentStep === 0 ? "invisible" : ""
                    }`}
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Previous
                  </Button>

                  <Button 
                    className="h-[42px] !bg-[#155dfc] text-neutral-200 font-semibold text-[17px] rounded-[5px] px-6 flex items-center gap-0.5 [font-family:'Instrument_Sans',Helvetica]"
                    onClick={currentQuestion.type === "tel" && !showOtpField ? handleSendOTP : handleNext}
                    disabled={isNextDisabled}
                  >
                    {currentQuestion.type === "tel" && !showOtpField 
                      ? "Send OTP" 
                      : currentStep === totalSteps - 1 
                        ? "Submit" 
                        : "Next"}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};