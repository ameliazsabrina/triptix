"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    const dummyPricingPlans = [
      {
        id: 1,
        title: "Free Plan",
        price: "Free",
        description: "Perfect for getting started with basic travel planning",
        features: [
          "Basic trip planning",
          "Limited destination suggestions",
          "Standard customer support",
          "Basic itinerary creation",
        ],
        buttonText: "Get Started",
      },
      {
        id: 2,
        title: "Premium Plan",
        price: "IDR 49.000",
        description: "Unlock all features for the ultimate travel experience",
        features: [
          "Advanced AI trip planning",
          "Unlimited destination suggestions",
          "Priority customer support",
          "Custom itinerary creation",
          "Exclusive travel deals",
          "Real-time updates",
        ],
        buttonText: "Start Premium",
        isPopular: true,
      },
    ];
    setPricingPlans(dummyPricingPlans);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-16 bg-white">
      {/* Title Section */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Right Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your travel needs. Upgrade anytime for
          full access to all features.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`w-full lg:w-[400px] p-6 flex flex-col bg-white border-2 ${
              plan.isPopular ? " bg-black text-white" : "border-gray-200"
            } rounded-xl shadow-lg`}
          >
            {plan.isPopular && (
              <div className="px-3 py-1 text-sm text-black bg-gray-100 rounded-full w-fit mb-4">
                Most Popular
              </div>
            )}

            <div className="pb-4">
              <h3
                className={`text-2xl font-bold ${
                  plan.isPopular ? "  text-white" : "text-gray-900"
                } `}
              >
                {plan.title}
              </h3>
              <div className="mt-4">
                <span
                  className={` text-4xl font-bold ${
                    plan.isPopular ? "  text-white" : "text-gray-900"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.price !== "Free" && (
                  <span className="text-white ml-2">/month</span>
                )}
              </div>
            </div>

            <div className="flex-grow">
              <p
                className={` ${
                  plan.isPopular ? "  text-white" : "text-gray-900"
                } mb-6`}
              >
                {plan.description}
              </p>
              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check
                      className={` h-5 w-5 ${
                        plan.isPopular ? "  text-white" : "text-gray-900"
                      } `}
                    />
                    <span
                      className={` ${
                        plan.isPopular ? "  text-white" : "text-gray-900"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button
                className={`w-full py-6 text-lg ${
                  plan.isPopular
                    ? "bg-white text-black border-2 border-gray-200 hover:bg-white/90 hover:border-gray-200/20"
                    : ""
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
