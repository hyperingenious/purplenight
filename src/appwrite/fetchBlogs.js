import { getBlogById } from "./getBlogById";

async function fetchBlogsWithIdArray({ idsArray, getToken }) {
  try {
    const blogs = [];
    for (const id of idsArray) {
      const result = await getBlogById(id, getToken);
      blogs.push(result);
    }
    const reversedBlogs = blogs.reverse();
    return reversedBlogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchBlogs(getToken, offset) {
  try {
    const token = await getToken({ template: "supabase_2" });

    const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?slug=GET_FETCH_BLOGS&offset=${offset}`;

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
  }
  catch (error) {
    console.error(error)
    throw error;
  }
}

/*
async function fetchBlogs(user_id, offset = 0) {
  const NO_BLOGS_ID = '66dbf6d30kewiw04e3ii4'
  try {
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
      [Query.limit(7), Query.offset(offset * 7), Query.orderDesc(), Query.equal("user_id", [user_id]), Query.isNull("isRead")]
    );
 
    if (documents.length == 0) {
      const { documents: noContentDocuments } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
        [Query.limit(7), Query.offset(offset * 7), Query.orderDesc(), Query.equal("user_id", [NO_BLOGS_ID])]
      );
      return noContentDocuments;
    }
    return documents
  } catch (error) {
    console.error(error);
  }
}
*/
export { fetchBlogsWithIdArray, fetchBlogs };