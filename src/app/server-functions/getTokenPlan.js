export async function getTokenPlan({ getToken, file }) {
    try {

        if (!file || file.length === 0) {
            throw new Error("No file provided.");
        }

        const formData = new FormData();
        formData.append("pdf", file[0]); // Attach the file with the key "pdf"
        formData.append("mimetype", file[0].type);

        const token = await getToken({ template: "supabase_2" });

        const response = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER_URL}get-token-plan`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

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
