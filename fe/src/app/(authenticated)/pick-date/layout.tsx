import React from "react";
import Header from "@/components/header";

const DateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default DateLayout;
