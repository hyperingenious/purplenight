import { Card, Group, Skeleton, Stack, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { dark_theme } from "../config/theme";
import { useMediaQuery } from "@mantine/hooks";

function BlogSkeleton({ instances = 1 }) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const cardBackground = colorScheme === "dark" ? dark_theme.nav_link_dark_color : theme.colors.gray[0];
  const isSmallScreen = useMediaQuery("(max-width: 480px)");

  return (
    <>
      {Array.from({ length: instances }).map((_, i) => (
        <Card
          key={i}
          shadow="sm"
          maw={600}
          style={{ cursor: "pointer" }}
          mx="xs"
          radius="md"
          padding={0}
          bg={cardBackground}
        >
          <Group gap="xs" align="flex-start" wrap="nowrap">
            <Skeleton
              miw={isSmallScreen ? 120 : 140}
              mih={isSmallScreen ? 167 : 150}
              width={isSmallScreen ? 120 : 140}
              height={isSmallScreen ? 167 : 150}
              style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px" }}
            />
            <Stack pr="sm" py="sm" gap="xs">
              <Group mb="xs" gap="xs" align="flex-start">
                <Skeleton height={13} radius="xl" width={70} />
                <Skeleton height={13} radius="xl" width={40} />
                <Skeleton height={13} radius="xl" width={50} />
              </Group>
              {/* <Skeleton height={15} radius="sm" width={200} />
              <Skeleton height={15} radius="sm" width={200} />
              <Skeleton height={10} radius="sm" width={220} />
              <Skeleton height={10} radius="sm" width={220} /> */}
              <Skeleton height={15} radius="sm" width={400} />
              <Skeleton height={15} radius="sm" width={200} />
              <Skeleton height={10} radius="sm" width={420} />
              <Skeleton height={10} radius="sm" width={220} />
            </Stack>
          </Group>
        </Card>
      ))}
    </>
  );
}

export default BlogSkeleton;
