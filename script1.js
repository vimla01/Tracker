function validateSignup() {
    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (name.length < 3) {
        alert("Full Name must be at least 3 characters long.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    alert("✅ Account created successfully!");
    return true;
}
function validateLogin() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    alert("✅ Login successful!");
    return true;
}
function resetPassword() {
    let email = document.getElementById("resetEmail").value.trim();

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    alert("📩 Password reset link sent to " + email);
    return true;
}
function validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
