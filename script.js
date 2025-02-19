document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = this;
    const formData = new FormData(form);
    const responseMessage = document.getElementById("response-message");

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            responseMessage.textContent = "Message sent successfully!";
            responseMessage.classList.add("success");
            responseMessage.classList.remove("error");
            responseMessage.style.opacity = 1;
            form.reset();
        } else {
            responseMessage.textContent = "Error sending message. Please try again.";
            responseMessage.classList.add("error");
            responseMessage.classList.remove("success");
            responseMessage.style.opacity = 1;
        }
    } catch (error) {
        responseMessage.textContent = "Network error. Please check your connection.";
        responseMessage.classList.add("error");
        responseMessage.classList.remove("success");
        responseMessage.style.opacity = 1;
    }
});