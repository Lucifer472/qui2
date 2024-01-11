import { auth } from "@/auth";
import dynamic from "next/dynamic";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  const Navbar = dynamic(() => import("@/components/navigation/navbar"), {
    ssr: false,
  });

  return (
    <>
      <Navbar
        isLogged={user ? true : false}
        name={user?.user?.name}
        image={user?.user?.image}
      />
      {children}
    </>
  );
};

export default AppLayout;
