/* No token needed for this one */
async function getPubliclySharedBlogWithID(id) {
  try {
    const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}public-client-appwrite-get?id=${id}&slug=GET_GET_PUBLICLY_SHARED_BLOG_WITH_ID`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Error fetching blog:", error);
    throw error;
  }
}
export { getPubliclySharedBlogWithID };