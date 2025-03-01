import { Group, Skeleton, Stack, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { memo } from "react";

function BookListSkeleton() {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  return (
    <Group m={"md"} w={"100%"} gap={"xs"}>
      {Array.from({ length: 20 }).map((_, index) => (
        <Group
maw={480} miw={300} 
          bg={colorScheme === "dark" ? "rgb(19, 27, 46)" : theme.colors.gray[1]}
          w={"100%"}
          key={index}
          height={78}
          p={"sm"}
          style={{ borderRadius: "10px" }}
          wrap="nowrap"
          align="flex-start"
        >
          <Skeleton height={40} width={40} radius="md" />
          <Stack gap={"xs"}>
            <Skeleton w={"250"} height={12} />
            <Skeleton w={150} height={9} />
            <Skeleton w={100} height={7} />
          </Stack>
        </Group>
      ))}
    </Group>
  );
}
export default memo(BookListSkeleton);
