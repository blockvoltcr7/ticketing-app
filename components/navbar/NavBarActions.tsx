import React from "react";
import { NavbarItem, Button, Link } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";

// This component renders the actions section of the navbar.
export const NavbarActions = () => (
  <>
    {/* This NavbarItem is hidden on small screens and visible on large screens */}
    <NavbarItem className="hidden lg:flex">
      {/* ThemeSwitch component is used to toggle between light and dark themes */}
      <ThemeSwitch />
    </NavbarItem>
    {/* This NavbarItem is always visible */}
    <NavbarItem>
      {/* Button is used as a Link to navigate to the sign up page */}
      <Button as={Link} color="primary" href="#" variant="flat">
        Sign Up
      </Button>
    </NavbarItem>
  </>
);
