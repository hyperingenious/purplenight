"use client";
import { useState } from "react";
import { Center, SegmentedControl, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { SunDim, Moon } from "@phosphor-icons/react";
import { dark_theme } from "@/app/config/theme";
import { cardShadows } from "@/app/utils/shadows";
import { memo } from "react";

// Theme Toggle Button Component
const ThemeSwitcher = () => {
  const colorScheme = useComputedColorScheme();
  const [themeMode, setThemeMode] = useState(colorScheme);
  const { setColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      radius="xl"
      size="xs"
      onChange={(selectedValue) => {
        setThemeMode(selectedValue);
        setColorScheme(selectedValue);
      }}
      bg={colorScheme === "dark" ? "rgb(11, 09, 28)" : undefined}
      value={themeMode}
      withItemsBorders={false}
      w={66}
      styles={{
        indicator: {
          background: colorScheme === "dark" && "rgb(19, 27, 46)",
          boxShadow: cardShadows.md,
        },
        label: { padding: "calc(0.375rem) calc(0.375rem)" },
      }}
      data={[
        {
          value: "light",
          label: (
            <Center>
              <SunDim
                c={
                  colorScheme === "dark"
                    ? themeMode === "light"
                      ? dark_theme.main_text_color
                      : dark_theme.secondary_text_color
                    : undefined
                }
                size={16}
              />
            </Center>
          ),
        },
        {
          value: "dark",
          label: (
            <Center p={0}>
              <Moon
                color={
                  colorScheme === "dark"
                    ? themeMode === "dark"
                      ? dark_theme.main_text_color
                      : dark_theme.secondary_text_color
                    : undefined
                }
                size={16}
              />
            </Center>
          ),
        },
      ]}
    />
  );
};
export default memo(ThemeSwitcher);