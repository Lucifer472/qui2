"use client";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const BottomButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-x-2 max-w-[90%] w-full my-2">
      {isOpen && (
        <div className="absolute bg-black/50 top-0 left-0 w-full h-full z-[1]" />
      )}
      {isOpen && (
        <div className="absolute z-10 bottom-0 left-0 w-full h-[50%] bg-[#282d93] rounded-t-3xl">
          <div className="w-full flex flex-col items-center gap-y-4 px-6 py-2">
            <div className="flex items-center justify-between w-full mt-4">
              <span className={cn("text-white text-xl", poppins.className)}>
                Prize Rank List
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-black/30 rounded-full text-white"
              >
                <X />
              </button>
            </div>
            <ul className="flex flex-col items-start w-full gap-0 mt-4">
              <li className="flex items-center justify-between w-full py-4 border-b border-gray-300">
                <span className={cn("text-white text-lg", poppins.className)}>
                  Rank 1
                </span>
                <p className="flex gap-1 text-white text-lg">
                  2000
                  <Image
                    src={"/images/coin-icon.png"}
                    alt="Coins"
                    width={25}
                    height={25}
                  />
                </p>
              </li>
              <li className="flex items-center justify-between w-full py-4 border-b border-gray-300">
                <span className={cn("text-white text-lg", poppins.className)}>
                  Rank 2 - 10
                </span>
                <p className="flex gap-1 text-white text-lg">
                  1000
                  <Image
                    src={"/images/coin-icon.png"}
                    alt="Coins"
                    width={25}
                    height={25}
                  />
                </p>
              </li>
              <li className="flex items-center justify-between w-full py-4 border-b border-gray-300">
                <span className={cn("text-white text-lg", poppins.className)}>
                  Rank 11 - 50
                </span>
                <p className="flex gap-1 text-white text-lg">
                  600
                  <Image
                    src={"/images/coin-icon.png"}
                    alt="Coins"
                    width={25}
                    height={25}
                  />
                </p>
              </li>
              <li className="flex items-center justify-between w-full py-4 border-b border-gray-300">
                <span className={cn("text-white text-lg", poppins.className)}>
                  Rank 51 - 200
                </span>
                <p className="flex gap-1 text-white text-lg">
                  200
                  <Image
                    src={"/images/coin-icon.png"}
                    alt="Coins"
                    width={25}
                    height={25}
                  />
                </p>
              </li>
              <li className="flex items-center justify-between w-full py-4 border-b border-gray-300">
                <span className={cn("text-white text-lg", poppins.className)}>
                  Rank 201 - 500
                </span>
                <p className="flex gap-1 text-white text-lg">
                  100
                  <Image
                    src={"/images/coin-icon.png"}
                    alt="Coins"
                    width={25}
                    height={25}
                  />
                </p>
              </li>
              <li className="flex items-center justify-between w-full py-4">
                <span className={cn("text-white text-lg", poppins.className)}>
                  Rank 501 - 1000
                </span>
                <p className="flex gap-1 text-white text-lg">
                  50
                  <Image
                    src={"/images/coin-icon.png"}
                    alt="Coins"
                    width={25}
                    height={25}
                  />
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full py-3 bg-[#1f237e] rounded-lg text-white text-lg",
          poppins.className
        )}
      >
        View Prize
      </button>
      <button
        onClick={() => router.push("/rules")}
        className={cn(
          "w-full py-3 bg-[#1f237e] rounded-lg text-white text-lg",
          poppins.className
        )}
      >
        Contest Rules
      </button>
    </div>
  );
};

export default BottomButtons;
