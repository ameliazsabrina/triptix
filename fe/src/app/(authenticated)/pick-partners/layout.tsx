import React from "react";
import Header from "@/components/header";

const PartnerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex justify-center items-center flex-col">
        {children}
      </div>
    </>
  );
};

export default PartnerLayout;
