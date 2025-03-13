import {
  BackgroundImage,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { dark_theme } from "@/app/config/theme";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { poppins } from "@/app/font";
import ActiveBookCard from "./ActiveBookCard";

function BookCards({
  $id,
  author,
  book_image,
  book_name,
  blogs,
  colorScheme,
  activeBook,
  toggle
}) {
  const isActiveBook = activeBook === $id;

  const props = {
    $id,
    author,
    book_image,
    book_name,
    blogs,
    colorScheme,
    activeBook,
    toggle
  };

  return     (
  <>
      {isActiveBook && <ActiveBookCard {...props} />}
      {!isActiveBook && <NonactiveBookCard {...props} />}
 </>
 )
  
}

function NonactiveBookCard({
  $id,
  author,
  blogs,
  book_image,
  book_name,
  colorScheme,
  toggle
}) {
  const router = useRouter();
  const extracts = blogs.length;
  const theme = useMantineTheme();

  return (
    <Card
      onClick={() => {
        if(toggle) toggle()
        const blogIds = Array.from(blogs);
        blogIds.unshift({ $id });
        const slug = blogIds.map((obj) => obj.$id).join("/");
        const url = `/specifics/${slug}`;
        router.push(url);
      }}
      style={{ cursor: "pointer" }}
      key={$id}
      p="xs"
      radius="30"
      bg={
        colorScheme === "dark"
          ? dark_theme.nav_link_dark_color
          : theme.colors.gray[2]
      }
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
            c={colorScheme === "dark" ? dark_theme.main_text_color : "dark"}
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
                  ? dark_theme.secondary_text_color
                  : theme.colors.gray[8]
              }
              className={poppins.className}
              size="xs"
            >
              By {author}
            </Text>
            <Badge
              color={
                colorScheme === "dark"
                  ? dark_theme.main_text_color
                  : theme.colors.gray[6]
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
  );
}

export default memo(BookCards);
