import dynamic from "next/dynamic";

import Rules from "@/components/etc/rules";

const SubmitPage = () => {
  const StarterAdTop = dynamic(() => import("@/components/ads/category-ad"), {
    ssr: false,
  });
  const StartAdTop2 = dynamic(() => import("@/components/ads/quiz-win"), {
    ssr: false,
  });
  const FirtWinComp = dynamic(() => import("@/components/etc/first-win"), {
    ssr: false,
  });
  return (
    <div className="w-full flex flex-col items-center px-4 py-2 gap-y-4">
      <StartAdTop2 />
      <FirtWinComp />
      <StarterAdTop />
      <Rules />
    </div>
  );
};

export default SubmitPage;
