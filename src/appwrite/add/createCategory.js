/**
 * Creates a new category.
 * @param {function} getToken - A function to get the authentication token.  Should return a promise resolving to a string.
 * @param {string} category_name - The name of the category to create.
 * @returns {string} category creation success method 
 * @throws {Error} If there is an error creating the category.
 */
async function createCategory({ getToken, category_name }) {
  try {
    const token = await getToken({ template: "supabase_2" });
    const body = {
      slug: "POST_CREATE_NEW_CATEGORY",
      category_name,
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

    return "Category created successfully!"; 
  } catch (error) {
    console.error("Error creating category:", error); 
    throw error; 
  }
}
export default createCategory;
