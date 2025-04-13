import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";

export const Navbar = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isBlogPage = location.pathname === "/blog";
  
  // Set background color based on current page
  const bgColor = isBlogPage ? "bg-[#f7f7f7]" : "bg-white";
  
  useEffect(() => {
    console.log("Current path in Navbar:", location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`w-full py-4 ${bgColor} fixed top-0 left-0 right-0 z-50 border-b border-gray-100`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Different layout for blog page */}
        {isBlogPage ? (
          <>
            {/* Left aligned logo for blog page */}
            <div className="flex items-center pl-0 md:pl-8">
              <a href="/" className="flex items-center">
                <h1 className="[font-family:'Inter',Helvetica] font-normal text-xl md:text-2xl">
                  <span className="text-[#191919]">STUDY</span>
                  <span className="font-bold text-[#191919]">table</span>
                </h1>
              </a>
            </div>
            
            {/* Right side button with more space */}
            <div className="flex justify-end pr-0 md:pr-8">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="p-2 text-gray-700 focus:outline-none"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Desktop button */}
              <div className="hidden md:block">
                <Button className="h-[38px] px-[20px] py-2 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 [font-family:'Instrument_Sans',Helvetica] font-semibold text-[15px] shadow-[0px_4px_4px_#00000040] transition-colors duration-300">
                  Apply for admission
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Homepage layout 
          <>
            {/* Left side - Blog link */}
            <div className="w-1/3 flex justify-start">
              <a 
                href="/blog" 
                className="[font-family:'Instrument_Sans',Helvetica] font-medium text-gray-700 hover:text-[#155dfc] transition-colors duration-300"
              >
                Blog
              </a>
            </div>
            
            {/* Center - Logo */}
            <div className="w-1/3 flex justify-center">
              <a href="/" className="flex items-center">
                <h1 className="[font-family:'Inter',Helvetica] font-normal text-xl md:text-2xl">
                  <span className="text-[#191919]">STUDY</span>
                  <span className="font-bold text-[#191919]">table</span>
                </h1>
              </a>
            </div>

            {/* Right side - buttons */}
            <div className="w-1/3 flex justify-end">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="p-2 text-gray-700 focus:outline-none"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Desktop button */}
              <div className="hidden md:block">
                <Button 
                  className="h-[38px] px-[20px] py-2 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 [font-family:'Instrument_Sans',Helvetica] font-semibold text-[15px] shadow-[0px_4px_4px_#00000040] transition-colors duration-300"
                  onClick={() => window.location.href = '/signin'}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${bgColor} border-t border-gray-100 mt-2 py-2`}>
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {/* Blog link only shown on homepage in mobile menu */}
            {!isBlogPage && (
              <a
                href="/blog"
                className="py-2 [font-family:'Instrument_Sans',Helvetica] font-medium text-gray-700 hover:text-[#155dfc] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
            )}
            
            {/* Conditional button rendering for mobile */}
            <Button 
              className="h-[38px] px-[20px] py-2 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 [font-family:'Instrument_Sans',Helvetica] font-semibold text-[15px] shadow-[0px_4px_4px_#00000040] transition-colors duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = isBlogPage ? '/signup' : '/signin';
              }}
            >
              {isBlogPage ? "Apply for admission" : "Sign In"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
