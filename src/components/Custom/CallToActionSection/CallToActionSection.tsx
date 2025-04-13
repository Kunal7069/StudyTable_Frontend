import { InstagramIcon, PinIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";

export const CallToActionSection = (): JSX.Element => {
  // Blog links data
  const blogLinks = [
    "How we plan learning session ?",
    "How we plan assessment session ?",
    "How we manage student life ?",
    "The effective student",
  ];

  // Social media links data
  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon className="w-6 h-6" /> },
    {
      name: "What's App",
      icon: (
        <img
          className="w-6 h-6"
          alt="WhatsApp icon"
          src="/ic-outline-whatsapp.svg"
        />
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#1b1b1b] py-6 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-wrap justify-between">
        {/* Logo and Copyright */}
        <div className="mb-6 md:mb-0">
          <div className="[font-family:'Inter',Helvetica] text-[42px] text-center md:text-left">
            <span className="text-[#a2a2a2]">Study</span>
            <span className="font-semibold text-[#a2a2a2]">table</span>
          </div>
          <div className="[font-family:'Instrument_Sans',Helvetica] text-[#a2a2a2] text-base mt-1">
            © Copyright 2025 Studytable
          </div>
        </div>

        {/* Notice Board Button */}
        <div className="mb-6 md:mb-0">
          <Button
            variant="outline"
            className="h-10 bg-[#ececec] text-black hover:bg-[#ececec] hover:text-black"
          >
            <PinIcon className="w-6 h-6 mr-2" />
            <span className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-xl">
              Notice Board
            </span>
          </Button>
        </div>

        {/* Social Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-xl text-[#ececec] mb-3">
            Socials
          </h3>
          <ul className="space-y-2">
            {socialLinks.map((social, index) => (
              <li key={index} className="flex items-center">
                {social.icon}
                <span className="[font-family:'Instrument_Sans',Helvetica] text-[#ececec] text-[17px] ml-[30px]">
                  {social.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Links */}
        <div>
          <h3 className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-[22px] text-[#ececec] mb-3">
            Blogs
          </h3>
          <ul className="space-y-1">
            {blogLinks.map((blog, index) => (
              <li
                key={index}
                className="[font-family:'Instrument_Sans',Helvetica] text-[#ececec] text-[17px]"
              >
                {blog}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
