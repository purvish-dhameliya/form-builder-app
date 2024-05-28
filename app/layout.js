import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import {
    ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
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
