import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Confetti } from "../../../components/magicui/confetti";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { SmallCard } from "../SmallCard";
import { motion } from "framer-motion";

export const OptimizeYourSection = (): JSX.Element => {
  const [isExploding, setIsExploding] = useState(false);
  const navigate = useNavigate();
  
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inView) {
      setIsExploding(true);
      timer = setTimeout(() => {
        setIsExploding(false);
      }, 2000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [inView]);

  const handleButtonClick = () => {
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
      navigate('/signin');
    }, 1000);
  };

  const confettiColors = [
    '#155dfc', 
    '#FFFFFF', 
    '#FF5252',
    '#4CAF50', 
    '#FFC107',
    '#9C27B0', 
    '#03A9F4', 
    '#FF9800'  
  ];

  return (
    <motion.section 
      ref={ref}
      className="relative w-full max-w-[1164px] mx-auto min-h-screen flex items-center justify-center overflow-hidden py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti 
        options={{
          particleCount: isExploding ? 100 : 0, 
          spread: 70,
          startVelocity: 45,
          gravity: 1.2,
          scalar: 1.2,
          ticks: 150,
          colors: confettiColors,
          origin: { x: 0.5, y: 0.5 },
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div className="flex flex-col w-full items-center justify-center gap-6 -mt-16 md:-mt-24 py-4 md:py-10 px-4 md:px-8 relative overflow-hidden z-10">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 w-full">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#dbe6ff] rounded-full flex items-center justify-center">
              <img
                src="/edit.svg"
                alt="Edit icon"
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </div>
            <span className="text-3xl md:text-4xl text-[#155dfc] font-semibold">+</span>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#dbe6ff] rounded-full flex items-center justify-center">
              <img
                src="/rewarded_ads.svg"
                alt="Trophy icon"
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </div>
          </div>

          <p className="[font-family:'Instrument_Sans',Helvetica] font-normal text-[20px] leading-[30px] tracking-[0] text-center mt-0.5 -mb-2 text-[#155DFC] md:-mb-4">
            Start From: <span className="font-medium text-[#155DFC]">12th May 2025</span>
          </p>

          <h2 className="[font-family:'Instrument_Sans',Helvetica] font-bold text-[24px] md:text-[38px] text-black max-w-[800px] text-center tracking-[0%] flex flex-col">
            <span>Practice Previous Year</span>
            <span className="-mt-2">Paper & Win Prizes</span>
          </h2>

          <p className="[font-family:'Instrument_Sans',Helvetica] font-normal text-[16px] md:text-[20px] leading-[100%] md:leading-[30px] tracking-[0] text-[#646464] text-center w-full md:w-[577px] h-auto md:h-[60px] mb-6 md:mb-8 mx-auto px-4 md:px-0">
            <span className="md:hidden">
              Gather your friends and buckle up to test your JEE/NEET/Boards Preparation
            </span>
            <span className="hidden md:inline md:leading-[130%]">
              Gather your friends and buckle up to test your JEE/NEET/<br className="md:block" />
              Boards Preparation
            </span>
          </p>

          <div className="flex flex-col items-center mt-2 md:mt-0">
            <Button 
              className="h-10 md:h-12 w-[220px] bg-[#155dfc] hover:bg-[#0044ff] text-white rounded-md text-base md:text-lg font-semibold transition-colors duration-300"
              onClick={handleButtonClick}
            >
              Practice for Free
            </Button>
            <p className="[font-family:'Instrument_Sans',Helvetica] font-normal text-[14px] leading-[30px] tracking-[0] text-center text-[#646464] w-[220px] -mt-1 mb-12">
              For the first 50,000 students
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 w-[330px] md:w-full max-w-[1000px] place-items-center">
              <SmallCard 
                text="Prize up to 2 Lakhs"
                imageUrl="currency_rupee_circle.svg"
              />
              <SmallCard 
                text="FREE Practice of 15 Years of Board Questions"
                imageUrl="school.svg"
              />
              <SmallCard 
                text="Six months of Free Subscription  "
                imageUrl="today.svg"
              />
              <SmallCard 
                text="FREE Practice for 35 Years JEE/NEET Questions"
                imageUrl="edit_square.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
