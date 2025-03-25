export async function postPDF({ getToken, id, file, authorName, bookTitle, currentImage: book_image, blogCount, categoryId }) {
  try {
    const currentImageURL = `https://purplenight.hyperingenious.tech/${book_image}`;

    if (!file || file.length === 0) {
      throw new Error("No file provided.");
    }

    if (!authorName || !bookTitle || !book_image) {
      throw new Error("Missing required fields (authorName, bookTitle, book_image)")
    }

    const formData = new FormData();
    formData.append("pdf", file[0]); // Attach the file with the key "pdf"
    formData.append("authorName", authorName); // Add authorName
    formData.append("bookTitle", bookTitle); // Add bookTitle
    formData.append("imageUrl", currentImageURL);
    formData.append("user_id", id);
    formData.append("mimetype", file[0].type);
    formData.append("blogCount", blogCount);
    formData.append("category_id", categoryId);

    const token = await getToken({ template: "supabase_2" });

    const response = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER_URL}new-upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error uploading PDF:", errorData);
      throw new Error(errorData.message);
    }

    const responseData = await response.json(); // Parse the response
    return responseData; // Return the response data

  } catch (error) {
    console.error("Error in postPDF:", error); // Log the full error object
    throw error; // Re-throw the error for handling further up the call stack
  }
}
