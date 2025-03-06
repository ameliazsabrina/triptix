import React from "react";
import Header from "@/components/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-dark bg-auto">{children}</div>
    </>
  );
};

export default DashboardLayout;
