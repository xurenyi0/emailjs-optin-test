document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-overlay');
    const joinButton = document.querySelector('.cta-button');
    const closeButton = document.querySelector('.close-button');
    const form = document.querySelector('.modal-form');

    // Open modal
    joinButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        
        const submitButton = form.querySelector('.register-button');
        const originalText = submitButton.textContent;

        try {
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Send email using EmailJS
            await emailjs.send(
                'service_r3lznhn',
                'template_fb5qveg',
                {
                    from_name: name,
                    to_name: name,
                    to_email: email,
                    message: 'Hello, this is a test.',
                    reply_to: email
                }
            );

            // Show success message
            alert('Registration successful! Please check your email.');
            
            // Reset form and close modal
            form.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error details: ' + error.message);
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});