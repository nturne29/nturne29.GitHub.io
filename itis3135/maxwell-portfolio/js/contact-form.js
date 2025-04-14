document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Send to Formspree
                const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to send message');
                }
            } catch (error) {
                showFormMessage(error.message || 'Failed to send message. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
    
    // Rest of your existing validation functions...
    function validateForm(formData) {
        let isValid = true;
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Name validation
        if (!name || name.trim().length < 2) {
            showFieldError('name', 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (!email || !validateEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        // Message validation
        if (!message || message.trim().length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorElement);
        }
    }
    
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.padding = '1rem';
        messageElement.style.marginTop = '1rem';
        messageElement.style.borderRadius = '4px';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = '#d4edda';
            messageElement.style.color = '#155724';
            messageElement.style.border = '1px solid #c3e6cb';
        } else {
            messageElement.style.backgroundColor = '#f8d7da';
            messageElement.style.color = '#721c24';
            messageElement.style.border = '1px solid #f5c6cb';
        }
        
        // Insert after form
        contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
});