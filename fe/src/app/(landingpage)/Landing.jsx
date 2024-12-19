"use client";

import React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, Plane, Compass, Globe } from "lucide-react";

function Landing() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const mapPinY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const compassY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <div className="relative h-screen overflow-hidden ">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      />

      <motion.div
        className="absolute w-32 h-32 text-gray-700"
        style={{ top: "20%", left: "10%", y: mapPinY }}
      >
        <MapPin className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute w-32 h-32 text-gray-600"
        style={{ top: "40%", right: "15%", y: planeY }}
      >
        <Plane className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute w-32 h-32 text-gray-600"
        style={{ top: "60%", left: "20%", y: compassY }}
      >
        <Compass className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute w-32 h-32 text-gray-600"
        style={{ top: "80%", right: "10%", y: globeY }}
      >
        <Globe className="w-full h-full" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          className="text-center space-y-6 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold text-gray-900">TripTix</h1>
          <p className="text-xl text-gray-700 mb-8">
            AI-Powered Trip Planning <br />
            Personalized For You
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => router.push("/login")}
              className="w-full py-3"
            >
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;
