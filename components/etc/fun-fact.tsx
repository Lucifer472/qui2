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
        </p>
      </div>
    </div>
  );
};

export default FunFact;
