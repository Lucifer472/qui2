"use client";

import { useEffect, useState } from "react";

import QuestionPanel from "@/components/question/question-panel";

import { question } from "@prisma/client";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

interface quizProps {
  quiz: question[];
}

const Quiz = ({ quiz }: quizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [user, setUser] = useState<any>(null);

  const [green, setGreen] = useState<null | number>(null);
  const [red, setRed] = useState<null | number>(null);

  const [lock, setLock] = useState(false);

  const router = useRouter();

  const handleAnswerSelection = (selectedAnswer: number) => {
    setLock(true);
    if (selectedAnswer === quiz[currentQuestion].answer) {
      setGreen(selectedAnswer);
      setScore((prev) => prev + 100);
      handleNextQuestion();
    } else {
      setRed(selectedAnswer);
      setGreen(quiz[currentQuestion].answer);
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    setTimeout(() => {
      setGreen(null);
      setRed(null);
      if (quiz.length - 1 <= currentQuestion) {
        localStorage.setItem("s", score.toString());
        router.push("/submit");
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
      setLock(false);
    }, 1000);
  };

  useEffect(() => {
    getSession().then((res) => {
      if (res) {
        if (res.user) {
          setUser(res.user);
        }
      }
    });
  }, []);

  if (user) {
    router.push("/");
  } else {
    if (
      localStorage.getItem("s") !== null &&
      localStorage.getItem("a") !== null
    ) {
      router.push("/");
    } else if (localStorage.getItem("s") !== null) {
      router.push("/submit");
    }
  }
  return (
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
  );
};

export default Quiz;
