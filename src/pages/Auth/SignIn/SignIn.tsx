import { useState } from "react";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({
    admissionNumber: "",
    password: ""
  });
  const [activeInputs, setActiveInputs] = useState<Record<string, boolean>>({
    admissionNumber: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/student/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admissionNumber: formData.admissionNumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store all relevant data in localStorage with correct key names
      if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      if (data.student?.admissionNumber) localStorage.setItem('admissionNumber', data.student.admissionNumber);
      
      // Show success toast
      toast.success(data.message || 'Login successful!');

      // Redirect after a short delay to show the toast
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isSignInDisabled = !formData.admissionNumber || !formData.password || isLoading;
  const isActive = (id: string) => activeInputs[id] || !!formData[id];
  
  return (
    <div className="bg-[#f7f7f7] flex flex-col min-h-screen w-full [font-family:'Instrument_Sans',Helvetica]">
      <Toaster position="top-right" richColors />
      {/* Top logo */}
      <header className="text-center pt-[38px] sm:pt-[42px]">
        <Link to="/">
          <h1 className="[font-family:'Inter',Helvetica] text-[32px] tracking-[0]">
            <span className="text-[#191919]">STUDY</span>
            <span className="font-bold text-[#191919]">table</span>
          </h1>
        </Link>
      </header>

      {/* Main content area with vertical centering */}
      <div className="flex-1 flex items-start sm:items-center justify-center w-full mt-24 sm:mt-0">
        <div className="w-full max-w-[1440px] px-4 relative">
          {/* Blue gradient decorations */}
          <div className="w-[383px] h-[270px] top-[98px] left-[-78px] rounded-[191.5px/135px] absolute bg-[#155dfc99] blur-[217px] opacity-60 z-0" />
          <div className="w-[286px] h-[202px] top-[450px] right-0 rounded-[143px/101px] absolute bg-[#155dfc99] blur-[217px] opacity-60 z-0" />

          {/* Form area */}
          <div className="max-w-[495px] mx-auto relative z-1">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              {/* Admission Number Field */}
              <div className="relative mt-6">
                <Input
                  className="border-0 border-b border-[#838383] rounded-none focus-visible:ring-0 px-0 h-auto pb-2 bg-transparent text-[#191919]"
                  type="text"
                  value={formData.admissionNumber || ""}
                  onChange={handleChange}
                  onFocus={() => handleFocus("admissionNumber")}
                  onBlur={() => handleBlur("admissionNumber")}
                  id="admissionNumber"
                  placeholder={isActive("admissionNumber") ? "" : "Admission Number"}
                />
                {isActive("admissionNumber") && (
                  <label
                    htmlFor="admissionNumber"
                    className="absolute left-0 -top-5 text-xs text-[#155dfc] transition-all duration-200"
                  >
                    Admission Number
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="relative mt-6">
                <div className="flex items-center">
                  <Input
                    className="border-0 border-b border-[#838383] rounded-none focus-visible:ring-0 px-0 h-auto pb-2 bg-transparent text-[#191919] w-full pr-10"
                    type={showPassword ? "text" : "password"}
                    value={formData.password || ""}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    id="password"
                    placeholder={isActive("password") ? "" : "Password"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {isActive("password") && (
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-5 text-xs text-[#155dfc] transition-all duration-200"
                  >
                    Password
                  </label>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[#155dfc] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button - Updated with loading state */}
              <div className="pt-4 flex justify-center">
                <Button 
                  type="submit"
                  className="w-auto h-[36px] px-[20px] py-1 bg-[#155dfc] text-neutral-200 font-semibold text-[15px] md:text-[16px] rounded-[5px] shadow-sm hover:bg-[#0044ff] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSignInDisabled}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      Sign In
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#155dfc] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
