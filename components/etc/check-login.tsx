"use client";

import { localToDb } from "@/actions/LocalToDb";
import { useEffect } from "react";

const CheckLogin = () => {
  useEffect(() => {
    const updateCoins = async () => {
      const s = localStorage.getItem("s");
      if (s === null) return;
      const coins = parseInt(s);
      if (isNaN(coins)) return;
      await localToDb(coins);
    };

    updateCoins();
  }, []);
  return <></>;
};

export default CheckLogin;
