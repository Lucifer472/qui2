import { Poppins } from "next/font/google";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { quizRules } from "@/constant";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const Rules = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-y-4">
      <div className="text-center w-full flex items-center flex-col">
        <h2 className={cn("text-2xl text-white", poppins.className)}>
          Fun Fact!
        </h2>
        <div className="w-[150px] h-1 bg-orange-500 mt-2" />
      </div>
      <div className="flex w-full gap-x-4 text-[#a8a5ff]">
        {/* <Check className="min-w-6" /> */}
        <span className="text-center px-2">
          The insurance industry is one of the largest industries in the United
          States, with over $1.5 trillion in annual premiums.The word
          &quot;insurance&quot; comes from the French word &quot;assurer&quot;,
          which means &quot;to make sure&quot;. The first insurance company in
          the United States was founded in Charleston, South Carolina, in
          1735.The insurance industry employs over 2 million people in the
          United States. The average American household spends about $1,500 per
          year on insurance premiums. The most expensive type of insurance in
          the United States is long-term care insurance, which can cost upwards
          of $5,000 per month.
        </span>
      </div>
    </div>
  );
};

export default Rules;
