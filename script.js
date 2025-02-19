document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = this;
    const formData = new FormData(form);
    const responseMessage = document.getElementById("response-message");

    // Get the reCAPTCHA response token
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
        responseMessage.textContent = "⚠️ Please complete the reCAPTCHA verification.";
        responseMessage.classList.add("error");
        responseMessage.classList.remove("success");
        responseMessage.style.opacity = 1;
        return; // Stop form submission
    }

    // Append reCAPTCHA response to the form data
    formData.append("g-recaptcha-response", recaptchaResponse);

    try {
        // Send form data to Formspree
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            responseMessage.textContent = "✅ Message sent successfully!";
            responseMessage.classList.add("success");
            responseMessage.classList.remove("error");
            responseMessage.style.opacity = 1;
            form.reset();
            grecaptcha.reset(); // Reset the reCAPTCHA checkbox
        } else {
            responseMessage.textContent = "⚠️ Error sending message. Please try again.";
            responseMessage.classList.add("error");
            responseMessage.classList.remove("success");
            responseMessage.style.opacity = 1;
        }
    } catch (error) {
        console.error("Form submission error:", error);
        responseMessage.textContent = "❌ Network error. Please check your connection.";
        responseMessage.classList.add("error");
        responseMessage.classList.remove("success");
        responseMessage.style.opacity = 1;
    }
});