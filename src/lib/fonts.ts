/**
 * Fonts: swap these two imports to change the site's typography.
 * The CSS variables are consumed in src/app/globals.css.
 */
import { Cormorant_Garamond, Manrope } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});
