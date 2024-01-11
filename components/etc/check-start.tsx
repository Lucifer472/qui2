"use client";

import { useRouter } from "next/navigation";

const CheckStarterPage = () => {
  const router = useRouter();
  if (localStorage.getItem("s") === null) {
    router.push("/start");
  }
  return <></>;
};

export default CheckStarterPage;
