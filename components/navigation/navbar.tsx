"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Bell, Menu } from "lucide-react";

import Sidebar from "@/components/navigation/sidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  let coins: string | number | null = localStorage.getItem("s");
  if (coins === null) {
    coins = "0";
  }
  coins = parseInt(coins as string);

  return (
    <header className="w-full h-16 flex items-center justify-between bg-gradient-to-b from-[#282d93] to-[#15136e] border-b border-white/30">
      {isOpen && (
        <div className="z-[1] bg-black opacity-60 h-full w-full absolute top-0 left-0" />
      )}
      <div className="flex items-center gapx-x-1">
        <button
          className="px-2 flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="text-white h-8 w-8" />
        </button>
        <Link href={"/"}>
          <Image
            src={"/images/logo.webp"}
            alt="logo"
            width={140}
            height={140}
          />
        </Link>
      </div>
      <div className="flex items-center gap-x-1 pr-2">
        <Link
          href={"/"}
          className="rounded-full bg-[#080456] p-1 h-10 w-20 flex items-center justify-center gap-x-1"
        >
          <Image
            src={"/images/coin-icon.png"}
            alt="Coin"
            width={25}
            height={25}
          />
          <div className="flex flex-col items-start text-white text-xs">
            <span>{coins}</span>
            <span>Coins</span>
          </div>
        </Link>
        <Link href={"/"} className="p-2 rounded-full bg-[#080456] text-white">
          <Bell />
        </Link>
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;
