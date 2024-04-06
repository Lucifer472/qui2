import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface navLinksProps {
  icon: LucideIcon;
  label: string;
  link: string;
}

const navLinks = ({ icon: Icon, label, link }: navLinksProps) => {
  return (
    <li className="flex items-center justify-start gap-x-4">
      <span className="w-10 h-10 p-2 bg-[#222831] rounded-full flex items-center justify-center text-white">
        <Icon />
      </span>
      <Link href={link} className="text-gray-300 hover:text-white font-medium">
        {label}
      </Link>
    </li>
  );
};

export default navLinks;
