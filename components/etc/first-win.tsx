"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { addCoins } from "@/actions/coins";
import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const FirtWinComp = () => {
  window.googletag = window.googletag || { cmd: [] };

  const [isFirst, setIsFirst] = useState(true);
  const [user, setUser] = useState<any>(null);
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
        if (isSlotAvail === null) router.push("/submit/home");
      });
      googletag.pubads().addEventListener("rewardedSlotReady", (evt) => {
        evt.makeRewardedVisible();
      });
      googletag.pubads().addEventListener("rewardedSlotGranted", () => {
        if (isFirst) {
          if (user) {
            addCoins(100).then(() => {
              router.push("/submit/home");
            });
          } else {
            const s = sessionStorage.getItem("s");
            if (s) {
              const coins = parseInt(s);
              if (!isNaN(coins)) {
                const newAmount = coins + 100;
                sessionStorage.setItem("s", newAmount.toString());
                router.push("/submit/home");
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

  if (sessionStorage.getItem("a") === null) {
    router.push("/");
  }
  let coins: string | number | null = sessionStorage.getItem("s");
  if (coins === null) {
    router.push("/");
  }
  coins = parseInt(coins as string);

  return (
    <div className="flex flex-col items-center gap-y-2 p-2 bg-[#1f237e] rounded-lg">
      <Image src={"/gif/rewards.gif"} alt="Reward" width={100} height={100} />
      <span className="text-center text-white text-lg font-medium">
        You have got {coins} coins
      </span>
      <p className="text-center text-[#b6b3ff] font-medium text-sm">
        Check out more quizzes to test your skills and keeps grabbing more
        coins!
      </p>
      <p className="text-center text-[#b6b3ff] font-medium text-xs">
        Get instant 100 coins! <br />
        Watch a simple ad and get Rewarded
      </p>
      <button
        onClick={handleRewardAds}
        disabled={btn}
        className={cn(
          "max-w-[300px] w-full max-h-[60px] flex justify-center bg-orange-500 text-white text-2xl font-semibold text-center py-4 rounded-full relative animation-link",
          poppins.className
        )}
      >
        Play Now
      </button>
    </div>
  );
};

export default FirtWinComp;
