"use server";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const getUserId = async () => {
  const userId = cookies().get("userId");
  if (userId) {
    return userId;
  } else {
    const newUserId = uuidv4();

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 2);

    cookies().set({
      name: "userId",
      value: newUserId,
      expires: expires,
    });
    return cookies().get("userId");
  }
};

export const getExistingToken = async () => {
  const today = new Date();
  const userId = await getUserId();
  if (!userId) {
    return null;
  }

  const existToken = await db.fcmTokens.findUnique({
    where: {
      userId: userId.value,
    },
  });

  if (existToken) {
    if (existToken.expiresAt < today) {
      return null;
    }
    return existToken.token;
  } else {
    return null;
  }
};

export const setNewToken = async (token: string) => {
  const user = await getUserId();
  if (!user) {
    return null;
  }

  const expires = new Date();
  expires.setMonth(expires.getMonth() + 2);

  console.log(user);

  const newFcmUser = db.fcmTokens.create({
    data: {
      userId: user.value,
      token,
      expiresAt: expires,
    },
  });

  return newFcmUser;
};
