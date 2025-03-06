import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

export default function RegisterLayout({
  children,
}: RegisterLayoutProps): React.ReactElement {
  return (
    <div className="relative min-h-screen min-w-full overflow-hidden flex justify-center items-center">
      <FlickeringGrid
        className="z-0 absolute inset-0"
        squareSize={8}
        gridGap={16}
        maxOpacity={0.2}
        flickerChance={0.1}
        width={3000}
        height={3000}
      />

      {children}
    </div>
  );
}
