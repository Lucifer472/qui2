import { Poppins } from "next/font/google";
import Image from "next/image";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { getQuizbyId } from "@/lib/getQuiz";
import { categoryIcons } from "@/constant";
import { redirect } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const QuizPage = async ({ params }: { params: { id: string } }) => {
  const QuizButtons = dynamic(() => import("@/components/quiz/quiz-button"), {
    ssr: false,
  });

  const StarterAdTop = dynamic(() => import("@/components/ads/quiz-ad"), {
    ssr: false,
  });

  const BottomButtons = dynamic(
    () => import("@/components/quiz/bottom-button"),
    {
      ssr: false,
    }
  );

  const data = await getQuizbyId(params.id);
  if (data === null) return redirect("/");

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <div className="bg-[#1f237e] flex flex-col items-center w-full max-w-[90%] gap-y-2 rounded-lg m-4 p-4">
        <Image
          src={`/icons/${categoryIcons[data.category]}`}
          alt="Auto"
          width={75}
          height={75}
          className="rounded-md"
        />
        <span className="text-white text-sm">{data.name}</span>
        <h2
          className={cn(
            "text-white text-xl flex items-center justify-start gap-x-1",
            poppins.className
          )}
        >
          Play and Win 300000
          <Image
            src={"/images/coin-icon.png"}
            alt="Coins"
            width={18}
            height={18}
          />
        </h2>
        <p className="text-[#b6b3ff] font-medium text-center text-sm flex items-center justify-start gap-x-1">
          You’ve got 60 seconds to answer all questions. Answer as many
          questions as you can. Entry fee will be 100
        </p>
        <p className="text-[#b6b3ff] font-medium text-center flex items-center justify-start gap-x-1">
          Join and save the coins you win! Its free & safe!
        </p>
      </div>
      <QuizButtons id={data.id} />
      <StarterAdTop />
      <BottomButtons />
    </div>
  );
};

export default QuizPage;
