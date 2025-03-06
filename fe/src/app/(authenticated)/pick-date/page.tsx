import React from "react";
import DateRangePicker from "@/app/(authenticated)/pick-date/date-picker";

const DatePage: React.FC = () => {
  return (
    <div className="container mx-auto flex items-center justify-between flex-col">
      <DateRangePicker />
    </div>
  );
};

export default DatePage;
