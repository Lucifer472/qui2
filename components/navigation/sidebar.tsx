import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Facebook, Instagram, Twitter, X } from "lucide-react";

import Navlinks from "./nav-links";

import { cn } from "@/lib/utils";
import { navLinks } from "@/constant";
import { actionLogout } from "@/actions/Logout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLogged?: boolean;
  name?: string | null;
  image?: string | null;
}

const Sidebar = ({
  isOpen,
  setIsOpen,
  isLogged,
  name,
  image,
}: SidebarProps) => {
  return (
    <div
      className={cn(
        "h-full min-w-[280px] max-w-[380px] w-full absolute top-0 left-0 overflow-x-hidden z-20 bg-[#272c93]",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="relative flex flex-col items-start w-full h-screen bg-[url('/images/tiger.png')] bg-no-repeat bg-[bottom_12px_right_12px]">
        <div className="flex gap-x-2 items-center w-full pb-4 pt-8 relative">
          <div className="flex items-center justify-center pl-6">
            <Image
              src={image ? image : "/images/male-user-avatar.png"}
              alt="Avatar"
              width={65}
              height={65}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-start text-white">
            <h2 className={cn("leading-4", poppins.className)}>
              {name ? name : "Guest"}
            </h2>
            <span className="text-xs">Play Quiz & Earn Coins</span>
            {isLogged ? (
              <button
                onClick={async () => await actionLogout()}
                className={cn(
                  "max-w-[80px] min-w-[60px] w-full bg-orange-500 text-center py-[2px] mt-2 rounded-full text-sm relative animation-link",
                  poppins.className
                )}
              >
                Log Out
              </button>
            ) : (
              <Link
                href={"/login"}
                className={cn(
                  "max-w-[80px] min-w-[60px] w-full bg-orange-500 text-center py-[2px] mt-2 rounded-full text-sm relative animation-link",
                  poppins.className
                )}
              >
                SIGN IN
              </Link>
            )}
          </div>
          <div className="absolute top-0 right-0 p-2">
            <X
              className="text-white cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-white opacity-30" />
        <div className="w-full h-full py-4 pl-6 flex flex-col items-start gap-y-4">
          <ul className="w-full flex flex-col items-start gap-y-4">
            {navLinks.map((l, index) => (
              <Navlinks
                key={index}
                icon={l.icon}
                label={l.label}
                link={l.link}
              />
            ))}
          </ul>
          <div className="flex flex-col items-start gap-y-2">
            <span className="text-white">Connect with us</span>
            <div className="w-full flex items-center justify-start gap-x-4">
              <Link
                href={"/"}
                className="p-2 border border-gray-300 text-white rounded-md"
              >
                <Facebook className="fill-white text-lg w-6 h-6" />
              </Link>
              <Link
                href={"/"}
                className="p-2 border border-gray-300 text-white rounded-md"
              >
                <Twitter className="fill-white text-lg w-6 h-6" />
              </Link>
              <Link
                href={"/"}
                className="p-2 border border-gray-300 text-white rounded-md"
              >
                <Instagram className=" text-lg w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
