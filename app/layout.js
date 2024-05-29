import { Space_Grotesk } from "next/font/google";
import dynamic from 'next/dynamic'
import {
    ClerkProvider,
} from '@clerk/nextjs'
const Header = dynamic(() => import('./_components/Header'))
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const SpaceGrotesk= Space_Grotesk({ subsets: ["latin-ext"] })

export const metadata = {
    title: "Form Builder App",
    description: "Form Building In Seconds",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={SpaceGrotesk.className}>
                    <Header />
                    {children}
                    <Toaster/>
                </body>
            </html>
        </ClerkProvider>
    );
}
