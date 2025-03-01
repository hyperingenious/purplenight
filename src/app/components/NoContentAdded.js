import { Stack, Text, Title, useComputedColorScheme, useMantineTheme, Button } from "@mantine/core";
import { Book } from "@phosphor-icons/react";
import { dark_theme } from "../config/theme";
import { cardShadows } from "../utils/shadows";
import { dm_sans } from "../font";
import { useModelContext } from "../contexts/ModelProvider";

export default function NoContentAdded() {
  const colorScheme = useComputedColorScheme();
  const { open } = useModelContext();
  const theme = useMantineTheme();
  return (
    <Stack
      py={"xl"}
      px={"md"}
      bg={colorScheme === "dark" ? dark_theme.nav_link_dark_color : theme.colors.gray[1]}
      align="center"
      justify="center"
      gap={"xs"}
      maw={300}
      style={{ borderRadius: "15px" }}
      m={20}
    >
      <Title
        // lineClamp={2}
        weight={600}
        className={dm_sans.className}
        style={{ lineHeight: 1.1 }}
        order={2}
        ta={"center"}
        c={colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.gray[9]}
      >
        Upload Books to Start Reading!
      </Title>
      <Text
        maw={200}
        c={colorScheme === "dark" ? dark_theme.secondary_text_color : ""}
        size="xs"
        fw={600}
        ta={"center"}
        className={dm_sans.className}
      >
        No Books Added. Add books to start seeing magic!
      </Text>
      <Button
        leftSection={<Book size={16} />}
        onClick={open}
        mt={"xs"}
        maw={250}
        color={colorScheme === "dark" ? dark_theme.main_text_color : "black"}
        c={colorScheme === "dark" ? dark_theme.nav_link_dark_color : "white"}
        radius={"md"}
        fullWidth
        mx={"md"}
        style={{
          boxShadow: `${cardShadows.sm}`,
        }}
      >
        Add Books
      </Button>
    </Stack>
  );
}
