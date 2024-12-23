"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sun,
  Cloud,
  TreePine,
  History,
  Star,
  Footprints,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import APIService from "@/route";

const TripGenerationResult = () => {
  const router = useRouter();
  const [planData, setPlanData] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const handleLocationPicture = async () => {
    try {
      const response = await APIService.getLocationPhoto({
        location: planData.location,
      });
      setImageSrc(response.data.imgURL);
      console.log(response.data.imgURL);
    } catch (error) {
      console.error("Error fetching location photo:", error);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("planData");
    if (storedData) {
      setPlanData(JSON.parse(storedData).plan);
      handleLocationPicture();
    }
  }, []);
  console.log(planData);
  if (!planData) {
    return <div>Loading...</div>;
  }

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
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex justify-center items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            {planData.location}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A wonderful destination with unique experiences to explore.
          </p>
        </div>

        <div className="relative h-96 mb-8 items-center flex justify-center">
          <img
            src="/phuket.jpg"
            alt="Location"
            width={650}
            height={100}
            className="rounded-lg"
          />
        </div>

        {/* Destination Highlights */}
        <div className="mb-8">
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
                  <p className="font-bold">{planData.travel_dates.duration}</p>
                  <p className="text-sm text-muted-foreground">
                    {planData.travel_dates.start_date} -{" "}
                    {planData.travel_dates.end_date}
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
              <p className="text-2xl font-bold">{planData.budget}</p>
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
        </div>

        {/* Travel Tips */}
        <div>
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
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Regenerate
          </Button>
          <Button onClick={handleSaveTrip}>Save Trip</Button>
        </div>
      </div>
    </>
  );
};

export default TripGenerationResult;
