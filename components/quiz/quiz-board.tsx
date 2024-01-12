"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { question } from "@prisma/client";
import { cn } from "@/lib/utils";

import QuestionPanel from "@/components/question/question-panel";
import GameOver from "./game-over";
import { getSession } from "next-auth/react";
import { addCoins, removeCoins } from "@/actions/coins";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface QuizBoardProps {
  data: question[];
}

const QuizBoard = ({ data }: QuizBoardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);

  const [green, setGreen] = useState<null | number>(null);
  const [red, setRed] = useState<null | number>(null);

  const [lock, setLock] = useState(false);

  const [gameover, setGameOver] = useState(false);

  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const handleAnswerSelection = (selectedAnswer: number) => {
    setLock(true);
    if (selectedAnswer === data[currentQuestion].answer) {
      setGreen(selectedAnswer);
      setScore((prev) => prev + 100);
      setCorrectAns((prev) => prev + 1);
      handleNextQuestion();
    } else {
      setRed(selectedAnswer);
      setGreen(data[currentQuestion].answer);
      setWrongAns((prev) => prev + 1);
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    setTimeout(() => {
      setGreen(null);
      setRed(null);
      if (data.length - 1 <= currentQuestion) {
        gameEnd();
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
      setLock(false);
    }, 500);
  };

  useEffect(() => {
    getSession().then((res: any) => {
      if (res) {
        if (res.user) {
          setUser(res.user);
        }
      }
    });
    if (!user) {
      const s = localStorage.getItem("s");
      if (s === null) return router.push("/");
      const coins = parseInt(s) - 100;
      if (coins < 0) {
        return router.push("/");
      } else {
        localStorage.setItem("s", coins.toString());
      }
    } else {
      removeCoins(100).then((res) => {
        if (!res) router.push("/");
      });
    }

    setTimeout(() => {
      gameEnd();
    }, 59000);
  }, []);

  const gameEnd = () => {
    if (!user) {
      const s = localStorage.getItem("s");
      if (s === null) return router.push("/");
      const coins = parseInt(s) + score;
      localStorage.setItem("s", coins.toString());
      setGameOver(true);
    } else {
      addCoins(100).then((res) => {
        setGameOver(true);
      });
    }
  };

  if (gameover)
    return (
      <GameOver
        score={score}
        correctAnswer={correctAns}
        wrongAnswer={wrongAns}
        numberQuestion={data.length}
      />
    );

  return (
    <div className="px-4 my-12 relative flex flex-col w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[180%] w-[82px] h-[82px] z-20 border-[4px] border-[#282d93] rounded-full flex items-center justify-center">
        <CountdownCircleTimer
          isPlaying
          duration={60}
          colors={["#6c73ff", "#D2042D"]}
          colorsTime={[60, 15, 0]}
          isSmoothColorTransition={false}
          size={80}
          strokeWidth={7}
          trailColor={"#0e0a5f"}
          rotation={"counterclockwise"}
        >
          {({ remainingTime }) => (
            <div className="text-white bg-[#282d93] w-[82%] h-[82%] border-4 border-[#090551] rounded-full flex items-center justify-center">
              {remainingTime}
            </div>
          )}
        </CountdownCircleTimer>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-1 py-2">
          <span className="bg-green-600 w-6 h-2 rounded-full"></span>
          <span className={cn("text-white ml-1", poppins.className)}>
            {correctAns}
          </span>
        </div>
        <div className="flex items-center gap-1 py-2">
          <span className="bg-red-600 w-6 h-2 rounded-full"></span>
          <span className={cn("text-white ml-1", poppins.className)}>
            {wrongAns}
          </span>
        </div>
      </div>
      <QuestionPanel
        question={data[currentQuestion].question}
        opt1={data[currentQuestion].option1}
        opt2={data[currentQuestion].option2}
        opt3={data[currentQuestion].option3}
        opt4={data[currentQuestion].option4}
        handleAnswerSelect={handleAnswerSelection}
        green={green}
        red={red}
        lock={lock}
      />
    </div>
  );
};

export default QuizBoard;