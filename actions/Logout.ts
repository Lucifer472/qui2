"use server";

import { signOut } from "@/auth";

export const actionLogout = async () => {
  await signOut();
};
