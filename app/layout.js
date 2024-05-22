import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Form Builder App",
    description: "Form Building In Seconds",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Header />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
