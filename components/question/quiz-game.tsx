"use client";

import { useState } from "react";

import { question } from "@prisma/client";
import { useRouter } from "next/navigation";

import { handleFirst } from "@/actions/cookies";

import QuestionPanel from "@/components/question/question-panel";
import PopAds from "@/components/ads/reward-ads";
import { addCoins } from "@/actions/coins";

interface quizProps {
  quiz: question[];
}

const Quiz = ({ quiz }: quizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [green, setGreen] = useState<null | number>(null);
  const [red, setRed] = useState<null | number>(null);

  const [lock, setLock] = useState(false);

  const router = useRouter();

  const handleAnswerSelection = (selectedAnswer: number) => {
    setLock(true);
    if (selectedAnswer === quiz[currentQuestion].answer) {
      setGreen(selectedAnswer);
      setScore((prev) => prev + 100);
      handleNextQuestion(selectedAnswer);
    } else {
      setRed(selectedAnswer);
      setGreen(quiz[currentQuestion].answer);
      handleNextQuestion(selectedAnswer);
    }
  };

  const handleNextQuestion = (selectedAnswer: number) => {
    setTimeout(() => {
      setGreen(null);
      setRed(null);
      if (quiz.length - 1 === currentQuestion) {
        const extra =
          selectedAnswer === quiz[currentQuestion].answer
            ? 100 + score
            : 0 + score;
        sessionStorage.setItem("a", "1");
        console.log(extra);
        addCoins(extra < 50 ? 100 : extra).then(() => {
          handleFirst().then((res) => {
            router.push("/submit");
          });
        });
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
      setLock(false);
    }, 1000);
  };

  return (
    <>
      {currentQuestion === 1 && <PopAds />}
      <QuestionPanel
        question={quiz[currentQuestion].question}
        opt1={quiz[currentQuestion].option1}
        opt2={quiz[currentQuestion].option2}
        opt3={quiz[currentQuestion].option3}
        opt4={quiz[currentQuestion].option4}
        handleAnswerSelect={handleAnswerSelection}
        green={green}
        red={red}
        lock={lock}
      />
    </>
  );
};

export default Quiz;
