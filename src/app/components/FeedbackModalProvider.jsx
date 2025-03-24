"use client";
import {
  Stack,
  Modal,
  Button,
  useMantineTheme,
  useComputedColorScheme,
  Textarea,
  Group,
  Text,
  Image,
  ActionIcon,
} from "@mantine/core";
import { Chat, Paperclip, Trash, X } from "@phosphor-icons/react";
import { dark_theme } from "@/app/config/theme";
import "./Uploaded.css";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postFeedback } from "../server-functions/postFeedback";
import ModalForm from "./ModalForm";
import { Rating } from '@mantine/core';

function FeedbackModalProvider({ opened, close }) {
  const theme = useMantineTheme();

  const colorScheme = useComputedColorScheme();
  const [feedback, setFeedback] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { getToken } = useAuth();

  const { mutateAsync: postTheFeedback, status } = useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      toast.success("Thanks for the feedback!");
      close();
      setFeedback(null);
      setScreenshot(null);
    },
    onError: (err) => {
      close();
      setFeedback(null);
      setScreenshot(null);
      toast.error(err.message);
    },
  });

  async function handleSubmit() {
    await postTheFeedback({ getToken, screenshot, feedback });
    return;
  }
  function imageToUrl(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file[0]);
  }
  function Demo() {
    return (
      <Rating
        size="lg"
        defaultValue={3}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', marginTop: '2px' }}
        color="rgb(255, 233, 39)"
      />
    );
  }
  return (
    <ModalForm opened={opened} close={close} title="upload" status={status}>
      <Stack miw={230} gap={0}>
        <Textarea
          label="Share Feedback"
          description="min 50 char"
          disabled={status === "pending"}
          radius={"md"}
          styles={{
            input: {
              border:
                colorScheme == "dark"
                  ? `${dark_theme.main_text_color} solid 0.4px`
                  : "",
              backgroundColor: "transparent",
            },
          }}
          value={feedback}
          maxLength={10_000}
          onChange={(e) => setFeedback(e.target.value)}
          size="sm"
          minLength={50}
          placeholder="Write here..."
          c={colorScheme === "dark" ? dark_theme.secondary_text_color : "dark"}
        />
        <Group pt={"xs"} align="center" gap={3} style={{ cursor: "pointer" }}>
          {screenshot && (
            <>
              <ActionIcon
                onClick={() => setScreenshot(null)}
                variant="transparent"
                radius="xl"
                aria-label="Settings"
              >
                <Trash
                  color={colorScheme == "dark" ? "white" : "black"}
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Image h={30} radius="md" src={imagePreview} />
            </>
          )}
          {!screenshot && (
            <Dropzone
              styles={{
                root: {
                  border: "none",
                  padding: 0,
                  background: "none",
                },
              }}
              onDrop={async (file) => {
                setScreenshot(file);
                imageToUrl(file);
              }}
              onReject={() => {
                toast.error(`Image should not exceed 10MB`);
              }}
              maxSize={10 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              <Group gap={3}>
                <Paperclip size={19} color="gray" />
                <Text mt={1} size="xs" fw={500} c={"#808080"}>
                  Attach Screenshot
                </Text>
              </Group>
            </Dropzone>
          )}
        </Group>
      </Stack>
      <Button
        mt={"sm"}
        loading={status === "pending"}
        loaderProps={{
          size: "sm",
          type: "dots",
          color: colorScheme === "dark" ? "black" : "white",
        }}
        onClick={handleSubmit}
        variant="light"
        leftSection={<Chat size={18} />}
        size="sm"
        c={feedback?.length < 1 ? "#00000052" : "black"}
        bg={
          colorScheme === "dark"
            ? dark_theme.main_text_color
            : theme.colors.gray[1]
        }
        fullWidth
        fw={400}
        radius="md"
        disabled={feedback?.length < 1 && true}
      >
        Share Feeback
      </Button>
    </ModalForm>
  );
}
export default FeedbackModalProvider;
