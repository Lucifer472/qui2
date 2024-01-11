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
          Play Quiz and Win Coins!
        </h2>
        <div className="w-[150px] h-1 bg-orange-500 mt-2" />
      </div>
      {quizRules.map((rule, index) => (
        <div className="flex w-full gap-x-4 text-[#a8a5ff]" key={index}>
          <Check className="min-w-6" />
          <span className="text-left">{rule}</span>
        </div>
      ))}
    </div>
  );
};

export default Rules;
