import { Metadata } from "next";
import React from "react";
import LayoutFooter from "./_components/progress-footer";

export const metadata: Metadata = {
  title: "Tạo chỗ nghỉ",
};

export default async function BecomeAHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-[93vh] relative">{children}</div>;
}
