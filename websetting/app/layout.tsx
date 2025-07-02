import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECU=Shop Model Car Support",
  description: "View model car add remove update",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <head>
    //     <link rel="icon" href="/LOGO.svg" type="any" />
    //   </head>
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >

    //     <AppRouterCacheProvider>
    //       {children}
    //     </AppRouterCacheProvider>
    //   </body>
    // </html>
    <ClerkProvider>
      <AppRouterCacheProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                {/* <UserButton /> */}
                {children}
              </SignedIn>
            </header>
          </body>
        </html>
      </AppRouterCacheProvider>
    </ClerkProvider>
  );
}
