import dynamic from "next/dynamic";

import Rules from "@/components/etc/rules";

const SubmitPage = () => {
  const StarterAdTop = dynamic(() => import("@/components/ads/starter-page"), {
    ssr: false,
  });
  const FirtWinComp = dynamic(() => import("@/components/etc/first-win"), {
    ssr: false,
  });
  return (
    <div className="w-full flex flex-col items-center px-4 py-2 gap-y-4">
      <FirtWinComp />
      <StarterAdTop />
      <Rules />
    </div>
  );
};

export default SubmitPage;
