/**
 * Fetches data about the book then fetches associated content number and return book
 * @param {Function} getToken 
 * @returns {Array}
 */
async function fetchBook(getToken) {
  try {
    const token = await getToken({ template: "supabase_2" });
    const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?slug=GET_FETCH_BOOK`;
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
    console.error(error);
    throw new Error(error)
  }
}
/*
async function fetchBook(user_id) {
  try {
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID,
      [Query.equal("user_id", [user_id, '66dbf6d30kewiw04e3ii4'])]
    );

    for (let i = 0; i < documents.length; i++) {
      const current_document = documents[i];
      const { documents: blogs } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID,
        [
          Query.equal("books", current_document.$id),
          Query.equal("user_id", [user_id, '66dbf6d30kewiw04e3ii4']),
          Query.select(["$id"]),
        ]
      );

      documents[i] = { ...current_document, blogs };
    }
    return documents.reverse();
  } catch (e) {
    console.error(e);
  }
}
*/
export { fetchBook };
