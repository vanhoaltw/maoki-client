import { env } from "@/constants/env";
import ky, { AfterResponseHook, BeforeRequestHook } from "ky";
import { redirect } from "next/navigation";

const afterResponse: AfterResponseHook = (request, options, response) => {
  if (response.status === 401) redirect("/login");
};

const beforeRequest: BeforeRequestHook = (request) => {
  const token = localStorage.getItem("token");
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Basic"))
    request.headers.append("Authorization", `Bearer ${token}`);
  console.log(token, header, request.headers);
};

const request = ky.create({
  prefixUrl: env.API_URL,
  hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
});


export { request };
