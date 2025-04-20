"use server";
import { cookies } from "next/headers";

export const getToken = async (token: string) => {
  const cookiesStore = await cookies();
  const findToken = cookiesStore.get(token);
  return findToken;
};

export const deleteToken = async (token: string) => {
  const cookiesStore = await cookies();
  cookiesStore.delete(token);
  return true;
};
