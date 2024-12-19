import React from "react";
import DateRangePicker from "@/components/datepicker";
import Header from "@/components/header";

const DatePage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex justify-center items-center">
        <div className="container mx-auto flex items-center justify-between flex-col">
          <DateRangePicker />
        </div>
      </div>
    </>
  );
};

export default DatePage;
