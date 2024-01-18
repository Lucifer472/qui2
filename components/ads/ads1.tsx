import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { ClipLoader } from "react-spinners";

import LoadScript from "@/lib/load-script";

const PopTopAd = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
  const pathname = usePathname();

  window.googletag = window.googletag || { cmd: [] };

  useEffect(() => {
    let sl: googletag.Slot | null;
    const loadAds = async () => {
      LoadScript(() => {
        return;
      });
    };
    loadAds().then(() => {
      googletag.cmd.push(function () {
        sl = googletag.defineSlot(
          "/22850953890/FT_9",
          [336, 280],
          "div-gpt-ad-1704975923390-0"
        );
        if (sl !== null) sl.addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.display("div-gpt-ad-1704975923390-0");
        googletag.pubads().addEventListener("slotRenderEnded", (evt) => {
          if (evt.slot === sl && evt.isEmpty) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        });
      });
    });
    return () => {
      // Clean up the ad slot when the component unmounts or pathname changes
      if (googletag && sl !== null) {
        googletag.cmd.push(function () {
          googletag.destroySlots([sl as googletag.Slot]);
        });
      }
    };
  }, [pathname, setIsOpen]);

  return (
    <>
      <div
        id="div-gpt-ad-1704975923390-0"
        style={{ minWidth: "336px", minHeight: "280px" }}
      ></div>
    </>
  );
};

export default PopTopAd;
