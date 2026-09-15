document.addEventListener("DOMContentLoaded", function () {

    console.log("WorkMate AI - Skill Gaps JS Loaded");

    const buttons = document.querySelectorAll(".learning-path-btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const skill = button.getAttribute("data-skill");

            openLearningPath(skill);

        });

    });


    // Analyze My Skills
    const analyzeButton = document.querySelector(".analyze-button");

    if (analyzeButton) {

        analyzeButton.addEventListener("click", function () {

            analyzeButton.innerHTML = "⏳ Analyzing...";
            analyzeButton.disabled = true;

            setTimeout(function () {

                analyzeButton.innerHTML = "✓ Analysis Complete";

                showNotification(
                    "Your Skill DNA has been analyzed successfully."
                );

                setTimeout(function () {

                    analyzeButton.innerHTML = "✦ Analyze My Skills";
                    analyzeButton.disabled = false;

                }, 2000);

            }, 1500);

        });

    }

});


// =========================================
// SKILL DATA
// =========================================

const skillData = {

    sql: {
        icon: "DB",
        title: "SQL & Database",
        description: "Build strong database and SQL skills.",
        current: "42%",
        target: "80%",
        lessons: "7",
        time: "2.5h",
        lessonsList: [
            ["SQL Fundamentals", "SELECT, INSERT, UPDATE, DELETE", "20 min"],
            ["Filtering & Sorting", "WHERE, ORDER BY, LIKE and operators", "20 min"],
            ["SQL Joins", "INNER, LEFT, RIGHT and table relationships", "30 min"],
            ["GROUP BY & Aggregation", "COUNT, SUM, AVG, GROUP BY and HAVING", "25 min"],
            ["Subqueries", "Nested queries and advanced filtering", "25 min"],
            ["Database Design", "Keys, relationships and normalization", "20 min"],
            ["Final AI Quiz", "Test your knowledge and update Skill DNA", "20 min"]
        ]
    },


    cloud: {
        icon: "☁",
        title: "Cloud Fundamentals",
        description: "Learn the basics of cloud computing and services.",
        current: "35%",
        target: "75%",
        lessons: "6",
        time: "2h",
        lessonsList: [
            ["Cloud Computing Basics", "Introduction to cloud computing", "20 min"],
            ["Cloud Service Models", "IaaS, PaaS and SaaS", "20 min"],
            ["Cloud Deployment", "Public, private and hybrid cloud", "20 min"],
            ["Virtualization", "Virtual machines and containers", "20 min"],
            ["Cloud Storage", "Storage, databases and backups", "20 min"],
            ["Final AI Quiz", "Test your cloud knowledge", "20 min"]
        ]
    },


    python: {
        icon: "Py",
        title: "Python Development",
        description: "Improve your Python programming and problem-solving skills.",
        current: "61%",
        target: "80%",
        lessons: "6",
        time: "2h",
        lessonsList: [
            ["Python Basics", "Variables, data types and input", "20 min"],
            ["Conditional Statements", "if, elif and else", "20 min"],
            ["Loops", "for and while loops", "20 min"],
            ["Functions", "Create and use functions", "20 min"],
            ["Problem Solving", "Practice Python coding problems", "20 min"],
            ["Final AI Quiz", "Test your Python knowledge", "20 min"]
        ]
    },


    communication: {
        icon: "✦",
        title: "Communication",
        description: "Improve workplace communication and confidence.",
        current: "68%",
        target: "85%",
        lessons: "5",
        time: "1.5h",
        lessonsList: [
            ["Communication Basics", "Clear and effective communication", "20 min"],
            ["Active Listening", "Improve listening and understanding", "15 min"],
            ["Professional Speaking", "Speak clearly in workplace situations", "20 min"],
            ["Email Communication", "Write clear professional emails", "20 min"],
            ["Final AI Assessment", "Test your communication skills", "15 min"]
        ]
    }

};


// =========================================
// OPEN LEARNING PATH
// =========================================

