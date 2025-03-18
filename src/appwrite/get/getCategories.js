/**
 * Retrieves all categories.
 * @async
 * @function getCategories
 * @returns {Promise<object[]>} - A promise that resolves to an array of category objects.  Each object represents a category and should have at least an `id` and `name` property. Rejects with an error if the request fails.
 * @throws {Error} If there's an error fetching the categories.  The error message will indicate the nature of the problem.
 */
async function getCategories({ getToken }) {
  try {
    const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?slug=GET_CATEGORIES`;
    const token = await getToken({ template: "supabase_2" });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      const errMsg = errData.message || `Error ${res.status}`;
      throw new Error(errMsg);
    }

    const resData = await res.json();
    return resData;
  } catch (err) {
    console.error("Error fetching categoreis:", err);
    throw err;
  }
}

export { getCategories };
