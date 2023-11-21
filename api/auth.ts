import { User } from "@/types/graphql";
import { request } from "@/utils/request";

export const loginGoogle = (code: string) => {
  return request
    .post("auth/google", { json: { code } })
    .json<{ token: string; user: User }>();
};

export const loginFacebook = (code: string) => {
  return request("auth/facebook", { method: "post", json: { code } });
};
