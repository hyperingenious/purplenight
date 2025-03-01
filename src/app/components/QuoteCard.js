import { Text, Group, Stack, useComputedColorScheme,  useMantineTheme } from "@mantine/core";
import { dark_theme } from "../config/theme";

function QuoteCard({ quote }) {
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  return (
    <Stack miw={300} maw={600} gap={0}>
      <Group
        pl={"sm"}
        style={{
          borderLeft: `6px solid ${colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.gray[9]}`,
        }}
      >
        <Text
          size="xl"
          style={{
            fontFamily: "Circular, sans-serif",
            lineHeight: "1.5",
          }}
          fw={500}
        >
          {quote}
        </Text>
      </Group>
    </Stack>
  );
}
export default QuoteCard;
