"use client";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const QuizButtons = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleStart = () => {
    const s = localStorage.getItem("s");
    if (s === null) return router.push("/start");
    const coins = parseInt(s);

    if (isNaN(coins)) return router.push("/start");
    if (coins > 99) return router.push(`/start/${id}`);
    return setIsOpen(true);
  };
  return (
    <>
      {isOpen && (
        <>
          <div className="absolute w-full h-full bg-black/30 z-10"></div>
          <div className="absolute w-[90%] h-96 rounded-3xl z-20 top-1/2 left-1/2 bg-[#282d93] transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center flex-col gap-y-4 w-full">
              <div className="w-full flex justify-end p-4">
                <X
                  className="text-white cursor-pointer"
                  onClick={() => setIsOpen(!open)}
                />
              </div>
              <Image src={"/noMoney.svg"} alt="Ads" width={100} height={100} />
              <span className="px-4 text-center text-gray-300">
                You don&apos;t have enough coins to play this contest.
              </span>
              <button
                className={cn(
                  "w-[200px] py-3 bg-orange-500 rounded-full text-white text-xl relative animation-link",
                  poppins.className
                )}
              >
                Watch an Ad
              </button>
              <span className="px-4 text-center text-gray-300">
                Click on video ad to get 100 reward coins.
              </span>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col items-center gap-y-2 max-w-[90%] w-full m-2">
        <button
          className={cn(
            "w-full py-3 bg-orange-500 rounded-lg text-white text-xl relative animation-link",
            poppins.className
          )}
        >
          Watch an Ad
        </button>
        <button
          onClick={handleStart}
          className={cn(
            "w-full py-3 bg-[#1f237e] rounded-lg text-white text-xl",
            poppins.className
          )}
        >
          Play as Guest
        </button>
      </div>
    </>
  );
};

export default QuizButtons;
