import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";


const TARGET_DATE = new Date('2025-07-24T00:00:00').getTime();

const ShimmerEffect = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-600/20 rounded", className)} />
);

interface StudentData {
  name: string;
  class: string;
  subjects: string[];
}

interface SidebarProps {
  studentData?: StudentData;
  onCollapse?: (collapsed: boolean) => void;
}

export const Sidebar = ({ studentData }: SidebarProps): JSX.Element => {
  const isLoading = !studentData;

  const [timeLeft, setTimeLeft] = useState({
    days: "101",
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
          days: days.toString().padStart(3, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    calculateTimeLeft(); // Calculate immediately
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const countdownData = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  const upcomingExams = [
    {
      name: "Weekly Mock Test",
      time: "Coming Soon",
      date: "TBA",
      daysToGo: "Get Ready",
      status: "yellow",
    },
    {
      name: "Practice Assessment",
      time: "Coming Soon",
      date: "TBA",
      daysToGo: "Coming Soon",
      status: "yellow",
    },
  ];

  return (
    <aside className="w-[380px] md:w-[220px] lg:w-[280px] xl:w-[380px] h-screen bg-[#1b1b1b] fixed font-['Instrument_Sans'] flex flex-col">
      {/* Header section - fixed */}
      <div className="flex-shrink-0 bg-[#1b1b1b] z-20 pt-4 md:pt-3 lg:pt-5 xl:pt-6">
        <div className="ml-6 md:ml-3 lg:ml-4 xl:ml-9 font-['Instrument_Sans']">
          <span className="font-bold text-[28px] md:text-[20px] lg:text-[24px] xl:text-[32px] leading-[20.44px] tracking-[1.55px] text-white">STUDY</span>
          <span className="font-bold text-[38px] md:text-[28px] lg:text-[32px] xl:text-[45px] tracking-[1.52px] text-white">table</span>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative mt-6 md:mt-6 lg:mt-6 xl:mt-6 pb-20">
        
          {/* AI Home Tutor Countdown Box */}
          <div className="mt-8 md:mt-4 lg:mt-8 xl:mt-8 px-6 md:px-3 lg:px-4 xl:px-9">
            <Card className="w-full h-[146px] md:h-[120px] lg:h-[146px] bg-[#2f2f2f] rounded-[10px] text-[#e4e4e4] border-0">
              <CardContent className="p-4 md:p-3 lg:p-4">
                <h2 className="font-semibold text-base md:text-sm lg:text-base xl:text-lg tracking-[0.72px] mb-2 font-['Instrument_Sans',Helvetica]">
                  AI Home Tutor
                </h2>

                <div className="flex justify-between mt-2">
                  {countdownData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center px-1 md:px-0.5 lg:px-1 xl:px-2">
                      <div className="font-bold text-[24px] md:text-[16px] lg:text-[24px] xl:text-[32px] text-[#f1f1f1] font-['Instrument_Sans',Helvetica] leading-tight text-center w-full">
                        {item.value}
                      </div>
                      <div className="font-medium text-xs md:text-[8px] lg:text-xs xl:text-sm text-[#f1f1f1] text-center font-['Instrument_Sans',Helvetica] mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress bars section */}
          <div className="mt-8 md:mt-6 lg:mt-8 xl:mt-10 mx-0 space-y-2 md:space-y-1.5 lg:space-y-2 xl:space-y-3 px-6 md:px-3 lg:px-4 xl:px-9">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-[#e7e7e7] text-xs">JEE</span>
                <span className="font-medium text-[#e7e7e7] text-xs">63%</span>
              </div>
              <Progress value={63} className="h-1 bg-[#2f2f2f] w-full [&>div]:bg-white" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-[#e7e7e7] text-xs">Board</span>
                <span className="font-medium text-[#e7e7e7] text-xs">63%</span>
              </div>
              <Progress value={63} className="h-1 bg-[#2f2f2f] w-full [&>div]:bg-white" />
            </div>
          </div>



          {/* Subjects section with loading state */}
          <div className="mt-14 mr-9 flex flex-col items-end space-y-3">
            {isLoading ? (
              // Skeleton loading for subjects
              <>
                <ShimmerEffect className="w-24 h-4" />
                <ShimmerEffect className="w-20 h-4" />
                <ShimmerEffect className="w-28 h-4" />
                <ShimmerEffect className="w-24 h-4" />
                <ShimmerEffect className="w-20 h-4" />
                <ShimmerEffect className="w-28 h-4" />
              </>
            ) : (
              studentData?.subjects?.map((subject, index) => (
                <div
                  key={index}
                  className="font-['Instrument_Sans'] font-normal text-[14px] leading-[16px] tracking-[0.6px] text-[#EFEFEF]"
                >
                  {subject}
                </div>
              ))
            )}
          </div>

          {/* Upcoming Exams */}
          <div className="mt-12 mr-9 space-y-8">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="relative flex flex-col items-end">
                <div className="font-normal text-[#EFEFEF] text-sm tracking-[0.60px]">
                  {exam.name}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-normal text-[#EFEFEF] text-[11px] tracking-[0.48px] opacity-75">
                    {exam.time}
                  </span>
                </div>
                <div className="font-normal text-[#717171] text-[11px] tracking-[0.45px] mt-0.5">
                  {exam.daysToGo}
                </div>
                <div className="absolute w-[10px] h-[10px] top-[18px] -right-5 rounded-full bg-[#ece81d]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section - fixed */}
      <div className="flex-shrink-0 bg-[#1b1b1b] py-4 px-6 md:px-3 lg:px-6 xl:px-9 border-t border-[#2f2f2f] z-20">
        <div className="flex flex-col items-start gap-3 w-full">
          {isLoading ? (
            <>
              <ShimmerEffect className="w-32 h-5 mb-2" />
              <ShimmerEffect className="w-24 h-4" />
            </>
          ) : (
            <>
              <div className="flex flex-col min-w-0 w-full">
                <div className="font-normal text-[#EFEFEF] text-sm md:text-xs lg:text-sm xl:text-[15px] tracking-[0.72px] truncate w-full">
                  {studentData?.name}
                </div>
                <div className="font-normal text-[#EFEFEF] text-xs md:text-[10px] lg:text-xs xl:text-sm tracking-[0.54px] mt-0.5">
                  Class {studentData?.class}
                </div>
              </div>

              <Button
                variant="ghost"
                className="text-[#EFEFEF] p-1.5 h-auto w-full bg-[#2f2f2f] hover:bg-[#3f3f3f] hover:text-[#EFEFEF] whitespace-nowrap md:text-[10px] lg:text-xs xl:text-sm rounded-md"
              >
                <div className="text-left w-full">
                  <span className="text-xs md:text-[10px] lg:text-xs xl:text-sm tracking-[0.10px] block">Refer 3 friends</span>
                  <span className="text-[10px] md:text-[8px] lg:text-[10px] xl:text-xs tracking-[0.06px] block opacity-75">3 months free</span>
                </div>
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};