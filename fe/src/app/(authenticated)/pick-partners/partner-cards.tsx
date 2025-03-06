"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Users, Heart, Home } from "lucide-react";
import { useTravelPlan } from "@/context/travel-plan-context";

interface TravelPartnerOption {
  name: string;
  icon: React.ReactNode;
}

const TravelPartner: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { travelPlan, setTravelPlan } = useTravelPlan();

  const handleCardClick = (card: TravelPartnerOption) => {
    const formatted = `Traveling with: ${card.name}`;
    setTravelPlan({
      ...travelPlan,
      travel_partner: card.name,
    });
  };

  const handleSubmit = () => {
    if (!travelPlan?.travel_partner) {
      alert("Please select a travel partner");
      return;
    }

    setIsLoading(true);
    console.log("Selected travel partner:", travelPlan.travel_partner);

    router.push("/overview");
  };

  const cards: TravelPartnerOption[] = [
    { name: "Alone", icon: <User className="w-6 h-6 mr-2" /> },
    { name: "Partner", icon: <Heart className="w-6 h-6 mr-2" /> },
    { name: "Friends", icon: <Users className="w-6 h-6 mr-2" /> },
    { name: "Family", icon: <Home className="w-6 h-6 mr-2" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Button
            key={card.name}
            variant="outline"
            className={cn(
              "w-40 h-20 flex items-center justify-center text-lg font-medium",
              travelPlan?.travel_partner === card.name &&
                "bg-earth-dark text-white"
            )}
            onClick={() => handleCardClick(card)}
          >
            {card.icon}
            {card.name}
          </Button>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        variant="outline"
        className="w-40"
        disabled={!travelPlan?.travel_partner || isLoading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default TravelPartner;
