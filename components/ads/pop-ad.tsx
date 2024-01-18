"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { X } from "lucide-react";
import dynamic from "next/dynamic";

const PopAds = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/start") {
      setIsOpen(true);
    }
  }, [pathname]);

  const Ads1 = dynamic(() => import("./ads1"), {
    ssr: false,
  });

  const Ads2 = dynamic(() => import("./ads2"), {
    ssr: false,
  });

  return (
    <>
      {isOpen && (
        <div className="absolute w-full h-full bg-black opacity-40 z-50" />
      )}
      <div className="flex flex-col items-center w-full absolute top-[50px]">
        {isOpen && (
          <div className="w-full max-w-[350px] relative p-2 rounded-lg bg-white z-[99999]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-[-75px] left-[30%] p-2 w-32 bg-white flex items-center gap-2 text-black rounded-lg"
            >
              <X />
              <span>Close Ad</span>
            </button>
            <div className="flex items-center justify-center flex-col w-full h-full">
              <Ads1 setIsOpen={setIsOpen} />
              <div className="my-2"></div>
              <Ads2 />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopAds;
