"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";

import firebaseApp from "@/lib/firebase";
import LoadScript from "@/lib/load-script";

import useFcmToken from "@/hooks/useFcmToken";

const CheckStarterPage = () => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        },
        function (err) {
          console.log("Service Worker registration failed:", err);
        }
      );
    }
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
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // @ts-ignore
        const c = new Notification(payload.notification.title, {
          // @ts-ignore
          body: payload.notification.body,
        });

        c.addEventListener("click", () => {
          // @ts-ignore
          window.open(payload.fcmOptions?.link);
        });
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return <></>;
};

export default CheckStarterPage;
