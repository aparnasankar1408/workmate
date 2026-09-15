// =====================================================
// WorkMate AI - Shared Authentication Helper
// =====================================================
// This is a front-end only (localStorage-based) auth
// system for the prototype. It is included on every
// page so that:
//   - Login / Signup pages can create & verify accounts
//   - Dashboard-side pages are protected (redirect to
//     login if nobody is signed in)
//   - The sidebar profile card reflects the signed-in user
//   - There is a working logout action
// =====================================================

const WM_USERS_KEY = "wm_users";
const WM_SESSION_KEY = "wm_currentUser";

// -----------------------------------------------------
// USER STORAGE
// -----------------------------------------------------

function wmGetUsers() {

    try {

        const users = JSON.parse(localStorage.getItem(WM_USERS_KEY));

        return Array.isArray(users) ? users : [];

    } catch (error) {

        return [];
    }
}

function wmSaveUsers(users) {

    localStorage.setItem(WM_USERS_KEY, JSON.stringify(users));
}

function wmFindUserByEmail(email) {

    const normalized = email.trim().toLowerCase();

    return wmGetUsers().find(function (user) {
        return user.email.toLowerCase() === normalized;
    });
}

// -----------------------------------------------------
// SESSION
// -----------------------------------------------------

function wmGetCurrentUser() {

    try {

        return JSON.parse(localStorage.getItem(WM_SESSION_KEY));

    } catch (error) {

        return null;
    }
}

function wmSetCurrentUser(user, remember) {

    // "remember" just controls sessionStorage vs localStorage
    // in a real app; for this prototype we always persist
    // in localStorage so the demo keeps working across visits.
    localStorage.setItem(WM_SESSION_KEY, JSON.stringify(user));
}

function wmLogout() {

    localStorage.removeItem(WM_SESSION_KEY);

    window.location.href = "index.html";
}

// -----------------------------------------------------
// INITIALS HELPER (e.g. "Aparna Sharma" -> "AS")
// -----------------------------------------------------

function wmGetInitials(name) {

    if (!name) {
        return "?";
    }

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// -----------------------------------------------------
// GUARD PROTECTED PAGES
// -----------------------------------------------------
// Call this on every dashboard-side page. Redirects to
// the login page if nobody is signed in.

function wmRequireAuth() {

    const user = wmGetCurrentUser();

    if (!user) {

        window.location.href = "index.html";

        return null;
    }

    return user;
}

// -----------------------------------------------------
// APPLY SIGNED-IN USER TO THE PAGE
// -----------------------------------------------------
// Updates the sidebar avatar / name (and hero greeting,
// where present) with the real signed-in user, and wires
// up logout on the "•••" profile menu.

function wmApplyUserToPage(user) {

    if (!user) {
        return;
    }

    const initials = wmGetInitials(user.name);

    // Sidebar avatar initials
    document.querySelectorAll(".avatar").forEach(function (el) {
        el.textContent = initials;
    });

    // Sidebar name
    document.querySelectorAll(".profile-info strong").forEach(function (el) {
        el.textContent = user.name;
    });

    // Hero / greeting text, e.g. "Good morning, Aparna"
    document.querySelectorAll(".hero h1, .welcome-heading, .greeting").forEach(function (el) {
        if (el.textContent.indexOf("Aparna") !== -1) {
            el.innerHTML = el.innerHTML.replace(/Aparna/g, user.name);
        }
    });

    // Chat assistant "You" avatar (ai.html)
    document.querySelectorAll(".message-avatar.user").forEach(function (el) {
        el.textContent = initials;
    });

    // Wire up logout via the "•••" profile menu, if present
    const moreMenu = document.querySelector(".profile .more");

    if (moreMenu) {

        moreMenu.style.cursor = "pointer";

        moreMenu.title = "Log out";

        moreMenu.addEventListener("click", function () {

            if (window.confirm("Log out of WorkMate AI?")) {
                wmLogout();
            }
        });
    }
}

// -----------------------------------------------------
// AUTO-RUN ON PROTECTED PAGES
// -----------------------------------------------------
// Pages include this script with data-auth="protected" on
// the <script> tag itself to enable the automatic guard.

(function () {

    const thisScript = document.currentScript;

    if (thisScript && thisScript.getAttribute("data-auth") === "protected") {

        const user = wmRequireAuth();

        document.addEventListener("DOMContentLoaded", function () {
            wmApplyUserToPage(user);
        });
    }

})();
