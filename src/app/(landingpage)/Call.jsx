"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CallPage() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/login");
  };
  return (
    <section className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Parallax Hero Section */}
      <div
        className="parallax-bg h-screen bg-center bg-cover flex items-center justify-center text-black"
        style={{
          backgroundImage: `url('/cta.png')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/100 to-white/40"></div>
        <div className="text-center px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Your Dream Trip Awaits</h1>
          <p className="text-lg font-medium mb-6">
            Discover hidden gems, save money, and make unforgettable memories.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-black"
            onClick={handleGetStarted}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
