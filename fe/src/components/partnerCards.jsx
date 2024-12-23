"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Users, Heart, Home } from "lucide-react";
import { useTravelPlan } from "@/context/TravelPlanContext";

const TravelPartner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { travelPlan, setTravelPlan } = useTravelPlan();

  const handleCardClick = (card) => {
    const formatted = `Traveling with: ${card}`;
    setTravelPlan({
      ...travelPlan,
      partner: { name: card, formatted },
      travel_partner: card,
    });
  };

  const handleSubmit = () => {
    const partner = travelPlan?.partner;

    if (!partner) {
      alert("Please select a travel partner");
      return;
    }

    setIsLoading(true);
    console.log("Selected travel partner:", partner.name);

    router.push("/overview");
  };

  const cards = [
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
              travelPlan?.partner?.name === card.name &&
                "bg-earth-dark text-white"
            )}
            onClick={() => handleCardClick(card.name)}
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
        disabled={!travelPlan?.partner || isLoading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default TravelPartner;
