/*
async function checkIfAtLeastOneBookIsThere({ user_id }) {
  try {
    const { documents } = await databases.listDocuments(databaseID, booksCollectionID, [
      Query.equal("user_id", [user_id]),
      Query.select(["$id"]),
    ]);
    return documents.length;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
*/

async function checkIfAtLeastOneBookIsThere({ getToken }) {
  const token = await getToken({ template: "supabase_2" });

  const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?slug=GET_CHECK_IF_AT_LEAST_ONE_BOOK_IS_THERE`;

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
  return responseData.length;
}
export { checkIfAtLeastOneBookIsThere };
