"use client";
import React, { useState } from "react";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen min-w-full overflow-hidden flex justify-center items-center">
      <FlickeringGrid
        className="z-0 absolute inset-0"
        squareSize={8}
        gridGap={16}
        maxOpacity={0.2}
        flickerChance={0.1}
        width={3000}
        height={3000}
      />

      <div className="z-10 p-8 bg-white/80 rounded-lg shadow-lg max-w-sm w-full">
        <a href="/">
          <img
            src="/LOGO.svg"
            alt="TripTix"
            className="h-12 mb-6 w-auto mx-auto"
          />
        </a>

        <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <Button className="w-full mb-4" onClick={handleLogin}>
          Login
        </Button>

        <span className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline bg-transparent transition duration-200"
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}
