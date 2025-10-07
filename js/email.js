// Email Handling with EmailJS
class EmailHandler {
    constructor() {
        this.initializeEmailJS();
        this.bindEmailEvents();
    }

    // Initialize EmailJS
    initializeEmailJS() {
        // EmailJS configuration
        // You need to sign up at https://www.emailjs.com/ and get your credentials
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
        
        // Set service and template IDs
        this.serviceID = "YOUR_SERVICE_ID"; // Replace with your service ID
        this.templateID = "YOUR_TEMPLATE_ID"; // Replace with your template ID
    }

    // Bind email form events
    bindEmailEvents() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(contactForm);
        });

        // Real-time validation
        this.initializeFormValidation(contactForm);
    }

    // Handle form submission
    async handleFormSubmit(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Validate form
            if (!this.validateForm(form)) {
                throw new Error('Please fill in all required fields correctly.');
            }

            // Prepare form data
            const formData = new FormData(form);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: formData.get('message'),
                to_name: 'Fathur Rizky',
                reply_to: formData.get('email')
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                this.serviceID,
                this.templateID,
                templateParams
            );

            if (response.status === 200) {
                // Success
                PortfolioComponents.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                this.resetFormValidation(form);
            } else {
                throw new Error('Failed to send message. Please try again.');
            }

        } catch (error) {
            console.error('Email sending error:', error);
            PortfolioComponents.showToast(
                error.message || 'Failed to send message. Please try again later.', 
                'error'
            );
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    // Form validation
    validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea');

        fields.forEach(field => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                PortfolioComponents.showFieldError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && field.value.trim()) {
                if (!PortfolioComponents.validateEmail(field.value)) {
                    PortfolioComponents.showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    PortfolioComponents.hideFieldError(field);
                }
            } else {
                PortfolioComponents.hideFieldError(field);
            }
        });

        return isValid;
    }

    // Reset form validation
    resetFormValidation(form) {
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            PortfolioComponents.hideFieldError(field);
        });
    }

    // Initialize real-time form validation
    initializeFormValidation(form) {
        const fields = form.querySelectorAll('input, textarea');

        fields.forEach(field => {
            field.addEventListener('blur', () => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    PortfolioComponents.showFieldError(field, 'This field is required');
                } else if (field.type === 'email' && field.value.trim()) {
                    if (!PortfolioComponents.validateEmail(field.value)) {
                        PortfolioComponents.showFieldError(field, 'Please enter a valid email address');
                    } else {
                        PortfolioComponents.hideFieldError(field);
                    }
                } else {
                    PortfolioComponents.hideFieldError(field);
                }
            });

            field.addEventListener('input', () => {
                // Clear error when user starts typing
                if (field.value.trim()) {
                    PortfolioComponents.hideFieldError(field);
                }
            });
        });
    }

    // Alternative email sending method (using Formspree or similar)
    async sendEmailAlternative(formData) {
        // This is an alternative method using Formspree
        // You can use this if you prefer not to use EmailJS
        
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            })
        });

        return response;
    }

    // Test email configuration
    async testEmailConfiguration() {
        try {
            const testParams = {
                from_name: 'Test User',
                from_email: 'test@example.com',
                message: 'This is a test message from your portfolio website.',
                to_name: 'Fathur Rizky'
            };

            const response = await emailjs.send(
                this.serviceID,
                this.templateID,
                testParams
            );

            console.log('Email test successful:', response);
            return true;
        } catch (error) {
            console.error('Email test failed:', error);
            return false;
        }
    }
}

// Initialize email handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmailHandler();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailHandler;
}