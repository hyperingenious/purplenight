import { Text, Group, Stack, Title } from "@mantine/core";
import { SignUpButton } from "@clerk/clerk-react";
import { kanit, poppins } from "../font";
import Logo, { LargeLightLogo } from "./Logo";
import { ArrowRight } from "@phosphor-icons/react";
import { useMediaQuery } from "@mantine/hooks";

export default function NotSignedIn() {
  const medDesktop = useMediaQuery("(max-width:1200px)");
  const smallSizeMath = useMediaQuery("(max-width:480px)");
  return (
      <Stack
        h={"100vh"}
        w={"100%"}
        style={{ zIndex: -1, backgroundImage: `url(bg.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <Stack pos={"absolute"} gap={"xs"} right={50} top={"20%"} display={medDesktop || smallSizeMath ? "none" : ""}>
          <Text className={poppins.className} c={"#7D7D7D"} style={{ fontSize: "2.5rem" }}>
            *
          </Text>
          <Text className={poppins.className} c={"#7D7D7D"} style={{ fontSize: "2.5rem" }}>
            *
          </Text>
          <Text className={poppins.className} c={"#7D7D7D"} style={{ fontSize: "2.5rem" }}>
            *
          </Text>
          <Text className={poppins.className} c={"#7D7D7D"} style={{ fontSize: "2.5rem" }}>
            *
          </Text>

          <Text className={poppins.className} c={"#7D7D7D"} style={{ fontSize: "2.5rem" }}>
            *
          </Text>
        </Stack>
        <Text
          className={poppins.className}
          style={{
            zIndex: 0,
            letterSpacing: "-59px",

            fontSize: medDesktop ? (smallSizeMath ? "20rem" : "30rem") : "50rem",
            lineHeight: 0.5,
          }}
          c={"#E4E4E4"}
          pos={"absolute"}
          top={0}
          fw={900}
        >
          **
        </Text>

        <Text
          className={poppins.className}
          style={{
            zIndex: 0,
            letterSpacing: "-59px",
            fontSize: medDesktop ? (smallSizeMath ? "20rem" : "30rem") : "50rem",
            lineHeight: 0,
          }}
          c={"#E4E4E4"}
          pos={"absolute"}
          bottom={0}
          fw={900}
        >
          **
        </Text>
        <Group maw={1300} px={"md"} mx={"auto"} style={{ zIndex: 138 }} w={"100%"} justify="space-between">
          {smallSizeMath ? <Logo /> : <LargeLightLogo />}

          <SignUpButton mode="modal">
            <Group style={{ cursor: "pointer" }} gap={"xs"}>
              <Text c={'black'} size="lg" fw={600} className={poppins.className} style={{ textDecoration: "underline" }}>
                Start Reading
              </Text>
              <ArrowRight weight="regular" size={28} />
            </Group>
          </SignUpButton>
        </Group>

        <Stack
          h={"100%"}
          pb={"xl"}
          align="center"
          justify="center"
          maw={1300}
          mx={"auto"}
          px={"md"}
          style={{ zIndex: 239 }}
          gap={0}
        >
          <Text
            order={1}
            display={!smallSizeMath && "none"}
            fw={300}
            ta={"center"}
            maw={medDesktop ? 800 : 1300}
            mx={"md"}
            style={{ lineHeight: 0.9, fontSize: medDesktop ? "1.5rem" : "4rem" }}
            c={"dark"}
            className={poppins.className}
          >
            * * * * *
          </Text>
          <Title
            order={1}
            mb={"sm"}
            fw={100}
            ta={"center"}
            maw={medDesktop ? 800 : 1300}
            mx={"md"}
            c={'black'}
            style={{ fontSize: medDesktop ? "1.5rem" : "4rem" }}
            className={poppins.className}
          >
            <span style={{ color: "#7B00FF" }}>PURPLE NIGHT </span>IS COMPATIBLE WITH ALL THE BOOKS OUT THERE
          </Title>
          <Text
            mx={"auto"}
            style={{ fontSize: smallSizeMath ? "1.1rem" : "1.6rem", lineHeight: 1.2 }}
            fw={400}
            maw={smallSizeMath ? 400 : 500}
            ta={"center"}
            c={'black'}
            className={kanit.className}
          >
            A very new way of approaching book reading, experience{" "}
            <SignUpButton type="modal">
              <span style={{ cursor: "pointer", textDecoration: "underline", color: "#7B00FF" }}>purplenight.</span>
            </SignUpButton>
          </Text>

          <SignUpButton mode="modal">
            <Group mt={"sm"} mb={"xl"} style={{ cursor: "pointer" }} gap={0}>
              <Text
                size="xs"
                ta={"center"}
                fw={400}
                className={poppins.className}
                style={{ textDecoration: "underline" }}
                c={'black'}
              >
                Start Reading
              </Text>
              <ArrowRight weight="regular" size={18} />
            </Group>
          </SignUpButton>
        </Stack>
      </Stack>
  );
}
