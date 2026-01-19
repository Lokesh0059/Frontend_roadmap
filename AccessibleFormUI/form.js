// ========================================
// PASSWORD TOGGLE FUNCTIONALITY
// ========================================

document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', handlePasswordToggle);
    button.addEventListener('keydown', handlePasswordKeydown);
});

function handlePasswordToggle(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    
    togglePasswordVisibility(button, input);
}

function handlePasswordKeydown(event) {
    // Allow Enter and Space to toggle password
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const button = event.currentTarget;
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);
        
        togglePasswordVisibility(button, input);
    }
}

function togglePasswordVisibility(button, input) {
    const isHidden = input.type === 'password';
    
    // Toggle input type
    input.type = isHidden ? 'text' : 'password';
    
    // Update aria-label and aria-pressed for accessibility
    button.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    button.setAttribute('aria-pressed', isHidden ? 'true' : 'false');
}

// ========================================
// FORM VALIDATION
// ========================================

const form = document.querySelector('.form-section');

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('change', validateField);
form.addEventListener('blur', validateField, true);

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    const isValid = validateAllFields();
    
    if (isValid) {
        console.log('Form is valid - ready to submit');
        // Here you would normally submit the form
    }
}

function validateAllFields() {
    let isValid = true;
    const fields = form.querySelectorAll('.form-input');
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(event) {
    const input = event.target;
    
    if (!input.classList.contains('form-input')) return true;
    
    const errorElement = document.getElementById(input.id + 'Error');
    let isValid = true;
    let errorMessage = '';
    
    // Full Name validation
    if (input.id === 'fullName') {
        if (input.value.trim() === '') {
            isValid = false;
            errorMessage = 'Full name is required';
        } else if (input.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Full name must be at least 2 characters';
        }
    }
    
    // Email validation
    if (input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value.trim() === '') {
            isValid = false;
            errorMessage = 'Email is required';
        } else if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Note: The "Email is already taken" error is pre-set in HTML for demo
    }
    
    // Password validation
    if (input.id === 'password') {
        if (input.value === '') {
            isValid = false;
            errorMessage = 'Password is required';
        } else if (input.value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters';
        }
    }
    
    // Confirm Password validation
    if (input.id === 'confirmPassword') {
        const passwordInput = document.getElementById('password');
        if (input.value === '') {
            isValid = false;
            errorMessage = 'Please confirm your password';
        } else if (input.value !== passwordInput.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    // Update error message display
    if (errorElement) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            input.classList.add('is-invalid');
            input.setAttribute('aria-invalid', 'true');
        } else {
            errorElement.textContent = '';
            input.classList.remove('is-invalid');
            input.setAttribute('aria-invalid', 'false');
        }
    }
    
    return isValid;
}

// ========================================
// SKIP TO MAIN CONTENT LINK (Hidden by default)
// ========================================

// Add skip link functionality for keyboard users
document.addEventListener('DOMContentLoaded', () => {
    // Create skip link if not exists
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.prepend(skipLink);
});
