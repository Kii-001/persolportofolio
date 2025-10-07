// Reusable Components and Utilities
class PortfolioComponents {
    // Modal Component
    static createModal(options = {}) {
        const {
            title = '',
            content = '',
            onClose = null,
            showCloseButton = true
        } = options;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                ${showCloseButton ? '<button class="modal-close">&times;</button>' : ''}
                ${title ? `<h2 class="modal-title">${title}</h2>` : ''}
                <div class="modal-body">${content}</div>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: var(--bg-card);
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(-50px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(modal);

        // Show modal
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            modalContent.style.transform = 'translateY(0)';
        }, 10);

        // Close modal function
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            modalContent.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
                if (onClose) onClose();
            }, 300);
        };

        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Close on close button click
        if (showCloseButton) {
            modal.querySelector('.modal-close').addEventListener('click', closeModal);
        }

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', handleEscape);

        // Cleanup
        modal.cleanup = () => {
            document.removeEventListener('keydown', handleEscape);
        };

        return { modal, closeModal };
    }

    // Toast Notification Component
    static showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;

        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getToastColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.hideToast(toast);
        });

        // Auto hide
        if (duration > 0) {
            setTimeout(() => {
                this.hideToast(toast);
            }, duration);
        }

        return toast;
    }

    static hideToast(toast) {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }

    static getToastColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    // Loading Spinner Component
    static showLoadingSpinner(text = 'Loading...') {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner"></div>
            <span class="spinner-text">${text}</span>
        `;

        spinner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
        `;

        document.body.appendChild(spinner);
        return spinner;
    }

    static hideLoadingSpinner(spinner) {
        if (spinner && document.body.contains(spinner)) {
            document.body.removeChild(spinner);
        }
    }

    // Form Validation Utilities
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }

    static showFieldError(field, message) {
        // Remove existing error
        this.hideFieldError(field);

        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;

        field.parentNode.appendChild(error);
        field.classList.add('error');

        return error;
    }

    static hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            field.parentNode.removeChild(existingError);
        }
        field.classList.remove('error');
    }

    // Local Storage Utilities
    static setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    }

    static getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    }

    static removeStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }

    // API Utilities
    static async apiCall(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const config = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API call failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Date Utilities
    static formatDate(date, format = 'long') {
        const d = new Date(date);
        const options = {
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' }
        }[format] || options.long;

        return d.toLocaleDateString(undefined, options);
    }

    static getRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hr ago`;
        if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
        
        return this.formatDate(date, 'short');
    }

    // DOM Utilities
    static $(selector) {
        return document.querySelector(selector);
    }

    static $$(selector) {
        return document.querySelectorAll(selector);
    }

    static createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });

        // Append children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });

        return element;
    }

    // Animation Utilities
    static animate(element, keyframes, options = {}) {
        return element.animate(keyframes, {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'both',
            ...options
        });
    }

    static fadeIn(element, duration = 300) {
        return this.animate(element, [
            { opacity: 0 },
            { opacity: 1 }
        ], { duration });
    }

    static fadeOut(element, duration = 300) {
        return this.animate(element, [
            { opacity: 1 },
            { opacity: 0 }
        ], { duration });
    }

    static slideDown(element, duration = 300) {
        return this.animate(element, [
            { height: '0', opacity: 0 },
            { height: `${element.scrollHeight}px`, opacity: 1 }
        ], { duration });
    }

    static slideUp(element, duration = 300) {
        return this.animate(element, [
            { height: `${element.scrollHeight}px`, opacity: 1 },
            { height: '0', opacity: 0 }
        ], { duration });
    }
}

// Make components globally available
window.PortfolioComponents = PortfolioComponents;

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // You can initialize specific components here if needed
});