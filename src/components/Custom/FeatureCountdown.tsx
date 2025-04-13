import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";

// Set the target date to April 25, 2025 (10 days from April 14, 2025)
const TARGET_DATE = new Date('2025-04-25T00:00:00').getTime();

export const FeatureCountdown = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
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
          days: days.toString().padStart(2, '0'),
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

  // Data for countdown units with dynamic values
  const countdownData = [
    { value: timeLeft.days, unit: "Days", width: "w-[45px] md:w-[45px] lg:w-[53.25px]" },
    { value: timeLeft.hours, unit: "Hours", width: "w-[45px] md:w-[45px] lg:w-[50.25px]" },
    { value: timeLeft.minutes, unit: "Minutes", width: "w-[60px] md:w-[60px] lg:w-[68.25px]" },
    { value: timeLeft.seconds, unit: "Seconds", width: "w-[65px] md:w-[65px] lg:w-[72.75px]" },
  ];

  return (
    <div className="w-[280px] md:w-[240px] lg:w-[280px] xl:w-[336px]">
      <Card className="w-full h-[146px] bg-[#f1f1f1] rounded-[10px]">
        <CardContent className="p-0 flex flex-col justify-center h-full">
          <h2 className="px-[17px] font-['Instrument_Sans',Helvetica] font-semibold text-[#155dfc] text-xl md:text-lg lg:text-2xl tracking-[0.72px] text-center mb-3">
            Feature Launch
          </h2>

          <div className="flex flex-col w-full items-center gap-[3px] px-[17px]">
            <div className="flex items-center justify-center gap-[15px] md:gap-[15px] lg:gap-[19.5px] relative self-stretch w-full">
              {countdownData.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${item.width} items-center relative`}
                >
                  <div className="self-stretch font-['Instrument_Sans',Helvetica] font-bold text-[#313131] text-[24px] md:text-[24px] lg:text-[32px] text-center leading-normal">
                    {item.value}
                  </div>
                  <div className="relative self-stretch font-['Instrument_Sans',Helvetica] font-medium text-[#313131] text-sm md:text-xs lg:text-base text-center leading-normal">
                    {item.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};