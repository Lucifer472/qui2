"use server";
import { auth } from "@/auth";
import { getCoins, setCoins } from "@/lib/coin";

export const currentCoins = async () => {
  const user = await auth();
  if (
    user === null ||
    user.user === undefined ||
    typeof user.user.email !== "string"
  )
    return null;

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
  )
    return null;
  const coins = await getCoins(user.user.email);
  if (coins === null) return null;
  if (coins > removeCoins) {
    const newCoins = coins - removeCoins;

    const isUpdated = await setCoins(user.user.email, newCoins);

    return isUpdated;
  } else {
    return false;
  }
};

export const addCoins = async (addCoins: number) => {
  const user = await auth();
  if (
    user === null ||
    user.user === undefined ||
    typeof user.user.email !== "string"
  )
    return null;
  const coins = await getCoins(user.user.email);
  if (coins === null) return null;
  const newCoins = coins + addCoins;

  const isUpdated = await setCoins(user.user.email, newCoins);

  return isUpdated;
};
