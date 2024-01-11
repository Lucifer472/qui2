import db from "./db";

export const setCoins = async (email: string, coins: number) => {
  try {
    await db.user.update({
      where: {
        email: email,
      },
      data: {
        coins: coins,
        emailVerified: new Date(),
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const isVerified = async (email: string) => {
  try {
    const isEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (isEmail?.emailVerified) return true;
    return false;
  } catch (error) {
    return true;
  }
};

export const getCoins = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (user === null) return 0;
    return user.coins;
  } catch (error) {
    return 0;
  }
};
