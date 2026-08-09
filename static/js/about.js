/* =========================================
   ABOUT PAGE JAVASCRIPT
   CYBER BACKGROUND + CARD ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       FACT CARD ANIMATION
    ========================================= */

    const facts =
        document.querySelectorAll(".fact");


    facts.forEach((fact, index) => {

        fact.style.opacity = "0";

        fact.style.transform =
            "translateY(25px)";


        setTimeout(() => {

            fact.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            fact.style.opacity = "1";

            fact.style.transform =
                "translateY(0)";

        }, 150 * index);

    });



    /* =========================================
       CYBER CANVAS
    ========================================= */

    const canvas =
        document.getElementById("cyberCanvas");


    if (!canvas) {

        console.error(
            "cyberCanvas not found!"
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    let width = 0;

    let height = 0;


    /* =========================================
       SETTINGS
    ========================================= */

    const PARTICLE_COUNT = 100;

    const MAX_DISTANCE = 180;


    let particles = [];



    /* =========================================
       RESIZE CANVAS
    ========================================= */

    function resizeCanvas() {

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        width =
            window.innerWidth;

        height =
            window.innerHeight;


        canvas.width =
            width * pixelRatio;

        canvas.height =
            height * pixelRatio;


        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );


        createParticles();
    }



    /* =========================================
       CREATE PARTICLES
    ========================================= */

    function createParticles() {

        particles = [];


        for (
            let i = 0;
            i < PARTICLE_COUNT;
            i++
        ) {

            particles.push({

                x:
                    Math.random() * width,

                y:
                    Math.random() * height,

                vx:
                    (Math.random() - 0.5)
                    * 0.45,

                vy:
                    (Math.random() - 0.5)
                    * 0.45,

                size:
                    Math.random() * 2
                    + 0.5,

                opacity:
                    Math.random() * 0.55
                    + 0.2

            });

        }

    }



    /* =========================================
       UPDATE PARTICLES
    ========================================= */

    function updateParticles() {

        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                /* Bounce horizontally */

                if (
                    particle.x < 0 ||
                    particle.x > width
                ) {

                    particle.vx *= -1;
                }


                /* Bounce vertically */

                if (
                    particle.y < 0 ||
                    particle.y > height
                ) {

                    particle.vy *= -1;
                }

            }
        );

    }



    /* =========================================
       DRAW BACKGROUND
    ========================================= */

    function drawBackground() {

        /* Dark background */

        ctx.fillStyle =
            "#020506";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* Green center glow */

        const glow =
            ctx.createRadialGradient(

                width * 0.5,
                height * 0.45,
                0,

                width * 0.5,
                height * 0.45,

                Math.max(
                    width,
                    height
                ) * 0.75
            );


        glow.addColorStop(
            0,
            "rgba(0, 255, 149, 0.12)"
        );


        glow.addColorStop(
            0.35,
            "rgba(0, 255, 149, 0.045)"
        );


        glow.addColorStop(
            0.7,
            "rgba(0, 255, 149, 0.015)"
        );


        glow.addColorStop(
            1,
            "rgba(0, 0, 0, 0)"
        );


        ctx.fillStyle =
            glow;


        ctx.fillRect(
            0,
            0,
            width,
            height
        );

    }



    /* =========================================
       DRAW CYBER GRID
    ========================================= */

    function drawGrid() {

        const gridSize = 70;


        ctx.lineWidth = 0.5;


        ctx.strokeStyle =
            "rgba(0, 255, 149, 0.07)";


        /* Vertical lines */

        for (
            let x = 0;
            x < width;
            x += gridSize
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x,
                0
            );

            ctx.lineTo(
                x,
                height
            );

            ctx.stroke();

        }


        /* Horizontal lines */

        for (
            let y = 0;
            y < height;
            y += gridSize
        ) {

            ctx.beginPath();

            ctx.moveTo(
                0,
                y
            );

            ctx.lineTo(
                width,
                y
            );

            ctx.stroke();

        }

    }



    /* =========================================
       DRAW CONNECTIONS
    ========================================= */

    function drawConnections() {

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

                const p1 =
                    particles[i];

                const p2 =
                    particles[j];


                const dx =
                    p1.x - p2.x;


                const dy =
                    p1.y - p2.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    MAX_DISTANCE
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            MAX_DISTANCE
                        ) * 0.32;


                    ctx.beginPath();


                    ctx.strokeStyle =
                        `rgba(
                            0,
                            255,
                            149,
                            ${opacity}
                        )`;


                    ctx.lineWidth =
                        0.7;


                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );


                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );


                    ctx.stroke();

                }

            }

        }

    }



    /* =========================================
       DRAW PARTICLES
    ========================================= */

    function drawParticles() {

        particles.forEach(
            particle => {

                ctx.beginPath();


                ctx.arc(

                    particle.x,

                    particle.y,

                    particle.size,

                    0,

                    Math.PI * 2

                );


                ctx.fillStyle =
                    `rgba(
                        0,
                        255,
                        149,
                        ${particle.opacity}
                    )`;


                ctx.shadowBlur = 12;


                ctx.shadowColor =
                    "rgba(0, 255, 149, 0.8)";


                ctx.fill();


                ctx.shadowBlur = 0;

            }
        );

    }



    /* =========================================
       EXTRA MOVING SCAN LINE
    ========================================= */

    let scanY = 0;


    function drawScanLine() {

        scanY += 0.35;


        if (
            scanY > height + 100
        ) {

            scanY = -100;
        }


        const gradient =
            ctx.createLinearGradient(

                0,
                scanY - 30,

                0,
                scanY + 30
            );


        gradient.addColorStop(
            0,
            "rgba(0,255,149,0)"
        );


        gradient.addColorStop(
            0.5,
            "rgba(0,255,149,0.035)"
        );


        gradient.addColorStop(
            1,
            "rgba(0,255,149,0)"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            scanY - 30,
            width,
            60
        );

    }



    /* =========================================
       ANIMATION LOOP
    ========================================= */

    function animate() {

        drawBackground();

        drawGrid();

        updateParticles();

        drawConnections();

        drawParticles();

        drawScanLine();


        requestAnimationFrame(
            animate
        );

    }



    /* =========================================
       START
    ========================================= */

    resizeCanvas();

    animate();



    /* =========================================
       RESIZE EVENT
    ========================================= */

    window.addEventListener(
        "resize",
        resizeCanvas
    );

});