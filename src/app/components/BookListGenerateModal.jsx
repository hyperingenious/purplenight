import { Button, Divider, Group, Modal, Text, Title, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { ArrowCircleUp } from "@phosphor-icons/react";
import { generateContent } from "../server-functions/generateContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import { dark_theme } from "../config/theme";
import { cardShadows } from "../utils/shadows";
import { memo } from "react";

function BookListGenerateModal({ isOpened, close, bookId, setIsGeneratingBook }) {
  const queryClient = useQueryClient();
  const {
    user: { id },
  } = useUser();
  const { getToken } = useAuth()

  const { mutateAsync: generateMoreBookContent } = useMutation({
    mutationFn: generateContent,
    onSuccess: () => {
      setIsGeneratingBook({ isGenerating: false, bookId: null });
      close();
      toast.success("Content generation Started!!",{
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });

      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
    onError: () => {
      setIsGeneratingBook({ isGenerating: false, bookId: null });
      toast.error("Something went wrong", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    },
  });
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  return (
    <Modal
      radius={"xl"}
      styles={{
        header: {
          display: "none",
        },
        body: {
          padding: "1.5rem",
          paddingBottom: "1rem",
          background: colorScheme === "dark" ? dark_theme.app_bg_dark_color : "white",
          paddingRight: "1.5rem",
          paddingLeft: "1.5rem",
        },
      }}
      centered
      opened={isOpened}
      bg={theme.colors.gray[0]}
      onClose={close}
      title="Authentication"
    >
      <Group gap={"xs"} wrap="nowrap">
        <ArrowCircleUp
          fill={colorScheme === "dark" ? dark_theme.secondary_text_color : "black"}
          size={42}
          weight={colorScheme === "dark" ? "fill" : "light"}
        />
        <Title order={4} fw={500} c={colorScheme === "dark" ? dark_theme.main_text_color : "dimmed"}>
          Generate More Content?
        </Title>
      </Group>
      <Divider my={"sm"} />

      <Text fz={"sm"} c={colorScheme === "dark" ? dark_theme.secondary_text_color : "dimmed"}>
        ──Generate 5 blogs from this book?
      </Text>
      <Text fz={"sm"} c={colorScheme === "dark" ? dark_theme.secondary_text_color : "dimmed"}>
        ──Generate 5 blogs from this book? ──Takes upto 5-10 minutes based on the size of the book
      </Text>
      <Group gap={"sm"} justify="flex-end" mt="md" mb="xs">
        <Button
          onClick={close}
          variant="transparent"
          c={colorScheme === "dark" ? dark_theme.secondary_text_color : theme.colors.dark[9]}
          color={colorScheme === "dark" ? dark_theme.card_bg_dark_color : "black"}
          size="md"
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            close();
            setIsGeneratingBook({ isGenerating: true, bookId });
            await generateMoreBookContent({ getToken, book_id: bookId, user_id: id });
          }}
          style={{ boxShadow: cardShadows.md }}
          variant="light"
          color={colorScheme === "dark" ? dark_theme.nav_link_dark_color : "black"}
          c={colorScheme === "dark" ? dark_theme.secondary_text_color : theme.colors.dark[9]}
          size="sm"
        >
          Generate
        </Button>
      </Group>
    </Modal>
  );
}
export default memo(BookListGenerateModal);
