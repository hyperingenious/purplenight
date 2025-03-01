/*
async function getTokenData({ user_id }) {
    try {
        const { documents } = await databases.listDocuments(databaseID, tokenisationCollectionID, [Query.equal('user_id', [user_id])])

        const mappedDocuments = documents.map(doc => {
            const parsedJSON = JSON.parse(doc.access);

            const accessArray = Object.entries(parsedJSON).flatMap(([category, permissions]) =>
                Object.entries(permissions).map(([access_type, permissionKey]) => ({ category, access_type, value: permissionKey }))
            )
            return { ...doc, access:accessArray }
        })
        return mappedDocuments;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
*/

async function getTokenData({ getToken }) {
    try {
        const token =await getToken({ template: "supabase_2" });
        const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}client-appwrite-get?slug=GET_GET_TOKEN_DATA`;
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
        return responseData;
    } catch (error) {
        console.error(error); //Added console.error for better debugging
        throw error; //Re-throwing the error to be handled by calling function
    }
}

export { getTokenData }