export const generateImage = async (text: string) => {
    console.log(text)
    try {
        const response = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });
        console.log(response)
        const data = await response.json();
        console.log(data.imageUrl)
        return data.imageUrl;
    } catch (error) {
        console.error("Error generating image:", error);
    }
};