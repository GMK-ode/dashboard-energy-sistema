import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

import {  AuthenticationProvider } from "@/context/userAuthentication";
import { Toaster } from "@/components/ui/sonner";
import { NavBar } from "@/components/navbar";


export const metadata: Metadata = {
  title: "EnergyTech",
  description: "Dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-mono antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthenticationProvider>
            <NavBar />
            {children}
            <Toaster />
          </AuthenticationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
