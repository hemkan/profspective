import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import { shadesOfPurple } from "@clerk/themes";

export const metadata = {
  title: "Profspective",
  description: "Find Your Ideal Professor",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
      signInFallbackRedirectUrl={"/classes"}
      signUpFallbackRedirectUrl={"/classes"}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
