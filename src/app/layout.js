"use client";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import '@mantine/carousel/styles.css';

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import AppShellLayout from "./components/layout/AppShellLayout";
import { ModelProvider } from "./contexts/ModelProvider";

// Root Layout Component
function RootLayout({ children }) {
  const defaultTheme = createTheme({
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans" },
  });

  const queryClient = new QueryClient();

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <head>
            <meta name="twitter:image" content="twitter-image.png" />
            <meta name="twitter:image:type" content="image/png" />
            <meta name="twitter:image:width" content="1200" />
            <meta name="twitter:image:height" content="630" />
            <meta property="og:image" content="opengraph-image.png" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="description" content="Turn your favorite books into short blogs without losing exact lines." />
            <title>Purplenight</title>
          </head>
          {/* <script async src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
              <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

          <body>
            <MantineProvider theme={defaultTheme} defaultColorScheme="light">
              <ModelProvider>
                <AppShellLayout>{children}</AppShellLayout>
              </ModelProvider>
            </MantineProvider>
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayout;
