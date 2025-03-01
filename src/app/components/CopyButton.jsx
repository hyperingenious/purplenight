import { CopyButton as Cb, ActionIcon, Tooltip, Button, useMantineTheme, useComputedColorScheme } from "@mantine/core";
import { Copy as IconCopy, Check as IconCheck } from "@phosphor-icons/react";
import { cardShadows } from "../utils/shadows";
import { dark_theme } from "../config/theme";

export default function CopyButton({ value, text }) {
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();

  return (
    <Cb value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Button
          w={270}
          mt={"sm"}
          mx={"xs"}
          color={colorScheme === "dark" ? dark_theme.secondary_text_color : theme.colors.gray[2]}
          c={colorScheme === "dark" ? dark_theme.nav_link_dark_color : theme.colors.dark[9]}
          radius={"md"}
          fullWidth
        >
          {text}
          <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
            <ActionIcon color={copied ? "green" : "gray"} p={0} variant="transparent" onClick={copy}>
              {copied ? (
                <IconCheck size={20} color={colorScheme === "dark" ? dark_theme.nav_link_dark_color : "gray"} />
              ) : (
                <IconCopy
                  weight="bold"
                  size={20}
                  color={colorScheme === "dark" ? dark_theme.nav_link_dark_color : "gray"}
                />
              )}
            </ActionIcon>
          </Tooltip>
        </Button>
      )}
    </Cb>
  );
}
