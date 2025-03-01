/*
async function markBlogRead({ id }) {
  await databases.updateDocument(databaseID, process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID, id, {
    isRead: true,
  });
  return null;
}
*/

async function markBlogRead({ id, getToken }) {
  try {
    const token = await getToken({ template: "supabase_2" });
    const body = { id, slug: 'POST_MARK_BLOG_READ' }
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

    return null
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { markBlogRead };