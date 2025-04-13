import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FAQSection } from "../components/Custom/FAQSection";
import { HeroSection } from "../components/Custom/HeroSection/HeroSection";
import { ManagingStudentsSection } from "../components/Custom/ManagingStudentsSection";
import { OptimizeYourSection } from "../components/Custom/OptimizeYourSection";
import { PersonalizedAssessmentSection } from "../components/Custom/PersonalizedAssessmentSection";
import { PracticeSection } from "../components/Custom/PracticeSection";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export const StudytableLanding = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full overflow-hidden [font-family:'Instrument_Sans',Helvetica]">

      <div className="w-full py-3 sm:py-4 relative z-10">
        <div className="container mx-auto flex justify-center px-4">
          <a href="/" className="flex items-center justify-center">
            <h1 className="font-normal text-[30px]">
              <span className="text-[#191919]">STUDY</span>
              <span className="font-bold text-[42px] text-[#191919]">table</span>
            </h1>
          </a>
        </div>
      </div>

      <div className="bg-white w-full max-w-[1440px] relative px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="absolute w-[300px] md:w-[383px] h-[200px] md:h-[270px] top-[-50px] md:top-[-80px] left-[-100px] md:left-[-150px] bg-[#155dfc99] rounded-[191.5px/135px] blur-[80px] opacity-[0.65] md:opacity-45 z-0" />
        <div className="absolute w-[200px] md:w-[286px] h-[150px] md:h-[202px] top-[460px] md:top-[380px] right-[-100px] md:right-[-50px] bg-[#155dfc99] rounded-[143px/101px] blur-[80px] opacity-[0.65] md:opacity-45 z-0" />

        <div className="relative flex flex-col items-center pt-4 sm:pt-6 md:pt-8 z-10 min-h-[85vh] sm:min-h-0 justify-start sm:justify-start">
          <FadeInSection delay={0.2}>
            <Badge className="hidden md:flex mt-2 sm:mt-8 md:mt-10 items-center gap-[6px] sm:gap-[9px] px-2 sm:px-3 py-1 bg-[#155dfc26] text-[#155dfc] rounded-[33px] border-[#155dfc] whitespace-nowrap pointer-events-none">
              <img
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                alt="AI magic icon"
                src="/hugeicons-ai-magic.svg"
              />
              <span className="font-medium text-xs sm:text-sm md:text-base leading-[24px] sm:leading-[33px]">
                AI-Home Tutor
              </span>
            </Badge>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <HeroSection />
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <p className="max-w-[755px] mx-auto mt-3 sm:mt-4 font-['Instrument_Sans'] font-normal text-[16px] sm:text-[21px] text-center leading-[139%] text-[#646464] px-2 sm:px-4">
              Each student has a <span className="text-[#6D9AFF] font-semibold">personal goal</span>, expectation, and learning pace, but they all take the same class, read the same book, and take the same test. We provide <span className="text-[#6D9AFF] font-semibold">personalized</span> practice sessions, <span className="text-[#6D9AFF] font-semibold">personalized</span> tests, and <span className="text-[#6D9AFF] font-semibold">personalized</span> study paths. They get exactly what they need. The <span className="text-[#6D9AFF] font-semibold">personal attention</span> to achieve the best of their Potential.
            </p>
          </FadeInSection>

          {/* Buttons with improved responsiveness */}
          <FadeInSection delay={0.5}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 mb-8 sm:mb-12">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-[38px] sm:h-[40px] md:h-[42px] px-[20px] sm:px-[25px] md:px-[30px] py-2 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 font-semibold text-[15px] sm:text-[16px] md:text-[17px] shadow-[0px_4px_4px_#00000040] transition-colors duration-300">
                  Apply for admission
                </Button>
              </Link>

              <Link to="/signin" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto h-[36px] sm:h-[38px] px-2.5 py-2 font-normal text-[#155dfc] hover:text-[#0044ff] text-[15px] sm:text-[16px] md:text-[17px] underline transition-colors duration-300"
                >
                  Sign In →
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>

        <div className="flex flex-col w-full snap-y snap-mandatory relative z-10">
          <div className="snap-start snap-always">
            <FadeInSection>
              <div className="pt-[15vh] sm:pt-[20vh] relative">
                {/* Additional blobs for OptimizeYourSection */}
                <div className="absolute w-[300px] md:w-[383px] h-[200px] md:h-[270px] top-[-50px] md:top-[-80px] left-[-100px] md:left-[-150px] bg-[#155dfc99] rounded-[191.5px/135px] blur-[80px] opacity-[0.65] md:opacity-45 z-0" />
                <div className="absolute w-[200px] md:w-[286px] h-[150px] md:h-[202px] bottom-[50px] md:bottom-[70px] right-[-100px] md:right-[-50px] bg-[#155dfc99] rounded-[143px/101px] blur-[80px] opacity-[0.65] md:opacity-45 z-0" />
                <OptimizeYourSection />
              </div>
            </FadeInSection>
          </div>

          <div className="snap-start snap-always">
            <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]" style={{ background: "linear-gradient(179.7deg, #002C8C -5.34%, #000612 1.25%, #000C26 18.91%)" }}>
              <div className="max-w-[1440px] mx-auto">
                <FadeInSection>
                  <PersonalizedAssessmentSection />
                </FadeInSection>
              </div>
            </div>
          </div>

          <div className="snap-start snap-always">
            <FadeInSection>
              <ManagingStudentsSection />
            </FadeInSection>
          </div>

          <FadeInSection>
            <FAQSection />
          </FadeInSection>

          <FadeInSection>
            <div className="relative">
              {/* Colored ellipse blobs for PracticeSection */}
              <div className="absolute w-[300px] md:w-[383px] h-[200px] md:h-[270px] top-[50px] md:top-[80px] left-[-100px] md:left-[-150px] bg-[#155dfc99] rounded-[191.5px/135px] blur-[80px] opacity-[0.65] md:opacity-45 z-0" />
              <div className="absolute w-[200px] md:w-[286px] h-[150px] md:h-[202px] bottom-[100px] md:bottom-[150px] right-[-80px] md:right-[-120px] bg-[#155dfc99] rounded-[143px/101px] blur-[80px] opacity-[0.65] md:opacity-45 z-0" />
              <PracticeSection />
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};