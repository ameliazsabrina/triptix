"use client";
import React, { createContext, useContext, useState } from "react";

const TravelPlanContext = createContext();

export const TravelPlanProvider = ({ children }) => {
  const [travelPlan, setTravelPlan] = useState({
    location_id: "",
    start_date: "",
    end_date: "",
    travel_partner: "",
    budget: "",
  });

  return (
    <TravelPlanContext.Provider value={{ travelPlan, setTravelPlan }}>
      {children}
    </TravelPlanContext.Provider>
  );
};

export const useTravelPlan = () => useContext(TravelPlanContext);