function openLearningPath(skill) {

    const data = skillData[skill];

    if (!data) {

        console.log("Skill not found:", skill);

        return;

    }


    // Prevent duplicate popup
    if (document.getElementById("learningPathModal")) {
        return;
    }


    // Overlay
    const overlay = document.createElement("div");

    overlay.className = "path-overlay";
    overlay.id = "learningPathModal";


    // Modal
    const modal = document.createElement("div");

    modal.className = "path-modal";


    // Lessons HTML
    let lessonsHTML = "";

    data.lessonsList.forEach(function (lesson, index) {

        lessonsHTML += `

            <div class="lesson">

                <div class="lesson-number">
                    ${index + 1}
                </div>

                <div class="lesson-content">

                    <strong>
                        ${lesson[0]}
                    </strong>

                    <span>
                        ${lesson[1]}
                    </span>

                </div>

                <span class="lesson-time">
                    ${lesson[2]}
                </span>

            </div>

        `;

    });


    // Modal HTML
    modal.innerHTML = `

        <button class="path-close" id="pathClose">
            ×
        </button>


        <div class="path-header">

            <div class="path-icon">
                ${data.icon}
            </div>

            <div>

                <span class="path-label">
                    AI-GENERATED LEARNING PATH
                </span>

                <h2>
                    ${data.title}
                </h2>

                <p>
                    ${data.description}
                </p>

            </div>

        </div>


        <div class="path-summary">

            <div>
                <strong>${data.current}</strong>
                <span>Current Level</span>
            </div>

            <div>
                <strong>${data.target}</strong>
                <span>Target Level</span>
            </div>

            <div>
                <strong>${data.lessons}</strong>
                <span>Lessons</span>
            </div>

            <div>
                <strong>${data.time}</strong>
                <span>Estimated Time</span>
            </div>

        </div>


        <div class="path-progress">

            <div class="progress-top">

                <span>
                    Learning Progress
                </span>

                <span>
                    0%
                </span>

            </div>

            <div class="progress-bar">

                <div></div>

            </div>

        </div>


        <h3>
            Your Learning Path
        </h3>


        <div class="lesson-list">

            ${lessonsHTML}

        </div>


        <div class="path-footer">

            <button
                class="secondary-btn"
                id="closePathButton">

                Close

            </button>


            <button
                class="primary-btn"
                id="startLearningButton">

                Start Learning →

            </button>

        </div>

    `;


    overlay.appendChild(modal);

    document.body.appendChild(overlay);


    // =========================================
    // CLOSE X
    // =========================================

    document
        .getElementById("pathClose")
        .addEventListener("click", closeLearningPath);


    // =========================================
    // CLOSE BUTTON
    // =========================================

    document
        .getElementById("closePathButton")
        .addEventListener("click", closeLearningPath);


    // =========================================
    // START LEARNING
    // =========================================

    document
        .getElementById("startLearningButton")
        .addEventListener("click", function () {

            window.location.href = "learning-path.html";

        });


    // =========================================
    // CLICK OUTSIDE
    // =========================================

    overlay.addEventListener("click", function (event) {

        if (event.target === overlay) {

            closeLearningPath();

        }

    });


    // =========================================
    // ESC KEY
    // =========================================

    document.addEventListener(
        "keydown",
        handleEscapeKey
    );

}


// =========================================
// CLOSE MODAL
// =========================================

function closeLearningPath() {

    const modal =
        document.getElementById("learningPathModal");


    if (modal) {

        modal.remove();

    }


    document.removeEventListener(
        "keydown",
        handleEscapeKey
    );

}


// =========================================
// ESC KEY
// =========================================

function handleEscapeKey(event) {

    if (event.key === "Escape") {

        closeLearningPath();

    }

}


// =========================================
// NOTIFICATION
// =========================================

function showNotification(message) {

    const old =
        document.querySelector(".custom-notification");

    if (old) {
        old.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "custom-notification";

    notification.textContent =
        message;


    document.body.appendChild(notification);


    setTimeout(function () {

        notification.classList.add("show");

    }, 50);


    setTimeout(function () {

        notification.classList.remove("show");

    }, 3000);


    setTimeout(function () {

        notification.remove();

    }, 3400);

}