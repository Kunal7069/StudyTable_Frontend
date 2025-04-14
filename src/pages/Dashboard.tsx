import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/logoavatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/Custom/Sidebar";
import { FeatureCountdown } from "@/components/Custom/FeatureCountdown";
import Lottie from 'lottie-react';
import logoAnimation from '../../public/Animation2.json';

interface StudentData {
  name: string;
  class: string; // Changed from studentClass to class
  subjects: string[];
  email?: string;
  city?: string;
  competitive_exams?: string[];
  marks?: {
    '10th'?: Record<string, string>;
    '11th'?: Record<string, string>;
    '12th'?: Record<string, string>;
  };
}

export const Dashboard = (): JSX.Element => {
  const [studentData, setStudentData] = useState<StudentData | undefined>();
  const [, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Format time to 12-hour format with AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Format date to "Saturday, 2 Feb 2024" format
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const admissionNumber = localStorage.getItem('admissionNumber');
        if (!admissionNumber) {
          throw new Error('Admission number not found');
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/student/getStudentDetails/${admissionNumber}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }

        const data = await response.json();
        const transformedData: StudentData = {
          name: data.student.name,
          class: data.student.class, 
          subjects: data.student.subjects || [],
          email: data.student.email,
          city: data.student.city,
          competitive_exams: data.student.competitive_exams,
          marks: data.student.marks
        };
        setStudentData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch student details');
        console.error('Error fetching student details:', err);
      }
    };

    fetchStudentDetails();
  }, []);

  // Data for upcoming features
  const upcomingFeatures = [
    { 
      title: "Subject and Syllabus Sync",
      description: "Different exams, Different subjects, and Different syllabus requirements are all in one place.",
      date: "Coming Soon"
    },
    { 
      title: "Previous Year Paper Analysis Boards",
      description: "Know what is important and what is very important in the syllabus.",
      date: "Coming Soon",
      isHighlighted: true
    },
    { 
      title: "Profile Management",
      description: "Many exams, but what is your priority? Set your priorities for 2026/2027. Share goals with your friends and Ace the journey together. Many more cool features!",
      date: "Coming Soon"
    },
    { 
      title: "Previous Year Paper Analysis JEE/NEET",
      description: "Know what is important and what is very important for JEE/NEET. Align your studies based on your strengths and weaknesses.",
      date: "Coming Soon"
    },
    { 
      title: "STUDY Management (Advanced)",
      description: "School, Boards, JEE/NEET, JIPMER, VITEE, NEST all exams managed at one place for you. Along with many cool features.",
      date: "Coming Soon"
    },
    { 
      title: "Group STUDY feature",
      description: "Not just share the journey but study together. Challenge each other with Group rank.",
      date: "Coming Soon"
    },
    { 
      title: "TABLE TIME",
      description: "Your wait gets finally finished. Practice the previous year's Paper with our AI Tutor and Win Prizes upto 2 Lakhs. Get to Know your AIR and Group Rank.",
      date: "Coming Soon"
    }
  ];

  return (
    <>
      {/* Mobile Warning Overlay with Navigation */}
      <div className="md:hidden fixed inset-0 bg-gradient-to-b from-black to-[#0a0a0a] z-50 flex flex-col items-center justify-between p-8 font-['Instrument_Sans']">
        <div className="flex flex-col items-center w-full">
          <img
            src="/Qlogo.svg"
            alt="Study Table Logo"
            className="w-28 h-28 mb-6"
          />
          <p className="text-white text-center text-xl mb-4">
            Dashboard Access Limited
            <span className="text-gray-400 text-base mt-2 block">
              We support Laptop and tablet devices only
            </span>
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent my-8" />
        </div>

        <div className="w-full max-w-xs flex flex-col gap-6">
          <p className="text-gray-400 text-center text-sm mb-2">You can still access:</p>
          
          <Button
            onClick={() => window.location.href = '/notice'}
            className="bg-[#155DFC]/10 hover:bg-[#155DFC]/20 hover:scale-[1.02] text-white border border-[#155DFC]/30 backdrop-blur-sm px-8 py-6 rounded-lg w-full flex items-center justify-between group transition-all duration-300"
          >
            <div className="flex-1 flex flex-col justify-center">
              <span className="block text-[#155DFC] font-medium text-lg">Notices</span>
              <span className="text-xs text-gray-400 mt-1">View latest updates</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#155DFC] transform group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>

          <Button
            onClick={() => window.location.href = '/blog'}
            className="bg-[#155DFC]/10 hover:bg-[#155DFC]/20 hover:scale-[1.02] text-white border border-[#155DFC]/30 backdrop-blur-sm px-8 py-6 rounded-lg w-full flex items-center justify-between group transition-all duration-300"
          >
            <div className="flex-1 flex flex-col justify-center">
              <span className="block text-[#155DFC] font-medium text-lg">Blog</span>
              <span className="text-xs text-gray-400 mt-1">Read study tips & guides</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#155DFC] transform group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        <div className="w-full max-w-xs mt-8">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-4" />
          <Button
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('admissionNumber');
              window.location.href = '/';
            }}
            className="bg-red-500/10 hover:bg-red-500/20 text-white border border-red-500/30 backdrop-blur-sm py-3 rounded-lg w-full flex items-center justify-center gap-2 group transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-red-500 font-medium">Logout</span>
          </Button>
        </div>
      </div>

      <div className="hidden md:flex min-h-screen bg-[#f7f7f7] h-screen overflow-hidden">
        <Sidebar studentData={studentData} onCollapse={(collapsed) => setIsSidebarCollapsed(collapsed)} />

        {/* Main Content */}
        <main className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:ml-[60px]' : 'ml-[380px] md:ml-[220px]'
        } lg:ml-[280px] xl:ml-[380px] flex-1 p-8 md:p-4 lg:p-6 xl:p-8 font-['Instrument_Sans'] h-screen overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
          <div className="max-w-[1008px] mx-auto h-full">
            {/* Time and Date */}
            <div className="flex justify-between items-start mb-6 md:mb-8 lg:mb-4 xl:mb-6">
              <div className="flex flex-col">
                <div className="font-normal text-[#1b1b1b] text-[42px] md:text-[32px] lg:text-[42px] xl:text-[54.3px] tracking-[1.63px] leading-[1]">
                  {formattedTime}
                </div>
                <div className="font-normal text-[#1b1b1b] text-[12px] md:text-[10px] lg:text-[12px] xl:text-[14.6px] tracking-[0.44px] mt-0">
                  {formattedDate}
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 -960 960 960" width="34" fill="#1b1b1b" className="w-[28px] h-[28px] md:w-[24px] md:h-[24px] lg:w-[28px] lg:h-[28px] xl:w-[34px] xl:h-[34px]">
                <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
              </svg>
            </div>

            <div className="flex gap-6 md:gap-3 lg:gap-4 xl:gap-8">
              {/* Profile and Chat Section */}
              <div className="flex-1">
                <div className="relative w-[100px] h-[100px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] xl:w-[130px] xl:h-[130px]">
                  {/* Lottie animation wrapper */}
                  <div className="absolute inset-[-50%] w-[200%] h-[200%] z-0">
                    <Lottie
                      animationData={logoAnimation}
                      loop={true}
                      className="w-full h-full opacity-60"
                    />
                  </div>
                  
                  {/* Avatar with Q logo */}
                  <div className="relative z-10">
                    <Avatar className="w-full h-full">
                      <img
                        src="/Qlogo.svg"
                        alt="Study Table Logo"
                        className="w-full h-full transform scale-125"
                      />
                    </Avatar>
                  </div>

                  {/* Animated border shine */}
                  <div className="absolute inset-0 rounded-full shine-border pointer-events-none" />
                </div>

                {/* Feature Launch Countdown */}
                <div className="mt-6 md:mt-8 -ml-1 md:-ml-2 lg:-ml-3">
                  <FeatureCountdown />
                </div>
              </div>

              {/* Upcoming Features Card */}
              <Card className="w-[280px] md:w-[260px] lg:w-[280px] xl:w-[336px] bg-[#f1f1f1] rounded-[10px] border-none self-start md:h-[max(500px,calc(100vh-180px))] lg:h-[calc(100vh-140px)] xl:h-[calc(100vh-160px)] mt-11 lg:mt-0 xl:mt-2 overflow-hidden">
                <CardContent className="p-4 md:p-3 lg:p-4 xl:p-6 h-full relative">
                  <h2 className="font-semibold text-[#131313] text-xl md:text-lg lg:text-xl xl:text-2xl tracking-[0.90px] mb-6 md:mb-3 lg:mb-6 xl:mb-8 sticky top-0 bg-[#f1f1f1] z-10 pb-2">
                    Upcoming Features
                  </h2>

                  <div className="relative h-[calc(100%-70px)] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="absolute w-[1.5px] h-[calc(100%+20px)] top-0 left-1.5 bg-black/50" />
                    <div className="space-y-6 md:space-y-5 lg:space-y-6 pb-4">
                      {upcomingFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 relative group">
                          <div className="relative w-[14px] h-[14px] mt-1 bg-white rounded-[7px] border border-solid border-black flex-shrink-0">
                            <div className="absolute w-[8px] h-[8px] top-[2px] left-[2px] bg-[#191919] rounded-[4px]" />
                          </div>

                          <div className="flex flex-col items-start flex-1">
                            <div className={`font-medium text-base md:text-sm lg:text-base leading-5 tracking-[0.60px] ${
                              feature.isHighlighted 
                                ? 'text-[#155DFC] font-bold' 
                                : 'text-[#131313]'
                            }`}>
                              {feature.title}
                            </div>
                            <div className="text-[#5a5a5a] text-[11px] md:text-[10px] lg:text-[11px] mt-1 leading-tight">
                              {feature.description}
                            </div>
                            <div className={`text-xs tracking-[0.42px] mt-1.5 ${
                              feature.isHighlighted 
                                ? 'text-[#155DFC] font-medium' 
                                : 'text-[#5a5a5a]'
                            }`}>
                              {feature.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Chat Input */}
        {/* <div className={`fixed bottom-5 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:left-[60px]' : 'left-[380px] md:left-[220px]'
        } lg:left-[280px] xl:left-[380px] right-0 px-8 md:px-4 lg:px-6 xl:p-8`}>
          <div className="max-w-[1008px] mx-auto">
            <div className="flex items-start gap-4 min-[754px]:gap-4 xl:gap-6 font-['Instrument_Sans']">
              <div className="flex flex-col">
                <div className="font-semibold text-[#1b1b1b] text-base min-[754px]:text-base xl:text-lg leading-5">
                  Start were
                </div>
                <div className="font-semibold text-[#1b1b1b] text-base min-[754px]:text-base xl:text-lg leading-5 mt-0.5">
                  you left
                </div>
              </div>
              <div className="mt-2.5">
                <ArrowRightIcon className="w-4 h-2.5 text-[#1b1b1b] stroke-[3px]" />
              </div>
              <div className="flex-1 relative ml-8">
                <Input
                  className="border-none focus-visible:ring-0 text-[22px] text-[#111111] pl-0 h-10 font-['Instrument_Sans'] mb-1"
                  placeholder="Type here"
                />
                <Separator className="mt-2.5 bg-[#1b1b1b] h-[1.5px]" />
              </div>
              <Button className="bg-[#1f1f1f] text-[#ececec] rounded-[5px] shadow-[0px_0px_4px_#00000040] h-[42px] w-[81px] font-['Instrument_Sans']">
                Send
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
