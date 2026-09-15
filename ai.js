document.addEventListener("DOMContentLoaded", function () {

    const textarea = document.querySelector(".input-box textarea");
    const sendButton = document.querySelector(".send");
    const chatBody = document.querySelector(".chat-body");

    // Check elements
    if (!textarea || !sendButton || !chatBody) {
        console.log("Chat elements not found");
        return;
    }


    // =====================================
    // SEND MESSAGE
    // =====================================

    function sendMessage() {

        const message = textarea.value.trim();

        if (message === "") {
            return;
        }

        // Add user message
        addUserMessage(message);

        // Clear input
        textarea.value = "";

        // Show typing
        showTyping();

        // Temporary AI reply
        setTimeout(function () {

            removeTyping();

            const reply = getAIResponse(message);

            addAIMessage(reply);

        }, 1000);
    }


    // =====================================
    // USER MESSAGE
    // =====================================

    function addUserMessage(message) {

        const userMessage = document.createElement("div");

        userMessage.className = "message user-message";

        userMessage.innerHTML = `
            
            <div class="message-content">

                <span class="message-name">
                    You
                </span>

                <div class="user-bubble">
                    ${escapeHTML(message)}
                </div>

            </div>

            <div class="message-avatar user">
                AS
            </div>

        `;

        chatBody.appendChild(userMessage);

        scrollChat();
    }


    // =====================================
    // AI MESSAGE
    // =====================================

    function addAIMessage(message) {

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai-message";

        aiMessage.innerHTML = `

            <div class="message-avatar">
                ✦
            </div>

            <div class="message-content">

                <span class="message-name">
                    WorkMate AI
                </span>

                <div class="bubble">
                    ${message}
                </div>

            </div>

        `;

        chatBody.appendChild(aiMessage);

        scrollChat();
    }


    // =====================================
    // TYPING
    // =====================================

    function showTyping() {

        const typing = document.createElement("div");

        typing.className = "message ai-message";

        typing.id = "typing-message";

        typing.innerHTML = `

            <div class="message-avatar">
                ✦
            </div>

            <div class="message-content">

                <span class="message-name">
                    WorkMate AI
                </span>

                <div class="bubble typing">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </div>

        `;

        chatBody.appendChild(typing);

        scrollChat();
    }


    function removeTyping() {

        const typing = document.getElementById("typing-message");

        if (typing) {
            typing.remove();
        }
    }


    // =====================================
    // AI RESPONSE
    // =====================================

    function getAIResponse(message) {

        const text = message.toLowerCase();


        // HI / HELLO

        if (
            text.includes("hi") ||
            text.includes("hello") ||
            text.includes("hey")
        ) {

            return `
                <p>
                    Hi Aparna! 👋
                </p>

                <p>
                    I'm WorkMate AI, your workplace learning
                    assistant. How can I help you today?
                </p>
            `;
        }


        // SQL

        if (
            text.includes("sql") ||
            text.includes("join") ||
            text.includes("database")
        ) {

            return `
                <p>
                    SQL is an important skill for working
                    with databases.
                </p>

                <p>
                    I recommend focusing on:
                </p>

                <ul>
                    <li>SELECT and WHERE</li>
                    <li>SQL Joins</li>
                    <li>GROUP BY and HAVING</li>
                    <li>Subqueries</li>
                </ul>

                <div class="skill-signal">

                    <span>◈</span>

                    <div>

                        <strong>
                            Skill signal detected
                        </strong>

                        <small>
                            SQL • Learning interest
                        </small>

                    </div>

                </div>
            `;
        }


        // PYTHON

        if (text.includes("python")) {

            return `
                <p>
                    Python is useful for programming,
                    automation and problem solving.
                </p>

                <p>
                    Start with:
                </p>

                <ul>
                    <li>Variables</li>
                    <li>Conditions</li>
                    <li>Loops</li>
                    <li>Functions</li>
                </ul>

                <div class="skill-signal">

                    <span>◈</span>

                    <div>

                        <strong>
                            Skill signal detected
                        </strong>

                        <small>
                            Python • Developing
                        </small>

                    </div>

                </div>
            `;
        }


        // SKILL GAP

        if (
            text.includes("skill gap") ||
            text.includes("missing skill")
        ) {

            return `
                <p>
                    Based on your current learning activity,
                    these areas may need more attention:
                </p>

                <ul>
                    <li>SQL Joins</li>
                    <li>Database Design</li>
                    <li>Python Functions</li>
                </ul>
            `;
        }


        // QUIZ

        if (
            text.includes("quiz") ||
            text.includes("test")
        ) {

            return `
                <p>
                    Sure! I can help you test your knowledge.
                </p>

                <p>
                    SQL would be a useful area to assess
                    based on your current profile.
                </p>
            `;
        }


        // LEARNING PATH

        if (text.includes("learning path")) {

            return `
                <p>
                    I can create a personalized learning path
                    based on your current skills.
                </p>

                <ol>
                    <li>Learn the concept</li>
                    <li>Practice examples</li>
                    <li>Take a quiz</li>
                    <li>Find weak areas</li>
                    <li>Practice again</li>
                </ol>
            `;
        }


        // DEFAULT

        return `
            <p>
                I understand your question.
            </p>

            <p>
                I'm currently connected to the WorkMate AI
                frontend prototype.
            </p>

            <p>
                Try asking me about SQL, Python, skill gaps,
                learning paths or quizzes.
            </p>
        `;
    }


    // =====================================
    // ENTER KEY
    // =====================================

    textarea.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            sendMessage();
        }

    });


    // =====================================
    // SEND BUTTON
    // =====================================

    sendButton.addEventListener("click", function () {

        sendMessage();

    });


    // =====================================
    // SCROLL
    // =====================================

    function scrollChat() {

        chatBody.scrollTop = chatBody.scrollHeight;

    }


    // =====================================
    // SECURITY
    // =====================================

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }

});