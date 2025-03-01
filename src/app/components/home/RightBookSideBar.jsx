import { fetchBook } from "@/appwrite/fetchBook";
import { useQuery } from "@tanstack/react-query";
import BookCards from "../bottom-bar/BookCards";
import LoadingSkeleton from "../bottom-bar/Skeleton";
import { ScrollArea, Stack, useComputedColorScheme } from "@mantine/core";
import { memo, useState } from "react";
import ActiveBookCard from "../bottom-bar/ActiveBookCard";
import { useAuth } from "@clerk/nextjs";

function RightBookSidebar() {
  const colorScheme = useComputedColorScheme();
  const [activeBook, setActiveBook] = useState(null);
  const { getToken } = useAuth()

  const {
    data: books,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () => fetchBook(getToken),
    cacheTime: Infinity,
  });

  return (
    <ScrollArea
      scrollbarSize={6}
      h={"100vh"}
      scrollbars="y"
    >
      <Stack gap="xs" ml={"sm"} m="xs">
        {activeBook && <ActiveBookCard colorScheme={colorScheme} {...activeBook} />}

        {isSuccess &&
          books.map(
            (data, i) =>
              data.$id !== activeBook?.$id && (
                <BookCards setActiveBook={setActiveBook} key={i} {...data} colorScheme={colorScheme} />
              )
          )}

        {isLoading && <LoadingSkeleton colorScheme={colorScheme} />}
      </Stack>
    </ScrollArea>
  );
}
export default memo(RightBookSidebar);