import { Poppins } from "next/font/google";
import dynamic2 from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const SubmitHomePage = () => {
  const StarterAdTop = dynamic2(() => import("@/components/ads/quiz-ad"), {
    ssr: false,
  });
  const Rules = dynamic2(() => import("@/components/etc/rules"), {
    ssr: true,
  });
  return (
    <div className="flex flex-col items-center w-full gap-y-4 px-4 py-2">
      <StarterAdTop />
      <div className="flex flex-col w-full bg-[#31363F] rounded-md relative">
        <div className="p-3 flex gap-x-2 items-center justify-evenly">
          <Link
            href={"/quiz/" + 5}
            className="flex flex-col items-center gap-y-1"
          >
            <span className="text-white">Fun Quiz</span>
            <Image
              src={`/icons/science.png`}
              alt="Animal"
              width={100}
              height={100}
              className="rounded-md"
            />
          </Link>
          <Link
            href={"/quiz/" + 1}
            className="flex flex-col items-center gap-y-1"
          >
            <span className="text-white">Math Quiz</span>
            <Image
              src={`/icons/math.png`}
              alt="Animal"
              width={100}
              height={100}
              className="rounded-md"
            />
          </Link>
          <Link
            href={"/quiz/" + 2}
            className="flex flex-col items-center gap-y-1"
          >
            <span className="text-white">Car Quiz</span>
            <Image
              src={`/icons/auto.png`}
              alt="Animal"
              width={100}
              height={100}
              className="rounded-md"
            />
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="px-4 py-2 flex items-center justify-between w-full">
          <Link
            href={"/"}
            className={cn(
              "px-6 py-2 bg-[#76ABAE] text-white font-medium rounded-full text-2xl w-full text-center",
              poppins.className
            )}
          >
            PLAY
          </Link>
        </div>
      </div>
      <Rules />
    </div>
  );
};

export default SubmitHomePage;
