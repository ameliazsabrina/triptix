import React, { ReactNode } from "react";
import Header from "@/components/header";

interface LayoutProps {
  children: ReactNode;
}

const SearchLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SearchLayout;
