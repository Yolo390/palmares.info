"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";

import {
  Layers,
  LayoutGrid,
  LogOut,
  Medal,
  Plus,
  PlusCircle,
  Sheet,
  Trophy,
  User,
  UserPlus,
  Users,
} from "lucide-react";
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
        "fixed bottom-3 w-full flex justify-center",
        "sm:bottom-10"
      )}
    >
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            <Layers className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:block">Dashboard</span>
          </MenubarTrigger>
          <MenubarContent>
            <Link href="/admin/profile">
              <MenubarItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href="/admin/dashboard">
              <MenubarItem>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Home
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            <Sheet className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:block">Sports</span>
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
            <Link href="/admin/addsport">
              <MenubarItem>
                <Plus className="mr-2 h-4 w-4" />
                Add new sport
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            <Users className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:block">Athletes</span>
          </MenubarTrigger>
          <MenubarContent>
            <Link href="/admin/men">
              <MenubarItem>
                <Man fontSize="small" className="mr-2 h-4 w-4" />
                Men
              </MenubarItem>
            </Link>
            <Link href="/admin/women">
              <MenubarItem>
                <Woman fontSize="small" className="mr-2 h-4 w-4" />
                Women
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href="/admin/addathlete">
              <MenubarItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Add new athlete
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer">
            <Trophy className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:block">Titles</span>
          </MenubarTrigger>
          <MenubarContent>
            <Link href="/admin/titles">
              <MenubarItem>
                <Trophy fontSize="small" className="mr-2 h-4 w-4" />
                All titles
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href="/admin/addtitle">
              <MenubarItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add new title
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger onClick={signOut} className="hover:cursor-pointer">
            <LogOut className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:block sm:font-semibold">Sign out</span>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default BottomMenuBar;
