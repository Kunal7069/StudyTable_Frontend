import { useEffect, useState } from "react";
import { NoticeUpdateCard, NoticeUpdateProps } from "../components/Custom/NoticeUpdateCard";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { PracticeSection } from "../components/Custom/PracticeSection";

const categories = [
  { name: "All Updates", isBold: true },
  { name: "JEE", isBold: false },
  { name: "NEET", isBold: false },
  { name: "CBSE", isBold: false },
  { name: "ICSE", isBold: false },
];

interface ApiPost {
  id: number;
  heading: string;
  content: string;
  date_of_posting: string;
  tags: string[];
  resources: string[];
  category: string;
}

interface ApiResponse {
  posts: ApiPost[];
  batchNumber: number;
  nextBatch: number;
}

export const NoticeBoard = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState("All Updates");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState<NoticeUpdateProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [nextBatch, setNextBatch] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (batch: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?batch=${batch}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data: ApiResponse = await response.json();

      const transformedPosts = data.posts.map(post => ({
        title: post.heading,
        content: post.content,
        resources: post.resources,
        date: new Date(post.date_of_posting).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        tags: post.tags.join(' | '),
        category: post.category
      }));


      if (batch === 1) {
        setPosts(transformedPosts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...transformedPosts]);
      }

      setNextBatch(data.nextBatch);
      setError(null);
    } catch (err) {
      setError('Failed to load notices');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setCurrentBatch(1);
    fetchPosts(1);
  }, [activeCategory]);

  const loadMore = () => {
    if (nextBatch) {
      setCurrentBatch(nextBatch);
    }
  };


  const filteredPosts = activeCategory === "All Updates"
    ? posts
    : posts.filter(post => post.tags.includes(activeCategory.toUpperCase()) ||
      post.tags.includes(activeCategory) ||
      post.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full [font-family:'Instrument_Sans',Helvetica] overflow-x-hidden">
      <div className="bg-[#f7f7f7] w-full max-w-[1440px] relative min-h-screen pb-20">

        <div className="fixed w-[300px] md:w-[383px] h-[200px] md:h-[270px] top-[-50px] md:top-[-80px] left-[-100px] md:left-[-150px] bg-[#155dfc40] rounded-[191.5px/135px] blur-[80px] opacity-30 md:opacity-25 z-0 pointer-events-none" />


        <div className="flex flex-col md:flex-row mt-12 px-4 md:px-8 lg:px-16 xl:px-24 relative">

          <div className="hidden md:block w-[200px]">
            <div className="fixed top-8">

              <div className="mb-8">
                <Link to="/" className="flex items-center">
                  <h1 className="font-normal text-[24px]">
                    <span className="text-[#191919]">STUDY</span>
                    <span className="font-bold text-[32px] text-[#191919]">table</span>
                  </h1>
                </Link>
              </div>

              {/* Categories for desktop */}
              <div className="self-start w-[200px] mr-8 lg:mr-12">
                <div className="relative">
                  <h3 className="font-semibold text-[#155dfc] text-2xl mb-4">
                    Notice Board
                  </h3>
                  <div className="font-sans text-[17px]">

                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index} className="w-full">
                          <button
                            onClick={() => handleCategoryClick(category.name)}
                            className={`text-left hover:text-[#155dfc] transition-colors cursor-pointer block w-full py-1 ${category.name === activeCategory
                                ? "font-semibold text-[#1b1b1b]"
                                : "text-[#a2a2a2]"
                              }`}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute w-px h-full top-0 right-0 bg-gray-200"></div>
                  <div className="w-[383px] h-[270px] -left-[217px] -top-24 rounded-[191.5px/135px] absolute bg-[#155dfc99] blur-[217px] opacity-60 z-0"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 ml-0 md:ml-12">

            <div className="md:hidden flex flex-col items-center gap-4 mb-8 fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7] py-4 px-4">
              <Link to="/" className="flex items-center justify-center">
                <h1 className="[font-family:'Instrument_Sans',Helvetica] font-normal text-[24px]">
                  <span className="text-[#191919]">STUDY</span>
                  <span className="font-bold text-[#191919]">table</span>
                </h1>
              </Link>

              <Link to="/signup">
                <Button className="h-[36px] px-6 py-1 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 [font-family:'Instrument_Sans',Helvetica] font-semibold text-[14px] transition-colors duration-300">
                  Apply for admission
                </Button>
              </Link>
            </div>


            <div className="md:hidden h-32"></div>


            <div className="md:hidden relative mb-6">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-4 bg-white rounded-md shadow-sm border border-gray-200 text-lg font-semibold"
              >
                <span>{activeCategory}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Improved dropdown styling */}
              {isDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryClick(category.name)}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${category.name === activeCategory ? "font-semibold bg-gray-50 text-[#155dfc]" : ""
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Apply button - Only visible on desktop */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="block"></div>

              <Link to="/signup">
                <Button className="h-[38px] px-[20px] py-2 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 [font-family:'Instrument_Sans',Helvetica] font-semibold text-[15px] shadow-[0px_4px_4px_#00000040] transition-colors duration-300">
                  Apply for admission
                </Button>
              </Link>
            </div>

            <h1 className="text-2xl md:text-[28px] font-semibold mb-8 text-center md:text-left">
              {activeCategory}
            </h1>

            {/* Updates List using reusable component with animations */}
            <div className="flex flex-col gap-4 md:gap-8">
              {loading && currentBatch === 1 ? (
                <div className="text-center py-12">Loading...</div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">{error}</div>
              ) : (
                <>
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <NoticeUpdateCard {...post} />
                    </motion.div>
                  ))}

                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No updates available for this category.
                    </div>
                  )}

                  {nextBatch && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={loadMore}
                        className="bg-[#155dfc] hover:bg-[#0044ff] text-white"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Load More'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* PracticeSection added at the end of cards */}
            <div className="mt-16">
              <PracticeSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
