import { TravelPlanProvider } from "@/context/TravelPlanContext";
import "./globals.css";

export const metadata = {
  title: "TripTix",
  description: "Generate Your Trip in Seconds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TravelPlanProvider>{children} </TravelPlanProvider>
      </body>
    </html>
  );
}
