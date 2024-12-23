"use client";
import React, { useState } from "react";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import APIService from "@/route";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await APIService.login({
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUsername("");
      setPassword("");

      console.log("User:", response.data.user);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
