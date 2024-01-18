"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ClipLoader } from "react-spinners";

import LoadScript from "@/lib/load-script";
import { X } from "lucide-react";

const PopAds = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const [loading1, setLoading1] = useState(true);

  window.googletag = window.googletag || { cmd: [] };

  useEffect(() => {
    if (pathname === "/start") {
      setIsOpen(true);
    }

    let sl: googletag.Slot | null;
    let sl2: googletag.Slot | null;
    const loadAds = async () => {
      LoadScript(() => {
        console.log("Script Loaded");
      });
    };
    loadAds().then(() => {
      googletag.cmd.push(function () {
        sl = googletag.defineSlot(
          "/22850953890/FT_2",
          [336, 280],
          "div-gpt-ad-1704975698484-0"
        );
        sl2 = googletag.defineSlot(
          "/22850953890/FT_9",
          [336, 280],
          "div-gpt-ad-1704975923390-0"
        );
        if (sl !== null) sl.addService(googletag.pubads());
        if (sl2 !== null) sl2.addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.pubads().addEventListener("slotRenderEnded", (evt) => {
          if (!evt.isEmpty) {
            setIsOpen(false);
          } else {
            setLoading1(false);
          }
        });
        googletag.display("div-gpt-ad-1704975698484-0");
        googletag.display("div-gpt-ad-1704975923390-0");
      });
    });
    return () => {
      // Clean up the ad slot when the component unmounts or pathname changes
      if (googletag && sl !== null) {
        googletag.cmd.push(function () {
          googletag.destroySlots([sl as googletag.Slot]);
        });
      }
      if (googletag && sl2 !== null) {
        googletag.cmd.push(function () {
          googletag.destroySlots([sl2 as googletag.Slot]);
        });
      }
      setIsOpen(false);
    };
  }, [pathname]);
  return (
    <>
      {isOpen && (
        <div className="absolute w-full h-full bg-black opacity-40 z-0" />
      )}
      <div className="flex flex-col items-center w-full absolute top-[50px]">
        {isOpen && (
          <div className="w-full max-w-[350px] relative p-2 rounded-lg bg-white z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-[-75px] left-[30%] p-2 w-32 bg-white flex items-center gap-2 text-black rounded-lg"
            >
              <X />
              <span>Close Ad</span>
            </button>
            {loading1 ? (
              <ClipLoader
                color="#0e0a5f"
                size={60}
                cssOverride={{ borderWidth: "10px" }}
              />
            ) : (
              <div
                id="div-gpt-ad-1704975698484-0"
                style={{ minWidth: "336px", minHeight: "280px" }}
              ></div>
            )}
            <div className="my-2"></div>
            <div
              id="div-gpt-ad-1704975923390-0"
              style={{ minWidth: "336px", minHeight: "280px" }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopAds;
