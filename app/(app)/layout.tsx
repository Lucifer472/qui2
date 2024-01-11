import dynamic from "next/dynamic";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const Navbar = dynamic(() => import("@/components/navigation/navbar"), {
    ssr: false,
  });
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppLayout;
