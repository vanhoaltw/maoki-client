import { initializeApollo } from "@/config/apolloClient";
import React, { createContext } from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // await initializeApollo().query({
  //     query: GET_
  // })
  return <div>{children}</div>;
};

export default Layout;
