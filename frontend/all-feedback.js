
const feedbackList = document.getElementById("feedbackList");

async function loadFeedback() {
    try {
        const response = await fetch("http://localhost:3000/feedback");

        if (!response.ok) {
            throw new Error("Failed to fetch feedback");
        }

        const feedbacks = await response.json();

        if (feedbacks.length === 0) {
            feedbackList.innerHTML = "<p>No feedback submitted yet.</p>";
            return;
        }

        feedbackList.innerHTML = "";

        feedbacks.forEach((feedback) => {
            const card = document.createElement("div");
            card.className = "feedback-card";

            const name = document.createElement("h3");
            name.textContent = feedback.name;

            const rating = document.createElement("p");
            rating.textContent = `Rating: ${feedback.rating}/5`;

            const comment = document.createElement("p");
            comment.textContent = feedback.comment;

            card.append(name, rating, comment);
            feedbackList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading feedback:", error);
        feedbackList.textContent =
            "Unable to load feedback. Please check that the backend is running.";
    }
}

loadFeedback();
