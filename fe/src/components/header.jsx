"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function Header() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const router = useRouter();

  const handleSignOut = () => {
    setAuthenticatedUser(null);
    router.push("/login");
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
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {["About", "Pricing", "Contact"].map((item) => (
            <NavigationMenuLink asChild key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
              >
                {item}
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

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
                    : "U"}
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
