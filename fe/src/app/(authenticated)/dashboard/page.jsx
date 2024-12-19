"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, PlaneTakeoff } from "lucide-react";
import noTrips from "./noTrips";
import existingTrips from "./existingTrips";
import Header from "@/components/header";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Mock fetching trips
  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const mockTrips = [
        // Uncomment and fill this array with mock data for testing
        // {
        //   id: "trip1",
        //   user_id: "Bambang",
        //   location: "Bali, Indonesia",
        //   start_date: "2024-07-15",
        //   end_date: "2024-07-25",
        //   budget: 30000000,
        //   travelers: 2,
        //   generated_itinerary: "",
        //   created_at: "",
        //   imageUrl: "/api/placeholder/400/250",
        // },
      ];
      setTrips(mockTrips);
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
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : trips.length > 0 ? (
            <existingTrips />
          ) : (
            <noTrips />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
