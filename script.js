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

document.addEventListener("DOMContentLoaded", function () {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const animationSection = document.querySelector(".animation-section");
    const achievements = document.querySelectorAll(".achievement");

    function checkVisibility() {
        let scrollPos = window.scrollY;

        // Hide scroll indicator when scrolling past 100px
        if (scrollPos > 100) {
            scrollIndicator.style.opacity = "0";
        } else {
            scrollIndicator.style.opacity = "1";
        }

        // Trigger animation effect when entering the showcase
        if (scrollPos > animationSection.offsetTop - window.innerHeight / 1.5) {
            animationSection.classList.add("visible");
        }

        // Animate showcase achievements on scroll
        achievements.forEach((achievement) => {
            const position = achievement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (position < windowHeight * 0.85) {
                achievement.style.opacity = "1";
                achievement.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Run on page load in case elements are already in view

    // Initial state for achievements
    achievements.forEach((achievement) => {
        achievement.style.opacity = "0";
        achievement.style.transform = "translateY(30px)";
        achievement.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
});
// Ripple animation on click
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${e.clientX - e.target.getBoundingClientRect().left}px`;
        ripple.style.top = `${e.clientY - e.target.getBoundingClientRect().top}px`;

        e.target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});