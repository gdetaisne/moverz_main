import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitaire pour fusionner les classes Tailwind intelligemment
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
