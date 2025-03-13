import { dark_theme } from "@/app/config/theme";
import { poppins } from "@/app/font";
import {
  BackgroundImage,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";

function ActiveBookCard({ $id,toggle, author, book_image, book_name, blogs }) {
  const extracts = blogs.length;
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  return (
    <Card
      shadow="xl"
      style={{ borderRadius: "0px 0px 30px 30px", zIndex: 1 }}
      pos={toggle? 'sticky':"absolute"}
      bottom={toggle && 0}
      top={toggle && 0}
      p={0}
      key={$id}
      bg={'transparent'}
    >
      <Card
        style={{ cursor: "pointer" }}
        p="xs"
        radius="30"
        bg={colorScheme === "dark" ? dark_theme.secondary_text_color : "black"}
      >
        <Group justify="flex-start" wrap="nowrap" gap="xs">
          <BackgroundImage
            src={book_image}
            radius="xl"
            h={36}
            w={36}
            fit="contain"
          />
          <Stack gap={0}>
            <Text
              w={200}
              truncate
              c={
                colorScheme === "dark"
                  ? dark_theme.nav_link_dark_color
                  : theme.colors.gray[0]
              }
              className={poppins.className}
              fw={600}
              size="sm"
            >
              {book_name}
            </Text>
            <Group gap="xs" wrap="nowrap">
              <Text
                w={115}
                truncate
                c={
                  colorScheme === "dark"
                    ? dark_theme.nav_link_dark_color
                    : theme.colors.gray[0]
                }
                className={poppins.className}
                size="xs"
              >
                By {author}
              </Text>
              <Badge
                color={
                  colorScheme === "dark"
                    ? dark_theme.nav_link_dark_color
                    : "white"
                }
                variant="light"
                fw={500}
                size="xs"
                className={poppins.className}
              >
                {extracts} Extracts
              </Badge>
            </Group>
          </Stack>
        </Group>
      </Card>
    </Card>
  );
}
export default ActiveBookCard;
