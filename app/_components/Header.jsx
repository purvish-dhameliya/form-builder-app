"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <Image src={"/logo.svg"} alt="logo" width={"180"} height={50} />
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Link href={"/dashboard"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button className="bg-primary">Get started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Header;
