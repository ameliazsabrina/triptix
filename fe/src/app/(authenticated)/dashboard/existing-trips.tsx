"use client";
import React from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  BanknoteIcon,
} from "lucide-react";

export interface Trip {
  id: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: number;
  travel_partner: string;
}

interface ExistingTripsProps {
  savedTrips: Trip[];
  handleDelete: (id: string) => Promise<void>;
  handleView: (id: string) => Promise<void>;
}

const ExistingTrips: React.FC<ExistingTripsProps> = ({
  savedTrips,
  handleDelete,
  handleView,
}) => {
  const router = useRouter();

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
                      onClick={async () => await handleView(trip.id)}
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
};

export default ExistingTrips;
