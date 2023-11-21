"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/config/apolloClient";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  const apolloClient = useApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </ApolloProvider>
  );
}
