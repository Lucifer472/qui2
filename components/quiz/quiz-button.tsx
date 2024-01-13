"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { addCoins, currentCoins } from "@/actions/coins";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const QuizButtons = ({ id }: { id: number }) => {
  window.googletag = window.googletag || { cmd: [] };

  const [isFirst, setIsFirst] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [btn, setBtn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getSession().then((res) => {
      if (res) {
        if (res.user) {
          setUser(res.user);
        }
      }
    });
  }, []);

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
      googletag.pubads().addEventListener("slotResponseReceived", (evt) => {
        const isSlotAvail = evt.slot.getResponseInformation();
        console.log(isSlotAvail);
      });
      googletag.pubads().addEventListener("rewardedSlotReady", (evt) => {
        evt.makeRewardedVisible();
      });
      googletag.pubads().addEventListener("rewardedSlotGranted", () => {
        if (isFirst) {
          if (user) {
            addCoins(100).then((res) => {
              if (res === null) return console.log("Something Went Wrong");
              if (res) return router.refresh();
              return console.log("IT FAILED");
            });
          } else {
            const s = sessionStorage.getItem("s");
            if (s) {
              const coins = parseInt(s);
              if (!isNaN(coins)) {
                const newAmount = coins + 100;
                sessionStorage.setItem("s", newAmount.toString());
                router.refresh();
              }
            }
          }
        }
        setIsFirst(false);
      });
      googletag.pubads().addEventListener("rewardedSlotClosed", () => {
        googletag.destroySlots([rewardedSlot]);
      });
      googletag.display(rewardedSlot);
    });
  };

  const handleStart = () => {
    if (user) {
      currentCoins().then((res) => {
        if (res) {
          if (res > 99) return router.push("/submit/" + id);
          else return router.push("/start");
        }
        return router.push("/start");
      });
    } else {
      const s = sessionStorage.getItem("s");
      if (s === null) return router.push("/start");
      const coins = parseInt(s);

      if (isNaN(coins)) return router.push("/start");
      if (coins > 99) return router.push(`/submit/${id}`);
      return setIsOpen(true);
    }
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
                onClick={handleRewardAds}
                disabled={btn}
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
          onClick={handleRewardAds}
          disabled={btn}
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
