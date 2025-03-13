"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./BottomBar.module.css";
import { House, FileArrowUp, Books } from "@phosphor-icons/react";
import { useParams, usePathname } from "next/navigation";
import { dark_theme } from "../config/theme";
import {
  ScrollArea,
  Stack,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useResizeObserver, useToggle } from "@mantine/hooks";
import { fetchBook } from "@/appwrite/fetchBook";
import LoadingSkeleton from "./bottom-bar/Skeleton";
import BookCards from "./bottom-bar/BookCards";
import { useQuery } from "@tanstack/react-query";
import ActiveBookCard from "./bottom-bar/ActiveBookCard";
import Link from "next/link";
import NoContentAdded from "./NoContentAdded";
import { useAuth } from "@clerk/nextjs";

const BottomBar = () => {
  const [isExpanded, toggleExpanded] = useToggle();
  const pathname = usePathname();
  const colorScheme = useComputedColorScheme();
  const [ref] = useResizeObserver();
  const theme = useMantineTheme();

  const { getToken } = useAuth();

  const {
    data: books,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () => fetchBook(getToken),
    cacheTime: Infinity,
  });

  const iconColor = useMemo(
    () =>
      colorScheme == "dark" ? dark_theme.main_text_color : theme.colors.gray[9],
    [colorScheme, theme.colors.gray]
  );

  const [activeBook, setActiveBook] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setActiveBook(slug[0]);
    } else setActiveBook(null);
  }, [slug]);

  const [currentRoute, setCurrentRoute] = useState(null);
  useEffect(() => setCurrentRoute(pathname), [pathname]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "3%",
        zIndex: 2323,
        padding: "1rem",
        display: "grid",
        width: "100%",
        placeItems: "center",
      }}
    >
      <div
        style={{
          background: colorScheme == "dark" ? "#131b2dc2" : "#ffffffc2",
          backdropFilter: "blur(8px)",
          padding: "8px",
        }}
        className={styles.nav_parent}
      >
        <ScrollArea
          ref={ref}
          bg={colorScheme == "dark" ? "rgb(11, 9, 28)" : theme.colors.gray[0]}
          scrollbarSize={2}
          h={isExpanded ? 300 : 0}
          style={{ transition: "0.3s ", borderRadius: "30px" }}
          scrollbars="y"
        >
          <Stack gap="xs" m="xs">
            {isSuccess &&
              books.map(
                (data, i) =>
                   (
                    <BookCards
                      activeBook={activeBook}
                      key={i}
                      {...data}
                      colorScheme={colorScheme}
                      toggle={toggleExpanded}
                    />
                  )
              )}
            {isSuccess && books.length === 0 && <NoContentAdded />}
            {isLoading && <LoadingSkeleton colorScheme={colorScheme} />}
          </Stack>
        </ScrollArea>
        <nav className={styles.nav}>
          <Link
            href={"/"}
            className={styles.link}
            onClick={(e) => {
              setCurrentRoute("/");
              if (isExpanded) toggleExpanded();
            }}
            style={{
              "--hover-bg": `${iconColor}20`,
              "--hover-c": iconColor,
              background: currentRoute == "/" && "var(--hover-bg)",
              color: currentRoute == "/" && "var(--hover-c)",
            }}
          >
            <House
              size={80}
              weight={currentRoute == "/" ? "fill" : "regular"}
            />
          </Link>
          <div
            className={styles.link}
            onClick={() => {
              toggleExpanded();
            }}
          >
            <Books size={80} />
          </div>
          <Link
            href={"/uploaded"}
            className={`${styles.link}`}
            onClick={() => {
              setCurrentRoute("/uploaded");
              if (isExpanded) toggleExpanded();
            }}
            style={{
              "--hover-bg": `${iconColor}20`,
              "--hover-c": iconColor,
              background: currentRoute == "/uploaded" && "var(--hover-bg)",
              color: currentRoute == "/uploaded" && "var(--hover-c)",
            }}
          >
            <FileArrowUp
              weight={currentRoute == "/uploaded" ? "fill" : "regular"}
              size={80}
            />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default BottomBar;
