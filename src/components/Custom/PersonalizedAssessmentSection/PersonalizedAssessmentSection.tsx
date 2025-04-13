import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { OrbitingCircles } from "../../magicui/orbiting-circles";
import { AnimatedBeam } from "../../magicui/animated-beam";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CountdownTimer } from "../CountdownTimer";
import { Frame } from "../Frame";

export const PersonalizedAssessmentSection = (): JSX.Element => {
  // State to track whether section is visible
  const [isVisible, setIsVisible] = useState(false);
  const [chatSectionVisible, setChatSectionVisible] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState<number>(-1);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showFormulaTyping,] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  // Effect for academic life card visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("academic-life-card");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Effect for chat section visibility and animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setChatSectionVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("chat-section-card");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Updated chat bubbles data with improved dimensions for no text wrapping
  const chatBubbles = [
    {
      text: "Did you get the concept",
      isUser: false,
      top: { mobile: "15px", desktop: "25px" },
      left: { mobile: "10px", desktop: "30px" },
      width: { mobile: "110px", desktop: "156px" },
      zIndex: 6,
      animationDelay: 0
    },
    {
      text: "Yes, based on projectile's maximum height principle.",
      isUser: true,
      top: { mobile: "45px", desktop: "60px" },
      right: { mobile: "10px", desktop: "30px" },
      width: { mobile: "150px", desktop: "320px" }, // Increased width
      zIndex: 5,
      animationDelay: 0.5
    },
    {
      text: "That's Correct",
      isUser: false,
      top: { mobile: "85px", desktop: "105px" },
      left: { mobile: "10px", desktop: "30px" },
      width: { mobile: "90px", desktop: "110px" },
      zIndex: 4,
      animationDelay: 1
    },
    {
      text: "But I forgot the formula.",
      isUser: true,
      top: { mobile: "110px", desktop: "135px" }, // Adjusted position
      right: { mobile: "10px", desktop: "30px" },
      width: { mobile: "110px", desktop: "180px" }, // Increased width
      zIndex: 3,
      animationDelay: 1.5
    },
    {
      text: "Okay, Hmax=u²/2g or us²sin²θ/2g",
      isUser: false,
      top: { mobile: "150px", desktop: "175px" }, // Adjusted position
      left: { mobile: "10px", desktop: "30px" },
      width: { mobile: "160px", desktop: "207px" },
      zIndex: 2,
      animationDelay: 2
    },
    {
      text: "Let me calculate the answer",
      isUser: true,
      top: { mobile: "260px", desktop: "285px" }, // Moved further down
      right: { mobile: "10px", desktop: "30px" },
      width: { mobile: "120px", desktop: "180px" },
      zIndex: 1,
      animationDelay: 2.5
    },
  ];


  // Start message sequence only when chat section is visible
  useEffect(() => {
    if (!chatSectionVisible) return;

    const startMessageSequence = async () => {
      // Show messages up to and including formula text (index 4)
      for (let i = 0; i <= 4; i++) {
        setCurrentTypingIndex(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentTypingIndex(-1);
        setVisibleMessages(i + 1);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // After formula text, show formula diagram immediately
      await new Promise(resolve => setTimeout(resolve, 300));
      setShowFormula(true);
      
      // Wait before showing final message
      await new Promise(resolve => setTimeout(resolve, 1200));
      setCurrentTypingIndex(5);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentTypingIndex(-1);
      setVisibleMessages(6);
    };

    startMessageSequence();
  }, [chatSectionVisible, chatBubbles.length]);

  // Update sections data with appropriate colors for dark background
  const sections = [
    {
      id: 1,
      title: [
        { text: "Study With Q - ", color: "text-white" },
        { text: "Unlimited Tuition", color: "text-[#155dfc]" },
        { text: " Sessions", color: "text-white" },
      ],
      description: [
        {
          text: "Q will guide you on what to study, when to study, and how to study. Tell Q about what you did in your class each day. The topics and subjects you have been through, Q will create an instant practice session specially made for your need. Our innovative AI algorithm crafts batches of 20 questions, each accompanied by instant feedback and solutions. It will sit along with you and guide you step by step -  just like your favorite teacher- who is available 24x7.",
          color: "text-gray-300",
          fontWeight: "font-normal",
        },
        // {
        //   text: "Our innovative AI algorithm crafts batches of 20 questions, each accompanied by instant feedback and solutions - it's like having a Home tutor 24X7.",
        //   color: "text-gray-300",
        //   fontWeight: "font-semibold",
        // },
      ],
    },
    {
      id: 2,
      title: [
        { text: "Personalized ", color: "text-[#155dfc]" },
        { text: "Assessment - ", color: "text-white" },
        { text: "ONE TEST ", color: "text-[#155dfc]" },
        { text: " FOR ALL", color: "text-white" },
      ],
      description: [
        {
          text: "We measure your learning differently. It has two components. First, It is not just about comparing marks with your classmates but rather how much you have learnt and how much your skills in each subject have grown. Second, how much of this is relevant to your overall exam needs. There are different competitive exams, and they have different patterns. Students have to prepare for them differently and do questions from different Books. We solve all this for you. The tests are uniquely created for each student to understand their learning rate, which will allow us to further identify gaps and plan study paths",
          color: "text-gray-300",
          fontWeight: "font-normal",
        },
      ],
    },
    {
      id: 3,
      title: [
        { text: "Managing ", color: "text-[#155dfc]" },
        { text: "students ", color: "text-white" },
        { text: "academic", color: "text-[#155dfc]" },
        { text: " life", color: "text-white" },
      ],
      description: [
        {
          text: "Acing a Competitive exam is emotional management as well. To meet the requirement of the exam, students need to revise, repeatedly align their study plan and understand their personal learning curve. This all needs to be done along with schools test and other exams. Multiple subjects and multiple exams can create confusion, and it's hard to choose what to study and when to study. We manage it all for you. So that student can focus on learning and enjoy their lives.",
          color: "text-gray-300",
          fontWeight: "font-normal",
        },
      ],
    },
  ];

  
  // Function to get responsive values based on screen size
  interface ResponsiveValues {
    mobile: string;
    desktop: string;
  }

  const getResponsiveValue = (values: ResponsiveValues): string => {
    return window.innerWidth < 768 ? values.mobile : values.desktop;
  };


  const examTypes = [
    { 
      text: "JEE/NEET & Olympiads",
      mobile: { top: "10px", left: "10px" },
      desktop: { top: "0", left: "0" },
      ref: "jeeRef"
    },
    { 
      text: "Board & School Exams",
      mobile: { top: "77px", left: "10px" },
      desktop: { top: "77px", left: "0" },
      ref: "boardRef"
    },
    { 
      text: "BITSAT, JIPMER, NEST",
      mobile: { top: "153px", left: "10px" },
      desktop: { top: "153px", left: "0" },
      ref: "otherRef"
    },
    { 
      text: "STUDYtable Assessment ",
      mobile: { top: "83px", left: "120px" },
      desktop: { top: "83px", left: "197px" },
      ref: "studyTableRef"
    },
    { 
      text: "Student",
      mobile: { top: "83px", left: "230px" }, 
      desktop: { top: "83px", left: "370px" },
      isHighlighted: true,
      ref: "studentRef"
    }
  ];

  // Academic life elements split into inner and outer orbit
  const innerOrbitElements = [
    { text: "Time", color: "#e4ecff" },
    { text: "Exam", color: "#e4ecff" },
    { text: "School", color: "#e4ecff" },
  ];

  const outerOrbitElements = [
    { text: "Homework", color: "#e4ecff" },
    { text: "Break", color: "#e4ecff" },
    { text: "Revision", color: "#e4ecff" },
  ];

  // Add refs for connecting elements
  const containerRef = useRef<HTMLDivElement>(null);
  const jeeRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);
  const studyTableRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full" style={{ background: "linear-gradient(179.7deg, #002C8C -5.34%, #000612 1.25%, #000C26 18.91%)" }}>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-[1164px] mx-auto flex justify-center pb-16 md:pb-20">
          <CountdownTimer />
        </div>
        <Frame />
      
      {/* Original PersonalizedAssessmentSection content with reduced top padding */}
      <section className="relative w-full py-8 md:py-12 px-4">
        <div className="container mx-auto">
         
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-10 md:mb-20 items-center">
           
            <motion.div 
              className="flex md:hidden flex-col w-full gap-2 mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[24px] md:text-[46px] font-['Instrument_Sans',Helvetica] font-semibold leading-[100%] tracking-[0%]">
                {sections[0].title.map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
              </h2>
            </motion.div>

            {/* Desktop: Title and text left column */}
            <motion.div 
              className="hidden md:flex md:flex-col w-full md:w-1/2 gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-[46px] font-['Instrument_Sans',Helvetica] font-semibold leading-tight">
                {sections[0].title.map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
              </h2>
              <div className="text-lg md:text-[18px] leading-tight">
                {sections[0].description.map((part, index) => (
                  <span
                    key={index}
                    className={`${part.color} ${part.fontWeight} leading-[33px]`}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </motion.div>

      
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Card 
                id="chat-section-card"
                className="w-full h-[330px] rounded-[10px] relative overflow-hidden bg-white border border-gray-200 shadow-lg"
              >
                <CardContent className="p-4 h-full relative">
                  {/* Show typing indicator for current message */}
                  {currentTypingIndex !== -1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50"
                      style={{
                        top: getResponsiveValue(chatBubbles[currentTypingIndex].top),
                        ...(chatBubbles[currentTypingIndex].isUser
                          ? { right: getResponsiveValue(chatBubbles[currentTypingIndex].right || { mobile: '10px', desktop: '30px' }) }
                          : { left: getResponsiveValue(chatBubbles[currentTypingIndex].left || { mobile: '10px', desktop: '30px' }) }),
                      }}
                    >
                      <div className={`py-2 px-3 rounded-[5px] shadow-[0px_1px_3px_rgba(0,0,0,0.06)] ${
                        chatBubbles[currentTypingIndex].isUser
                          ? "bg-[#155dfc] text-white"
                          : "bg-white text-[#2d2d2d]"
                      }`}>
                        <div className={`${window.innerWidth < 768 ? "text-[10px]" : "text-xs"} font-normal whitespace-nowrap`}>
                          Typing
                          <motion.span
                            animate={{
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              times: [0, 0.3, 0.7, 1],
                            }}
                          >
                            ...
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Show formula typing indicator */}
                  {showFormulaTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-[20px] left-[20px] md:left-[34px] z-50"
                    >
                      <div className="py-2 px-3 rounded-[5px] shadow-[0px_1px_3px_rgba(0,0,0,0.06)] bg-white text-[#2d2d2d]">
                        <div className={`${window.innerWidth < 768 ? "text-[10px]" : "text-xs"} font-normal whitespace-nowrap`}>
                          Adding Diagram
                          <motion.span
                            animate={{
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              times: [0, 0.3, 0.7, 1],
                            }}
                          >
                            ...
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {chatBubbles.map((bubble, index) => {
                    if (index >= visibleMessages) return null;

                    const top = getResponsiveValue(bubble.top);
                    const width = getResponsiveValue(bubble.width);
                    const positionStyle = bubble.isUser 
                      ? { right: getResponsiveValue(bubble.right || { mobile: '0', desktop: '0' }) } 
                      : { left: getResponsiveValue(bubble.left || { mobile: '0', desktop: '0' }) };
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className={`absolute ${
                          bubble.isUser 
                            ? "bg-[#155dfc] text-white rounded-[5px]" 
                            : "bg-white text-[#2d2d2d] rounded-[5px]"
                        } ${
                          bubble.isUser ? "shadow-[0px_1px_3px_rgba(0,0,0,0.1)]" : "shadow-[0px_1px_3px_rgba(0,0,0,0.06)]"
                        }`}
                        style={{
                          top: top,
                          ...positionStyle,
                          width: width,
                          maxWidth: window.innerWidth < 768 ? '75%' : '45%',
                          zIndex: bubble.zIndex,
                        }}
                      >
                        <div className={`py-2 px-3 ${
                          window.innerWidth < 768 ? "text-[10px]" : "text-xs"
                        } font-normal whitespace-nowrap overflow-hidden text-ellipsis`}>
                          {bubble.text}
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Formula image with animation */}
                  {showFormula && (
                    <motion.img
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute w-[120px] h-[52px] md:w-[157px] md:h-[69px]"
                      style={{
                        bottom: window.innerWidth < 768 ? '70px' : '48px',
                        left: window.innerWidth < 768 ? '20px' : '34px'
                      }}
                      alt="Formula image"
                      src="/image-421.png"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>

            
            <motion.div 
              className="flex md:hidden flex-col w-full gap-2 mt-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-[14px] font-normal leading-[20.94px] tracking-[0%]">
                {sections[0].description.map((part, index) => (
                  <span
                    key={index}
                    className={`${part.color}`}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Second Section - Personalized Assessment */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-10 md:mb-20 items-center">
    
            <motion.div 
              className="flex md:hidden flex-col w-full gap-2 mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[24px] md:text-[46px] font-['Instrument_Sans',Helvetica] font-semibold leading-[100%] tracking-[0%]">
                {sections[1].title.map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
              </h2>
            </motion.div>

            <motion.div 
              className="hidden md:flex md:flex-col w-full md:w-1/2 gap-4 order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-[46px] font-['Instrument_Sans',Helvetica] font-semibold leading-tight">
                {sections[1].title.map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
              </h2>
              <div className="text-lg md:text-[18px] leading-[30px]">
                {sections[1].description.map((part, index) => (
                  <span key={index} className={`${part.color} ${part.fontWeight}`}>
                    {part.text}
                  </span>
                ))}
              </div>
            </motion.div>

     
            <motion.div
              className="w-full md:w-1/2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="w-full h-[330px] rounded-[10px] relative overflow-hidden bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-4 h-full relative">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div 
                      ref={containerRef}
                      className="relative w-full max-w-[350px] md:max-w-none md:w-[459px] h-[202px] mx-auto mt-8 md:mt-16"
                    >
                      {/* Beams first with lower z-index */}
                      <div className="absolute inset-0 z-0">
                        {[0, 0.8, 1.6].map((delayOffset, index) => (
                          <React.Fragment key={`beam-jee-${index}`}>
                            <AnimatedBeam
                              containerRef={containerRef}
                              fromRef={jeeRef}
                              toRef={studyTableRef}
                              duration={2}
                              delay={delayOffset}
                              className="opacity-60"
                            />
                          </React.Fragment>
                        ))}

                        {[0.2, 1.0, 1.8].map((delayOffset, index) => (
                          <React.Fragment key={`beam-board-${index}`}>
                            <AnimatedBeam
                              containerRef={containerRef}
                              fromRef={boardRef}
                              toRef={studyTableRef}
                              duration={2}
                              delay={delayOffset}
                              className="opacity-60"
                            />
                          </React.Fragment>
                        ))}

                        {[0.4, 1.2, 2.0].map((delayOffset, index) => (
                          <React.Fragment key={`beam-bitsat-${index}`}>
                            <AnimatedBeam
                              containerRef={containerRef}
                              fromRef={otherRef}
                              toRef={studyTableRef}
                              duration={2}
                              delay={delayOffset}
                              className="opacity-60"
                            />
                          </React.Fragment>
                        ))}

                        {[0.6, 1.4, 2.2].map((delayOffset, index) => (
                          <React.Fragment key={`beam-study-${index}`}>
                            <AnimatedBeam
                              containerRef={containerRef}
                              fromRef={studyTableRef}
                              toRef={studentRef}
                              duration={2}
                              delay={delayOffset}
                              className="opacity-60"
                            />
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Badges on top with higher z-index and solid background */}
                      {examTypes.map((exam, index) => {
                        const ref = 
                          exam.text === "JEE/NEET & Olympiads" ? jeeRef :
                          exam.text === "Board & School Exams" ? boardRef :
                          exam.text === "BITSAT, JIPMER, NEST" ? otherRef :
                          exam.text === "STUDYtable Assessment " ? studyTableRef :
                          exam.text === "Student" ? studentRef :
                          null;

                        return (
                          <Badge
                            key={index}
                            ref={ref}
                            className={`absolute inline-flex items-center justify-center p-[6.58px] z-20 ${
                              exam.isHighlighted
                                ? "bg-[#155dfc] text-white border-white"
                                : "bg-white text-[#155dfc] border-[#155dfc]"
                            } rounded-[5.48px] border-[0.55px] border-solid shadow-sm`}
                            style={{ 
                              top: window.innerWidth < 768 ? exam.mobile.top : exam.desktop.top,
                              left: window.innerWidth < 768 ? exam.mobile.left : exam.desktop.left,
                              transform: window.innerWidth < 768 ? 'scale(0.75)' : 'none',
                              transformOrigin: 'left center',
                              cursor: 'default',
                              pointerEvents: 'none',
                              backdropFilter: 'none',
                              WebkitBackdropFilter: 'none'
                            }}
                          >
                            <span className="text-[10px] font-semibold leading-[16.4px] text-center">
                              {exam.text}
                            </span>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mobile: Text at the bottom - Updated typography */}
            <motion.div 
              className="flex md:hidden flex-col w-full gap-2 mt-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-[14px] font-normal leading-[20.94px] tracking-[0%]">
                {sections[1].description.map((part, index) => (
                  <span key={index} className={`${part.color}`}>
                    {part.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Third Section - Managing students academic life */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
            {/* Mobile: Title first - Updated typography */}
            <motion.div 
              className="flex md:hidden flex-col w-full gap-2 mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[24px] md:text-[47px] font-['Instrument_Sans',Helvetica] font-semibold leading-[100%] tracking-[0%]">
                {sections[2].title.map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
              </h2>
            </motion.div>

            {/* Desktop: Title and text left column */}
            <motion.div 
              className="hidden md:flex md:flex-col w-full md:w-1/2 gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-[46px] font-['Instrument_Sans',Helvetica] font-semibold leading-tight">
                {sections[2].title.map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
              </h2>
              <div className="text-lg md:text-[18px] leading-[30px]">
                {sections[2].description.map((part, index) => (
                  <span key={index} className={`${part.color} ${part.fontWeight}`}>
                    {part.text}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Diagram - for both mobile and desktop - Clean styling without borders/background */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                id="academic-life-card"
                className="w-full h-[330px] rounded-[10px] relative overflow-hidden bg-white border border-gray-200 shadow-lg"
              >
                <CardContent className="p-4 h-full relative">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* More visible circular borders with enhanced styling */}
                    <div className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full border-[1.5px] border-dashed border-[#8bb3ff] opacity-70" />
                    <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border-[1.5px] border-dashed border-[#8bb3ff] opacity-60" />

                    {/* Center element - Student */}
                    <div className="absolute z-30 flex items-center justify-center">
                      <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#e4ecff] rounded-full flex items-center justify-center shadow-md border-2 border-[#155dfc]">
                        <span className="text-[12px] md:text-[13px] font-semibold text-[#155dfc] text-center whitespace-nowrap">
                          Student
                        </span>
                      </div>
                    </div>

                    {/* Inner orbit - clockwise - responsive sizing */}
                    {isVisible && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <OrbitingCircles
                          radius={window.innerWidth < 768 ? 75 : 100}
                          duration={20}
                          speed={1.2}
                          path={true}
                          className="w-full h-full absolute inset-0"
                        >
                          {innerOrbitElements.map((element, index) => (
                            <Badge
                              key={`inner-${index}`}
                              className="flex items-center justify-center p-1 md:p-1.5 bg-[#e4ecff] rounded-full border border-[#155dfc] shadow-sm"
                              style={{ 
                                minWidth: window.innerWidth < 768 ? "50px" : "60px", 
                                height: window.innerWidth < 768 ? "24px" : "28px"
                              }}
                            >
                              <span className="text-[10px] md:text-xs font-semibold text-[#155dfc] text-center whitespace-nowrap">
                                {element.text}
                              </span>
                            </Badge>
                          ))}
                        </OrbitingCircles>
                      </div>
                    )}

                    {/* Outer orbit - counter-clockwise - responsive sizing */}
                    {isVisible && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <OrbitingCircles
                          radius={window.innerWidth < 768 ? 110 : 150}
                          duration={30}
                          speed={0.9}
                          reverse={true}
                          path={true}
                          className="w-full h-full absolute inset-0"
                        >
                          {outerOrbitElements.map((element, index) => (
                            <Badge
                              key={`outer-${index}`}
                              className="flex items-center justify-center p-1 md:p-1.5 rounded-full border border-[#155dfc] shadow-sm"
                              style={{
                                minWidth: window.innerWidth < 768 ? "55px" : "65px",
                                height: window.innerWidth < 768 ? "26px" : "30px",
                                backgroundColor: element.color,
                              }}
                            >
                              <span className="text-[10px] md:text-xs font-semibold text-[#155dfc] text-center whitespace-nowrap">
                                {element.text}
                              </span>
                            </Badge>
                          ))}
                        </OrbitingCircles>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mobile: Text at the bottom - Updated typography */}
            <motion.div 
              className="flex md:hidden flex-col w-full gap-2 mt-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}  // Changed from 3 to 0.3
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-[14px] font-normal leading-[20.94px] tracking-[0%]">
                {sections[2].description.map((part, index) => (
                  <span key={index} className={`${part.color}`}>
                    {part.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};
