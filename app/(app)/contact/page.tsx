import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const dynamic = "force-static";

const ContactPage = () => {
  return (
    <div className="flex flex-col gap-y-2 items-start w-full p-6">
      <h1 className={cn("text-2xl text-white", poppins.className)}>
        Contact Us!
      </h1>
      <div className="w-[90px] h-1 mt-[-5px] bg-orange-500" />
      <form className="w-full space-y-4 mt-6">
        <div className="flex flex-col items-start w-full gap-y-2">
          <label htmlFor="name" className="text-[#d8d7ff] text-lg">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-[#fff] border-[#d8d7ff] border-2 w-full px-4 py-2 rounded"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-y-2">
          <label htmlFor="email" className="text-[#d8d7ff] text-lg">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-[#fff] border-[#d8d7ff] border-2 w-full px-4 py-2 rounded"
          />
        </div>{" "}
        <div className="flex flex-col items-start w-full gap-y-2">
          <label htmlFor="subject" className="text-[#d8d7ff] text-lg">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="bg-[#fff] border-[#d8d7ff] border-2 w-full px-4 py-2 rounded"
          />
        </div>{" "}
        <div className="flex flex-col items-start w-full gap-y-2">
          <label htmlFor="msg" className="text-[#d8d7ff] text-lg">
            Message:
          </label>
          <textarea
            id="msg"
            name="msg"
            required
            rows={10}
            className="bg-[#fff] border-[#d8d7ff] border-2 w-full px-4 py-2 rounded resize-none"
          />
        </div>
        <button className="w-full py-3 bg-orange-500 rounded text-white text-xl relative animation-link">
          Send Request
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
