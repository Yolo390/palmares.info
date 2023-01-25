"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import clsx from "clsx";

import { LayoutGrid, LogOut, User } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const BottomNavbar = () => {
  const pathname = usePathname();
  const defaultValue = pathname.substring(1, pathname.length);

  return (
    <div
      className={clsx(
        "fixed bottom-0 w-full",
        "sm:bottom-10 sm:flex sm: justify-center"
      )}
    >
      <Tabs defaultValue={defaultValue}>
        <TabsList className="flex justify-between">
          <Link href="/dashboard">
            <TabsTrigger value="dashboard">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
          </Link>

          <Link href="/profile">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </Link>

          <TabsTrigger value="logout" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BottomNavbar;
