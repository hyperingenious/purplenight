import {  useMediaQuery } from "@mantine/hooks";
import { AppShell,  Group, useMantineTheme, useComputedColorScheme } from "@mantine/core";

import BrandLogo from "../Logo";

import ThemeSwitcher from "./ThemeSwitcher";
import { memo } from "react";

function PublicAppShellLayout({ children }) {
  // status can be idle, pending, success, error
  const mantineTheme = useMantineTheme();
  const isCompactScreen = useMediaQuery("(max-width:480px)");

  const colorScheme = useComputedColorScheme();

  const AppShellHeader = memo(() => (
    <AppShell.Header bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}>
      <Group justify="space-between" h="100%" px="md">
        <BrandLogo />
        <ThemeSwitcher />
      </Group>
    </AppShell.Header>
  ));

  AppShellHeader.displayName = "AppShellHeader";

  return (
    <AppShell
      bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}
      padding="md"
      header={{ height: 60 }}
    >
      <AppShellHeader />
      <AppShell.Main style={{ paddingInline: isCompactScreen ? 0 : undefined }}>{children}</AppShell.Main>
    </AppShell>
  );
}

export default PublicAppShellLayout;
