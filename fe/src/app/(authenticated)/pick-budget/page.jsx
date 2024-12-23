import React from "react";
import Header from "@/components/header";

import BudgetRangePicker from "@/components/budgetRange";

function BudgetPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-12 text-center mt-12">
          What's your travel budget?
        </h1>
        <div className="container mx-auto flex items-center justify-between flex-col">
          <BudgetRangePicker />
        </div>
      </div>
    </>
  );
}

export default BudgetPage;
