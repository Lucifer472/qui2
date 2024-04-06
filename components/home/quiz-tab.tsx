import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { generateRandomTime, getRandomNumberOfUser } from "@/lib/random-data";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface QuizTabProps {
  img: string;
  id: number;
  category: string;
  name: string;
  isHome?: boolean;
}

const QuizTab = ({ img, id, category, name, isHome = false }: QuizTabProps) => {
  const randomUserNumber = getRandomNumberOfUser();
  const randomTime = generateRandomTime();

  return (
    <Link
      href={isHome ? "/" : `/${encodeURI(category)}/${id}`}
      className="flex flex-col w-full bg-[#31363F] rounded-md relative"
    >
      <div className="p-3 flex gap-x-2 items-center justify-start">
        <Image
          src={`/icons/${img}`}
          alt="Animal"
          width={100}
          height={100}
          className="rounded-md"
        />
        <div className="flex flex-col items-start gap-y-1">
          <span className="text-xs text-gray-300">{name}</span>
          <h2
            className={cn(
              "text-white text-[16px] flex items-center justify-start gap-x-1",
              poppins.className
            )}
          >
            Play and Win 30000
            <Image
              src={"/images/coin-icon.png"}
              alt="Coins"
              width={18}
              height={18}
            />
          </h2>
          <p className="text-[#b6b3ff] text-[14px]">
            Winner announcement @ {randomTime}
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300" />
      <div className="px-4 py-2 flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-1 text-white">
          <span className="text-gray-300 text-xs">Entry: 100</span>
          <Image
            src={"/images/coin-icon.png"}
            alt="Coins"
            width={15}
            height={15}
          />
          <span className="font-medium text-white">{randomUserNumber}</span>
          <span className="text-gray-300 text-xs">Users Playing</span>
        </div>
        <div className="px-6 py-2 bg-[#76ABAE] text-white font-medium rounded-full text-xs">
          PLAY
        </div>
      </div>
      <div className="absolute top-0 right-0 p-3 flex items-center gap-1">
        <span className="w-4 h-4 rounded-full bg-[#55e6c1]"></span>
        <span className={cn("text-[#55e6c1] text-sm", poppins.className)}>
          LIVE
        </span>
      </div>
    </Link>
  );
};

export default QuizTab;
