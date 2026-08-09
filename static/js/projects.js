/* =========================================
   PROJECTS PAGE
   Cyber Particle Network + Project Popup
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       CYBER PARTICLE BACKGROUND
    ===================================== */

    const canvas = document.getElementById("projectsCanvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let width;
        let height;

        let particles = [];

        const particleCount = 65;

        function resizeCanvas() {

            width = canvas.width =
                window.innerWidth * window.devicePixelRatio;

            height = canvas.height =
                window.innerHeight * window.devicePixelRatio;

            canvas.style.width =
                window.innerWidth + "px";

            canvas.style.height =
                window.innerHeight + "px";

            ctx.setTransform(
                window.devicePixelRatio,
                0,
                0,
                window.devicePixelRatio,
                0,
                0
            );

            width = window.innerWidth;
            height = window.innerHeight;
        }


        function createParticles() {

            particles = [];

            for (let i = 0; i < particleCount; i++) {

                particles.push({

                    x: Math.random() * width,

                    y: Math.random() * height,

                    vx:
                        (Math.random() - 0.5) * 0.25,

                    vy:
                        (Math.random() - 0.5) * 0.25,

                    size:
                        Math.random() * 2 + 0.5

                });

            }

        }


        function drawParticles() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* -----------------------------
               PARTICLES
            ----------------------------- */

            particles.forEach((particle) => {

                particle.x += particle.vx;
                particle.y += particle.vy;


                if (particle.x < 0)
                    particle.x = width;

                if (particle.x > width)
                    particle.x = 0;

                if (particle.y < 0)
                    particle.y = height;

                if (particle.y > height)
                    particle.y = 0;


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(0, 217, 255, 0.55)";

                ctx.fill();

            });


            /* -----------------------------
               CONNECTIONS
            ----------------------------- */

            for (
                let i = 0;
                i < particles.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const p1 = particles[i];
                    const p2 = particles[j];

                    const dx =
                        p1.x - p2.x;

                    const dy =
                        p1.y - p2.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (distance < 130) {

                        const opacity =
                            1 -
                            distance / 130;


                        ctx.beginPath();

                        ctx.moveTo(
                            p1.x,
                            p1.y
                        );

                        ctx.lineTo(
                            p2.x,
                            p2.y
                        );

                        ctx.strokeStyle =
                            `rgba(0, 217, 255, ${opacity * 0.12})`;

                        ctx.lineWidth = 1;

                        ctx.stroke();

                    }

                }

            }


            requestAnimationFrame(drawParticles);

        }


        resizeCanvas();

        createParticles();

        drawParticles();


        window.addEventListener(
            "resize",
            () => {

                resizeCanvas();

                createParticles();

            }
        );

    }



    /* =====================================
       PROJECT DATA
    ===================================== */

    const projects = {

        "face-lock": {

            number: "01",

            title: "Face Lock",

            description:
                "A face-recognition based application lock built using Python, Flask, OpenCV and face recognition. The project is designed to provide an additional authentication layer for applications.",

            images: [

                "/static/images/projects/Face%20Lock/f1.jpeg",

                "/static/images/projects/Face%20Lock/f2.jpeg",

                "/static/images/projects/Face%20Lock/f3.jpeg",

                "/static/images/projects/Face%20Lock/f4.jpeg",

                "/static/images/projects/Face%20Lock/f5.jpeg"

            ],

            tags: [

                "Python",
                "Flask",
                "OpenCV",
                "Face Recognition",
                "Linux"

            ]

        },


        "password-analyzer": {

            number: "02",

            title: "Password Analyzer",

            description:
                "A password security application designed to analyze password strength and provide security recommendations. It helps users understand password weaknesses and improve password security.",

            images: [

                "/static/images/projects/Password%20Analyzer/p1.jpeg",

                "/static/images/projects/Password%20Analyzer/p2.jpeg",

                "/static/images/projects/Password%20Analyzer/p3.jpeg",

                "/static/images/projects/Password%20Analyzer/p4.jpeg",

                "/static/images/projects/Password%20Analyzer/p5.jpeg"

            ],

            tags: [

                "Python",
                "Flask",
                "Security",
                "Password Analysis"

            ]

        }

    };



    /* =====================================
       MODAL ELEMENTS
    ===================================== */

    const modal =
        document.getElementById("projectModal");

    const modalBox =
        document.querySelector(".modal-box");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalNumber =
        document.getElementById("modalNumber");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalTags =
        document.getElementById("modalTags");

    const imageCounter =
        document.getElementById("imageCounter");

    const previousButton =
        document.getElementById("prevImage");

    const nextButton =
        document.getElementById("nextImage");



    /* =====================================
       CURRENT PROJECT
    ===================================== */

    let currentProject = null;

    let currentImage = 0;



    /* =====================================
       OPEN PROJECT
    ===================================== */

    function openProject(projectId) {

        const project =
            projects[projectId];

        if (!project) {

            console.error(
                "Project not found:",
                projectId
            );

            return;

        }


        currentProject = project;

        currentImage = 0;


        modalNumber.textContent =
            project.number;

        modalTitle.textContent =
            project.title;

        modalDescription.textContent =
            project.description;


        /* TAGS */

        modalTags.innerHTML = "";

        project.tags.forEach((tag) => {

            const span =
                document.createElement("span");

            span.textContent = tag;

            modalTags.appendChild(span);

        });


        updateImage();


        modal.classList.add("show");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }



    /* =====================================
       UPDATE IMAGE
    ===================================== */

    function updateImage() {

        if (!currentProject) {
            return;
        }


        const image =
            currentProject.images[currentImage];


        modalImage.src = image;


        modalImage.onerror = () => {

            console.error(
                "Image could not be loaded:",
                image
            );

        };


        imageCounter.textContent =
            `${currentImage + 1} / ${currentProject.images.length}`;

    }



    /* =====================================
       CLOSE PROJECT
    ===================================== */

    function closeProject() {

        modal.classList.remove("show");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );


        /* Clear image after animation */

        setTimeout(() => {

            if (!modal.classList.contains("show")) {

                modalImage.src = "";

            }

        }, 300);

    }



    /* =====================================
       NEXT IMAGE
    ===================================== */

    function nextImage() {

        if (!currentProject) {
            return;
        }


        currentImage++;

        if (
            currentImage >=
            currentProject.images.length
        ) {

            currentImage = 0;

        }


        updateImage();

    }



    /* =====================================
       PREVIOUS IMAGE
    ===================================== */

    function previousImage() {

        if (!currentProject) {
            return;
        }


        currentImage--;

        if (currentImage < 0) {

            currentImage =
                currentProject.images.length - 1;

        }


        updateImage();

    }



    /* =====================================
       VIEW PROJECT BUTTONS
    ===================================== */

    const viewButtons =
        document.querySelectorAll(
            ".view-project"
        );


    viewButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const projectId =
                    button.dataset.project;

                openProject(projectId);

            }
        );

    });



    /* =====================================
       CLOSE BUTTON
    ===================================== */

    modalClose.addEventListener(
        "click",
        closeProject
    );



    /* =====================================
       NEXT / PREVIOUS
    ===================================== */

    nextButton.addEventListener(
        "click",
        nextImage
    );


    previousButton.addEventListener(
        "click",
        previousImage
    );



    /* =====================================
       CLICK OUTSIDE POPUP
    ===================================== */

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeProject();

            }

        }
    );



    /* =====================================
       KEYBOARD CONTROLS
    ===================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !modal.classList.contains("show")
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeProject();

            }


            if (event.key === "ArrowRight") {

                nextImage();

            }


            if (event.key === "ArrowLeft") {

                previousImage();

            }

        }
    );

});