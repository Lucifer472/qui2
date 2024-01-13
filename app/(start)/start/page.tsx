import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import Rules from "@/components/etc/rules";
import FunFact from "@/components/etc/fun-fact";

import { getStarterQuestion } from "@/lib/getQuestion";
import { handleFirst } from "@/actions/cookies";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const starterPage = async () => {
  const data = await getStarterQuestion();

  const Quiz = dynamic(() => import("@/components/question/quiz-game"), {
    ssr: false,
  });

  const StarterAdTop = dynamic(() => import("@/components/ads/home-ad"), {
    ssr: false,
  });

  return (
    <div className="flex items-center flex-col gap-y-4 h-full w-full py-2 px-4">
      <StarterAdTop />
      <div className="text-center text-white my-2">
        <h1 className={cn("text-white text-2xl mb-2", poppins.className)}>
          Quick Start!
        </h1>
        <p className="text-gray-200 font-medium">
          Answer 2 questions and win upto 200 coins.
        </p>
      </div>
      <Quiz quiz={data} />
      <FunFact />
      <Rules />
    </div>
  );
};

export default starterPage;
