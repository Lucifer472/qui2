import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const RulePage = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center w-full p-6">
      <h1 className={cn("text-2xl text-white", poppins.className)}>
        Contest Rules!
      </h1>
      <div className="w-[90px] h-1 mt-[-5px] bg-orange-500" />
      <ul className="flex flex-col items-start gap-y-4 list-disc text-[#d8d7ff]">
        <li>
          The winners for each quiz will be declared based on the scores they
          obtain during the participation in the quiz.
        </li>
        <li>
          There will be a fixed time for declaring the winners of each quiz.
        </li>
        <li>
          You will have overall 60 seconds to solve as many as questions from 20
          questions in quiz.
        </li>
        <li>
          There will be 4 options given below each question and one will be the
          answer for it out of them.
        </li>
        <li>Each right answer fetches you 25 points.</li>
        <li>Each wrong answer gives you (-) 10 points.</li>
        <li>
          Do not forget to use the lifelines in case if you are stuck during the
          contest.
        </li>
        <li>
          Remember users can use each lifeline once during the each contest. Use
          a given amount of coins from your coin bank or watch an ad for a few
          secs to use the lifeline for free!
        </li>
        <li>You would have 4 different lifelines to use:</li>
        <li>
          50:50 – On using it, two incorrect answers will be eliminated from the
          screen.
        </li>
        <li>
          Freezer Time – A pause for the ongoing timer will take place for 30
          seconds while allowing the users get more time to answer the question.
        </li>
        <li>
          Audience Poll – You can use this option to choose the right answer out
          of 4 options by using the intelligence of the smart audience.
        </li>
        <li>
          Flip Question – A new question will interchange the question currently
          showing on the screen.
        </li>
      </ul>
    </div>
  );
};

export default RulePage;
