import React from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export interface NoticeUpdateProps {
  title: string;
  content: string;
  resources: string[];
  date: string;
  tags: string;
  category: string;
}

export const NoticeUpdateCard = ({
  title,
  content,
  resources,
  date,
  tags,
  category,
}: NoticeUpdateProps): JSX.Element => {
  return (
    <Card className="border-none shadow-none bg-transparent hover:bg-white/50 transition-colors duration-300 rounded-lg">
      <CardContent className="p-4 md:p-6">
        <div className="w-full">
          <h3 className="font-semibold text-[#1b1b1b] text-lg md:text-[17px] leading-tight md:leading-[26px]">
            {title}
          </h3>

          <p className="mt-4 md:mt-[42px] font-normal text-[#1b1b1b] text-base md:text-[17px] leading-snug md:leading-[26px]">
            {content}
          </p>

          {resources.length > 0 && (
            <div className="mt-4 md:mt-[36px] font-normal text-[#1b1b1b] text-base md:text-[17px] leading-snug md:leading-[26px]">
              <span className="font-medium">Resources: </span>
              {resources.map((link, i) => (
                <React.Fragment key={i}>
                  <a href="#" className="text-[#155dfc] underline hover:text-[#0044ff]">{link}</a>
                  {i < resources.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="flex flex-col md:flex-row md:justify-between mt-4 md:mt-[18px] gap-2 md:gap-0">
            <span className="font-normal text-[#a2a2a2] text-sm md:text-[17px] leading-snug md:leading-[26px]">
              {date}
            </span>
            <div className="flex gap-2 items-center">
              <span className="font-medium text-[#155dfc] text-sm md:text-[17px]">
                {category}
              </span>
              <span className="font-normal text-[#1b1b1b] text-sm md:text-[17px]">
                {tags}
              </span>
            </div>
          </div>

          <Separator className="w-full h-px mt-4 md:mt-[16px]" />
        </div>
      </CardContent>
    </Card>
  );
};
