/**
 * Updates the category of a book.
 * @param {string} book_id - The parameters for updating the category.
 * @param {string} params.new_category_id - The ID of the new category.
 * @param {function} getToken - A function that returns a promise resolving to a Supabase token.
 * @returns {string} A success message if the category was updated successfully.
 * @throws {Error} If there is an error updating the category.
 */
async function updateCategory({ book_id, new_category_id, getToken }) {
  try {
    const token = await getToken({ template: "supabase_2" });

    const body = {
      slug: "POST_UPDATE_BOOK_CATEGORY",
      book_id,
      new_category_id,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-post`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errMsg = errData.message || `Error ${response.status}`;
      throw new Error(errMsg);
    }

    return "Category updated successfully!";
  } catch (error) {
    console.error("Error updating category:", error); 
    throw error;
  }
}

export default updateCategory;
