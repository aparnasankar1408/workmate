document.addEventListener("DOMContentLoaded", function () {

    // If someone is already signed in, skip straight to the dashboard
    if (wmGetCurrentUser()) {

        window.location.href = "dashboard.html";

        return;
    }

    const form = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");
    const message = document.getElementById("message");

    if (!form) {
        return;
    }

    // =====================================
    // SHOW MESSAGE
    // =====================================

    function showMessage(text, isError) {

        if (!message) {
            return;
        }

        message.textContent = text;

        message.style.color = isError ? "#dc2626" : "#16a34a";
    }

    // =====================================
    // SUBMIT
    // =====================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;

        if (!name || !email || !password || !confirmPassword) {

            showMessage("Please fill in all fields.", true);

            return;
        }

        if (!termsInput.checked) {

            showMessage("Please agree to the terms and conditions.", true);

            return;
        }

        if (password !== confirmPassword) {

            showMessage("Passwords do not match.", true);

            return;
        }

        if (password.length < 6) {

            showMessage("Password should be at least 6 characters.", true);

            return;
        }

        if (wmFindUserByEmail(email)) {

            showMessage("An account with this email already exists. Please login instead.", true);

            return;
        }

        const users = wmGetUsers();

        users.push({ name: name, email: email, password: password });

        wmSaveUsers(users);

        wmSetCurrentUser({ name: name, email: email }, true);

        showMessage("Account created! Redirecting to your dashboard…", false);

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 700);
    });
});
