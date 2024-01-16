import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getAllQuestion } from "@/lib/getQuestion";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex flex-col gap-y-2 items-center w-full">
      <div className="grid grid-cols-5 items-center justify-between w-full px-4">
        <Link href={"/"} className="col-span-1 flex items-center">
          <ArrowLeft className="text-white" />
        </Link>
        <span
          className={cn(
            "text-white text-lg whitespace-nowrap flex items-center justify-center gap-1 col-span-3",
            poppins.className
          )}
        >
          Play and Win 3000
          <Image
            src={"/images/coin-icon.png"}
            alt="Coins"
            width={25}
            height={25}
          />
        </span>
        <AudioPlayer />
      </div>
      <QuizBoard data={data} />
      <StarterAdTop />
      <Rules />
    </div>
  );
};

export default QuizGamePage;
