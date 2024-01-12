import { category, categoryIcons } from "@/constant";
import dynamic from "next/dynamic";

const SubmitHomePage = () => {
  const StarterAdTop = dynamic(() => import("@/components/ads/quiz-ad"), {
    ssr: false,
  });
  const QuizTab = dynamic(() => import("@/components/home/quiz-tab"), {
    ssr: false,
  });
  const Rules = dynamic(() => import("@/components/etc/rules"), {
    ssr: true,
  });
  return (
    <div className="flex flex-col items-center w-full gap-y-4 px-4 py-2">
      <StarterAdTop />
      <QuizTab
        category={category[1]}
        id={1}
        img={categoryIcons[category[1]]}
        name="Best Quiz"
        isHome
      />
      <Rules />
    </div>
  );
};

export default SubmitHomePage;
