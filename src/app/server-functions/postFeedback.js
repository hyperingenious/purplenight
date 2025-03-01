export async function postFeedback({ screenshot, feedback, getToken }) {
    try {
        const formData = new FormData();
        if (screenshot) {
            formData.append('screenshot', screenshot[0]);
        }
        formData.append('feedback', feedback);

        const token = await getToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER_URL}feedback`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const data = await res.json();
            const message = data.message || "An unexpected error occurred.";
            throw new Error(message);
        }

        return res.json();
    } catch (error) {
        console.error("Error in postFeedback:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
