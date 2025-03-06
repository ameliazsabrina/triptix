"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Destination {
  id: number;
  title: string;
  city: string;
  description: string;
  image: string;
}

export default function AbroadPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const dummyAbroadDestinations: Destination[] = [
      {
        id: 1,
        title: "Japan",
        city: "Osaka",
        description:
          "Explore the vibrant city of Osaka, where ancient temples meet modern attractions. A perfect blend of culture and technology.",
        image: "/japan.png",
      },
      {
        id: 2,
        title: "Thailand",
        city: "Bangkok",
        description:
          "Dive into the bustling streets of Bangkok, known for its ornate temples, vibrant markets, and delicious street food.",
        image: "/thailand.png",
      },
      {
        id: 3,
        title: "Singapore",
        city: "Singapore",
        description:
          "Discover the futuristic city-state of Singapore, home to stunning architecture, lush gardens, and diverse cuisines.",
        image: "/singapore.png",
      },
      {
        id: 4,
        title: "Turkey",
        city: "Istanbul",
        description:
          "Immerse yourself in Istanbul, where East meets West, offering a rich tapestry of history, culture, and architecture.",
        image: "/turkey.png",
      },
    ];
    setDestinations(dummyAbroadDestinations);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-16 bg-gray-50">
      {/* Title Section */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Plan Abroad!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore amazing destinations around the world
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {destination.image && (
              <div
                className="h-48 bg-cover bg-center w-full"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
            )}

            <div className="p-6 flex flex-col h-[300px]">
              <div className="p-0 mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {destination.title}
                </h3>
                <p className="text-lg text-gray-600">{destination.city}</p>
              </div>

              <div className="p-0 flex-grow">
                <p className="text-gray-700 line-clamp-4">
                  {destination.description}
                </p>
              </div>

              <div className="p-0 mt-6">
                <Button className="w-full">Explore More</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
