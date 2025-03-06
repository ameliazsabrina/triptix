"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Cloud,
  History,
  Star,
  Footprints,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import APIService from "@/route";
import ImageSlider from "@/components/image-slider"; // Move ImageSlider to its own component
import Layout from "./layout"; // Move Layout to its own component

// Define TypeScript Interface for planData
interface TravelDates {
  duration: string;
  start_date: string;
  end_date: string;
}

interface Activity {
  name: string;
  description: string;
  duration: string;
  bestTime: string;
}

interface PlanData {
  id: number;
  location: string;
  highlights: string[];
  travel_dates: TravelDates;
  budget: string;
  recommended_activities: Activity[];
  travel_tips: string[];
}

const TripGenerationResult: React.FC = () => {
  const router = useRouter();
  const [planData, setPlanData] = useState<PlanData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("planData");
    if (storedData) {
      setPlanData(JSON.parse(storedData).plan);
    }
  }, []);

  if (!planData) return <div>Loading...</div>;

  const handleSaveTrip = async () => {
    try {
      const response = await APIService.savePlans(planData.id);
      if (response.data.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 flex justify-center items-center gap-2">
          <MapPin className="h-8 w-8 text-primary" />
          {planData.location}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A wonderful destination with unique experiences to explore.
        </p>
      </div>

      <ImageSlider />

      {/* Destination Highlights */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Destination Highlights
        </h2>
        <div className="flex flex-wrap gap-2">
          {planData.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>
      </section>

      {/* Trip Details */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Trip Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">{planData.travel_dates.duration}</p>
            <p className="text-sm text-muted-foreground">
              {planData.travel_dates.start_date} -{" "}
              {planData.travel_dates.end_date}
            </p>
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
            <p className="text-2xl font-bold">{planData.budget}</p>
            <p className="text-sm text-muted-foreground">Total Trip Budget</p>
          </CardContent>
        </Card>
      </section>

      {/* Recommended Activities */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Recommended Activities
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {planData.recommended_activities.map((activity, index) => (
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
      </section>

      {/* Travel Tips */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" />
          Travel Tips
        </h2>
        <ul className="space-y-2 pl-4 list-disc">
          {planData.travel_tips.map((tip, index) => (
            <li key={index} className="text-muted-foreground">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <Button variant="outline" onClick={() => router.push("/search-place")}>
          Regenerate
        </Button>
        <Button onClick={handleSaveTrip}>Save Trip</Button>
      </div>
    </Layout>
  );
};

export default TripGenerationResult;
