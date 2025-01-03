"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import APIService from "@/route";

export default function Header() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const router = useRouter();

  // Fetch authenticated user info from the backend
  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const response = await APIService.user();
        setAuthenticatedUser(response.data.user); // Adjust this based on your BE response structure
        console.log("Authenticated user:", response.data.user);
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

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 bg-white shadow">
      {/* Logo Section */}
      <Link href="/" className="mr-6 hidden lg:flex">
        <img src="/LOGO.svg" alt="TripTix" className="h-6 w-auto" />
      </Link>
      <NavigationMenu className="hidden lg:flex"></NavigationMenu>

      {/* User Section */}
      <div className="ml-auto flex items-center gap-4">
        {authenticatedUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback>
                  {authenticatedUser?.displayName
                    ? authenticatedUser.displayName.charAt(0).toUpperCase()
                    : authenticatedUser?.email
                    ? authenticatedUser.email.charAt(0).toUpperCase()
                    : " "}
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
          <Button onClick={handleLoginRedirect} className="text-white">
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
