import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ManagingStudentsSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[1164px] mx-auto py-8 sm:py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full h-fit bg-white border border-solid border-[#155DFC] rounded-xl overflow-hidden shadow-none">
          <CardContent className="p-4 sm:p-6 tablet:p-8 desktop:p-12 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col w-full lg:w-[55%] gap-3 sm:gap-4">
              <h2 className="font-['Instrument_Sans',Helvetica] font-semibold text-[#222222] text-2xl sm:text-[28px] tablet:text-[32px] desktop:text-[38px] leading-[120%] tracking-[0%] lg:hidden">
                How we come to this?
              </h2>

              <div className="block w-full lg:hidden mb-6">
                <img 
                  src="/founder.png" 
                  alt="Founder" 
                  className="w-[280px] h-[200px] sm:w-[320px] sm:h-[240px] object-cover rounded-lg filter grayscale mx-auto"
                />
              </div>

              <h2 className="font-['Instrument_Sans',Helvetica] font-semibold text-[#222222] text-2xl sm:text-[28px] tablet:text-[32px] desktop:text-[38px] leading-[120%] tracking-[0%] hidden lg:block">
                How we come to this?
              </h2>

              <p className="font-['Instrument_Sans',Helvetica] font-normal text-[#323232] text-[14px] sm:text-[16px] tablet:text-[18px] desktop:text-[20px] leading-[1.6] tracking-[0%]">
                This all started while I was teaching students back in my college days. I would
                become very friendly with students, and they would open up about their difficulties. How do they
                get ignored in class? How they liked particular topic and tried few question. After the level gets
                hard, they quit. It all got me thinking about students and can create a product where every
                student can get exactly what they need
              </p>

              <div className="flex mt-2 sm:mt-3">
                <Link to="/blog">
                  <Button
                    variant="link"
                    className="w-fit p-0 h-auto font-['Instrument_Sans',Helvetica] font-medium text-[#155dfc] text-base sm:text-lg tablet:text-xl underline transition-all hover:text-[#0044ff]"
                  >
                    Read our blog&nbsp;&nbsp;-&gt;
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block w-auto">
              <img 
                src="/founder.png" 
                alt="Founder" 
                className="w-[392px] h-[392px] object-cover rounded-lg filter grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
