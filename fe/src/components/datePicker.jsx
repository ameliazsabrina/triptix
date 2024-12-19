"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, SendHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const DateRangePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.from
        ? date.to
          ? `${format(date.from, "LLL dd, y")} - ${format(
              date.to,
              "LLL dd, y"
            )}`
          : format(date.from, "LLL dd, y")
        : "When do you want to go?";

      setSelectedDate({
        from: date.from,
        to: date.to,
        formatted: formattedDate,
      });
    }
  };

  const saveDate = () => {
    if (!selectedDate?.from) {
      setError("Please select a start date");
      return;
    }
    console.log("Selected dates:", selectedDate);
    router.push("/pick-budget");
  };

  return (
    <div className="w-full flex items-center space-x-2">
      {/* Popover for Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate?.formatted || (
              <span className="text-gray-600">When do you want to go?</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDate?.from}
            selected={{ from: selectedDate?.from, to: selectedDate?.to }}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Send Button */}
      <Button
        onClick={saveDate}
        disabled={!selectedDate?.from}
        className="flex-shrink-0"
      >
        <SendHorizontal size={16} />
      </Button>

      {/* Error Display */}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default DateRangePicker;
