document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("portfolio-loader");
    const progressBar = document.querySelector(".loader-progress-bar");
    const percent = document.querySelector(".loader-percent");
    const status = document.querySelector(".loader-status");

    if (!loader) return;

    const messages = [
        "Initializing security system...",
        "Loading user data...",
        "Checking environment...",
        "Loading portfolio...",
        "Starting secure session..."
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {

        progress += Math.floor(Math.random() * 8) + 3;

        if (progress > 100) {
            progress = 100;
        }

        progressBar.style.width = progress + "%";
        percent.textContent = progress + "%";

        if (
            progress > 15 &&
            progress < 40 &&
            messageIndex === 0
        ) {
            status.textContent = messages[1];
            messageIndex = 1;
        }

        if (
            progress > 40 &&
            progress < 60 &&
            messageIndex === 1
        ) {
            status.textContent = messages[2];
            messageIndex = 2;
        }

        if (
            progress > 60 &&
            progress < 85 &&
            messageIndex === 2
        ) {
            status.textContent = messages[3];
            messageIndex = 3;
        }

        if (
            progress > 85 &&
            messageIndex === 3
        ) {
            status.textContent = messages[4];
            messageIndex = 4;
        }

        if (progress >= 100) {

            clearInterval(interval);

            status.textContent = "Access granted.";

            setTimeout(() => {
                loader.classList.add("hide");
            }, 500);

        }

    }, 120);

});