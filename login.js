document.addEventListener("DOMContentLoaded", function () {

    // If someone is already signed in, skip straight to the dashboard
    if (wmGetCurrentUser()) {

        window.location.href = "dashboard.html";

        return;
    }

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberInput = document.getElementById("remember");
    const message = document.getElementById("loginMessage");
    const googleButton = document.querySelector(".google-button");

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

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {

            showMessage("Please enter your email and password.", true);

            return;
        }

        const user = wmFindUserByEmail(email);

        if (!user || user.password !== password) {

            showMessage("Incorrect email or password.", true);

            return;
        }

        wmSetCurrentUser(
            { name: user.name, email: user.email },
            rememberInput ? rememberInput.checked : true
        );

        showMessage("Login successful! Redirecting…", false);

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 500);
    });

    // =====================================
    // GOOGLE BUTTON (demo only)
    // =====================================

    if (googleButton) {

        googleButton.addEventListener("click", function () {

            showMessage(
                "Google sign-in isn't available in this demo — please use email/password.",
                true
            );
        });
    }
});
