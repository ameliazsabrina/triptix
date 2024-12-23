"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import Header from "@/components/header";
import APIService from "@/route";
export default function SavedTripsTable() {
  const savedTrips = [
    {
      id: 1,
      location: "Bali, Indonesia",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      budget: 2500,
      travelers: 2,
      status: "Generated",
    },
    {
      id: 2,
      location: "Tokyo, Japan",
      startDate: "2024-02-10",
      endDate: "2024-02-17",
      budget: 3500,
      travelers: 3,
      status: "Generated",
    },
  ];

  const [saving, setSaving] = useState([]);
  const handleSaveTrip = async (tripId) => {
    try {
      setSaving((prev) => [...prev, tripId]);
      const response = await APIService.savePlans(tripId);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen mx-auto px-4 flex flex-col ">
        <h1 className="text-3xl font-bold mb-8 text-center text-black mt-12">
          Saved Trips
        </h1>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Travelers</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      {trip.location}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      {new Date(trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <BanknoteIcon className="w-4 h-4 text-gray-500" />$
                      {trip.budget}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-gray-500" />
                      {trip.travelers} people
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {trip.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          View
                        </Button>
                        <Button variant="destructive" size="sm">
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
      </div>
    </>
  );
}
