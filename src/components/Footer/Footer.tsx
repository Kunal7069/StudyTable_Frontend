import { InstagramIcon, PinIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const blogPosts = [
  { title: "How we plan learning session ?", link: "/blog" },
  { title: "How we plan assessment session ?", link: "/blog" },
  { title: "How we manage student life ?", link: "/blog" },
  { title: "The effective student", link: "/blog" },
];

const Footer = () => {
  return (
    <footer className="w-full min-h-[570px] desktop:min-h-[300px] bg-[#070707] text-[#ececec] p-8 mt-auto [font-family:'Instrument_Sans',Helvetica]">
      {/* Mobile view (below 760px) */}
      <div className="block tablet:hidden desktop:hidden">
        <div className="max-w-[100%] mx-auto">
          {/* Notice Board Button */}
          <div className="mb-10">
            <Link to="/notice">
              <Button
                variant="outline"
                className="flex items-center gap-2.5 bg-[#ececec] text-[#155dfc] rounded-md h-10 px-[9px] py-2 font-['Instrument_Sans',Helvetica] font-semibold text-xl"
              >
                <PinIcon className="w-6 h-6" />
                <span>Notice Board</span>
              </Button>
            </Link>
          </div>

          {/* Logo and Copyright */}
          <div className="mb-12 text-left">
            <h1 className="text-[42px] text-[#a2a2a2]">
              <span>Study</span>
              <span className="font-semibold">table</span>
            </h1>
            <p className="font-['Instrument_Sans',Helvetica] text-[#a2a2a2] text-base leading-[30px]">
              © Copyright 2025 Studytable
            </p>
          </div>

          {/* Social and Blog Sections */}
          <div className="space-y-8">
            {/* Socials Column */}
            <div>
              <h2 className="font-['Instrument_Sans',Helvetica] font-semibold text-xl mb-4 text-left">
                Socials
              </h2>
              <div className="space-y-4">
                <a 
                  href="https://www.instagram.com/studytable.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <InstagramIcon className="w-6 h-6" />
                  <span className="font-['Instrument_Sans',Helvetica] text-[17px]">
                    Instagram
                  </span>
                </a>
                <a 
                  href="https://wa.me/919661221034" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    className="w-6 h-6"
                    alt="WhatsApp icon"
                    src="/ic-outline-whatsapp.svg"
                  />
                  <span className="font-['Instrument_Sans',Helvetica] text-[17px]">
                    What&apos;s App
                  </span>
                </a>
              </div>
            </div>

            {/* Blogs Column */}
            <div>
              <h2 className="font-['Instrument_Sans',Helvetica] font-semibold text-[22px] mb-4 text-left">
                Blogs
              </h2>
              <div className="font-['Instrument_Sans',Helvetica] text-[17px] leading-6 text-left">
                {blogPosts.map((blog, index) => (
                  <Link 
                    key={index} 
                    to={blog.link}
                    className="mb-2 block hover:text-[#155dfc] transition-colors"
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet view (ONLY at 760px-768px range) - using the custom tablet breakpoint */}
      <div className="hidden tablet:block">
        <div className="max-w-[744px] mx-auto">
          {/* Notice Board Button */}
          <div className="mb-8 flex justify-center">
            <Link to="/notice">
              <Button
                variant="outline"
                className="flex items-center gap-2.5 bg-[#ececec] text-[#155dfc] rounded-md h-10 px-[9px] py-2 font-['Instrument_Sans',Helvetica] font-semibold text-xl"
              >
                <PinIcon className="w-6 h-6" />
                <span>Notice Board</span>
              </Button>
            </Link>
          </div>

          {/* Logo and Copyright */}
          <div className="mb-8 text-center">
            <h1 className="text-[42px] text-[#a2a2a2]">
              <span>Study</span>
              <span className="font-semibold">table</span>
            </h1>
            <p className="font-['Instrument_Sans',Helvetica] text-[#a2a2a2] text-base leading-[30px]">
              © Copyright 2025 Studytable
            </p>
          </div>

          {/* Social and Blog Sections */}
          <div className="grid grid-cols-2 gap-6">
            {/* Socials Column */}
            <div>
              <h2 className="font-['Instrument_Sans',Helvetica] font-semibold text-xl mb-4 text-center">
                Socials
              </h2>
              <div className="space-y-4 flex flex-col items-center">
                <a 
                  href="https://www.instagram.com/studytable.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <InstagramIcon className="w-6 h-6" />
                  <span className="font-['Instrument_Sans',Helvetica] text-[17px]">
                    Instagram
                  </span>
                </a>
                <a 
                  href="https://wa.me/919661221034" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    className="w-6 h-6"
                    alt="WhatsApp icon"
                    src="/ic-outline-whatsapp.svg"
                  />
                  <span className="font-['Instrument_Sans',Helvetica] text-[17px]">
                    What&apos;s App
                  </span>
                </a>
              </div>
            </div>

            {/* Blogs Column */}
            <div>
              <h2 className="font-['Instrument_Sans',Helvetica] font-semibold text-[22px] mb-4 text-center">
                Blogs
              </h2>
              <div className="font-['Instrument_Sans',Helvetica] text-[17px] leading-6 text-center">
                {blogPosts.map((blog, index) => (
                  <Link 
                    key={index} 
                    to={blog.link}
                    className="mb-2 block hover:text-[#155dfc] transition-colors"
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large screen layout (above 768px) - using the custom desktop breakpoint */}
      <div className="hidden desktop:block">
        <div className="max-w-[1440px] mx-auto px-4 md:px-36 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First column: Logo and Notice Board Button */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex justify-center md:justify-start">
                <Link to="/notice">
                  <Button
                    variant="outline"
                    className="w-[189px] h-10 bg-[#ececec] rounded-md flex items-center justify-center gap-2.5"
                  >
                    <PinIcon className="w-6 h-6" />
                    <span className="font-semibold text-[#155dfc] text-xl">
                      Notice Board
                    </span>
                  </Button>
                </Link>
              </div>
              <div>
                <div className="text-3xl md:text-[42px]">
                  <span className="text-[#a2a2a2]">Study</span>
                  <span className="font-semibold text-[#a2a2a2]">table</span>
                </div>
                <div className="text-[#a2a2a2] text-sm md:text-base mt-1 text-center md:text-left">
                  © Copyright 2025 Studytable
                </div>
              </div>
            </div>

            {/* Middle column: Social Links */}
            <div className="flex flex-col items-center justify-start md:items-start md:pl-16">
              <h3 className="font-semibold text-[#ececec] text-lg md:text-xl mb-4">
                Socials
              </h3>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://www.instagram.com/studytable.ai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <InstagramIcon className="w-6 h-6 text-white" />
                  <span className="text-[#ececec] text-base md:text-[17px]">
                    Instagram
                  </span>
                </a>
                <a 
                  href="https://wa.me/919661221034" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <img
                    className="w-6 h-6"
                    alt="Whatsapp icon"
                    src="/ic-outline-whatsapp.svg"
                  />
                  <span className="text-[#ececec] text-base md:text-[17px]">
                    What's App
                  </span>
                </a>
              </div>
            </div>

            {/* Right column: Blog Links */}
            <div className="flex flex-col md:pl-20">
              <h3 className="font-semibold text-[#ececec] text-xl md:text-[22px] mb-4 text-center md:text-left">
                Blogs
              </h3>
              <div className="text-[#ececec] text-base md:text-[17px] leading-6 text-center md:text-left">
                {blogPosts.map((blog, index) => (
                  <Link 
                    key={index} 
                    to={blog.link}
                    className="mb-2 hover:text-[#155dfc] transition-colors block"
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;