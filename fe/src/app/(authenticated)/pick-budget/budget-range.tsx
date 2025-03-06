"use client";
import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTravelPlan } from "@/context/travel-plan-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BudgetRangePicker: React.FC = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const [inputValue, setInputValue] = useState<string>(
    travelPlan?.budget?.toString() || ""
  );

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setInputValue("");
      setTravelPlan({ ...travelPlan, budget: 0 });
      return;
    }

    const numberValue = parseInt(numericValue, 10);

    if (numberValue > 200_000_000) {
      setError("Maximum budget is IDR 200,000,000");
      return;
    }

    setError("");
    setInputValue(numericValue);
    setTravelPlan({ ...travelPlan, budget: numberValue });
  };

  const saveBudget = () => {
    const budget = travelPlan?.budget;

    if (!budget || budget === 0) {
      setError("Please enter a budget amount");
      return;
    }

    console.log("Selected budget:", budget);
    router.push("/pick-partners");
  };

  const formatCurrency = (value: number | string) => {
    if (!value) return "IDR 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Set Your Budget</CardTitle>
        <CardDescription>
          Enter your maximum budget for the trip
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Enter budget amount"
              value={inputValue ? formatCurrency(parseInt(inputValue)) : ""}
              onChange={handleBudgetChange}
              className="pl-12 text-lg"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              IDR
            </span>
          </div>
          <Button onClick={saveBudget} className="flex-shrink-0">
            <SendHorizontal size={16} />
          </Button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="text-sm text-gray-500">
          Maximum budget: IDR 200,000,000
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetRangePicker;
