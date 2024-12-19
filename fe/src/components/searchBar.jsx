"use client";
"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/useToast";

const SearchBar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const inputRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationsChanged = () => {
    const places = inputRef.current?.getPlaces();
    if (places && places.length > 0) {
      const location = places[0];
      if (location.geometry?.location) {
        const lat = location.geometry.location.lat();
        const lng = location.geometry.location.lng();
        const photoUrl =
          location.photos && location.photos.length > 0
            ? location.photos[0].getUrl({ maxWidth: 400 })
            : "";
        const locationDetails = {
          location: location.formatted_address || "",
          imageUrl: photoUrl,
          lat,
          lng,
        };
        setSelectedLocation(locationDetails);
        localStorage.setItem(
          "tripDestination",
          JSON.stringify(locationDetails)
        );
      }
    }
  };

  const handleNextStep = () => {
    if (!selectedLocation) {
      toast({
        title: "Error",
        description: "Please select a destination",
        variant: "destructive",
      });
      router.push("/pick-date");
      return;
    }

    console.log("Selected location:", selectedLocation);

    setIsLoading(true);

    try {
      router.push("/pick-date");
    } catch (error) {
      console.error("Error navigating to the next step:", error);
      toast({
        title: "Error",
        description: "Failed to proceed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ""}
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleLocationsChanged}
        >
          <Input placeholder="Enter your destination..." className="bg-white" />
        </StandaloneSearchBox>
      </LoadScript>

      <Button onClick={handleNextStep} disabled={isLoading}>
        {isLoading ? "Loading..." : "Next"}
        <SendHorizontal className="ml-2" size={16} />
      </Button>

      {selectedLocation && (
        <div className="mt-4">
          <strong>Selected Location:</strong> {selectedLocation.location}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
