import Lottie from 'lottie-react';
import logoAnimation from '../../../public/Animation.json';

export const Frame = (): JSX.Element => {
  const features = [
    { id: 1, text: "Anything" },
    { id: 2, text: "Anytime" },
    { id: 3, text: "Anywhere" },
  ];

  return (
    <section className="w-full flex justify-center items-center">
    
      <div className="w-full max-w-[1164px] flex flex-col items-center justify-center py-8 md:py-10 px-4">
        <div className="relative w-[70px] h-[70px] md:w-[99.95px] md:h-[99.95px]">
          {/* Lottie animation wrapper */}
          <div className="absolute inset-[-50%] w-[200%] h-[200%] z-0">
            <Lottie
              animationData={logoAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>

          {/* Main logo container */}
          <div className="absolute inset-0 bg-[#155DFC] rounded-[55px] md:rounded-[79.43px] shadow-[0px_0px_6.38px_0px_#00000040] overflow-hidden flex items-center justify-center z-10">
            <img 
              src="/Qlogo.svg" 
              alt="Q Logo" 
              className="w-full h-full transform scale-[1.25] relative z-10"
            />
          </div>

          {/* Animated border shine */}
          <div className="absolute inset-0 rounded-[55px] md:rounded-[79.43px] shine-border pointer-events-none" />
        </div>

        <h1 className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-[34px] md:text-[54px] text-center mt-4 text-white leading-[100%] tracking-[0%]">
          Introducing 
        </h1>

        <h2 className="[font-family:'Instrument_Sans',Helvetica] font-bold text-[24px] md:text-[44px] text-center mt-2 leading-[100%] tracking-[0%] bg-clip-text text-transparent bg-gradient-to-r from-[#155DFC] via-[#155DFC] via-[50.48%] to-[rgba(21,93,252,0.6)]">
          Your AI Home Tutor
        </h2>

        <div className="flex flex-row justify-center md:gap-16 gap-4 mt-6 mb-2">
          {features.map((feature) => (
            <span
              key={feature.id}
              className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-[18px] md:text-[24px] text-gray-300 text-center leading-[100%] tracking-[0%] whitespace-nowrap"
            >
              {feature.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};