"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, MapPinIcon, PlaneTakeoff } from "lucide-react";

import ExistingTrips from "./ExistingTrips";
import Header from "@/components/header";
import APIService from "@/route";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const savedTrips = [
    {
      id: 1,
      location: "Bali, Indonesia",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      budget: 2500,
      travelers: 2,
      status: "Generated",
    },
    {
      id: 2,
      location: "Tokyo, Japan",
      startDate: "2024-02-10",
      endDate: "2024-02-17",
      budget: 3500,
      travelers: 3,
      status: "Generated",
    },
  ];

  const [trips, setTrips] = useState([]);

  // Mock fetching trips
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              (
              <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <MapPinIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No trips found</h3>
                  <p className="text-sm text-gray-500 text-center mb-6">
                    You haven&apos;t generated any trips yet. Start planning
                    your next adventure!
                  </p>
                </CardContent>
              </Card>
              );
            </div>
          ) : trips.length > 0 ? (
            <ExistingTrips savedTrips={trips} handleDelete={handleDelete} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              (
              <Card className="w-full opacity-80/ ">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <MapPinIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No trips found</h3>
                  <p className="text-md text-gray-500 text-center mb-6">
                    You haven&apos;t generated any trips yet. Start planning
                    your next adventure!
                  </p>
                </CardContent>
              </Card>
              );
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
