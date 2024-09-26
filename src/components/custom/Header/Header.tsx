"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/paths";

interface Props {}

function Header(props: Props) {
  const { setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const menus = [{ ...paths.home }, { ...paths.Forms }, { ...paths.list }];

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed sm:w-96 top-0 flex justify-between px-4 py-4 w-full bg-background">
      <Button variant="outline" size="icon" onClick={handleOpenMenu}>
        <HamburgerMenuIcon />
      </Button>
      {/* 사이드바 */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-card w-64 transition-transform",
          isOpen ? "translate-x-0 z-10" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col p-5">
          <Button
            className="ml-auto"
            variant="outline"
            size="icon"
            onClick={handleCloseMenu}
          >
            <Cross1Icon />
          </Button>
          <nav className="mt-10">
            <ul>
              {menus.map((item) => {
                return (
                  <li className="py-4" key={item.href}>
                    <Link
                      className={cn(
                        "text-xl",
                        pathName === item.href
                          ? "font-semibold border-b pb-2"
                          : ""
                      )}
                      href={item.href}
                      onClick={handleCloseMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={handleCloseMenu}
        />
      )}
      {/* 사이드바 */}

      <Button variant="outline" size="icon">
        <SunIcon
          onClick={() => setTheme("dark")}
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <MoonIcon
          onClick={() => setTheme("light")}
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

export default Header;
