"use client";
import { Group, ScrollArea, Stack } from "@mantine/core";
import { usePathname } from "next/navigation";
import RightBookSideBar from "../home/RightBookSideBar";
import { useMediaQuery } from "@mantine/hooks";

function CheckDesktopScreen({ children }) {
  const pathname = usePathname();
  const isDesktopScreen = useMediaQuery("(min-width:1250px)");
  return (
    <>
      {pathname !== "/uploaded" && isDesktopScreen ? (
        <Group align="flex-start" wrap="nowrap">
          <ScrollArea scrollbarSize={2} h={"100vh"} scrollbars="y">
            {children}
          </ScrollArea>
          <RightBookSideBar />
        </Group>
      ) : isDesktopScreen ? (
        <Stack>{children}</Stack>
      ) : (
        !isDesktopScreen && children
      )}
    </>
  );
}
export default CheckDesktopScreen;
