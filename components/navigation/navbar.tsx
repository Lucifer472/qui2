"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Bell, Menu } from "lucide-react";

import { currentCoins } from "@/actions/coins";

import Sidebar from "@/components/navigation/sidebar";

interface NavbarProps {
  isLogged?: boolean;
  name?: string | null;
  image?: string | null;
}

const Navbar = ({ isLogged, name, image }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState<number>(0);

  const pathname = usePathname();

  useEffect(() => {
    const handleCoinsChange = async () => {
      const userCoins = await currentCoins();
      if (userCoins === null) {
        const s = localStorage.getItem("s");
        if (s === null) return 0;
        const sCoins = parseInt(s);
        if (isNaN(sCoins)) return 0;
        return sCoins;
      } else {
        return userCoins;
      }
    };

    handleCoinsChange().then((res: number) => {
      setCoins(res);
    });

    setIsOpen(false);
  }, [pathname]);

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
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLogged={isLogged}
        name={name}
        image={image}
      />
    </header>
  );
};

export default Navbar;
