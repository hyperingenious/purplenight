"use client";
import { Center, Loader, Text, Image, Badge, Stack, Code, useComputedColorScheme, useMantineTheme, Avatar, Group, } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Markdown from "markdown-to-jsx";
import { useMediaQuery, useResizeObserver } from "@mantine/hooks";
import TitleComponent from "@/app/components/TitleComponent";
import { afacad_flux, dm_sans, spectral } from "@/app/font";
import { getPubliclySharedBlogWithID } from "@/appwrite/get/getPublicSharedBlog";
import QuoteCard from "@/app/components/QuoteCard";
import { cardShadows } from "@/app/utils/shadows";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { dark_theme } from "@/app/config/theme";

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

function SharedContent() {
  const [ref] = useResizeObserver();
  const theme = useMantineTheme();
  const { id: blog_id } = useParams();

  const colorScheme = useComputedColorScheme();
  const isSmallScreen = useMediaQuery("(max-width:480px)");

  const {
    data: blogData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", blog_id],
    queryFn: () => getPubliclySharedBlogWithID(blog_id),
  });

  if (isLoading) {
    return (
      <Center maw={800} w={"100%"} ref={ref} h="100%">
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

  return (
    <Stack
      ref={ref}
      w={"100%"}
      miw={300}
      align="start"
      maw={800}
      px="md"
      mx="auto"
      gap="lg"
      mb={isSmallScreen ? 100 : 0}
    >
      {/* Blog Image */}
      <Image
        w="100%"
        miw={300}
        maw={800}
        src={blogData?.blog_image || `/images_4_blogs/1.jpg`}
        alt="JUST a shthetic image"
        style={{ boxShadow: cardShadows.xs }}
        radius="md"
        mih={300}
        mah={300}
      />

      <Stack gap={0}>
        {/* Book Badge */}
        <Badge
          color={colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.gray[6]}
          mt="md"
          variant="light"
          size="lg"
          className={afacad_flux.className}
          style={{ boxShadow: cardShadows.xs }}
        >
          {blogData.book_name}
        </Badge>

        {/* Author Name */}
        <Text
          c={colorScheme === "dark" ? "#febeb5" : theme.colors.gray[6]}
          ta="left"
          size="md"
          className={afacad_flux.className}
        >
          —{blogData.author_name || "Unknown"}
        </Text>
      </Stack>

      {/* Blog Content */}
      <MarkdownToCustom markdown={blogData.blog_markdown} />

      {/* shared by */}
      <Group align="flex-start">
        <Avatar src={blogData.user_avatar} />
        <Stack gap={0}>
          <Text className={afacad_flux.className} c="gray" style={{ textTransform: "uppercase" }}>
            Shared By:
          </Text>
          <TitleComponent order={4} style={{ textTransform: "uppercase" }}>
            {blogData.user_name}
          </TitleComponent>
        </Stack>
      </Group>

      <SignedOut>
        <Group gap={"5"}>
          <Text className={dm_sans.className} c="gray">
            Do not have an account?
          </Text>

          <SignInButton mode="modal">
            <Text c={colorScheme === "dark" ? "#febeb5" : theme.colors.gray[6]} style={{ textDecoration: "underline" }}>
              Create One
            </Text>
          </SignInButton>
        </Group>
      </SignedOut>
    </Stack>
  );
}

export default SharedContent;
