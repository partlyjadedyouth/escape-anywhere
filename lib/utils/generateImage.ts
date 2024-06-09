export const generateImage = async (text: string) => {
    try {
        const response = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        return data.imageUrl;
    } catch (error) {
        console.error("Error generating image:", error);
    }
};