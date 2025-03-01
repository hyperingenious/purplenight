/*
async function shareBlogPublicly({ user_id, user_name, blog_markdown, author_name, book_name, book_image, user_avatar, document_id, blog_image, }) {
  try {
    const response = await databases.createDocument(databaseID, publiclySharedBlogsCollectionId, document_id, { user_id, user_name, blog_markdown, author_name, book_image, book_name, user_avatar, blog_image, });

    return response.$id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
*/

async function shareBlogPublicly({ getToken, user_name, blog_markdown, author_name, book_name, book_image, user_avatar, document_id, blog_image,
}) {
  try {
    const token = await getToken({template: "supabase_2"})
    const body = {
      user_name, blog_markdown, author_name, book_name, book_image, user_avatar, document_id, blog_image,
      slug: "POST_SHARE_BLOG_PUBLICLY"

    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `Error ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData.$id; // Assuming the API returns an object with an $id property

  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { shareBlogPublicly };