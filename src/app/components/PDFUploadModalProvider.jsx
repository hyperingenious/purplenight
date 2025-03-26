"use client";
import {
  Group,
  Stack,
  Button,
  Input,
  Card,
  BackgroundImage,
  Text,
  ActionIcon,
  useMantineTheme,
  useComputedColorScheme,
  Loader,
  Slider,
  Badge,
  Overlay,
  LoadingOverlay,
} from "@mantine/core";
import { Book, FileArrowUp, Sparkle, Trash } from "@phosphor-icons/react";
import { dark_theme } from "@/app/config/theme";
import "./Uploaded.css";
import { Dropzone, MIME_TYPES, PDF_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { cardShadows } from "@/app/utils/shadows";
import { afacad_flux } from "@/app/font";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useModelContext } from "../contexts/ModelProvider";
import { useUser } from "@clerk/clerk-react";
import { postPDF } from "../server-functions/postPDF";
import { getSubscription } from "@/appwrite/get/getSubscription";
import { getTokenPlan } from "../server-functions/getTokenPlan";
import ModalForm from "./ModalForm";
import { getPDFMetadata } from "../helpers/helper";

function PDFUploadModalProvider() {
  const { user } = useUser();
  const theme = useMantineTheme();
  const { opened, close } = useModelContext();
  const [currentImage, setCurrentImage] = useState(null);
  const imageArray = Array.from({ length: 100 }, (_, i) => `${i + 1}.jpg`);
  const [sliderState, setSliderState] = useState(null);
  const [sliderVal, setSliderVal] = useState(0);


  function chooseRandomImage() {
    setCurrentImage(
      `/compress-cats/${imageArray[Math.floor(Math.random() * imageArray.length)]
      }`
    );
  }

  function roundToClosestFactorOf100(num) {
    const factors = [1, 2, 4, 5, 10, 20, 25, 50, 100];
    return factors.reduce((closest, factor) =>
      Math.abs(num - factor) < Math.abs(num - closest) ? factor : closest
    );
  }

  const [book, setBook] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [bookTitle, setBookTitle] = useState(null);
  const [plan, setPlan] = useState(false);
  const [isGenerateButton, setIsGenerateButton] =  useState(false)
  const colorScheme = useComputedColorScheme();
  // const [count, handlers] = useCounter(plan?.possiblePercentageJump, { min: plan?.possiblePercentageJump, max: 100 });

  const { getToken } = useAuth();

  const { mutateAsync: postThePDF, status } = useMutation({
    mutationFn: postPDF,
    onSuccess: () => {
      toast.success("Book sent successfully");
      close();
      setBook(null);
      setAuthorName(null);
      setBookTitle(null);
      setIsGenerateButton(false)
    },
    onError: (err) => {
      close();
      setBook(null);
      setAuthorName(null);
      setBookTitle(null);
      toast.error(err.message);
    },
  });
  function tokenPlanOnSuccess({ possiblePercentangeJump }) {
    setIsGenerateButton(true)
    const closestTo100 = roundToClosestFactorOf100(possiblePercentangeJump);

    const marks = Array.from({
      length: Math.floor(100 / closestTo100) + 1,
    }).map((_, index) => ({
      value: (index + 1) * closestTo100,
    }));

    setSliderVal(closestTo100);

    setSliderState({
      defaultValue: closestTo100,
      marks,
      min: closestTo100,
    });

    return;
  }

  const {
    data: tokenPlanData,
    mutateAsync: getTheTokenPlan,
    status: tokenPlanStatus,
  } = useMutation({
    mutationFn: getTokenPlan,
    onSuccess: tokenPlanOnSuccess,
    onError: (err) => {
      toast.error(err);
      setBook(null)
    },
  });

  const { data, _, isSuccess } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getSubscription({ getToken }),
  });
  const calcPDFSize = (subscription_type, isActiveSubscription) =>
    isActiveSubscription && subscription_type === "reader"
      ? 20 * 1024 ** 2
      : 10 * 1024 ** 2;

  return (
    <ModalForm opened={opened} close={close} title="upload">
      <LoadingOverlay visible={status === 'pending' ? true : false} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Stack gap={0} miw={230}>
        <Input.Wrapper
          c={colorScheme === "dark" ? dark_theme.secondary_text_color : "dark"}
          l
          label="Book Title"
        >
          <Input
            disabled={status === "pending"}
            radius={"md"}
            variant="filled"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            size="sm"
            placeholder="The Selfish Gene"
          />
        </Input.Wrapper>
        <Input.Wrapper
          c={colorScheme === "dark" ? dark_theme.secondary_text_color : "dark"}
          label="Author Name"
        >
          <Input
            disabled={status === "pending"}
            radius={"md"}
            variant="filled"
            size="sm"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Ex: Richard Dawkins"
          />
        </Input.Wrapper>
      </Stack>
 
      {book && (
        <Card
          withBorder
          bg={
            colorScheme === "dark" ? dark_theme.nav_link_dark_color : "#f1f3f5"
          }
          padding="xs"
          radius="md"
        >
          <Group gap={0} wrap="nowrap" justify="space-between">
            <Group wrap="nowrap" >
              <BackgroundImage
                onClick={chooseRandomImage}
                src={currentImage}
                radius="xl"
                h={36}
                w={36}
              />
              <Stack gap={0}>
                <Text
                  maw={140}
                  className={afacad_flux.className}
                  truncate={"end"}
                  style={{ lineHeight: 1.1 }}
                >
                  {bookTitle}
                </Text>
                <Text
                  maw={140}
                  truncate={"end"}
                  style={{ lineHeight: 1.1 }}
                  size="xs"
                  c={"gray"}
                >
                  {authorName && "By: "}

                  {authorName}
                </Text>
              </Stack>
            </Group>
            {tokenPlanStatus === "success" && (
              <ActionIcon
                onClick={() => {
                  setBook(null);
                  setIsGenerateButton(false)
                  setPlan(false)
                  setAuthorName('')
                  setBookTitle('')
                }}
                mr={"xs"}
                size={"lg"}
                radius={"xl"}
                variant="light"
                color="red"
                aria-label="Settings"
              >
                <Trash size={19} color="#ed333b" />
              </ActionIcon>
            )}
            {tokenPlanStatus === "pending" && (
              <Loader
                color={
                  colorScheme == "dark" ? dark_theme.main_text_color : "dark"
                }
                size={"xs"}
              />
            )}
          </Group>
          {tokenPlanStatus === "success" && (
            <Stack >
              <Slider
                mt={'xs'}
                onChange={setSliderVal}
                restrictToMarks
                value={sliderVal}
                color={
                  colorScheme === "dark" ? dark_theme.main_text_color : "dark"
                }
                thumbChildren={
                  <Book
                    size={16}
                    color={colorScheme === "dark" && dark_theme.main_text_color}
                  />
                }
                defaultValue={sliderState.defaultValue}
                thumbSize={28}
                display={sliderState.defaultValue === 100 && "none"}
                label={null}
                max={100}
                min={sliderState.min}
                marks={sliderState.marks}
              />
              <Group mt={'xs'} gap={"xs"}>
                <Badge
                  size="sm"
                  variant="light"
                  c={
                    colorScheme === "dark" ? dark_theme.main_text_color : "dark"
                  }
                >
                  Covered: {sliderVal}%
                </Badge>
                <Badge
                  size="md"
                  variant="light"
                  c={
                    colorScheme === "dark" ? dark_theme.main_text_color : "dark"
                  }
                >
                  Blogs: {(sliderVal / sliderState.defaultValue) * 6}
                </Badge>
              </Group>
            </Stack>
          )}
        </Card>
      )}
      <Dropzone
        mb={0}
        styles={{
          root: {
            border: "none",
            padding: 0,
            background: "none",
          },
        }}
        display={book && 'none'}
        onDrop={async (file) => {
          setBook(file);
          chooseRandomImage();
          await getTheTokenPlan({ getToken, file });
          if (tokenPlanStatus === "success") {
            setPlan(tokenPlanData);
            setIsGenerateButton(true)
          }
        await getPDFMetadata({file: file[0], setAuthorName, setBookTitle}); 
        }}
        onReject={() => {
          toast.error(
            `Should not exceed ${isSuccess &&
            Math.floor(
              calcPDFSize(data.subscription_type, data.isActiveSubscription) /
              1000000
            )
            }MB`
          );
        }}
        maxSize={
          isSuccess &&
          calcPDFSize(data.subscription_type, data.isActiveSubscription)
        }
        accept={
          isSuccess && data.isActiveSubscription
            ? [
              PDF_MIME_TYPE,
              MIME_TYPES.docx,
              MIME_TYPES.doc,
              "text/plain",
              "application/epub+zip",
            ]
            : PDF_MIME_TYPE
        }
      >
        {!book && (
          <Stack mt={"xs"} justify="center" style={{ pointerEvents: "none" }}>
            <Dropzone.Idle>
              <Button
                style={{ boxShadow: cardShadows.md }}
                variant="light"
                leftSection={<FileArrowUp size={18} />}
                size="sm"
                c={colorScheme === "dark" ? "black" : "black"}
                bg={
                  colorScheme === "dark"
                    ? dark_theme.main_text_color
                    : theme.colors.gray[2]
                }
                fullWidth
                radius="md"
              >
                Upload
              </Button>
              {isSuccess && data.isActiveSubscription && (
                <Text
                  mt={"05"}
                  c={
                    colorScheme === "dark"
                      ? dark_theme.secondary_text_color
                      : "gray"
                  }
                  size="xs"
                >
                  Formats: PDF, EPUB, TXT, DOCX
                </Text>
              )}
              {isSuccess && !data.isActiveSubscription && (
                <Text
                  mt={"05"}
                  c={
                    colorScheme === "dark"
                      ? dark_theme.secondary_text_color
                      : "gray"
                  }
                  size="xs"
                >
                  Format: PDF
                </Text>
              )}
            </Dropzone.Idle>
          </Stack>
        )}
      </Dropzone>

      {
        isGenerateButton && 
        <Button
          variant="filled"
          styles={{ section: { marginInlineEnd: "5px" } }}
          leftSection={<Sparkle color={"black"} size={18} weight="fill" />}
          size="sm"
          fullWidth
          fw={400}
          c={"dark"}
          bg={
            colorScheme === "dark"
              ? dark_theme.main_text_color
              : theme.colors.gray[2]
          }
          radius="md"
          onClick={async () => {
            await postThePDF({
              getToken,
              id: user.id,
              file: book,
              authorName,
              bookTitle,
              currentImage,
              blogCount: (sliderVal / sliderState.defaultValue) * 6,
            });
          }}
        >
          Generate
        </Button>
      }
    </ModalForm>
  );
}
export default PDFUploadModalProvider;
