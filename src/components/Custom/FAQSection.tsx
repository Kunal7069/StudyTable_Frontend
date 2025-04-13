import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Is it an online (video/live) or offline class?",
    answer: "It’s neither online nor offline. It's an AI software. We work in parallel with your school, tuitions, and coaching institutes.. Every day, we ask for what you studied in your school and tuitions, and accordingly, we make you practice Questions and strengthen your Concepts"
  },
  {
    question: "Is the study aligned with the curriculum of my school?",
    answer: "Yes. Absolutely. The whole idea of STUDYtable is to help you manage what you already do and aim to achieve. We follow standard curriculum as per the guidelines of CBSE/ICSE, JEE, NEET, JIPMER, BITSAT, and all other engineering and medical exams"
  },
  {
    question: "How does STUDYtable’s AI tutor Work?",
    answer: "It's like your home tutor. Every day, we ask about what is happening in your school, tuitions, and academic life. Accordingly, we will make you practice the same topic you studied. Based on the difficulties you face, we provide solutions and optimize your study path. Every week, we help you revise concepts you studied. We also provide you with an assessment test. It is based on all the exams you aim for, short term or long term. In short, we stand by you in your entire academic life."
  },
  {
    question: "How much time should I spend on the platform daily?",
    answer: "We advise students to spend 2-3 hours for Boards and JEE level preparation. For Olympiads and Advanced level preparation, we advise 4+ hours per day. Though there is no end of"
  },
  {
    question: "Can I access the platform from multiple devices?",
    answer: "Yes, you can. For the same account, multiple logins are possible.However, we do not support mobile devices for study purposes. A tablet or laptop is necessary for the use of our product."
  }
];

export const FAQSection = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-[1164px] mx-auto py-16 md:py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="text-center font-['Instrument_Sans',Helvetica] font-semibold text-xl sm:text-2xl md:text-[38px] text-[#1b1b1b] mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="flex flex-col gap-3 md:gap-4 max-w-[900px] mx-auto">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-[#e5e5e5] rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-['Instrument_Sans',Helvetica] font-medium text-[15px] sm:text-base md:text-lg lg:text-xl text-[#1b1b1b] pr-4">
                  {faq.question}
                </span>
                <div className="p-1 rounded-full bg-[#f5f8ff]">
                  {openIndex === index ? (
                    <MinusIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#155dfc]" />
                  ) : (
                    <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#155dfc]" />
                  )}
                </div>
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 bg-white",
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-4 sm:p-5 md:p-6 pt-0 font-['Instrument_Sans',Helvetica] text-[13px] sm:text-sm md:text-base text-[#646464] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
