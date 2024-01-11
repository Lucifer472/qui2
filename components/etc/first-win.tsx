"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const FirtWinComp = () => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("a");
    router.push("/");
  };

  if (localStorage.getItem("a") === null) {
    router.push("/");
  }
  let coins: string | number | null = localStorage.getItem("s");
  if (coins === null) {
    router.push("/");
  }
  coins = parseInt(coins as string);

  return (
    <div className="flex flex-col items-center gap-y-2 p-2 bg-[#1f237e] rounded-lg">
      <Image src={"/gif/rewards.gif"} alt="Reward" width={180} height={180} />
      <span className="text-center text-white text-2xl font-medium">
        You have got {coins} coins
      </span>
      <p className="text-center text-[#b6b3ff] font-medium text-lg">
        Check out more quizzes to test your skills and keeps grabbing more
        coins!
      </p>
      <button
        onClick={handleClick}
        className={cn(
          "max-w-[300px] w-full bg-orange-500 text-white text-2xl font-semibold text-center py-4 rounded-full",
          poppins.className
        )}
      >
        Play Now
      </button>
    </div>
  );
};

export default FirtWinComp;
