import type { ReactNode } from "react";
import "@oe/config/tailwindcss/global.css";
import Favicon from "@oe/assets/images/favicon.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenEdu",
  icons: {
    icon: Favicon.src,
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
