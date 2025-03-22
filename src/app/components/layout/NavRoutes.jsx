'use client'
import { House, UploadSimple } from "@phosphor-icons/react";
import { Group, Stack, Text } from "@mantine/core";
import { cardShadows } from "@/app/utils/shadows";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { dark_theme } from "@/app/config/theme";
import CategorySelect from "../CategorySelect";

const NavRoutes = ({ toggle, colorScheme }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState(null);
  useEffect(() => setCurrentRoute(pathname), [pathname]);

  return (
    <Stack gap={0}>
      <Group
        gap="xs"
        align="center"
        p="sm"
        onClick={() => {
          setCurrentRoute('/')
          router.push("/");
          toggle();
        }}
        style={{
          cursor: "pointer",
          boxShadow: currentRoute === "/" ? cardShadows.md : "none",
          borderRadius: "8px",
          background: currentRoute === "/" && colorScheme === "dark" ? dark_theme.nav_link_dark_color : "none",
        }}
      >
        <House color={colorScheme === "dark" ? dark_theme.main_text_color : "black"} size={16} />
        <Text size="xs" c={colorScheme === "dark" ? dark_theme.main_text_color : "dark"}>
          Home
        </Text>
      </Group>
      <Group
        gap="xs"
        align="center"
        p="sm"
        onClick={() => {
          setCurrentRoute("/uploaded");

          toggle();
          router.push("/uploaded");
        }}
        style={{
          cursor: "pointer",
          boxShadow: currentRoute === "/uploaded" ? cardShadows.md : "none",
          borderRadius: "8px",
          background: currentRoute === "/uploaded" && colorScheme === "dark" ? dark_theme.nav_link_dark_color : "none",
        }}
      >
        <UploadSimple color={colorScheme === "dark" ? dark_theme.main_text_color : "black"} size={16} />
        <Text size="xs" c={colorScheme === "dark" ? dark_theme.main_text_color : "dark"}>
          Uploaded
        </Text>
      </Group>
    </Stack>
  );
};

export default memo(NavRoutes);
