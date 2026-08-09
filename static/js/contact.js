/* =========================================
   CONTACT PAGE
   CYBER RADAR BACKGROUND
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("contactCanvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let centerX;
    let centerY;

    let radius;

    let angle = 0;

    let pulses = [];


    /* =====================================
       RESIZE
    ===================================== */

    function resize() {

        const dpr = window.devicePixelRatio || 1;

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        centerX = width * 0.75;
        centerY = height * 0.55;

        radius = Math.min(
            width,
            height
        ) * 0.32;
    }


    /* =====================================
       RANDOM RADAR PULSES
    ===================================== */

    function createPulse() {

        const a =
            Math.random() *
            Math.PI *
            2;

        const distance =
            Math.random() *
            radius;

        pulses.push({

            x:
                centerX +
                Math.cos(a) *
                distance,

            y:
                centerY +
                Math.sin(a) *
                distance,

            size: 1,

            opacity: 1

        });
    }


    /* =====================================
       DRAW RADAR
    ===================================== */

    function drawRadar() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* =================================
           RADAR POSITION
        ================================= */

        ctx.save();

        ctx.translate(
            centerX,
            centerY
        );


        /* =================================
           OUTER GLOW
        ================================= */

        const glow =
            ctx.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                radius
            );

        glow.addColorStop(
            0,
            "rgba(0,255,149,0.06)"
        );

        glow.addColorStop(
            0.55,
            "rgba(0,255,149,0.025)"
        );

        glow.addColorStop(
            1,
            "rgba(0,255,149,0)"
        );

        ctx.fillStyle = glow;

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* =================================
           RADAR RINGS
        ================================= */

        const rings = 5;

        for (
            let i = 1;
            i <= rings;
            i++
        ) {

            const ringRadius =
                radius *
                (i / rings);

            ctx.beginPath();

            ctx.arc(
                0,
                0,
                ringRadius,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(0,255,149,0.12)";

            ctx.lineWidth = 1;

            ctx.stroke();
        }


        /* =================================
           CROSSHAIR
        ================================= */

        ctx.beginPath();

        ctx.moveTo(
            -radius,
            0
        );

        ctx.lineTo(
            radius,
            0
        );

        ctx.moveTo(
            0,
            -radius
        );

        ctx.lineTo(
            0,
            radius
        );

        ctx.strokeStyle =
            "rgba(0,255,149,0.08)";

        ctx.lineWidth = 1;

        ctx.stroke();


        /* =================================
           ROTATING SCANNER
        ================================= */

        const scannerLength =
            radius;

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                Math.cos(angle) *
                    scannerLength,
                Math.sin(angle) *
                    scannerLength
            );

        gradient.addColorStop(
            0,
            "rgba(0,255,149,0.55)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,255,149,0)"
        );


        /* SCANNER LINE */

        ctx.beginPath();

        ctx.moveTo(
            0,
            0
        );

        ctx.lineTo(
            Math.cos(angle) *
                scannerLength,

            Math.sin(angle) *
                scannerLength
        );

        ctx.strokeStyle =
            gradient;

        ctx.lineWidth = 2;

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "rgba(0,255,149,0.7)";

        ctx.stroke();

        ctx.shadowBlur = 0;


        /* =================================
           SCANNER FAN
        ================================= */

        const spread = 0.18;

        ctx.beginPath();

        ctx.moveTo(
            0,
            0
        );

        ctx.arc(
            0,
            0,
            radius,
            angle - spread,
            angle
        );

        ctx.closePath();

        const fanGradient =
            ctx.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                radius
            );

        fanGradient.addColorStop(
            0,
            "rgba(0,255,149,0.12)"
        );

        fanGradient.addColorStop(
            1,
            "rgba(0,255,149,0)"
        );

        ctx.fillStyle =
            fanGradient;

        ctx.fill();


        /* =================================
           CENTER
        ================================= */

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#00ff95";

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "#00ff95";

        ctx.fill();

        ctx.shadowBlur = 0;


        ctx.restore();


        /* =================================
           RADAR TARGETS
        ================================= */

        if (
            Math.random() < 0.025
        ) {

            createPulse();

        }


        pulses.forEach(
            pulse => {

                pulse.size += 0.5;

                pulse.opacity -= 0.012;

                ctx.beginPath();

                ctx.arc(
                    pulse.x,
                    pulse.y,
                    pulse.size,
                    0,
                    Math.PI * 2
                );

                ctx.strokeStyle =
                    `rgba(
                        0,
                        255,
                        149,
                        ${pulse.opacity}
                    )`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }
        );


        pulses =
            pulses.filter(
                pulse =>
                    pulse.opacity > 0
            );


        /* =================================
           UPDATE
        ================================= */

        angle += 0.008;

        requestAnimationFrame(
            drawRadar
        );
    }


    /* =====================================
       START
    ===================================== */

    resize();

    drawRadar();


    /* =====================================
       WINDOW RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        resize
    );

});