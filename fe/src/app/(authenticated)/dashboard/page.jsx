"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, MapPinIcon, PlaneTakeoff } from "lucide-react";

import ExistingTrips from "./ExistingTrips";
import Header from "@/components/header";
import APIService from "@/route";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const router = useRouter();

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const response = await APIService.fetchTrips();
      setTrips(response.data.trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handlePlanNewTrip = () => {
    router.push("/search-place");
  };

  const handleDelete = async (id) => {
    try {
      await APIService.deleteTrip(id);
      await fetchTrips();
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const handleView = async (id) => {
    try {
      await fetchTrips();
      await APIService.getTrip(id);
      router.push(`/view-trip/${id}`);
    } catch (error) {
      console.error("Error viewing trip:", error);
    }
  };

  const NoTripsCard = () => (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <Card className="w-full max-w-md opacity-80">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <MapPinIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No trips found</h3>
          <p className="text-md text-gray-500 text-center mb-6">
            You haven&apos;t generated any trips yet. Start planning your next
            adventure!
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-dark bg-auto">
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
            <NoTripsCard />
          ) : trips.length > 0 ? (
            <ExistingTrips
              savedTrips={trips}
              handleDelete={handleDelete}
              handleView={handleView}
            />
          ) : (
            <NoTripsCard />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
