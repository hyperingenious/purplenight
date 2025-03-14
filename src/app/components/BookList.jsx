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
} from "@mantine/core";
import { cardShadows } from "../utils/shadows";
import { DotsThreeVertical, Sparkle, Trash } from "@phosphor-icons/react";
import { useMediaQuery } from "@mantine/hooks";
import { dark_theme } from "../config/theme";
import { memo } from "react";
import { poppins } from "../font";
import ScrollSlider from "../components/layout/ScrollSlider";

function BookList({
  data,
  openGenerateBookModal,
  openDeleteBookModal,
  setGenerateBookId,
  setDeleteBookId,
  isGeneratingBook,
}) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const smallSizeMath = useMediaQuery("(max-width:480px)");
  const bigScreen = useMediaQuery("(min-width:1367px)");

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
      bg={colorScheme === "dark" ? dark_theme.nav_link_dark_color : theme.colors.gray[2]}
      mx={!bigScreen && "md"}
      p="sm"
      maw={480}
      miw={300}
      radius="md"
    >
      <Group wrap="nowrap" align="flex-start" justify="space-between">
        <Group wrap="nowrap" align="flex-start">
          <BackgroundImage
            style={{
              boxShadow: cardShadows.xs,
            }}
            src={item.book_image}
            radius="md"
            h={38}
            w={38}
            fit="contain"
          />
          <Stack gap={0}>
            <Text
              c={colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.dark[9]}
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
              c={colorScheme === "dark" ? dark_theme.secondary_text_color : theme.colors.dark[2]}
              truncate={"end"}
            >
              By: {item?.author || "unknown"}
            </Text>
            <Group gap={"xs"} align="center">
              <Text size="xs" c={colorScheme === "dark" ? dark_theme.secondary_text_color : theme.colors.dark[2]}>
                {formatDate(item.$createdAt)}, {isGeneratingBook.bookId !== item.$id && `${item.blogs.length} Extracts`}
              </Text>
              {isGeneratingBook.isGenerating && isGeneratingBook.bookId === item.$id && (
                <Loader color={colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.dark[9]} type="dots" size={"xs"} />
              )}
            </Group>
          </Stack>
        </Group>
        <Stack justify="space-between">
          <Menu
            styles={{
              dropdown: {
                background: `${colorScheme === "dark" ? dark_theme.app_bg_dark_color : undefined}`,
              },
            }}
            radius={"md"}
            width={150}
          >
            <Menu.Target>
              <DotsThreeVertical color={colorScheme === "dark" ? dark_theme.main_text_color : undefined} size={22} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label c={colorScheme === "dark" ? dark_theme.main_text_color : undefined} size={22}>
                Book Options
              </Menu.Label>
              <Menu.Item
                onClick={() => {
                  setGenerateBookId(item.$id);
                  openGenerateBookModal();
                }}
                c={colorScheme === "dark" ? dark_theme.main_text_color : undefined}
                leftSection={<Sparkle color={colorScheme === "dark" ? dark_theme.main_text_color : undefined} size={16} weight="fill" />}
              >
                Generate
              </Menu.Item>
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
              <ScrollSlider />
            </Menu.Dropdown>
          </Menu>
        </Stack>
      </Group>
    </Card>
  ));
  return <>{rows}</>;
}

export default memo(BookList);
