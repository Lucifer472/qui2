import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-20">
      <div className="flex flex-col items-center justify-between gap-y-4 p-2">
        <Image src={"/images/logo.webp"} alt="Logo" width={125} height={125} />
        <span className="text-white text-xs">Made with ❤️ in Bharat 🇮🇳</span>
      </div>
    </footer>
  );
};

export default Footer;
