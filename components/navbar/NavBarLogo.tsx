import React from "react";
import { NavbarBrand } from "@nextui-org/react";
import NextLink from "next/link";

export const NavbarLogo = () => (
  <NavbarBrand>
    <NextLink className="flex justify-start items-center gap-1" href="/">
      <p className="font-bold text-inherit">RFLKT</p>
    </NextLink>
  </NavbarBrand>
);
