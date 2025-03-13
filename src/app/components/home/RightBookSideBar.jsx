import { fetchBook } from "@/appwrite/fetchBook";
import { useQuery } from "@tanstack/react-query";
import BookCards from "../bottom-bar/BookCards";
import LoadingSkeleton from "../bottom-bar/Skeleton";
import { ScrollArea, Stack, useComputedColorScheme } from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";

function RightBookSidebar() {
  const colorScheme = useComputedColorScheme();
  const [activeBook, setActiveBook] = useState(null);
  const { slug } = useParams();
  const { getToken } = useAuth();

  useEffect(() => {
    if (slug) {
      setActiveBook(slug[0]);
    }else(setActiveBook(null))
  },[slug]);

  const {
    data: books,
    isSuccess,
    isLoading,
  } = useQuery({
    bqueryKey: ["book"],
    queryFn: () => fetchBook(getToken),
    cacheTime: Infinity,
  });


  return (
    <ScrollArea scrollbarSize={6} h={"100vh"} scrollbars="y">
      <Stack gap="xs" ml={"sm"} m="xs">
        {/* {activeBook && (
          <ActiveBookCard colorScheme={colorScheme} {...activeBook} />
        )} */}

        {isSuccess &&
          books.map((data, i) => (
            <BookCards
              key={i}
              {...data}
              activeBook={activeBook}
              colorScheme={colorScheme}
            />
          ))}

        {isLoading && <LoadingSkeleton colorScheme={colorScheme} />}
      </Stack>
    </ScrollArea>
  );
}
export default memo(RightBookSidebar);
