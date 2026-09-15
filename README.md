# WorkMate AI — Frontend Prototype

An AI-powered workplace learning platform: login/signup, dashboard,
AI chat assistant, skill-gap analysis, skill "DNA" breakdown,
personalized learning paths with an AI quiz, and progress tracking.

This is a static front-end build (HTML/CSS/vanilla JS). It runs
entirely in the browser — no build step and no backend server
required.

## How to run it

Because the pages load each other via relative links, open it
through a local web server rather than double-clicking the HTML
files directly (double-clicking works too, but some browsers block
relative script loading over `file://`).

From inside this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

Any other static server works too (`npx serve`, VS Code's
"Live Server" extension, etc).

## Pages

| File              | Purpose                                             |
|-------------------|------------------------------------------------------|
| `index.html`      | Login page                                          |
| `signup.html`     | Account creation                                    |
| `dashboard.html`  | Main hub after login                                |
| `ai.html`         | AI chat assistant                                   |
| `dna.html`        | "Skill DNA" breakdown                               |
| `gap.html`        | Skill gap analysis + generated learning paths        |
| `path.html`       | A single learning path with lessons & roadmap        |
| `progress.html`   | Overall progress tracking                            |
| `quiz.html`       | Final AI assessment quiz                             |
| `settings.html`   | Account / app settings                              |

## Authentication

Accounts are stored in the browser's `localStorage` (no backend —
this is a prototype, not production-ready auth). See `auth.js`,
`login.js`, and `signup.js`.

- **Sign up** on `signup.html` → creates an account and logs you in.
- **Log in** on `index.html` → checks your email/password against
  stored accounts.
- **Session**: once logged in, every dashboard-side page checks for
  a session and redirects back to `index.html` if you're not signed
  in. Your name/initials are pulled into the sidebar automatically.
- **Log out**: click the "•••" next to your name in the sidebar.

To reset the demo (clear all accounts and sessions), open the
browser console on any page and run:

```js
localStorage.removeItem("wm_users");
localStorage.removeItem("wm_currentUser");
```

## Notes / limitations

- Passwords are stored in plain text in `localStorage` — fine for a
  demo, not for real use. A production version needs a real backend
  with hashed passwords (e.g. bcrypt) and a proper database/session
  store.
- The "Continue with Google" button and "Forgot password?" link are
  placeholders (they show a message rather than performing real
  OAuth / password reset).
- Learning-path progress (`path.js`) is also stored in
  `localStorage`, per browser — it doesn't sync across devices.
