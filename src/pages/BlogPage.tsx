import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { PracticeSection } from "@/components/Custom/PracticeSection";

export const BlogPage = (): JSX.Element => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full [font-family:'Instrument_Sans',Helvetica] overflow-x-hidden">
      <div className="bg-[#f7f7f7] w-full max-w-[1440px] relative min-h-screen pb-20">
        {/* Blue Blur Ellipses */}
        <div className="fixed w-[300px] md:w-[383px] h-[200px] md:h-[270px] top-[-50px] md:top-[-80px] left-[-100px] md:left-[-150px] bg-[#155dfc40] rounded-[191.5px/135px] blur-[80px] opacity-30 md:opacity-25 z-0 pointer-events-none" />
        <div className="absolute w-[200px] md:w-[286px] h-[150px] md:h-[202px] bottom-[100px] md:bottom-[150px] right-[-80px] md:right-[-120px] bg-[#155dfc40] rounded-[143px/101px] blur-[80px] opacity-30 md:opacity-25 z-0" />
        
        {/* Header with Logo and Button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7] shadow-sm">
          <div className="max-w-[1440px] mx-auto py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="[font-family:'Instrument_Sans',Helvetica] font-normal text-[24px]">
                <span className="text-[#191919]">STUDY</span>
                <span className="font-bold text-[#191919]">table</span>
              </h1>
            </Link>
            
            <Link to="/signup" className="mt-4 md:mt-0">
              <Button className="h-[36px] px-10 py-1 bg-[#155dfc] hover:bg-[#0044ff] rounded-[5px] text-neutral-200 [font-family:'Instrument_Sans',Helvetica] font-semibold text-[14px] transition-colors duration-300">
                Apply for admission
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="w-full max-w-[800px] mx-auto mt-36 px-4 md:px-8">
          <h1 className="text-center text-2xl md:text-[32px] font-semibold mb-8 md:mb-12">
            The Journey of STUDYtable
          </h1>

          <article className="text-[#1b1b1b] text-base md:text-[18px] leading-[1.8] space-y-6">
            <p>
              This all started during my college days. I used to teach students to support myself. Given
              my age at that time, it was easy to become more of a friend to the students. Many times,
              I used to go to dinner with the families I was teaching. Students would open up to me as
              they would open up to a friend. They would share about their study, school, and friends.
            </p>

            <p>
              I would listen and try to figure out what differentiates between a good student and an
              average student. I have had excellent students who would score easily in the
              neighborhood of 90%. I have had students who would do moderate, about 60-80%, and
              be happy with that. I have had students who would struggle just to pass. It was hard to
              see their pain.
            </p>

            <p>
              I started asking. What can we do for the kids? How can we help them? How do they
              need us? I would talk to students privately and ask whether they even like to study.
            </p>

            <p>
              I remember one student who scored 94 out of 100 in Maths, he confessed to me that he
              didn't like math and would only do it till the exam. And he took law afterward. I remember
              one more student. A very bright and confident kid, and scoring 80% was always easy for
              him. But he ended up having a lower score in the exam (73 out of 100) in maths. One
              other girl I remember scoring 82 in science who literally failed in preboards.
            </p>

            <p>
              I taught almost 200+ students over the period of 10 years in private one-on-one sessions. The
              one thing I found was that no two students were the same. They all had their own
              pattern, shortcomings, and strengths.
            </p>

            <p>
              My search started with these interactions. I started listing factors that would affect them.
              Does one student enjoy learning more than others? Surprisingly, if we consider early
              study, the answer is no. Initially, they all would enjoy the new concept almost similarly. It
              is when things get a little complicated that they take different routes. Some would
              struggle and persist, and some would leave it for another day. There occurs the
              difference.
            </p>

            <p>
              The key learning was that there is not much difference between the student
              who just passes and the other who scores 90% comfortably. The difference occurred at the minor issues. Such as, do they have someone to get
              help? If they do, what was the patience level of the help they received?
            </p>

            <p>
              I have seen students sitting for hours (8-10 hours) during exam time and yet not getting enough
              marks. Even with the students who score better, they would sit and work and read the
              content unnecessarily. Some students perform well with less time.
            </p>

            <p>
              The major issues were not associated with the exam or subjects but rather in the
              behavior and nature of help they received from family, teachers, and friends. The kind of
              books and tests they did.
            </p>

            <p>
              To name some issues. Getting help at the right time comes to number one. I have seen
              mostly students would try but leave it as soon as there are some issues. That is
              understandable given the age and nature. And here they get the gap. Delaying help
              simply widens the gap. Over a period of time, this becomes hard to overcome.
            </p>

            <p>
              Another major factor was maintaining consistency for a long time. A simple consistency
              of 1 hour could just make a difference of 20-30% in an exam. Another factor here was
              how things like revision, tests, and practice were managed over the period of a year.
            </p>

            <p>
              The third major issue was how we guide their difficulty level. This is one very important
              issue that is obvious as well. You can not bend them too much as they might start hating
              it. Also, you can not leave them alone as they are kids. How do they know? We can not
              blame them here as well.
            </p>

            <blockquote className="border-l-4 border-[#155dfc] pl-4 my-8 italic">
              "It's not what school or coaching he/she is going. If this were true, then how could all
              schools have all kinds of students? It's not who was the teacher - I agree good teacher matters.
              But all teachers have all kinds of students. It's about the little things. How much help did they get
              when they first encountered the issue? How deliberately was the help delivered? How did they
              have their early learning experiences? How did they find empathy when they felt down? Who
              was sitting with them to help all of the time? These small issues get compounded over a period
              of time, making a student high-performing or low-performing."
            </blockquote>

            <p>
              With these experiences and with the aim that every child experiences a joy in learning.
              That smile when you learn something. That smile when you understand the question on your
              own. Every child can experience that smile and joy again and again. And in that process they
              achieve to the best of their potential.
            </p>

            <p className="text-center font-semibold text-xl mt-12">
              For a joyous learning experience.<br/>
              I present to all – STUDYtable.
            </p>

            <div className="mt-16 text-right">
              <p className="text-[#1b1b1b] text-lg md:text-xl font-semibold">
                Bittu Kumar
              </p>
              <p className="text-[#1b1b1b] text-base md:text-lg">
                Founder, STUDYtable
              </p>
            </div>
          </article>

          {/* CTA Section */}
          <div className="mt-20">
            <PracticeSection/>
          </div>
        </main>
      </div>
    </div>
  );
};