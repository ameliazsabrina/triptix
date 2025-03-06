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
      <main className="min-h-screen bg-earth-light bg-auto flex justify-center items-center flex-col">
        {children}
      </main>
    </>
  );
};

export default Layout;
