"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PlaneTakeoff } from "lucide-react";

import ExistingTrips, { Trip } from "./existing-trips";
import NoTrips from "./no-trips";
import APIService from "@/route";

interface TripsResponse {
  trips: Trip[];
}

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const router = useRouter();

  const fetchTrips = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await APIService.fetchTrips();
      const data = response.data as TripsResponse;
      setTrips(data.trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handlePlanNewTrip = (): void => {
    router.push("/search-place");
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await APIService.deleteTrip(id);
      await fetchTrips();
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const handleView = async (id: string): Promise<void> => {
    try {
      await fetchTrips();
      await APIService.getTrip(id);
      router.push(`/view-trip/${id}`);
    } catch (error) {
      console.error("Error viewing trip:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center text-white">
          <LayoutDashboard className="mr-3 text-white" /> My Trips
        </h1>
        <Button onClick={handlePlanNewTrip} variant="secondary">
          <PlaneTakeoff className="mr-2" /> Plan New Trip
        </Button>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <NoTrips />
        ) : trips.length > 0 ? (
          <ExistingTrips
            savedTrips={trips}
            handleDelete={handleDelete}
            handleView={handleView}
          />
        ) : (
          <NoTrips />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
