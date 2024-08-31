"use client";

import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarItem,
} from "@nextui-org/react";
import { NavbarLogo } from "./navbar/NavBarLogo";
import { NavbarLinks } from "./navbar/NavBarLinks";
import { ThemeSwitch } from "@/components/theme-switch";
import { NavbarMenuItems } from "./navbar/NavBarItems";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll maxWidth="xl" position="sticky">
      
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarLogo />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarLinks />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItems />
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
