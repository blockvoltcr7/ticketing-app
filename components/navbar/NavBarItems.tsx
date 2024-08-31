import React from "react";
import { NavbarMenuItem, Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export const NavbarMenuItems = () => (
  <div className="mx-4 mt-2 flex flex-col gap-2">
    {siteConfig.navMenuItems.map((item, index) => (
      <NavbarMenuItem key={`${item}-${index}`}>
        <Link
          color="foreground"
          className="w-full"
          href={item.href}
          size="lg"
        >
          {item.label}
        </Link>
      </NavbarMenuItem>
    ))}
  </div>
);
