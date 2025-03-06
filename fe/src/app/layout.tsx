import { TravelPlanProvider } from "@/context/travel-plan-context";
import "./globals.css";

export const metadata = {
  title: "TripTix",
  description: "Generate Your Trip in Seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TravelPlanProvider>{children}</TravelPlanProvider>
      </body>
    </html>
  );
}
