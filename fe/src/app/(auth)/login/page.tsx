"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import APIService from "@/route";

interface LoginResponse {
  token: string;
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default function LoginPage(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await APIService.login({
        username,
        password,
      });

      const data = response.data as LoginResponse;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUsername("");
      setPassword("");

      console.log("User:", data.user);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error logging in:", error);
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

      <Button className="w-full mb-4" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center text-sm">
        Don&#39;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:underline bg-transparent transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
