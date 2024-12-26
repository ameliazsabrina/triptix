"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Star,
  History,
  Cloud,
  Footprints,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import APIService from "@/route";

const ViewTrip = ({ params }) => {
  const router = useRouter();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await APIService.getTrip(params.id);
        setTripData(response.data.plan);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trip:", error);
        setLoading(false);
      }
    };

    fetchTripData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Trip not found</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex justify-center items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            {tripData.location}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A wonderful destination with unique experiences to explore.
          </p>
        </div>

        {/* Destination Highlights */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Destination Highlights
          </h2>
          <div className="flex flex-wrap gap-2">
            {tripData.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Trip Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">{tripData.travel_dates.duration}</p>
                  <p className="text-sm text-muted-foreground">
                    {tripData.travel_dates.start_date} -{" "}
                    {tripData.travel_dates.end_date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{tripData.budget}</p>
              <p className="text-sm text-muted-foreground">Total Trip Budget</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Activities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Recommended Activities
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tripData.recommended_activities.map((activity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Footprints className="h-6 w-6 text-primary" />
                    {activity.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Duration: {activity.duration}</span>
                    <span>Best Time: {activity.bestTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Travel Tips */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" />
            Travel Tips
          </h2>
          <ul className="space-y-2 pl-4 list-disc">
            {tripData.travel_tips.map((tip, index) => (
              <li key={index} className="text-muted-foreground">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </>
  );
};

export default ViewTrip;
