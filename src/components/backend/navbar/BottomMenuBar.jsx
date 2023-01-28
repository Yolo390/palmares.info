"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";

import { LayoutGrid, LogOut, Plus, User, UserPlus } from "lucide-react";
import Man from "@mui/icons-material/Man";
import Woman from "@mui/icons-material/Woman";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import SportsRugbyIcon from "@mui/icons-material/SportsRugby";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/MenuBar";

const BottomMenuBar = () => {
  return (
    <div
      className={clsx(
        "fixed bottom-0 w-full flex justify-around",
        "sm:bottom-10 sm:flex sm:justify-center"
      )}
    >
      <Menubar
        className={clsx(
          "w-screen flex justify-between mr-2 ml-2",
          "sm:w-[400px] sm:flex sm:justify-around"
        )}
      >
        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            Dashboard
          </MenubarTrigger>
          <MenubarContent>
            <Link href="/profile">
              <MenubarItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href="/dashboard">
              <MenubarItem>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Home
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            Sports
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <DownhillSkiingIcon fontSize="small" className="mr-2 h-4 w-4" />
              Ski
            </MenubarItem>
            <MenubarItem>
              <SportsMmaIcon fontSize="small" className="mr-2 h-4 w-4" />
              MMA
            </MenubarItem>
            <MenubarItem>
              <SportsMartialArtsIcon
                fontSize="small"
                className="mr-2 h-4 w-4"
              />
              Karate
            </MenubarItem>
            <MenubarItem>
              <SportsKabaddiIcon fontSize="small" className="mr-2 h-4 w-4" />
              Judo
            </MenubarItem>
            <MenubarItem>
              <SportsBasketballIcon fontSize="small" className="mr-2 h-4 w-4" />
              Basketball
            </MenubarItem>
            <MenubarItem>
              <SportsHandballIcon fontSize="small" className="mr-2 h-4 w-4" />
              Handball
            </MenubarItem>
            <MenubarItem>
              <SportsRugbyIcon fontSize="small" className="mr-2 h-4 w-4" />
              Rugby
            </MenubarItem>
            <MenubarItem>
              <SportsSoccerIcon fontSize="small" className="mr-2 h-4 w-4" />
              Football
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Plus className="mr-2 h-4 w-4" />
              Add new sport
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            Athletes
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Man fontSize="small" className="mr-2 h-4 w-4" />
              Men
            </MenubarItem>
            <MenubarItem>
              <Woman fontSize="small" className="mr-2 h-4 w-4" />
              Women
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <UserPlus className="mr-2 h-4 w-4" />
              Add new athlete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger onClick={signOut} className="hover:cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span className="invisible sm:visible">Sign out</span>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default BottomMenuBar;
