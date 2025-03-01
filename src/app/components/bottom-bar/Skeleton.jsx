import { dark_theme } from "@/app/config/theme";
import { Stack, Skeleton, Card, Group } from "@mantine/core";
import {memo} from 'react'

function LoadingSkeleton({ colorScheme }) {
  return Array.from({ length: 8 }, (_, i) => (
    <Card key={i-2828} p="xs" miw={250} h={57} radius={30} bg={colorScheme === "dark" ? dark_theme.nav_link_dark_color : undefined}>
      <Group align="center" justify="flex-start" gap="xs">
        <Skeleton h={32} radius="xl" w={32} />
        <Stack gap={5}>
          <Skeleton h={12} radius="sm" w={150} />
          <Group gap={4}>
            <Skeleton h={8} radius="xs" w={45} />
            <Skeleton h={8} radius="xs" w={45} />
          </Group>
        </Stack>
      </Group>
    </Card>
  ));
}

export default memo(LoadingSkeleton);
