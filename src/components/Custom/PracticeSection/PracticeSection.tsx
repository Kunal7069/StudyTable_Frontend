import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const PracticeSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[1161px] mx-auto min-h-screen flex flex-col items-center justify-center py-16 md:py-24 px-4 relative">
      <div className="flex flex-col w-full items-center justify-center gap-8 md:gap-[32px] py-[30px] relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[900px] font-['Instrument_Sans',Helvetica] font-semibold text-black text-[34px] sm:text-6xl md:text-[55px] lg:text-[56px] text-center leading-[100%] tracking-[0%]"
        >
          Crafted for your all academic needs
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center"
        >
          <Link to="/signup">
            <Button className="h-[42px] md:h-[50px] px-[30px] py-2 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] font-['Instrument_Sans',Helvetica] font-semibold text-[17px] md:text-[20px] text-white shadow-md transition-all duration-300 transform hover:scale-105">
              Apply for Admission 
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};