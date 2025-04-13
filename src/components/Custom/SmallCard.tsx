import { Card, CardContent } from "../../components/ui/card";

interface SmallCardProps {
  text: string;
  imageUrl: string;
}

export const SmallCard = ({ text, imageUrl }: SmallCardProps): JSX.Element => {
  return (
    <Card className="w-[159.6px] min-[754px]:w-[180px] lg:w-[233px] h-[92.47px] min-[754px]:h-[110px] lg:h-[135px] rounded-[6.85px] min-[754px]:rounded-[8px] lg:rounded-[10px] flex flex-col items-center justify-center p-0">
      <CardContent className="flex flex-col items-center justify-center gap-[4.11px] min-[754px]:gap-1.5 lg:gap-2 px-[6px] min-[754px]:px-[10px] lg:px-[13px] py-[4.79px] min-[754px]:py-[6px] lg:py-[7px] w-full h-full">
        <div className="w-8 h-8 min-[754px]:w-10 min-[754px]:h-10 lg:w-11 lg:h-11 bg-[#dbe6ff] rounded-[15px] min-[754px]:rounded-[18px] lg:rounded-[22px] flex items-center justify-center">
          <img 
            src={`/${imageUrl}`} 
            alt="icon"
            className="w-4 h-4 min-[754px]:w-5 min-[754px]:h-5 lg:w-6 lg:h-6"
          />
        </div>

        <p className="[font-family:'Instrument_Sans',Helvetica] font-medium text-[13px] min-[754px]:text-[14px] lg:text-[15px] leading-[15px] min-[754px]:leading-[17px] lg:leading-[19px] tracking-[0] text-[#323232] text-center">
          {text}
        </p>
      </CardContent>
    </Card>
  );
};
