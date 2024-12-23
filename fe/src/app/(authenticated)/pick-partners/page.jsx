import React from "react";
import TravelPartner from "@/components/partnerCards";
import Header from "@/components/header";

const PartnerPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-12 text-centemt-12 ">
          Who are you traveling with?
        </h1>
        <div className="container mx-auto flex items-center justify-between flex-col">
          <TravelPartner />
        </div>
      </div>
    </>
  );
};

export default PartnerPage;
