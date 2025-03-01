async function createTokenEntry({ token_name, access, getToken }) {
    try {
        const token = await getToken({ template: "supabase_2" })
        const body = { token_name, access, slug: "POST_CREATE_TOKEN_ENTRY" }
        const response = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-post`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || `Error ${response.status}`;
            throw new Error(errorMessage);
        }

        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}
/*
async function createTokenEntry({ token_name, user_id, access }) {
    try {
        const jsonString = JSON.stringify(access)
        const token = crypto.randomUUID();

        const response = await databases.createDocument(databaseID, tokenisationCollectionID, ID.unique(), {
            user_id,
            access: jsonString,
            token,
            token_name
        });

        const accessJSON = JSON.parse(response.access)
        const accessArray = Object.entries(accessJSON).flatMap(([category, actions]) => Object.entries(actions).map(([key, value]) => ({ category, access_type: key, value })))

        return { ...response, access: accessArray }
    } catch (error) {
        console.error(error)
        throw error
    }
}

    */
export { createTokenEntry }