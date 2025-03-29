import {
  Group,
  Text,
  Card,
  Stack,
  Menu,
  Loader,
  useMantineTheme,
  useComputedColorScheme,
  BackgroundImage,
  Badge,
} from "@mantine/core";
import { cardShadows } from "../utils/shadows";
import { DotsThreeVertical, Sparkle, Trash } from "@phosphor-icons/react";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { dark_theme } from "../config/theme";
import { memo } from "react";
import { poppins } from "../font";

function BookList({
  data,
  openDeleteBookModal,
  setDeleteBookId,
}) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const smallSizeMath = useMediaQuery("(max-width:480px)");
  const bigScreen = useMediaQuery("(min-width:1367px)");
  const router = useRouter();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const rows = data.map((item) => (
    <Card
      shadow={cardShadows.md}
      key={item.$id}
      w={"100%"}
      bg={
        colorScheme === "dark"
          ? dark_theme.nav_link_dark_color
          : theme.colors.gray[2]
      }
      mx={!bigScreen && "md"}
      style={{ cursor: "pointer" }}
      p="sm"
      maw={480}
      miw={300}
      radius="md"
    >
      <Group wrap="nowrap" align="flex-start" justify="space-between">
        <Group
          onClick={() => {
            const blogIds = item.blogs;
            blogIds.unshift({ $id: item.$id });
            const slug = blogIds.map((obj) => obj.$id).join("/");
            const url = `/specifics/${slug}`;
            router.push(url);
          }}
          wrap="nowrap"
          align="flex-start"
        >
          <BackgroundImage
            style={{
              boxShadow: cardShadows.xs,
            }}
            src={item.book_image.replace('hyperingenious.tech', 'live')}
            radius="md"
            h={38}
            w={38}
            fit="contain"
          />
          <Stack gap={0}>
            <Text
              c={
                colorScheme === "dark"
                  ? dark_theme.main_text_color
                  : theme.colors.dark[9]
              }
              w={smallSizeMath ? 200 : 300}
              fw={400}
              className={poppins.className}
              style={{ lineHeight: 1.1 }}
              truncate={"end"}
              size="md"
            >
              {item.book_name || "Untitled"}
            </Text>
            <Text
              className={poppins.className}
              fw={500}
              size="sm"
              c={
                colorScheme === "dark"
                  ? dark_theme.secondary_text_color
                  : theme.colors.dark[2]
              }
              truncate={"end"}
            >
              By: {item?.author || "unknown"}
            </Text>
            <Group gap={"xs"} align="center">
              <Text
                size="xs"
                c={
                  colorScheme === "dark"
                    ? dark_theme.secondary_text_color
                    : theme.colors.dark[2]
                }
              >
                {formatDate(item.$createdAt)},{" "}
                {
                  `${item.blogs.length} Extracts`}
              </Text>
              {item.user_id === 'user_2ur1m5I0EdV5hjQOY5CS1QIbMuF' &&
                <Badge color="blue" variant="light" size="sm">Example</Badge>
              }
            </Group>
          </Stack>
        </Group>
        <Stack display={item.user_id === 'user_2ur1m5I0EdV5hjQOY5CS1QIbMuF' && 'none'} justify="space-between">
          <Menu
            styles={{
              dropdown: {
                background: `${colorScheme === "dark"
                  ? dark_theme.app_bg_dark_color
                  : undefined
                  }`,
              },
            }}
            radius={"md"}
            width={150}
          >
            <Menu.Target>
              <DotsThreeVertical
                color={
                  colorScheme === "dark"
                    ? dark_theme.main_text_color
                    : undefined
                }
                size={22}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label
                c={
                  colorScheme === "dark"
                    ? dark_theme.main_text_color
                    : undefined
                }
                size={22}
              >
                Book Options
              </Menu.Label>
              <Menu.Item
                onClick={() => {
                  setDeleteBookId(item.$id);
                  openDeleteBookModal();
                }}
                color="red"
                leftSection={<Trash size={16} />}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Stack>
      </Group>
    </Card>
  ));
  return <>{rows}</>;
}

export default memo(BookList);
