"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, DollarSign, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useTravelPlan } from "@/context/TravelPlanContext";
import APIService from "@/route";

const TripOverview = () => {
  const router = useRouter();
  const { travelPlan } = useTravelPlan();
  const [isGenerating, setIsGenerating] = useState(false);

  console.log(travelPlan);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await APIService.generatePlan(travelPlan);
      console.log(response.data);
      sessionStorage.setItem("planData", JSON.stringify(response.data));
      router.push("/generate-result");
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <Header />
      <div className="h-screen mx-auto px-4 py-8 bg-earth-dark items-center flex flex-col ">
        <h1 className="text-3xl font-bold mb-6 text-center text-white mt-12">
          Trip Overview
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Destination */}
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
              <div className="text-2xl font-bold">{travelPlan.location}</div>
            </CardContent>
          </Card>

          {/* Travel Dates */}
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
              <div className="flex justify-between flex-col">
                <p className="text-xs text-black/80">
                  From: {travelPlan.start_date || "N/A"}
                </p>
                <p className="text-xs text-black/80">
                  To: {travelPlan.end_date || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
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
                {formatCurrency(travelPlan.budget || 0)}
              </div>
            </CardContent>
          </Card>

          {/* Travel Partners */}
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
                {travelPlan.travel_partner || "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <Button
            className="dark"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Plan"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TripOverview;
