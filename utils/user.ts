"use server";
import { cookies } from "next/headers";
import nookies, { setCookie, destroyCookie } from "nookies";

const tokenKey = "_token";
const ssr = typeof window === "undefined";

export const getToken = async () => {
  let token: string;

  if (ssr) {
    ("use server");
    token = (await cookies().get(tokenKey)?.value) as string;
  } else {
    token = nookies.get()?.[tokenKey] as string;
  }

  return token;
};

export const setToken = (token: string) => {
  if (ssr) {
    ("use server");
    cookies().set(tokenKey, token, {
      path: "/",
      maxAge: 180 * 24 * 60 * 60,
    });
  } else {
    setCookie(null, tokenKey, token, {
      path: "/",
      maxAge: 180 * 24 * 60 * 60,
    });
  }

  return token;
};

export const destroyToken = () => {
  destroyCookie(null, tokenKey, { path: "/" });
};
