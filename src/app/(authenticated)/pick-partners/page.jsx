import React from "react";
import TravelPartner from "@/components/partnerCards";
import Header from "@/components/header";

const PartnerPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex justify-center items-center">
        <div className="container mx-auto flex items-center justify-between flex-col">
          <TravelPartner />
        </div>
      </div>
    </>
  );
};

export default PartnerPage;
