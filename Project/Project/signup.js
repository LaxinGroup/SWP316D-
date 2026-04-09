document.getElementById("signupForm").addEventListener("submit", function(event) {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    if(password.length < 6) {
        alert("Password must be at least 6 characters long");
        event.preventDefault();
        return;
    }

    if(password !== confirmPassword) {
        alert("Passwords do not match");
        event.preventDefault();
        return;
    }

    alert("Registration successful!");
});