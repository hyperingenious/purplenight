export async function deleteBookAndDataCompletely({ bookId, getToken }) {
  try {

    if (!bookId) {
      throw new Error("Invalid ID provided.");
    }

    const token = await getToken({ template: "supabase_2" });

    const body = { bookId, slug: "POST_DELETE_BOOK_AND_DATA_COMPLETELY" };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}delete-content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      try {
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to delete content: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } catch (jsonError) {
        //Handle cases where response.json() might fail.  Log the error and re-throw a more generic error.
        console.error("Error parsing error response:", jsonError);
        throw new Error(`Failed to delete content: ${response.status} ${response.statusText}`);
      }
    }

    return await response.json();

  } catch (error) {
    console.error("Error deleting book and data:", error);
    throw error; // Re-throwing the error allows the calling function to handle it appropriately.
  }
}
