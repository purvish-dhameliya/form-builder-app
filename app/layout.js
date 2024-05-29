import { Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { ClerkProvider } from "@clerk/nextjs";
const Header = dynamic(() => import("./_components/Header"));
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Head from "next/head";

const SpaceGrotesk = Space_Grotesk({ subsets: ["latin-ext"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>Form Builder - Make AI Generated Form within Seconds</title>
          <meta
            name="description"
            content="Form Builder - Make AI Generated Form within Seconds!"
          />
          <meta
            property="og:title"
            content="Form Builder - Make AI Generated Form within Seconds"
          />
          <meta
            property="og:description"
            content="Form Builder - Make AI Generated Form within Seconds"
          />
          <meta property="og:type" content="website" />
        </Head>
        <body className={SpaceGrotesk.className}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
