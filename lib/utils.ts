/**
 * Utility functions for handling class names in a Tailwind CSS and Next.js project.
 * 
 * This module provides a function `cn` that combines class names using the `clsx` library
 * and merges them with Tailwind CSS classes using the `tailwind-merge` library. This is useful
 * for conditionally applying classes and ensuring that conflicting Tailwind classes are resolved
 * correctly.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging conflicting Tailwind CSS classes.
 *
 * @param inputs - A list of class names or conditional class names to be combined.
 * @returns A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
