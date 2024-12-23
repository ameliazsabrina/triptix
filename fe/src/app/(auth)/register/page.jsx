"use client";
import React, { useState } from "react";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import APIService from "@/route";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const response = await APIService.register({
        username,
        email,
        password,
      });
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
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
          {" "}
          <img
            src="/LOGO.svg"
            alt="TripTix"
            className="h-12 mb-6 w-auto mx-auto"
          />
        </a>

        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <Button onClick={handleRegister} className="w-full mb-4">
          Sign Up
        </Button>
        <span className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline bg-transparent transition duration-200"
          >
            Sign in.
          </Link>
        </span>
      </div>
    </div>
  );
}
