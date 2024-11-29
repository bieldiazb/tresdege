// Initialize EmailJS
emailjs.init("i9ccqrnuUVaN6D--l"); // Replace with your EmailJS public key

// Form submission handler
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Send email using EmailJS
    emailjs.send("service_4g5a62r", "template_zasubpp", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    })
    .then(
        function (response) {
            alert("Message sent successfully!");
        },
        function (error) {
            alert("Failed to send message. Please try again.");
            console.log(error);  // Log error for debugging
        }
    );
});
