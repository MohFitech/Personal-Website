const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Client-side validation
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = '#FF0000';
        e.preventDefault(); // Stop submission if validation fails
        return;
    }

    // Optional: Additional validation (e.g., email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = '#FF0000';
        e.preventDefault();
        return;
    }

    // Show submitting message
    formMessage.textContent = 'Submitting your message...';
    formMessage.style.color = '#1E3A8A';

    // Let Formspree handle the submission
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.style.color = '#D4AF37';
            form.reset();
        } else {
            formMessage.textContent = 'Something went wrong. Please try again.';
            formMessage.style.color = '#FF0000';
        }
    } catch (error) {
        formMessage.textContent = 'Network error. Please try again later.';
        formMessage.style.color = '#FF0000';
    }
});
