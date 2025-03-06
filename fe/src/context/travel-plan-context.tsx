"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TravelPlan {
  location_id: string;
  start_date: string;
  end_date: string;
  travel_partner: string;
  budget: number;
  dates?: {
    formatted: string;
    from: Date | null;
    to: Date | null;
  };
  duration?: number | null;
}

interface TravelPlanContextType {
  travelPlan: TravelPlan;
  setTravelPlan: React.Dispatch<React.SetStateAction<TravelPlan>>;
}

const TravelPlanContext = createContext<TravelPlanContextType | undefined>(
  undefined
);

interface TravelPlanProviderProps {
  children: ReactNode;
}

export const TravelPlanProvider: React.FC<TravelPlanProviderProps> = ({
  children,
}) => {
  const [travelPlan, setTravelPlan] = useState<TravelPlan>({
    location_id: "",
    start_date: "",
    end_date: "",
    travel_partner: "",
    budget: 0,
    dates: {
      formatted: "",
      from: null,
      to: null,
    },
    duration: null,
  });

  return (
    <TravelPlanContext.Provider value={{ travelPlan, setTravelPlan }}>
      {children}
    </TravelPlanContext.Provider>
  );
};

export const useTravelPlan = (): TravelPlanContextType => {
  const context = useContext(TravelPlanContext);
  if (!context) {
    throw new Error("useTravelPlan must be used within a TravelPlanProvider");
  }
  return context;
};
