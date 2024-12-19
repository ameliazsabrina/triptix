"use client";
import React from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sun,
  Cloud,
  Wine,
  TreePine,
  History,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TripGenerationResult = () => {
  // Mock generated trip data
  const tripData = {
    destination: {
      name: "Bali, Indonesia",
      overview:
        "A tropical paradise known for its lush landscapes, vibrant culture, and pristine beaches.",
      images: [
        "/placeholder-bali-1.jpg",
        "/placeholder-bali-2.jpg",
        "/placeholder-bali-3.jpg",
      ],
      highlights: [
        "Ubud Cultural Experience",
        "Beach Relaxation",
        "Temple Exploration",
        "Culinary Adventure",
      ],
    },
    itinerary: {
      duration: "7 Days",
      startDate: "15 August 2024",
      endDate: "22 August 2024",
      travelPartners: "Friends",
      budget: "IDR 25,000,000",
    },
    recommendedActivities: [
      {
        name: "Ubud Monkey Forest",
        description:
          "A nature reserve and temple complex home to over 700 playful monkeys.",
        duration: "2-3 hours",
        bestTime: "Morning",
        icon: <TreePine className="h-5 w-5" />,
      },
      {
        name: "Tegalalang Rice Terraces",
        description:
          "Iconic emerald-green rice paddies showcasing traditional Balinese agriculture.",
        duration: "1-2 hours",
        bestTime: "Sunrise/Sunset",
        icon: <Sun className="h-5 w-5" />,
      },
      {
        name: "Seminyak Beach Dining",
        description:
          "Enjoy sunset cocktails and gourmet dining at trendy beachfront restaurants.",
        duration: "2-3 hours",
        bestTime: "Evening",
        icon: <Wine className="h-5 w-5" />,
      },
    ],
    travelTips: [
      "Respect local customs and dress modestly at temples",
      "Negotiate prices at local markets",
      "Stay hydrated and use sun protection",
      "Try local cuisine and street food",
    ],
  };
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Destination Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 flex justify-center items-center gap-2">
          <MapPin className="h-8 w-8 text-primary" />
          {tripData.destination.name}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {tripData.destination.overview}
        </p>
      </div>

      {/* Destination Images */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {tripData.destination.images.map((img, index) => (
          <div
            key={index}
            className="relative h-64 rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={img}
              alt={`${tripData.destination.name} view ${index + 1}`}
              fill
              className="object-cover hover:scale-110 transition-transform"
            />
          </div>
        ))}
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
                <p className="font-bold">{tripData.itinerary.duration}</p>
                <p className="text-sm text-muted-foreground">
                  {tripData.itinerary.startDate} - {tripData.itinerary.endDate}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{tripData.itinerary.travelPartners}</p>
                <p className="text-sm text-muted-foreground">Travel Partners</p>
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
            <p className="text-2xl font-bold">{tripData.itinerary.budget}</p>
            <p className="text-sm text-muted-foreground">Total Trip Budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Destination Highlights */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Destination Highlights
        </h2>
        <div className="flex flex-wrap gap-2">
          {tripData.destination.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>
      </div>

      {/* Recommended Activities */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Recommended Activities
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tripData.recommendedActivities.map((activity, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  {activity.icon}
                </div>
                <CardTitle className="text-lg">{activity.name}</CardTitle>
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
          {tripData.travelTips.map((tip, index) => (
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
        <Button>Save Trip</Button>
      </div>
    </div>
  );
};

export default TripGenerationResult;
