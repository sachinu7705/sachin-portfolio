document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CERTIFICATE MODAL
    ========================================= */

    const modal =
        document.getElementById("certificateModal");

    const modalImage =
        document.getElementById("modalImage");

    const closeButton =
        document.getElementById("closeButton");

    const viewButtons =
        document.querySelectorAll(".view-button");


    if (
        !modal ||
        !modalImage ||
        !closeButton
    ) {
        return;
    }


    /* =========================================
       OPEN CERTIFICATE
    ========================================= */

    viewButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const image =
                button.getAttribute("data-image");

            if (!image) {
                return;
            }

            modalImage.src = image;

            modal.classList.add("show");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        });

    });


    /* =========================================
       CLOSE
    ========================================= */

    function closeCertificate() {

        modal.classList.remove("show");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        setTimeout(() => {

            modalImage.src = "";

        }, 200);

        document.body.style.overflow = "";

    }


    closeButton.addEventListener(
        "click",
        closeCertificate
    );


    /* =========================================
       CLICK OUTSIDE
    ========================================= */

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeCertificate();

            }

        }
    );


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeCertificate();

            }

        }
    );


    /* =========================================
       CYBER PARTICLE BACKGROUND
    ========================================= */

    const canvas =
        document.getElementById("cyberCanvas");

    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    let width;
    let height;

    let particles = [];

    const particleCount = 65;


    /* =========================================
       RESIZE
    ========================================= */

    function resizeCanvas() {

        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();


    /* =========================================
       PARTICLE
    ========================================= */

    class Particle {

        constructor() {

            this.x =
                Math.random() * width;

            this.y =
                Math.random() * height;

            this.size =
                Math.random() * 2 + 0.5;

            this.speedX =
                (Math.random() - 0.5) * 0.35;

            this.speedY =
                (Math.random() - 0.5) * 0.35;

            this.alpha =
                Math.random() * 0.5 + 0.15;

        }


        update() {

            this.x += this.speedX;

            this.y += this.speedY;


            if (this.x < 0)
                this.x = width;

            if (this.x > width)
                this.x = 0;

            if (this.y < 0)
                this.y = height;

            if (this.y > height)
                this.y = 0;

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0,255,149,${this.alpha})`;

            ctx.fill();

        }

    }


    /* =========================================
       CREATE PARTICLES
    ========================================= */

    function createParticles() {

        particles = [];

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    createParticles();


    /* =========================================
       CONNECT PARTICLES
    ========================================= */

    function connectParticles() {

        const maxDistance = 135;

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

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    maxDistance
                ) {

                    const opacity =
                        1 -
                        distance /
                        maxDistance;


                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle =
                        `rgba(
                            0,
                            255,
                            149,
                            ${opacity * 0.12}
                        )`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }

    }


    /* =========================================
       ANIMATION
    ========================================= */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(
            (particle) => {

                particle.update();

                particle.draw();

            }
        );


        connectParticles();


        requestAnimationFrame(
            animate
        );

    }


    animate();

});