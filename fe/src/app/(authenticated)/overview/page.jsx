"use client";
import React from "react";
import { MapPin, Calendar, DollarSign, Users, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Header from "@/components/header";
import { useRouter } from "next/navigation";

const TripOverview = () => {
  const router = useRouter();
  const handleGenerate = () => {
    router.push("/generate-result");
  };
  const tripDetails = {
    destination: {
      name: "Bali, Indonesia",
      description: "Tropical paradise with beautiful beaches and rich culture",
    },
    dates: {
      start: "15 August 2024",
      end: "22 August 2024",
      duration: "7 Days",
    },
    budget: {
      total: "IDR 25,000,000",
      perPerson: "IDR 5,000,000",
    },
    travelPartners: {
      type: "Friends",
      count: 4,
    },
  };

  return (
    <>
      <Header />
      <div className="h-screen mx-auto px-4 py-8 bg-earth-dark items-center flex flex-col ">
        <h1 className="text-3xl font-bold mb-6 text-center text-white mt-12">
          Trip Overview
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                Destination
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/search-place")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tripDetails.destination.name}
              </div>
              <p className="text-xs text-muted-foreground">
                {tripDetails.destination.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                Travel Dates
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/pick-date")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tripDetails.dates.duration}
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">
                  From: {tripDetails.dates.start}
                </p>
                <p className="text-xs text-muted-foreground">
                  To: {tripDetails.dates.end}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                Budget
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/pick-budget")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tripDetails.budget.total}
              </div>
              <p className="text-xs text-muted-foreground">
                {tripDetails.budget.perPerson} per person
              </p>
            </CardContent>
          </Card>

          {/* Travel Partners Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                Travel Partners
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/pick-partners")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tripDetails.travelPartners.type}
              </div>
              <p className="text-xs text-muted-foreground">
                {tripDetails.travelPartners.count} travelers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <Button className="dark" onClick={handleGenerate}>
            <Check className="mr-2 h-4 w-4" />
            Generate Trip
          </Button>
        </div>
      </div>
    </>
  );
};

export default TripOverview;
