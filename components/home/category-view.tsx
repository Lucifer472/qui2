"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { category } from "@/constant";

const CategoryView = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-start gap-x-2 w-full px-2 py-2 overflow-x-scroll">
      {category.map((c, index) => (
        <Link
          key={index}
          href={c === "All" ? "/" : `/${encodeURI(c)}`}
          className={cn(
            "px-6 py-2 border border-[#31363F] rounded-sm font-medium hover:bg-[#76ABAE] hover:text-white whitespace-nowrap",
            pathname === `/${encodeURI(c)}`
              ? "bg-[#76ABAE] text-white"
              : "text-gray-300",
            c === "All" && pathname === "/" && "bg-[#76ABAE] text-white"
          )}
        >
          {c}
        </Link>
      ))}
    </div>
  );
};

export default CategoryView;
