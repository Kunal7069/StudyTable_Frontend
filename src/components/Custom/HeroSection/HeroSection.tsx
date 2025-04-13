import { motion } from "framer-motion";

export const HeroSection = (): JSX.Element => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[800px] mx-auto mt-4 sm:mt-6 [font-family:'Instrument_Sans',Helvetica] text-[40px] sm:text-[48px] md:text-[52px] lg:text-[56px] text-center leading-[1.2] sm:leading-[1] px-4 relative"
    >
      <h1 className="tracking-normal relative z-10">
        <span className="font-semibold text-[#155dfc] inline">Optimize </span>
        <span className="font-semibold text-[#202020] inline">Your </span>
        <br className="sm:hidden" />
        <div className="inline-block sm:hidden"> </div>
        <span className="font-semibold text-[#202020] inline whitespace-nowrap">Performance for</span>
        <br />
        <div className="mt-2 sm:mt-0">
          <span className="font-semibold text-[#155dfc]">JEE, NEET, </span>
          <span className="font-semibold text-[#202020]">and</span>
          <span className="font-semibold text-[#155dfc]"> Boards</span>
        </div>
      </h1>
    </motion.section>
  );
};