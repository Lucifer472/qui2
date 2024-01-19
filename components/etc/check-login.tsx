"use client";
import { useEffect } from "react";

import { localToDb } from "@/actions/LocalToDb";
import { currentCoins } from "@/actions/coins";

const CheckLogin = () => {
  useEffect(() => {
    const updateCoins = async () => {
      const s = await currentCoins();
      if (s === null) return;
      if (s) {
        if (typeof s === "number") {
          await localToDb(s);
          return;
        }
        const coins = parseInt(s);
        if (isNaN(coins)) return;
        await localToDb(coins);
      }
    };

    updateCoins();
  }, []);
  return <></>;
};

export default CheckLogin;
