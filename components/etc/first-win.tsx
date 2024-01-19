"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { addCoins, currentCoins } from "@/actions/coins";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const FirtWinComp = () => {
  window.googletag = window.googletag || { cmd: [] };

  const [btn, setBtn] = useState(false);

  const [coins, setCoins] = useState(0);

  const router = useRouter();

  useEffect(() => {
    currentCoins().then((res) => {
      if (res) {
        if (typeof res === "number") return setCoins(res);
        setCoins(parseInt(res));
        return;
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
        addCoins(100).then(() => {
          router.push("/submit/home");
        });
      });
      googletag.pubads().addEventListener("rewardedSlotClosed", () => {
        googletag.destroySlots([rewardedSlot]);
        router.push("/submit/home");
      });
      googletag.display(rewardedSlot);
    });
  };

  if (sessionStorage.getItem("a") === null) {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center gap-y-2 p-2 bg-[#1f237e] rounded-lg min-w-[90%]">
      <Image src={"/gif/rewards.gif"} alt="Reward" width={180} height={180} />
      <span className="text-center text-white text-lg font-medium">
        You have got {coins} coins
      </span>
      <p className="text-center text-[#b6b3ff] font-medium ">
        Get instant 100 coins! <br />
        Watch a simple ad and get Rewarded
      </p>
      <button
        onClick={handleRewardAds}
        disabled={btn}
        className={cn(
          "max-w-[300px] w-full min-h-[60px] relative",
          poppins.className
        )}
      >
        <Image
          src={"/claim-button.png"}
          alt="Claim Now"
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
    </div>
  );
};

export default FirtWinComp;
