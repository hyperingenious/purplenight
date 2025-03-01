/*
async function deleteToken({ document_id }) {
    try {
        const result = await databases.deleteDocument(
            databaseID,
            tokenisationCollectionID,
            document_id
        );
        return result;
    } catch (error) {
        console.error(error)
        throw error
    }
}
*/

async function deleteToken({ getToken, document_id }) {
    try {
        const token = await getToken({ template: "supabase_2" });
        const body = {
            token, document_id,
            slug: "POST_DELETE_TOKEN"
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-post`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || `Error ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { deleteToken }
