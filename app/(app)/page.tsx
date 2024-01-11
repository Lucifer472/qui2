import dynamic from "next/dynamic";

import { categoryIcons } from "@/constant";
import { getQuizAll } from "@/lib/getQuiz";

import QuizTab from "@/components/home/quiz-tab";

const homePage = async () => {
  const data = await getQuizAll();

  const StarterAdTop = dynamic(() => import("@/components/ads/starter-page"), {
    ssr: false,
  });
  const CategoryView = dynamic(
    () => import("@/components/home/category-view"),
    {
      ssr: false,
    }
  );

  if (data.length < 0) return null;
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 w-full">
      <StarterAdTop />
      <CategoryView />
      <div className="flex flex-col w-full gap-y-2 px-4 py-2">
        {data.map((d, index) => (
          <QuizTab
            key={index}
            name={d.name}
            img={categoryIcons[d.category] || "animal.png"}
            category={d.category}
            id={d.id}
          />
        ))}
      </div>
    </div>
  );
};

export default homePage;
