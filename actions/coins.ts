"use server";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { getCoins, setCoins } from "@/lib/coin";

export const currentCoins = async () => {
  const user = await auth();
  if (
    user === null ||
    user.user === undefined ||
    typeof user.user.email !== "string"
  ) {
    const coins = cookies().get("coins");
    if (coins === undefined) return null;
    return coins.value;
  }

  const coins = await getCoins(user.user.email);
  if (coins === null) return 0;
  return coins;
};

export const removeCoins = async (removeCoins: number) => {
  const user = await auth();
  if (
    user === null ||
    user.user === undefined ||
    typeof user.user.email !== "string"
  ) {
    const current = await currentCoins();
    if (current === null) return null;
    const coin = parseInt(current as string);
    if (isNaN(coin)) return null;
    if (removeCoins > coin) return null;
    const setupCoins = coin - removeCoins;
    cookies().set("coins", setupCoins.toString());
    return setupCoins;
  }
  const coins = await getCoins(user.user.email);
  if (coins === null) return null;
  if (coins >= removeCoins) {
    const newCoins = coins - removeCoins;

    const isUpdated = await setCoins(user.user.email, newCoins);

    return isUpdated;
  } else {
    return false;
  }
};

export const addCoins = async (addCoins: number) => {
  const session = await auth();
  if (!session?.user || typeof session.user.email !== "string") {
    const current = await currentCoins();
    if (current === null) {
      cookies().set("coins", addCoins.toString());
      return addCoins;
    }
    const coin = parseInt(current as string);
    if (isNaN(coin)) return null;
    const setupCoins = coin + addCoins;
    cookies().set("coins", setupCoins.toString());
    return setupCoins;
  }
  const coins = await getCoins(session.user.email);
  if (coins === null) return null;
  const newCoins = coins + addCoins;

  const isUpdated = await setCoins(session.user.email, newCoins);

  return isUpdated;
};
