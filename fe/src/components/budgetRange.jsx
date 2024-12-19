"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const BudgetRangePicker = () => {
  const [budgetRange, setBudgetRange] = useState([0, 50000000]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBudgetChange = (value) => {
    setBudgetRange(value);
  };

  const saveBudget = () => {
    if (budgetRange[0] === 0 && budgetRange[1] === 0) {
      setError("Please select a budget range");
      return;
    }

    console.log("Selected budget range:", budgetRange);
    router.push("/pick-partners");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-grow">
          <Slider
            defaultValue={[0, 50000000]}
            max={50000000}
            step={100000}
            onValueChange={handleBudgetChange}
            className="dark"
          />
        </div>
        <div className="flex space-x-2 min-w-[300px] justify-between">
          <div className="text-sm font-medium">
            {formatCurrency(budgetRange[0])}
          </div>
          <div className="text-sm font-medium">
            {formatCurrency(budgetRange[1])}
          </div>
        </div>
        <Button onClick={saveBudget} className="flex-shrink-0">
          <SendHorizontal size={16} />
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default BudgetRangePicker;
