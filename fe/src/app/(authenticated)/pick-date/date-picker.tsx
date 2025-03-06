"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useTravelPlan } from "@/context/travel-plan-context";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

const DateRangePicker: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const router = useRouter();

  const handleDateChange = (date: DateRange | undefined) => {
    if (!date?.from) return;

    const formattedDate = date.to
      ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      : format(date.from, "LLL dd, y");

    const duration = date.to ? differenceInDays(date.to, date.from) + 1 : null;

    setTravelPlan({
      ...travelPlan,
      dates: {
        formatted: formattedDate,
        from: date.from,
        to: date.to || null,
      },
      start_date: format(date.from, "yyyy-MM-dd"),
      end_date: date.to ? format(date.to, "yyyy-MM-dd") : "",
      duration,
    });
  };

  const saveDate = () => {
    if (!travelPlan?.start_date) {
      setError("Please select a start date");
      return;
    }
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
              !travelPlan?.dates?.formatted && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {travelPlan?.dates?.formatted || (
              <span className="text-gray-600">When do you want to go?</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={travelPlan?.dates?.from || undefined}
            selected={{
              from: travelPlan?.dates?.from || undefined,
              to: travelPlan?.dates?.to || undefined,
            }}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Send Button */}
      <Button
        onClick={saveDate}
        disabled={!travelPlan?.dates?.from}
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
