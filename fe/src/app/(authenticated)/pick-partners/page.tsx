import React from "react";
import TravelPartner from "@/app/(authenticated)/pick-partners/partner-cards";

const PartnerPage: React.FC = () => {
  return (
    <div className="container mx-auto flex items-center justify-between flex-col">
      <h1 className="text-3xl font-bold mb-12 text-center mt-12">
        Who are you traveling with?
      </h1>
      <TravelPartner />
    </div>
  );
};

export default PartnerPage;
