(function () {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const submitButton = contactForm.querySelector(".primary");

    function showError(input, message) {
        clearError(input);
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        error.style.color = "#ff6b6b";
        error.style.marginTop = "6px";
        error.style.fontSize = "0.9rem";
        input.parentNode.appendChild(error);
        input.style.borderColor = "#ff6b6b";
    }

    function clearError(input) {
        const existingError = input.parentNode.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = "";
    }

    function validateForm() {
        let isValid = true;

        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        if (!nameInput.value.trim()) {
            showError(nameInput, "Please enter your name.");
            isValid = false;
        }

        if (!emailInput.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email.");
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, "Please enter your message.");
            isValid = false;
        }

        return isValid;
    }

    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener("input", () => clearError(input));
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) return;

        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        if (window.emailjs) {
            window.emailjs.send("service_u9czfon", "template_wt8jb2v", {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            })
                .then(() => {
                    contactForm.reset();
                    submitButton.innerHTML = "Sent!";
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                })
                .catch(() => {
                    submitButton.innerHTML = "Try again";
                    submitButton.disabled = false;
                });
        } else {
            submitButton.innerHTML = "Try again";
            submitButton.disabled = false;
        }
    });
})();
function toggleMenu() {
    document.querySelector(".Links").classList.toggle("active");
}
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".Links .nav-link").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("activeLink");
    }
});


