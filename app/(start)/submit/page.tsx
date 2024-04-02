import dynamic2 from "next/dynamic";

import Rules from "@/components/etc/rules";

export const dynamic = "force-static";

const SubmitPage = () => {
  const StartAdTop2 = dynamic2(() => import("@/components/ads/quiz-win"), {
    ssr: false,
  });
  const FirstWinComp = dynamic2(() => import("@/components/etc/first-win"), {
    ssr: false,
  });
  return (
    <div className="w-full flex flex-col items-center px-4 py-2 gap-y-4">
      <StartAdTop2 />
      <FirstWinComp />
      <Rules />
    </div>
  );
};

export default SubmitPage;
