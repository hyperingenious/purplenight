import { dark_theme } from "@/app/config/theme";
import { cardShadows } from "@/app/utils/shadows";
import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { memo } from "react";

// User Card Component
function UserCard({ color, colorScheme, imageUrl, fullName, emailAddress }) {
  return (
    <Card bg={color} shadow={cardShadows.xs} radius="md" py="xs" px="md" mb="md">
      <Group wrap="nowrap" justify="space-between">
        <Group wrap="nowrap" gap="md" align="center">
          <Avatar src={imageUrl} alt="User Avatar" />
          <Stack gap={0}>
            <Text size="sm" c={colorScheme === "dark" ? dark_theme.main_text_color : "dark"}>
              {fullName}
            </Text>
            <Text size="xs" c="dimmed">
              {emailAddress}
            </Text>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
}
export default memo(UserCard);
