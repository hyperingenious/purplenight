"use client";
import { ScrollArea, Stack, useComputedColorScheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { fetchBlogsWithIdArray } from "@/appwrite/fetchBlogs";
import { useParams } from "next/navigation";
import BlogCard from "@/app/components/BlogCard";
import BlogSkeleton from "@/app/components/BlogSkeleton";

export default function Specifics() {
  const { slug } = useParams();
  const { getToken } = useAuth();
  const colorScheme = useComputedColorScheme();

  const idsArray = slug.slice(1)

  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    isSuccess: isBlogsSuccess,
  } = useQuery({
    queryKey: [slug],
    queryFn: () => fetchBlogsWithIdArray({ idsArray, getToken }),
  });

  return (
    <ScrollArea scrollbarSize={2} h={"100vh"} scrollbars="y">
      <Stack pb={"100"}>
        {isBlogsLoading && (
          <BlogSkeleton colorScheme={colorScheme} instances={10} />
        )}
        {isBlogsSuccess &&
          blogsData.map((blog, i) => (
            <BlogCard blog={blog.blog} key={`${blog.blog.$id}${i}`} />
          ))}
      </Stack>
    </ScrollArea>
  );
}
