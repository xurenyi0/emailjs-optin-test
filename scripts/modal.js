import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('W-SWI_xdav5LAV49d');

  const modal = document.querySelector('.modal-overlay');
  const joinButton = document.querySelector('.cta-button');
  const closeButton = document.querySelector('.close-button');
  const form = document.querySelector('.modal-form');

  // Open modal
  joinButton.addEventListener('click', () => {
    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  closeButton.addEventListener('click', () => {
    modal.classList.remove('is-visible');
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-visible');
      document.body.style.overflow = 'auto';
    }
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const submitButton = form.querySelector('.register-button');
    const originalText = submitButton.textContent;

    if (!name || !email) {
      alert('Please enter name and email.');
      return;
    }

    const payload = {
      to_name: name,
      to_email: email,
      message: 'Hello, this is a test.'
    };

    try {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      const result = await emailjs.send('service_mmytwq6', 'template_fb5qveg', payload);

      if (result.status === 200) {
        alert('Registration successful! Please check your email.');
        form.reset();
        modal.classList.remove('is-visible');
        document.body.style.overflow = 'auto';
      } else {
        alert('Failed to send email. See console for details.');
        console.error('Unexpected EmailJS response:', result);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email: ' + (error.text || error.message || 'Unknown error'));
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
});
