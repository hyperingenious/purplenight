import { dark_theme } from "@/app/config/theme";
import { cardShadows } from "@/app/utils/shadows";
import {
  Avatar,
  Card,
  Group,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
  Stack,
  Image,
} from "@mantine/core";

function SmallBlogCard({image_link, book_image_link, blog_content, blog_title, author_name, book_name}) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  return (
    <Card
      shadow={cardShadows.xs}
      bg={
        colorScheme === "dark"
          ? dark_theme.nav_link_dark_color
          : theme.colors.gray[2]
      }
      miw={300}
      p={0}
      mih={137}
      radius="lg"
    >
      <Group wrap="nowrap" gap={"0"}>
        <Image
          alt="Mountains"
          src={
          image_link
          }
          quality={100}
          style={{
            width: '125px', height: '142px',
            boxShadow: cardShadows.xs,
            objectFit: "cover",
          }}
          width={125}
          height={142}
          sizes="100vw"
        />

        <Stack gap={0} m="md">
          <Title
            lineClamp={2}
            mih={43}
            fw={500}
            order={4}
            c={
              colorScheme === "dark"
                ? dark_theme.main_text_color
                : theme.colors.gray[9]
            }
            style={{ lineHeight: 1.2, fontFamily:'Poppins' }}
          >
            {blog_title}
          </Title>
          <Text
            c={
              colorScheme === "dark"
                ? dark_theme.secondary_text_color
                : theme.colors.gray[6]
            }
            fw={500}
            mt={5}
            size="sm"
            lineClamp={2}
            style={{ lineHeight: 1.1, fontFamily: "DM Sans" }}
          >
            {blog_content}
          </Text>
          <Group justify="space-between" mt={"xs"} align="center">
            <Group gap={4} align="center">
              <Avatar
                size="22"
                src={
                    book_image_link
                }
                alt="Author"
              />
              <Text
              style={{fontFamily: "DM Sans"
              }}
                c={
                  colorScheme === "dark"
                    ? dark_theme.secondary_text_color
                    : theme.colors.gray[6]
                }
                maw={100}
                size="sm"
                truncate
              >
                {book_name}
              </Text>
            </Group>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
export default SmallBlogCard;