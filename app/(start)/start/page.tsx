import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import { getStarterQuestion } from "@/lib/getQuestion";

import { Box, Skeleton } from "@mui/material";

import Loader from "@/components/etc/loader";
import PopAds from "@/components/ads/pop-ad";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const starterPage = async () => {
  const Quiz = dynamic(() => import("@/components/question/quiz-game"), {
    ssr: false,
    loading: () => (
      <Box sx={{ width: 398, height: 172 }}>
        <Skeleton
          variant="rectangular"
          width={398}
          height={172}
          animation="wave"
          sx={{ backgroundColor: "rgba(255, 254, 254, 0.11)" }}
        />
      </Box>
    ),
  });

  const Rules = dynamic(() => import("@/components/etc/rules"), {
    loading: () => (
      <Box sx={{ width: 398, height: 760 }}>
        <Skeleton
          variant="rectangular"
          width={366}
          height={340}
          animation="wave"
          sx={{ backgroundColor: "rgba(255, 254, 254, 0.11)" }}
        />
        <Skeleton
          variant="rectangular"
          width={366}
          height={396}
          animation="wave"
          sx={{ backgroundColor: "rgba(255, 254, 254, 0.11)" }}
        />
      </Box>
    ),
  });

  const StarterAdTop = dynamic(() => import("@/components/ads/home-ad"), {
    ssr: false,
    loading: () => (
      <Box sx={{ width: 336, height: 304 }}>
        <Skeleton
          variant="rectangular"
          width={336}
          height={304}
          animation="wave"
          sx={{ backgroundColor: "rgba(255, 254, 254, 0.11)" }}
        />
      </Box>
    ),
  });

  const data = await getStarterQuestion();

  return (
    <div className="flex items-center flex-col gap-y-2 h-full relative w-full py-2 px-4">
      {/* <Loader /> */}
      <PopAds />
      <StarterAdTop />
      <div className="text-center text-white my-2">
        <h1 className={cn("text-white text-2xl mb-2", poppins.className)}>
          Quick Start!
        </h1>
        <p className="text-gray-200 font-medium">
          Answer 2 questions and win upto 200 coins.
        </p>
      </div>
      <Quiz quiz={data} />
      <Rules />
    </div>
  );
};

export default starterPage;
