"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadScript from "@/lib/load-script";

const CheckStarterPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadScript = async () => {
      LoadScript(() => {
        console.log("Script Loaded");
      });
    };

    loadScript().then(() => {
      const script = document.createElement("script");
      script.text = `window.googletag = window.googletag || { cmd: [] };
      let interstitialSlot;

      googletag.cmd.push(() => {
        // Define a web interstitial ad slot.
        interstitialSlot = googletag.defineOutOfPageSlot(
          "/22850953890/FT_FULLSCREEN",
          googletag.enums.OutOfPageFormat.INTERSTITIAL
        );

        // Slot returns null if the page or device does not support interstitials.
        if (interstitialSlot) {
          // Enable optional interstitial triggers and register the slot.
          interstitialSlot.addService(googletag.pubads()).setConfig({
            interstitial: {
              triggers: {
                unhideWindow: true,
              },
            },
          });

          console.log("Interstitial is loading...");
          googletag.pubads().addEventListener("slotOnload", (event) => {
            if (interstitialSlot === event.slot) {
             console.log("Ads Loaded");
          }});
        }

        // Enable SRA and services.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.display(interstitialSlot);
      });`;

      script.setAttribute("type", "module");

      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    getSession().then((res) => {
      if (res) {
        if (res.user) {
          setUser(res.user);
        }
      }
    });
  }, []);

  if (!user) {
    if (localStorage.getItem("s") === null) {
      router.push("/start");
    }
  }
  return <></>;
};

export default CheckStarterPage;
