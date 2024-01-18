import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import LoadScript from "@/lib/load-script";

const PopTopAd = () => {
  const pathname = usePathname();
  const [loading1, setLoading1] = useState(false);

  window.googletag = window.googletag || { cmd: [] };

  useEffect(() => {
    let sl: googletag.Slot | null;
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
        if (sl !== null) sl.addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.pubads().addEventListener("slotResponseReceived", (evt) => {
          if (evt.slot.getResponseInformation()) {
            setLoading1(true);
          } else {
            setLoading1(false);
          }
        });
        googletag.display("div-gpt-ad-1704975698484-0");
      });
    });
    return () => {
      // Clean up the ad slot when the component unmounts or pathname changes
      if (googletag && sl !== null) {
        googletag.cmd.push(function () {
          googletag.destroySlots([sl as googletag.Slot]);
        });
      }
      setLoading1(false);
    };
  }, [pathname]);

  return (
    <>
      <div
        id="div-gpt-ad-1704975698484-0"
        style={{ minWidth: "336px", minHeight: "280px" }}
        className={loading1 ? "block" : "hidden"}
      ></div>
    </>
  );
};

export default PopTopAd;
