"use server";

import { auth } from "@/auth";
import { isVerified, setCoins } from "@/lib/coin";

export const localToDb = async (coins: number) => {
  const user = await auth();
  if (
    user === null ||
    user.user === undefined ||
    typeof user.user.email !== "string"
  )
    return null;

  const isVer = await isVerified(user.user.email);
  if (!isVer) {
    const isUpdated = await setCoins(user.user.email, coins);
    return isUpdated;
  }
  return false;
};
