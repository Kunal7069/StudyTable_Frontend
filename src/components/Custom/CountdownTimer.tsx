import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";

// Set target date to match AI Home Tutor launch (July 24, 2025)
const TARGET_DATE = new Date('2025-07-24T00:00:00').getTime();

export const CountdownTimer = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState({
    days: "000",  // Changed to 3 digits to match Sidebar format
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(3, '0'),  // Changed to padStart(3, '0') to match Sidebar format
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); 

  const countdownData = [
    { value: timeLeft.days, unit: "Days", width: "w-[45px] md:w-[71px]" },
    { value: timeLeft.hours, unit: "Hours", width: "w-[43px] md:w-[67px]" },
    { value: timeLeft.minutes, unit: "Minutes", width: "w-[58px] md:w-[91px]" },
    { value: timeLeft.seconds, unit: "Seconds", width: "w-[62px] md:w-[97px]" },
  ];

  return (
    <div className="flex flex-col items-center mx-auto gap-2 md:gap-3 pt-8 md:pt-16">
      <h2 className="self-stretch [font-family:'Instrument_Sans',Helvetica] font-semibold text-[#155dfc] text-base md:text-xl text-center tracking-[0] leading-[30px]">
        Launching In
      </h2>

      <div className="gap-5 md:gap-[42px] self-stretch w-full flex items-center justify-between">
        {countdownData.map((item, index) => (
          <Card key={index} className="bg-transparent border-0 shadow-none">
            <CardContent
              className={`flex flex-col items-center p-0 ${item.width}`}
            >
              <span className="self-stretch [font-family:'Instrument_Sans',Helvetica] font-bold text-white text-[28px] md:text-[48px] text-center tracking-[0] leading-[100%]">
                {item.value}
              </span>
              <span className="self-stretch [font-family:'Instrument_Sans',Helvetica] font-medium text-white text-sm md:text-xl text-center tracking-[0] leading-[normal] mt-1">
                {item.unit}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
