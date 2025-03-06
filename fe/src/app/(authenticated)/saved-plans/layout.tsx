import { ReactNode } from "react";
import Header from "@/components/header";

interface LayoutProps {
  children: ReactNode;
}

const SavedTripsLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SavedTripsLayout;
