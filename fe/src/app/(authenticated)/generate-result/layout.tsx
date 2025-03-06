"use client";
import React from "react";
import Header from "@/components/header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </>
  );
};

export default Layout;
