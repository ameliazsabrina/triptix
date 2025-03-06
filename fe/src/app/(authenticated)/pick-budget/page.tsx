"use client";
import React from "react";
import BudgetRangePicker from "@/app/(authenticated)/pick-budget/budget-range";

const BudgetPage: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-12 text-center mt-12">
        What&#39;s your travel budget?
      </h1>
      <div className="container mx-auto flex items-center justify-between flex-col">
        <BudgetRangePicker />
      </div>
    </>
  );
};

export default BudgetPage;
