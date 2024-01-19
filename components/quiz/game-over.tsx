import { useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { addCoins } from "@/actions/coins";

import { cn } from "@/lib/utils";

interface GameOverProps {
  score: number;
  numberQuestion: number;
  correctAnswer: number;
  wrongAnswer: number;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const GameOver = ({
  score,
  numberQuestion,
  correctAnswer,
  wrongAnswer,
}: GameOverProps) => {
  const rank = Math.floor(Math.random() * 20) + 1;
  window.googletag = window.googletag || { cmd: [] };

  const [btn, setBtn] = useState(false);

  const router = useRouter();

  const handleRewardAds = () => {
    setBtn(true);
    googletag.cmd.push(() => {
      const rewardedSlot = googletag.defineOutOfPageSlot(
        "/22850953890/FT_REWARDED",
        googletag.enums.OutOfPageFormat.REWARDED
      );
      if (rewardedSlot === null) return null;
      rewardedSlot.addService(googletag.pubads());
      googletag.enableServices();
      googletag.pubads().addEventListener("slotOnload", (evt) => {
        if (evt.slot.getResponseInformation() === null) return router.refresh();
      });
      googletag.pubads().addEventListener("rewardedSlotReady", (evt) => {
        evt.makeRewardedVisible();
      });
      googletag.pubads().addEventListener("rewardedSlotGranted", () => {
        addCoins(100).then(() => {
          router.refresh();
        });
      });
      googletag.pubads().addEventListener("rewardedSlotClosed", () => {
        googletag.destroySlots([rewardedSlot]);
      });
      googletag.display(rewardedSlot);
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-4 px-4">
      <div className="flex flex-col w-full items-center gap-y-2 bg-[#282d93] pt-4 px-2 rounded-lg">
        <Image src={"/trophy.png"} alt="Trophy" width={100} height={100} />
        <span className="text-gray-300 font-medium">
          Time is over! Well Played
        </span>
        <h2 className="text-white text-xl font-normal">
          Your score is:{" "}
          <span className={cn("text-green-400", poppins.className)}>
            {score}
          </span>
        </h2>
        <p className="text-white text-sm text-center">
          Winner announcement will be Tomorrow @ 5:30 pm Based on your current
          score, you can win 1500
        </p>
        <div className="mt-6 border boder-gray-300 w-full"></div>
        <div className="grid grid-cols-4 w-full items-center mb-2">
          <div className="p-2 flex flex-col items-center border-r border-gray-300">
            <span className={cn("text-white text-lg", poppins.className)}>
              {rank}
            </span>
            <span className="text-white text-xs whitespace-nowrap">
              Current Rank
            </span>
          </div>
          <div className="p-2 flex flex-col items-center border-r border-gray-300">
            <span className={cn("text-white text-lg", poppins.className)}>
              {numberQuestion}
            </span>
            <span className="text-white text-xs whitespace-nowrap">
              Total Questions
            </span>
          </div>
          <div className="p-2 flex flex-col items-center border-r border-gray-300">
            <span className={cn("text-white text-lg", poppins.className)}>
              {correctAnswer}
            </span>
            <span className="text-white text-xs whitespace-nowrap">
              Correct Answer
            </span>
          </div>
          <div className="p-2 flex flex-col items-center">
            <span className={cn("text-white text-lg", poppins.className)}>
              {wrongAnswer}
            </span>
            <span className="text-white text-xs whitespace-nowrap">
              Wrong Answer
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 w-full">
        <Link
          href={"/"}
          className={cn(
            "w-full py-3 bg-orange-500 rounded-lg text-white text-lg text-center relative animation-link",
            poppins.className
          )}
        >
          Join Quiz
        </Link>
        <button
          disabled={btn}
          onClick={handleRewardAds}
          className={cn(
            "w-full py-3 bg-[#1f237e] rounded-lg text-white text-lg relative animation-link",
            poppins.className
          )}
        >
          Watch an Ad
        </button>
      </div>
    </div>
  );
};

export default GameOver;
