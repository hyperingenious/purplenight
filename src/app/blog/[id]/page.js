"use client";
import {
  Center, Loader, Text, Image, Badge, Stack, Code, Group, ScrollArea, useComputedColorScheme, useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getBlogAndSuggestedBlogs } from "../../../appwrite/getBlogById";
import { useParams } from "next/navigation";
import Markdown from "markdown-to-jsx";
import QuoteCard from "../../components/QuoteCard";
import { useMediaQuery, useResizeObserver } from "@mantine/hooks";
import { cardShadows } from "../../utils/shadows";
import SmallBlogCard from "@/app/components/SmallBlogCard";
import TitleComponent from "@/app/components/TitleComponent";
import { afacad_flux, spectral } from "@/app/font";
import { dark_theme } from "@/app/config/theme";
import { useAuth } from "@clerk/nextjs";

const TextMarkdown = ({ children }) => (
  <Text fw={400} py="xs" ta="left" size="lg" className={spectral.className}>
    {children}
  </Text>
);

const CodeBlock = ({ children }) => <Code block>{children}</Code>;
const EmphasizedText = ({ children }) => (
  <Text fs="italic" className={spectral.className}>
    {children}
  </Text>
);
const BlockquoteText = ({ children }) => <QuoteCard quote={children} />;

const MarkdownToCustom = ({ markdown }) => (
  <Markdown
    options={{
      overrides: {
        code: { component: CodeBlock },
        h1: { component: (props) => <TitleComponent {...props} order={1} /> },
        h2: { component: (props) => <TitleComponent {...props} order={1} /> },
        h3: { component: (props) => <TitleComponent {...props} order={3} /> },
        p: { component: TextMarkdown },
        em: { component: EmphasizedText },
        blockquote: { component: BlockquoteText },
      },
    }}
  >
    {markdown}
  </Markdown>
);

function ReadBlog() {
  const [ref, rect] = useResizeObserver();
  const theme = useMantineTheme();
  const { id: blog_id } = useParams();
  const colorScheme = useComputedColorScheme();
  const isSmallScreen = useMediaQuery("(max-width:480px)");
  const isBigScreen = useMediaQuery("(min-width:1200px)")
  const { getToken } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", blog_id],
    queryFn: () => getBlogAndSuggestedBlogs(blog_id, getToken),
  });

  if (isLoading) {
    return (
      <Center maw={800} w={isBigScreen ? 800 : "100%"} ref={ref} h="100%">
        <Loader color={colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.gray[9]} type="dots" />
      </Center>
    );
  }
  if (isError) {
    return (
      <Center maw={800} w={"100%"} ref={ref} h="100%">
        <Text>Error occurred while fetching the blog.</Text>
      </Center>
    );
  }
  const { blogData, allBlogsWithBookId } = data;
  return (
    <Stack ref={ref} w={"100%"} miw={300} align="start" maw={800} px="md" mx="auto" gap="lg" mb={isSmallScreen ? 100 : 0}
    >
      {/* Blog Image */}
      <Image w="100%" miw={300} maw={800} src={blogData?.blog_image || `/images_4_blogs/1.jpg`} style={{ boxShadow: cardShadows.xs }} radius="md" mih={300} mah={300} />

      <Stack gap={0}>
        {/* Book Badge */}
        <Badge color={colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.gray[6]} mt="md" variant="light" size="lg" className={afacad_flux.className} style={{ boxShadow: cardShadows.xs }}
        >
          {blogData.books.book_name}
        </Badge>

        {/* Author Name */}
        <Text
          c={colorScheme === "dark" ? "#febeb5" : theme.colors.gray[6]} ta="left" size="md" className={afacad_flux.className}
        >
          —{blogData.books?.author || "Unknown"}
        </Text>
      </Stack>

      {/* Blog Content */}
      <MarkdownToCustom markdown={blogData.blog_markdown} />

      {/* Related Blogs */}
      <Stack gap={0}>
        <Text className={afacad_flux.className} mt="lg" c="gray" style={{ textTransform: "uppercase" }}>
          more from
        </Text>
        <TitleComponent order={4} style={{ textTransform: "uppercase" }}>
          {blogData.books.book_name}
        </TitleComponent>
      </Stack>

      <ScrollArea w={rect.width} h={200}>
        <Group gap="xs" mt="xs" wrap="nowrap">
          {allBlogsWithBookId.map((blog) => (
            <SmallBlogCard
              key={blog.$id}
              blog={blog}
              bookImage={blogData.books.book_image}
              author={blogData.books.author}
            />
          ))}
        </Group>
      </ScrollArea>
    </Stack>
  );
}

export default ReadBlog;
