"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import APIService from "@/route";
import { useRouter } from "next/navigation";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const registerData: RegisterData = {
        username,
        email,
        password,
      };

      const response = await APIService.register(registerData);

      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      // Reset form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      alert("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 p-8 bg-white/80 rounded-lg shadow-lg max-w-sm w-full">
      <Link href="/">
        <Image
          src="/LOGO.svg"
          alt="TripTix"
          width={150}
          height={50}
          className="h-12 mb-6 w-auto mx-auto"
        />
      </Link>

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

      <Button
        onClick={handleRegister}
        className="w-full mb-4"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline bg-transparent transition duration-200"
        >
          Sign in.
        </Link>
      </div>
    </div>
  );
}
