const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value.trim();

    try {
        const response = await fetch(
"http://localhost:3000/feedback",            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    rating,
                    comment
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            message.textContent = data.message;
            form.reset();
        } else {
            message.textContent = data.message || "Failed to save feedback";
        }

    } catch (error) {
        console.log("Error:", error);
        message.textContent = "Something went wrong. Please try again.";
    }
});