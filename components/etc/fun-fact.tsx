import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const FunFact = () => {
  return (
    <div className="bg-[#1d2285] text-white my-4 p-4 rounded-[16px] relative bg-images w-full h-[93px]">
      <div className="flex flex-col text-center z-10">
        <span className={cn("z-10 text-lg", poppins.className)}>#Fun Fact</span>
        <p className="z-10 text-xs">
          The team who has tasted the most number of losses in IPL is Chennai
          Super Kings.
        </p>
      </div>
    </div>
  );
};

export default FunFact;
