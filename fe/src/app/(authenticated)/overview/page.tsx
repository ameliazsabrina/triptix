"use client";
import React, { useState } from "react";
import { MapPin, Calendar, DollarSign, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTravelPlan } from "@/context/travel-plan-context";
import APIService from "@/route";

interface PlanData {
  id: number;
  location: string;
  start_date: string;
  end_date: string;
  travel_partner: string;
  budget: number;
}

const TripOverview: React.FC = () => {
  const router = useRouter();
  const { travelPlan } = useTravelPlan();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const formattedPlan: PlanData = {
        id: 0,
        location: travelPlan.location_id,
        start_date: travelPlan.start_date,
        end_date: travelPlan.end_date,
        travel_partner: travelPlan.travel_partner,
        budget: travelPlan.budget,
      };

      const response = await APIService.generatePlan(formattedPlan);
      sessionStorage.setItem("planData", JSON.stringify(response.data));
      router.push("/generate-result");
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-white mt-12">
        Trip Overview
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Destination */}
        <TripCard
          title="Destination"
          icon={<MapPin className="mr-2 h-5 w-5 text-muted-foreground" />}
          value={travelPlan?.location_id || "N/A"}
          onEdit={() => router.push("/search-place")}
        />

        {/* Travel Dates */}
        <TripCard
          title="Travel Dates"
          icon={<Calendar className="mr-2 h-5 w-5 text-muted-foreground" />}
          value={
            <>
              <p className="text-xs text-black/80">
                From: {travelPlan?.start_date || "N/A"}
              </p>
              <p className="text-xs text-black/80">
                To: {travelPlan?.end_date || "N/A"}
              </p>
            </>
          }
          onEdit={() => router.push("/pick-date")}
        />

        {/* Budget */}
        <TripCard
          title="Budget"
          icon={<DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />}
          value={formatCurrency(travelPlan?.budget || 0)}
          onEdit={() => router.push("/pick-budget")}
        />

        {/* Travel Partners */}
        <TripCard
          title="Travel Partners"
          icon={<Users className="mr-2 h-5 w-5 text-muted-foreground" />}
          value={travelPlan?.travel_partner || "N/A"}
          onEdit={() => router.push("/pick-partners")}
        />
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
    </>
  );
};

interface TripCardProps {
  title: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  onEdit: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ title, icon, value, onEdit }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          {icon}
          {title}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default TripOverview;
