"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Destination {
  id: number;
  title: string;
  distance: string;
  description: string;
  image: string;
}

export default function DestinationPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const dummyDestinations: Destination[] = [
      {
        id: 1,
        title: "Merapi Volcano Museum",
        distance: "3.6 km from you",
        description:
          "The Merapi Volcano Museum is a geological museum located in Hargobinangun, Pakem, Sleman, Special Region of Yogyakarta....",
        image: "/merapivolcano.png",
      },
      {
        id: 2,
        title: "Ullen Sentalu Museum",
        distance: "5.1 km from you",
        description:
          "Museum Ullen Sentalu, is a captivating journey through Javanese history and culture. This private museum showcases an exquisite...",
        image: "/ullensentalu.jpeg",
      },
      {
        id: 3,
        title: "Ledok Sambi Ecopark",
        distance: "7 km from you",
        description:
          "Ledok Sambi Ecopark is a serene natural retreat nestled amidst the picturesque landscapes of Kaliurang, Yogyakarta. This idyllic park offers a tranquil...",
        image: "/ledoksambi.jpeg",
      },
    ];
    setDestinations(dummyDestinations);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-16 bg-white">
      {/* Title Section */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Popular Destinations Near You
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover amazing places right in your neighborhood
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="w-full lg:w-[380px] bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {destination.image && (
              <div
                className="h-48 bg-cover bg-center w-full"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
            )}

            <div className="p-6 flex flex-col h-[300px]">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {destination.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {destination.distance}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 flex-grow">
                <p className="text-gray-700 line-clamp-4">
                  {destination.description}
                </p>
              </CardContent>

              <CardFooter className="p-0 mt-6">
                <Button className="w-full">Explore Now</Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
