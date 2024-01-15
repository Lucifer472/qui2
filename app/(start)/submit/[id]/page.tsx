import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { getAllQuestion } from "@/lib/getQuestion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const QuizGamePage = async ({ params }: { params: { id: string } }) => {
  const AudioPlayer = dynamic(() => import("@/components/quiz/audio-player"), {
    ssr: false,
  });
  const QuizBoard = dynamic(() => import("@/components/quiz/quiz-board"), {
    ssr: false,
  });

  const StarterAdTop = dynamic(() => import("@/components/ads/quiz-ad"), {
    ssr: false,
  });

  const Rules = dynamic(() => import("@/components/etc/rules"), {
    ssr: false,
  });

  const data = await getAllQuestion(params.id);

  if (data === null) return;

  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <AudioPlayer />
      <span className={cn("text-white text-xl flex gap-1", poppins.className)}>
        Play and Win 3000
        <Image
          src={"/images/coin-icon.png"}
          alt="Coins"
          width={25}
          height={25}
        />
      </span>
      <QuizBoard data={data} />
      <StarterAdTop />
      <Rules />
    </div>
  );
};

export default QuizGamePage;
