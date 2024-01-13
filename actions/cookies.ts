"use server";
import { cookies } from "next/headers";

export const handleFirst = async () => {
  cookies().set("isFirst", "false");
};
