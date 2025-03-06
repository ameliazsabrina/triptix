"use client";
import React, { ReactNode } from "react";
import Header from "@/components/header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="h-screen mx-auto px-4 py-8 bg-earth-dark flex flex-col items-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
