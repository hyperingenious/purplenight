"use client";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";
import {
  AppShell,
  Avatar,
  Group,
  Stack,
  Text,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";
import { SignOut } from "@phosphor-icons/react";
import  { Toaster } from "react-hot-toast";

import BottomNavigationBar from "../BottomBar";
import BrandLogo from "../Logo";
import FeedbackButton from "./FeedBack";
import UserProfileCard from "./UserCard";
import NavigationRoutes from "./NavRoutes";

import { dark_theme } from "@/app/config/theme";
import ThemeSwitcher from "./ThemeSwitcher";
import { memo,} from "react";
import PDFUploadModalProvider from "../PDFUploadModalProvider";
import OnSignedOutLayout from "./OnSignedOutLayout";
import CheckDesktopScreen from "./CheckDesktopScreen";
import SharedContent from "@/app/shared/blogs/public/[id]/page";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionModal from "../SubscriptionModal";
import FeedbackModalProvider from "../FeedbackModalProvider";
import CategorySelect from "../CategorySelect";
// import ScrollSlider from "./ScrollSlider"
function AppShellLayout({ children }) {
  const { user } = useUser();
  // status can be idle, pending, success, error
  const mantineTheme = useMantineTheme();
  const isSmallScreen = useMediaQuery("(max-width: 450px)");
  const isCompactScreen = useMediaQuery("(max-width:480px)");
  const isTabletScreen = useMediaQuery("(max-width:767px)");

  const colorScheme = useComputedColorScheme();
  const [isNavbarOpen, { toggle: toggleNavbar }] = useDisclosure();

  const AppShellHeader = memo(() => (
    <AppShell.Header
      bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}
    >
      <Group justify="space-between" h="100%" px="md">
        {isTabletScreen && (
          <Avatar
            src={user?.imageUrl}
            onClick={toggleNavbar}
            alt={user?.fullName}
            size={32}
          />
        )}
        <BrandLogo />
        {isTabletScreen && <ThemeSwitcher />}
        {!isTabletScreen && <FeedbackButton open={openFBM} />}
      </Group>
    </AppShell.Header>
  ));

  AppShellHeader.displayName = "AppShellHeader";

  // Abstraction for subscriptoin model
  const [opened, { open, close }] = useDisclosure(false);
  // abs for feedback modal
  const [openedFBM, { open: openFBM, close: closeFBM }] = useDisclosure(false);

  return (
    <>
      <OnSignedOutLayout>
        <SharedContent />
      </OnSignedOutLayout>
      <SignedIn>
        <SubscriptionModal opened={opened} close={close} />
        <PDFUploadModalProvider />
        <FeedbackModalProvider opened={openedFBM} close={closeFBM} />

        <AppShell
          bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}
          padding="md"
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !isNavbarOpen },
          }}
        >
          <Toaster position="bottom-center" reverseOrder={false} />
          <AppShellHeader />
          <AppShell.Navbar
            p="md"
            bg={
              colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]
            }
          >
            <Stack gap={0} h="100%" justify="space-between">
              <Stack gap={0}>
                <UserProfileCard
                  colorScheme={colorScheme}
                  fullName={user?.fullName}
                  emailAddress={user?.emailAddresses[0]?.emailAddress}
                  imageUrl={user?.imageUrl}
                  color={
                    colorScheme === "dark"
                      ? "rgb(19, 27, 46)"
                      : mantineTheme.colors.gray[0]
                  }
                />
                <NavigationRoutes
                  toggle={toggleNavbar}
                  colorScheme={colorScheme}
                />
              </Stack>
              {/* <ScrollSlider /> */}
           
             <Stack gap={0}>
                <SubscriptionCard
                  open={open}
                  colorScheme={colorScheme}
                  color={
                    colorScheme === "dark"
                      ? "rgb(19, 27, 46)"
                      : mantineTheme.colors.gray[0]
                  }
                />

                <Group mb={"md"} justify="space-between" gap={0}>
                  <SignOutButton>
                    <Group
                      gap="xs"
                      align="center"
                      p="sm"
                      justify="center"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        size="sm"
                        c={
                          colorScheme === "dark"
                            ? dark_theme.main_text_color
                            : "red"
                        }
                        fontWeight={500}
                      >
                        Sign out
                      </Text>
                      <SignOut
                        weight="bold"
                        color={
                          colorScheme === "dark"
                            ? dark_theme.main_text_color
                            : "#fa5252"
                        }
                        size={16}
                      />
                    </Group>
                  </SignOutButton>
                  {!isSmallScreen && <ThemeSwitcher />}
                  {isSmallScreen && <FeedbackButton open={openFBM} />}
                </Group>
              </Stack>
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main
            style={{ paddingInline: isCompactScreen ? 0 : undefined }}
          >
            <CheckDesktopScreen>{children}</CheckDesktopScreen>
          </AppShell.Main>

          {/* Bottom Navigation for Small Screens */}
          {isSmallScreen && !isNavbarOpen && <BottomNavigationBar />}
        </AppShell>
      </SignedIn>
    </>
  );
}

export default AppShellLayout;
