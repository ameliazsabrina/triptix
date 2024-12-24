"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  BanknoteIcon,
} from "lucide-react";
import APIService from "@/route";

function ExistingTrips({ savedTrips, handleDelete }) {
  const router = useRouter();

  const handleView = async (tripId) => {
    try {
      const response = await APIService.getTrip(tripId);
      if (response.data.success) {
        // Store the plan data in sessionStorage
        sessionStorage.setItem("planData", JSON.stringify(response.data));
        // Redirect to generate-result page
        router.push("/generate-result");
      }
    } catch (error) {
      console.error("Error viewing trip:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Budget</TableHead>
              <TableHead className="font-bold">Travelers</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedTrips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    {trip.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    {new Date(trip.start_date).toLocaleDateString()} -{" "}
                    {new Date(trip.end_date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <BanknoteIcon className="w-4 h-4 text-gray-500" />
                    Rp. {trip.budget}
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-gray-500" />
                  {trip.travel_partner}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleView(trip.id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => await handleDelete(trip.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ExistingTrips;
