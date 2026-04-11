document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const phoneInput = document.getElementById('phoneNumber');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    
    // Validation function for South African phone numbers
    function validateSouthAfricanNumber(phone) {
        // Remove any spaces, dashes, or parentheses
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        
        // South African phone number patterns:
        // 1. 0821234567 (10 digits starting with 0)
        // 2. +27821234567 (12 digits starting with +27)
        // 3. 27821234567 (11 digits starting with 27)
        
        const saPatterns = [
            /^0[6-8][0-9]{8}$/,           // 0821234567, 0721234567, 0621234567
            /^\+27[6-8][0-9]{8}$/,         // +27821234567
            /^27[6-8][0-9]{8}$/,            // 27821234567
            /^0[1-9][0-9]{8}$/              // Landline: 0111234567, 0211234567, etc.
        ];
        
        // Check against all patterns
        for (let pattern of saPatterns) {
            if (pattern.test(cleanPhone)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Validation function for password (5-10 characters)
    function validatePassword(password) {
        return password.length >= 5 && password.length <= 10;
    }
    
    // Only proceed if elements exist on the page
    if (phoneInput && passwordInput && loginForm) {
        
        // Real-time phone number validation
        phoneInput.addEventListener('input', function() {
            const phone = this.value;
            const phoneError = document.getElementById('phoneError');
            const phoneSuccess = document.getElementById('phoneSuccess');
            
            // Reset classes
            this.classList.remove('input-error', 'input-success');
            if (phoneError) phoneError.style.display = 'none';
            if (phoneSuccess) phoneSuccess.style.display = 'none';
            
            if (phone.length > 0) {
                if (validateSouthAfricanNumber(phone)) {
                    this.classList.add('input-success');
                    if (phoneSuccess) phoneSuccess.style.display = 'block';
                    if (phoneError) phoneError.style.display = 'none';
                } else {
                    this.classList.add('input-error');
                    if (phoneError) {
                        phoneError.textContent = 'Please enter a valid South African number (e.g., 0821234567, +27821234567)';
                        phoneError.style.display = 'block';
                    }
                    if (phoneSuccess) phoneSuccess.style.display = 'none';
                }
            }
        });
        
        // Real-time password validation
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const passwordError = document.getElementById('passwordError');
            const passwordSuccess = document.getElementById('passwordSuccess');
            
            // Reset classes
            this.classList.remove('input-error', 'input-success');
            if (passwordError) passwordError.style.display = 'none ';
            if (passwordSuccess) passwordSuccess.style.display = 'none';
            
            if (password.length > 0) {
                if (validatePassword(password)) {
                    this.classList.add('input-success');
                    if (passwordSuccess) passwordSuccess.style.display = 'block';
                    if (passwordError) passwordError.style.display = 'none';
                } else {
                    this.classList.add('input-error');
                    if (passwordError) {
                        passwordError.textContent = 'Password must be between 5 and 10 characters';
                        passwordError.style.display = 'block';
                    }
                    if (passwordSuccess) passwordSuccess.style.display = 'none';
                }
            }
        });
        
        // Form submission validation
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = phoneInput.value;
            const password = passwordInput.value;
            
            const isPhoneValid = validateSouthAfricanNumber(phone);
            const isPasswordValid = validatePassword(password);
            
            // Get message elements
            const phoneError = document.getElementById('phoneError');
            const passwordError = document.getElementById('passwordError');
            const phoneSuccess = document.getElementById('phoneSuccess');
            const passwordSuccess = document.getElementById('passwordSuccess');
            
            // Clear previous messages
            if (phoneError) phoneError.style.display = 'none';
            if (passwordError) passwordError.style.display = 'none';
            if (phoneSuccess) phoneSuccess.style.display = 'none';
            if (passwordSuccess) passwordSuccess.style.display = 'none';
            
            phoneInput.classList.remove('input-error', 'input-success');
            passwordInput.classList.remove('input-error', 'input-success');
            
            // Validate phone
            if (!phone) {
                phoneInput.classList.add('input-error');
                if (phoneError) {
                    phoneError.textContent = 'Phone number is required';
                    phoneError.style.display = 'block';
                }
            } else if (!isPhoneValid) {
                phoneInput.classList.add('input-error');
                if (phoneError) {
                    phoneError.textContent = 'Please enter a valid South African number';
                    phoneError.style.display = 'block';
                }
            } else {
                phoneInput.classList.add('input-success');
                if (phoneSuccess) phoneSuccess.style.display = 'block';
            }
            
            // Validate password
            if (!password) {
                passwordInput.classList.add('input-error');
                if (passwordError) {
                    passwordError.textContent = 'Password is required';
                    passwordError.style.display = 'block';
                }
            } else if (!isPasswordValid) {
                passwordInput.classList.add('input-error');
                if (passwordError) {
                    passwordError.textContent = 'Password must be between 5 and 10 characters';
                    passwordError.style.display = 'block';
                }
            } else {
                passwordInput.classList.add('input-success');
                if (passwordSuccess) passwordSuccess.style.display = 'block';
            }
            
            // If both are valid, submit the form
            if (isPhoneValid && isPasswordValid) {
                // Show loading state
                if (loginBtn) {
                    loginBtn.textContent = 'Logging in...';
                    loginBtn.disabled = true;
                }
                
                // Submit the form
                this.submit();
            }
        });
        
        // Optional: Add blur validation (when user leaves the field)
        phoneInput.addEventListener('blur', function() {
            const phone = this.value;
            const phoneError = document.getElementById('phoneError');
            
            if (phone.length > 0 && !validateSouthAfricanNumber(phone)) {
                if (phoneError) {
                    phoneError.textContent = 'Invalid South African number';
                    phoneError.style.display = 'block';
                }
                this.classList.add('input-error');
            }
        });
        
        passwordInput.addEventListener('blur', function() {
            const password = this.value;
            const passwordError = document.getElementById('passwordError');
            
            if (password.length > 0 && !validatePassword(password)) {
                if (passwordError) {
                    passwordError.textContent = 'Password must be 5-10 characters';
                    passwordError.style.display = 'block';
                }
                this.classList.add('input-error');
            }
        });
        
        // Helper function to format phone number as user types (optional)
        phoneInput.addEventListener('keyup', function(e) {
            // Only format if backspace isn't pressed
            if (e.key !== 'Backspace') {
                let value = this.value.replace(/\D/g, '');
                
                // Format based on length
                if (value.length > 0) {
                    if (value.startsWith('27') && value.length > 2) {
                        // International format
                        if (value.length > 2) {
                            value = '+' + value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5, 8) + ' ' + value.substring(8, 12);
                        }
                    } else if (value.startsWith('0') && value.length > 0) {
                        // Local format
                        if (value.length > 3) {
                            value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
                        }
                    }
                    
                    // Only update if it's a different value (to avoid cursor jump)
                    if (this.value !== value) {
                        this.value = value.trim();
                    }
                }
            }
        });
    }
});