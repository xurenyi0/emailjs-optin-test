document.addEventListener('DOMContentLoaded', () => {
  // Ensure you replace PUBLIC_KEY with your actual EmailJS public key if not initialized elsewhere
  import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
  if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
    emailjs.init('W-SWI_xdav5LAV49d');
  }

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
    modal.style.display = 'none';
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

    // Minimal client-side validation
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
      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      console.log('EmailJS payload:', payload);

      // Use the correct service/template IDs
      const result = await emailjs.send('service_mmytwq6', 'template_fb5qveg', payload);

      // Log full response for debugging
      console.log('EmailJS result:', result);

      // EmailJS v3/v4 returns an object; treat non-200 as error
      if (result && result.status === 200) {
        alert('Registration successful! Please check your email.');
        form.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      } else {
        // If API returns non-200 or unexpected shape
        console.error('Unexpected EmailJS response:', result);
        alert('Failed to send email. See console for details.');
      }
    } catch (error) {
      // EmailJS error objects often include status and text
      console.error('Error sending email:', error);
      if (error && typeof error === 'object') {
        console.error('status:', error.status, 'text:', error.text);
        alert('Error sending email: ' + (error.text || error.message || 'Unknown error'));
      } else {
        alert('Error sending email. See console for details.');
      }
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
});


