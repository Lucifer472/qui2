import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

interface QuestionPanelProps {
  question: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  handleAnswerSelect: (selectedAnswer: number) => void;
  green: null | number;
  red: null | number;
  lock: boolean;
}

const QuestionPanel = ({
  question,
  opt1,
  opt2,
  opt3,
  opt4,
  handleAnswerSelect,
  green,
  red,
  lock,
}: QuestionPanelProps) => {
  const options = [opt1, opt2, opt3, opt4];

  return (
    <div className="relative w-full flex flex-col text-center p-2 gap-y-4 bg-[#31363F] text-white rounded-md mt-6">
      <span className={cn("text-xl text-center", poppins.className)}>
        {question}
      </span>
      <div className="grid grid-cols-2 gap-2 w-full">
        {options.map((opt, index) => (
          <Button
            key={index}
            size={"lg"}
            variant={"outline"}
            disabled={lock}
            className={cn(
              "text-black disabled:opacity-100",
              green === index + 1 ? "bg-green-400 hover:bg-green-400" : "",
              red === index + 1 ? "bg-red-400 hover:bg-red-400" : ""
            )}
            onClick={() => handleAnswerSelect(index + 1)}
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
