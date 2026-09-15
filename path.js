document.addEventListener("DOMContentLoaded", function () {

    console.log("WorkMate AI - Learning Path Loaded");

    // =====================================================
    // SETTINGS
    // =====================================================

    const TOTAL_LESSONS = 5;
    const FINAL_ASSESSMENT = 5;

    const START_SKILL = 42;
    const TARGET_SKILL = 80;


    // =====================================================
    // SQL LEARNING VIDEOS
    // =====================================================

    const stages = [

        // =================================================
        // STAGE 1
        // =================================================

        {
            title: "SQL Basics",

            description:
                "Learn the fundamentals of SQL including SELECT, FROM, WHERE and basic query structure.",

            duration: "Beginner SQL",

            video:
                "https://www.youtube.com/embed/a56ZAJRkAdo"
        },


        // =================================================
        // STAGE 2
        // =================================================

        {
            title: "Filtering & Sorting",

            description:
                "Learn how to filter and organize SQL results using WHERE, AND, OR and ORDER BY.",

            duration: "SQL Filtering",

            video:
                "https://www.youtube.com/embed/a56ZAJRkAdo"
        },


        // =================================================
        // STAGE 3
        // =================================================

        {
            title: "JOIN Operations",

            description:
                "Learn how SQL JOINs combine data from multiple tables using INNER JOIN, LEFT JOIN and other JOIN types.",

            duration: "SQL JOINs",

            video:
                "https://www.youtube.com/embed/xkYpNfpmbGY"
        },


        // =================================================
        // STAGE 4
        // =================================================

        {
            title: "Aggregation & GROUP BY",

            description:
                "Learn COUNT, SUM, AVG, MIN, MAX and GROUP BY for analyzing SQL data.",

            duration: "SQL GROUP BY",

            video:
                "https://www.youtube.com/embed/i_VWvDiftdc"
        },


        // =================================================
        // STAGE 5
        // =================================================

        {
            title: "Subqueries & Advanced SQL",

            description:
                "Learn subqueries, IN, JOINs, GROUP BY and HAVING through practical SQL examples.",

            duration: "SQL Subqueries",

            video:
                "https://www.youtube.com/embed/i_VWvDiftdc"
        },


        // =================================================
        // FINAL AI ASSESSMENT
        // =================================================

        {
            title: "Final AI Assessment",

            description:
                "Complete the final AI assessment to measure your SQL learning progress.",

            duration: "Assessment",

            video: ""
        }

    ];


    // =====================================================
    // HTML ELEMENTS
    // =====================================================

    const progressNumber =
        document.getElementById("progressNumber");

    const heroProgress =
        document.getElementById("heroProgress");

    const youtubeVideo =
        document.getElementById("youtubeVideo");

    const videoTitle =
        document.getElementById("videoTitle");

    const videoDescription =
        document.getElementById("videoDescription");

    const videoDuration =
        document.getElementById("videoDuration");

    const completeLesson =
        document.getElementById("completeLesson");

    const continueButton =
        document.getElementById("continueButton");

    const upNextTitle =
        document.getElementById("upNextTitle");

    const upNextInfo =
        document.getElementById("upNextInfo");

    const skillCurrent =
        document.getElementById("skillCurrent");

    const skillProgressFill =
        document.getElementById("skillProgressFill");

    const pathCompletion =
        document.getElementById("pathCompletion");

    const pathProgressFill =
        document.getElementById("pathProgressFill");

    const stageCounter =
        document.getElementById("stageCounter");

    const adaptiveTip =
        document.getElementById("adaptiveTip");

    const lessonFooterTitle =
        document.getElementById("lessonFooterTitle");

    const lessonFooterText =
        document.getElementById("lessonFooterText");

    const notification =
        document.getElementById("notification");


    // =====================================================
    // LOAD COMPLETED STAGES
    // =====================================================

    let completedStages = [];

    try {

        const saved =
            localStorage.getItem("wm_completedStages");

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {
                completedStages = parsed;
            }

        }

    } catch (error) {

        console.log("Could not load saved progress.");

        completedStages = [];

    }


    // =====================================================
    // CLEAN DATA
    // =====================================================

    completedStages = completedStages.filter(function (stage) {

        return (
            Number.isInteger(stage) &&
            stage >= 0 &&
            stage < TOTAL_LESSONS
        );

    });


    completedStages = [
        ...new Set(completedStages)
    ];


    // =====================================================
    // DEFAULT FLOW
    // =====================================================

    /*
        REQUIRED INITIAL STATE:

        Stage 1 = Completed
        Stage 2 = Completed
        Stage 3 = Current
        Stage 4 = Locked
        Stage 5 = Locked
        Final Assessment = Locked
    */

    if (completedStages.length === 0) {

        completedStages = [0, 1];

    }


    // =====================================================
    // CURRENT STAGE
    // =====================================================

    let currentStage =
        parseInt(
            localStorage.getItem("wm_currentStage"),
            10
        );


    // If there is no valid saved stage

    if (
        isNaN(currentStage) ||
        currentStage < 0 ||
        currentStage > FINAL_ASSESSMENT
    ) {

        currentStage = 2;

    }


    // If only Stage 1 and Stage 2 are complete,
    // Stage 3 MUST be current.

    if (
        completedStages.length === 2 &&
        completedStages.includes(0) &&
        completedStages.includes(1)
    ) {

        currentStage = 2;

    }


    // =====================================================
    // SAVE PROGRESS
    // =====================================================

    function saveProgress() {

        localStorage.setItem(
            "wm_completedStages",
            JSON.stringify(completedStages)
        );

        localStorage.setItem(
            "wm_currentStage",
            String(currentStage)
        );

    }


    // =====================================================
    // PATH PERCENTAGE
    // =====================================================

    function getPathPercentage() {

        return Math.round(
            (
                completedStages.length /
                TOTAL_LESSONS
            ) * 100
        );

    }


    // =====================================================
    // SKILL PERCENTAGE
    // =====================================================

    function getSkillPercentage() {

        const pathPercentage =
            getPathPercentage();

        return Math.round(
            START_SKILL +
            (
                (
                    TARGET_SKILL -
                    START_SKILL
                ) *
                pathPercentage /
                100
            )
        );

    }


    // =====================================================
    // NOTIFICATION
    // =====================================================

    function showNotification(message) {

        if (!notification) {
            return;
        }

        notification.textContent =
            message;

        notification.classList.add("show");

        setTimeout(function () {

            notification.classList.remove("show");

        }, 2500);

    }


    // =====================================================
    // UPDATE PROGRESS
    // =====================================================

    function updateProgress() {

        const percentage =
            getPathPercentage();

        const skill =
            getSkillPercentage();


        // Hero percentage

        if (progressNumber) {

            progressNumber.textContent =
                percentage + "%";

        }


        // Circular progress

        if (heroProgress) {

            const degrees =
                percentage * 3.6;

            heroProgress.style.background =
                "conic-gradient(" +
                "#f97316 0deg " +
                degrees +
                "deg, " +
                "#e5e7eb " +
                degrees +
                "deg 360deg)";

        }


        // Skill percentage

        if (skillCurrent) {

            skillCurrent.textContent =
                skill + "%";

        }


        if (skillProgressFill) {

            skillProgressFill.style.width =
                skill + "%";

        }


        // Path percentage

        if (pathCompletion) {

            pathCompletion.textContent =
                percentage + "%";

        }


        if (pathProgressFill) {

            pathProgressFill.style.width =
                percentage + "%";

        }


        // Stage counter

        if (stageCounter) {

            stageCounter.textContent =
                completedStages.length +
                " of " +
                TOTAL_LESSONS +
                " lessons completed";

        }

    }


    // =====================================================
    // UPDATE ROADMAP
    // =====================================================

    function updateRoadmap() {

        const stageElements =
            document.querySelectorAll(".stage");


        stageElements.forEach(
            function (stageElement, index) {

                stageElement.classList.remove(
                    "completed",
                    "current",
                    "locked",
                    "unlocked"
                );


                const dot =
                    stageElement.querySelector(
                        ".stage-dot"
                    );


                const status =
                    stageElement.querySelector(
                        ".stage-status"
                    );


                // =========================================
                // COMPLETED
                // =========================================

                if (
                    index < TOTAL_LESSONS &&
                    completedStages.includes(index)
                ) {

                    stageElement.classList.add(
                        "completed"
                    );


                    if (dot) {
                        dot.textContent = "✓";
                    }


                    if (status) {
                        status.textContent =
                            "Completed";
                    }

                    return;

                }


                // =========================================
                // CURRENT
                // =========================================

                if (
                    index === currentStage &&
                    index < TOTAL_LESSONS
                ) {

                    stageElement.classList.add(
                        "current"
                    );


                    if (dot) {
                        dot.textContent =
                            index + 1;
                    }


                    if (status) {
                        status.textContent =
                            "Current";
                    }

                    return;

                }


                // =========================================
                // FINAL ASSESSMENT UNLOCKED
                // =========================================

                if (
                    index === FINAL_ASSESSMENT &&
                    completedStages.length ===
                    TOTAL_LESSONS
                ) {

                    stageElement.classList.add(
                        "unlocked"
                    );


                    if (dot) {
                        dot.textContent = "✓";
                    }


                    if (status) {
                        status.textContent =
                            "Unlocked";
                    }

                    return;

                }


                // =========================================
                // LOCKED
                // =========================================

                stageElement.classList.add(
                    "locked"
                );


                if (dot) {
                    dot.textContent = "🔒";
                }


                if (status) {
                    status.textContent =
                        "Locked";
                }

            }
        );

    }


    // =====================================================
    // LOAD YOUTUBE VIDEO
    // =====================================================

    function loadYouTubeVideo(url) {

        if (!youtubeVideo) {

            console.error(
                "youtubeVideo iframe not found in HTML."
            );

            return;

        }


        console.log(
            "Loading YouTube video:",
            url
        );


        // Clear old source

        youtubeVideo.src = "";


        youtubeVideo.style.display =
            "block";


        // Load new source

        setTimeout(function () {

            youtubeVideo.src = url;

        }, 100);

    }


    // =====================================================
    // UPDATE CURRENT LESSON
    // =====================================================

    function updateCurrentLesson() {


        // =================================================
        // ALL LESSONS COMPLETED
        // =================================================

        if (
            completedStages.length ===
            TOTAL_LESSONS
        ) {

            // Hide video

            if (youtubeVideo) {

                youtubeVideo.src = "";

                youtubeVideo.style.display =
                    "none";

            }


            // Title

            if (videoTitle) {

                videoTitle.textContent =
                    "Final AI Assessment Unlocked";

            }


            // Description

            if (videoDescription) {

                videoDescription.textContent =
                    "You have completed all 5 SQL learning videos. Your Final AI Assessment is now ready.";

            }


            // Duration

            if (videoDuration) {

                videoDuration.textContent =
                    "✓ Unlocked";

            }


            // Complete button

            if (completeLesson) {

                completeLesson.disabled =
                    false;

                completeLesson.textContent =
                    "Take Final AI Assessment →";

            }


            // Continue button

            if (continueButton) {

                continueButton.textContent =
                    "Take Final Assessment →";

            }


            // Footer

            if (lessonFooterTitle) {

                lessonFooterTitle.textContent =
                    "Final AI Assessment";

            }


            if (lessonFooterText) {

                lessonFooterText.textContent =
                    "All learning videos are completed. Start your final AI assessment.";

            }


            // Up Next

            if (upNextTitle) {

                upNextTitle.textContent =
                    "Final AI Assessment";

            }


            if (upNextInfo) {

                upNextInfo.textContent =
                    "Unlocked • Ready to start";

            }


            // Tip

            if (adaptiveTip) {

                adaptiveTip.textContent =
                    "🎉 Excellent! You completed all SQL learning videos. Your Final AI Assessment is unlocked.";

            }


            return;

        }


        // =================================================
        // GET CURRENT STAGE
        // =================================================

        const stage =
            stages[currentStage];


        if (!stage) {

            console.error(
                "Stage not found:",
                currentStage
            );

            return;

        }


        // =================================================
        // LOAD YOUTUBE
        // =================================================

        if (stage.video) {

            loadYouTubeVideo(
                stage.video
            );

        }


        // =================================================
        // TITLE
        // =================================================

        if (videoTitle) {

            videoTitle.textContent =
                stage.title;

        }


        // =================================================
        // DESCRIPTION
        // =================================================

        if (videoDescription) {

            videoDescription.textContent =
                stage.description;

        }


        // =================================================
        // DURATION
        // =================================================

        if (videoDuration) {

            videoDuration.textContent =
                "▶ " +
                stage.duration;

        }


        // =================================================
        // COMPLETE BUTTON
        // =================================================

        if (completeLesson) {

            completeLesson.disabled =
                false;

            completeLesson.textContent =
                "✓ Mark Complete & Continue";

        }


        // =================================================
        // FOOTER
        // =================================================

        if (lessonFooterTitle) {

            lessonFooterTitle.textContent =
                "Complete this lesson";

        }


        if (lessonFooterText) {

            lessonFooterText.textContent =
                "Watch the SQL video and click Mark Complete to unlock the next lesson.";

        }


        // =================================================
        // UP NEXT
        // =================================================

        if (
            currentStage <
            TOTAL_LESSONS - 1
        ) {

            const nextStage =
                stages[
                    currentStage + 1
                ];


            if (upNextTitle) {

                upNextTitle.textContent =
                    "Up Next: " +
                    nextStage.title;

            }


            if (upNextInfo) {

                upNextInfo.textContent =
                    "🔒 Complete current lesson to unlock";

            }

        }


        // =================================================
        // TIP
        // =================================================

        if (adaptiveTip) {

            adaptiveTip.textContent =
                "Focus on " +
                stage.title +
                ". Complete this lesson to unlock the next SQL topic.";

        }

    }


    // =====================================================
    // COMPLETE CURRENT LESSON
    // =====================================================

    function completeCurrentLesson() {


        // =================================================
        // FINAL ASSESSMENT
        // =================================================

        if (
            completedStages.length ===
            TOTAL_LESSONS
        ) {

            window.location.href =
                "quiz.html";

            return;

        }


        // =================================================
        // SAFETY CHECK
        // =================================================

        if (
            currentStage < 0 ||
            currentStage >= TOTAL_LESSONS
        ) {

            currentStage = 2;

        }


        // =================================================
        // ADD CURRENT LESSON
        // =================================================

        if (
            !completedStages.includes(
                currentStage
            )
        ) {

            completedStages.push(
                currentStage
            );

        }


        // Sort

        completedStages.sort(
            function (a, b) {
                return a - b;
            }
        );


        // =================================================
        // ALL 5 COMPLETED
        // =================================================

        if (
            completedStages.length ===
            TOTAL_LESSONS
        ) {

            currentStage =
                FINAL_ASSESSMENT;

            saveProgress();

            updateAll();

            showNotification(
                "🎉 All SQL lessons completed! Final Assessment unlocked."
            );

            return;

        }


        // =================================================
        // NEXT LESSON
        // =================================================

        currentStage =
            completedStages.length;


        saveProgress();

        updateAll();


        // =================================================
        // SCROLL TO VIDEO
        // =================================================

        const videoSection =
            document.getElementById(
                "videoSection"
            );


        if (videoSection) {

            videoSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        showNotification(
            "✓ Lesson completed! Next SQL video unlocked."
        );

    }


    // =====================================================
    // COMPLETE BUTTON CLICK
    // =====================================================

    if (completeLesson) {

        completeLesson.addEventListener(
            "click",
            function () {

                completeCurrentLesson();

            }
        );

    }


    // =====================================================
    // CONTINUE BUTTON
    // =====================================================

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {


                // Final assessment

                if (
                    completedStages.length ===
                    TOTAL_LESSONS
                ) {

                    window.location.href =
                        "quiz.html";

                    return;

                }


                // Scroll to video

                const videoSection =
                    document.getElementById(
                        "videoSection"
                    );


                if (videoSection) {

                    videoSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    // =====================================================
    // ROADMAP CLICK
    // =====================================================

    const stageElements =
        document.querySelectorAll(".stage");


    stageElements.forEach(
        function (stageElement, index) {

            stageElement.addEventListener(
                "click",
                function () {


                    // =====================================
                    // COMPLETED STAGE
                    // =====================================

                    if (
                        index < TOTAL_LESSONS &&
                        completedStages.includes(index)
                    ) {

                        currentStage =
                            index;

                        saveProgress();

                        updateAll();

                        scrollToVideo();

                        return;

                    }


                    // =====================================
                    // CURRENT STAGE
                    // =====================================

                    if (
                        index === currentStage &&
                        index < TOTAL_LESSONS
                    ) {

                        scrollToVideo();

                        return;

                    }


                    // =====================================
                    // FINAL ASSESSMENT
                    // =====================================

                    if (
                        index === FINAL_ASSESSMENT &&
                        completedStages.length ===
                        TOTAL_LESSONS
                    ) {

                        window.location.href =
                            "quiz.html";

                        return;

                    }


                    // =====================================
                    // LOCKED
                    // =====================================

                    showNotification(
                        "🔒 Complete the previous SQL lesson first."
                    );

                }
            );

        }
    );


    // =====================================================
    // SCROLL TO VIDEO
    // =====================================================

    function scrollToVideo() {

        const videoSection =
            document.getElementById(
                "videoSection"
            );


        if (videoSection) {

            videoSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    // =====================================================
    // UPDATE EVERYTHING
    // =====================================================

    function updateAll() {

        updateProgress();

        updateRoadmap();

        updateCurrentLesson();

    }
const stages = [
    {
        title: "SQL Basics",
        description: "Learn SQL fundamentals.",
        duration: "Beginner SQL",
        video: "https://www.youtube.com/embed/eL80VI4QGTg"
    },

    {
        title: "Filtering & Sorting",
        description: "Learn SELECT, WHERE, ORDER BY and filtering.",
        duration: "SQL Filtering",
        video: "https://www.youtube.com/embed/eL80VI4QGTg"
    },

    {
        title: "JOIN Operations",
        description: "Learn INNER JOIN, LEFT JOIN and combining tables.",
        duration: "SQL JOINs",
        video: "https://www.youtube.com/embed/eL80VI4QGTg"
    },

    {
        title: "Aggregation & GROUP BY",
        description: "Learn COUNT, SUM, AVG, MIN, MAX and GROUP BY.",
        duration: "SQL GROUP BY",
        video: "https://www.youtube.com/embed/29hSMhRiCAo"
    },

    {
        title: "Subqueries",
        description: "Learn SQL subqueries and nested queries.",
        duration: "SQL Subqueries",
        video: "https://www.youtube.com/embed/29hSMhRiCAo"
    }
];

    // =====================================================
    // SAVE INITIAL STATE
    // =====================================================

    saveProgress();


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    updateAll();


    console.log(
        "Current Stage:",
        currentStage + 1
    );

    console.log(
        "Completed:",
        completedStages
    );

});