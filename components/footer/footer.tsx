import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-20 my-4">
      <div className="flex flex-col items-center justify-between gap-y-4 p-2">
        {/* <Image src={"/images/logo.webp"} alt="Logo" width={125} height={125} /> */}

        <span className="text-lg text-center font-bold text-white">
          FINTECH QUIZ
        </span>
        <span className="text-white text-center text-xs">
          Made with ❤️ in Bharat 🇮🇳
        </span>
      </div>
    </footer>
  );
};

export default Footer;
