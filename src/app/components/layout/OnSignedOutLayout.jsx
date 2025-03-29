"use client";

import { SignedOut } from "@clerk/clerk-react";
import { usePathname } from "next/navigation";
import PublicAppShellLayout from "./PublicAppShellLayout";
import NotSignedIn from "../NotSignedIn/NotSignedIn";

function OnSignedOutLayout({ children }) {
  const pathname = usePathname();
  return (
    <SignedOut>
      {pathname.includes("shared/blogs/public") ? (
        <PublicAppShellLayout>{children}</PublicAppShellLayout>
      ) : (
        <NotSignedIn />
      )}
    </SignedOut>
  );
}
export default OnSignedOutLayout;
