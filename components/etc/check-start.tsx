"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CheckStarterPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getSession().then((res) => {
      if (res) {
        if (res.user) {
          setUser(res.user);
        }
      }
    });
  }, []);

  if (!user) {
    if (localStorage.getItem("s") === null) {
      router.push("/start");
    }
  }
  return <></>;
};

export default CheckStarterPage;
