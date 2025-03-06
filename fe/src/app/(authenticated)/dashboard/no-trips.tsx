import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";

const NoTrips: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[60vh]">
    <Card className="w-full max-w-md opacity-80">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-gray-100 p-4 mb-4">
          <MapPinIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No trips found</h3>
        <p className="text-md text-gray-500 text-center mb-6">
          You haven&apos;t generated any trips yet. Start planning your next
          adventure!
        </p>
      </CardContent>
    </Card>
  </div>
);

export default NoTrips;
