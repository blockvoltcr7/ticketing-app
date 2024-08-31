import React from "react";
import { NavbarItem } from "@nextui-org/react";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";

// This component is responsible for rendering the navigation links in the navbar.
// It maps through the navItems array in the siteConfig and creates a NavbarItem for each item.
// The key for each NavbarItem is set to the href of the item.
// The label of the item is wrapped in a NextLink, which provides client-side navigation.
export const NavbarLinks = () => (
  <>
    {siteConfig.navItems.map((item) => (
      <NavbarItem key={item.href}>
        <NextLink href={item.href}>
          {item.label}
        </NextLink>
      </NavbarItem>
    ))}
  </>
);
