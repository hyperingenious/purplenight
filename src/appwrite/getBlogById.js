import removeMarkdown from "markdown-to-text";
import { extractFirstLine } from "@/app/helpers/helper";
import { markBlogRead } from "./update/updateBlog";

async function getBlogById(id, getToken) {
  try {
    const token = await getToken({ template: "supabase_2" });
    const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?id=${id}&slug=GET_BLOG_BY_ID`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `Error ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

async function getAllBlogsWithBookId({ getToken, book_id, blog_exception, isANoContentBlog }) {
  try {
    const token = await getToken({ template: "supabase_2" });
    const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?book_id=${book_id}&blog_exception=${blog_exception}&isANoContentBlog=${isANoContentBlog}&slug=GET_GET_ALL_BLOGS_WITH_BOOK_ID`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `Error ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/* this combines other appwrite methods, so no backend: replica for that*/
async function getBlogAndSuggestedBlogs(id, getToken) {
  try {
    const { blog: blogData, isANoContentBlog } = await getBlogById(id, getToken);
    if (!blogData.isRead) {
      await markBlogRead({ id: blogData.$id, getToken });
    }

    const bookId = blogData.books.$id;
    const { documents } = await getAllBlogsWithBookId({ book_id: bookId, blog_exception: id, isANoContentBlog, getToken });

    const allBlogsWithBookId = documents.map((blog) => {
      const markdown = blog.blog_markdown;
      const blogContent = removeMarkdown(markdown);
      const blogTitle = extractFirstLine(markdown);
      return { ...blog, blogContent, blogTitle };
    });

    return { blogData, allBlogsWithBookId };
  } catch (error) {
    console.error(error);
    throw error;
  }
}


/*
async function getBlogById(id, token ) {
  try {
    const doc = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
      id,
      [Query.select(["user_id"])]
    );

    if (doc.user_id !== '66dbf6d30kewiw04e3ii4' && doc.user_id !== user_id) {
      throw Error("The Blog Does not you belongs to you");
    }

    const blog = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
      id
    );
    return { blog, isANoContentBlog: doc.user_id === '66dbf6d30kewiw04e3ii4' };
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

async function getAllBlogsWithBookId({ book_id, blog_exception, isANoContentBlog }) {
  try {
    if (isANoContentBlog) {
      const blogs = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
        [Query.equal("books", [book_id]), Query.notEqual("$id", [blog_exception]),]
      );
      return blogs
    } else {
      const blogs = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
        [Query.equal("books", [book_id]), Query.notEqual("$id", [blog_exception]), Query.isNull("isRead")]
      );
      return blogs;
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getBlogAndSuggestedBlogs(id, user_id) {
  try {
    const { blog: blogData, isANoContentBlog } = await getBlogById(id, user_id);

    if (!blogData.isRead) {
      await markBlogRead({ id: blogData.$id });
    }

    const bookId = blogData.books.$id;
    const { documents } = await getAllBlogsWithBookId({ book_id: bookId, blog_exception: id, isANoContentBlog });

    const allBlogsWithBookId = documents.map((blog) => {
      const markdown = blog.blog_markdown;
      const blogContent = removeMarkdown(markdown);
      const blogTitle = extractFirstLine(markdown);
      return { ...blog, blogContent, blogTitle };
    });

    return { blogData, allBlogsWithBookId };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
  */

export { getBlogById, getAllBlogsWithBookId, getBlogAndSuggestedBlogs };
