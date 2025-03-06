"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import APIService from "@/route";

interface AuthenticatedUser {
  displayName?: string;
  email?: string;
}

export default function Header() {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const response = await APIService.user();
        setAuthenticatedUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setAuthenticatedUser(null);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await APIService.logout();
      localStorage.removeItem("token");
      setAuthenticatedUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      router.push("/");
    }
  };

  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 bg-white shadow">
      <Link href="/" className="mr-6 hidden lg:flex">
        <Image src="/LOGO.svg" alt="TripTix" className="h-6 w-auto" />
      </Link>
      <NavigationMenu className="hidden lg:flex" />

      <div className="ml-auto flex items-center gap-4">
        {authenticatedUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback>
                  {authenticatedUser.displayName?.charAt(0).toUpperCase() ||
                    authenticatedUser.email?.charAt(0).toUpperCase() ||
                    " "}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/login")} className="text-white">
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
