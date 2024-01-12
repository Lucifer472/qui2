import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { signIn } from "@/auth";

import Google from "@/components/etc/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const LoginPage = () => {
  const StarterAdTop = dynamic(() => import("@/components/ads/home-ad"), {
    ssr: false,
  });
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="flex items-center flex-col w-full gap-y-4 py-4 px-2 bg-[#282d93] text-white mx-auto my-4 max-w-[90%] rounded-lg"
      >
        <span className={cn("text-lg", poppins.className)}>
          Login now & Play Quiz
        </span>
        <span className="text-sm text-gray-300">
          Play Quizzes and win Coins
        </span>
        <button
          className={cn(
            "text-lg text-orange-500 bg-white w-[180px] rounded-full py-2 flex justify-center items-center gap-2",
            poppins.className
          )}
        >
          <Google height={25} width={25} />
          Login
        </button>
        <p>
          Don’t have an account?
          <button
            className={cn("text-orange-500 cursor-pointer", poppins.className)}
          >
            Sign Up
          </button>
        </p>
      </form>
      <StarterAdTop />
    </>
  );
};

export default LoginPage;
