export async function generateContent({ getToken, book_id, user_id }) {
  try {
    const token = await getToken({ template: "supabase_2" })
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}generate-content?id=${book_id}&user_id=${user_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    const res = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No chunks found for this book.");
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    }
    // const data = await response.json();
    return null;
  } catch (error) {
    console.error("Error fetching content:", error.message);
    throw error; // Optionally rethrow the error if it needs to be handled further up
  }
}
