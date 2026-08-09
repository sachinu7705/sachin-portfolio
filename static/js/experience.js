/* =========================================
   EXPERIENCE PAGE
   3D CYBER CORE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       EXPERIENCE CARD REVEAL
    ===================================== */

    const cards = document.querySelectorAll(".experience-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform =
            "translateY(25px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, 180 + index * 150);

    });


    /* =====================================
       CREATE CANVAS
    ===================================== */

    const canvas =
        document.createElement("canvas");

    canvas.id = "cyberCoreCanvas";

    document.body.prepend(canvas);

    const ctx =
        canvas.getContext("2d");


    let width;
    let height;

    function resize() {

        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;

    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );


    /* =====================================
       ANIMATION VALUES
    ===================================== */

    let rotation = 0;

    let pulse = 0;

    let mouseX = 0;

    let mouseY = 0;

    let targetMouseX = 0;

    let targetMouseY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            targetMouseX =
                (event.clientX / width - 0.5);

            targetMouseY =
                (event.clientY / height - 0.5);

        }
    );


    /* =====================================
       CYBER CORE POSITION
    ===================================== */

    function getCenter() {

        return {

            x:
                width * 0.73 +
                mouseX * 20,

            y:
                height * 0.52 +
                mouseY * 15

        };

    }


    /* =====================================
       DRAW CIRCUIT
    ===================================== */

    function drawCircuit(
        centerX,
        centerY,
        angle,
        length,
        pulseOffset
    ) {

        const cos =
            Math.cos(angle);

        const sin =
            Math.sin(angle);


        const startX =
            centerX + cos * 80;

        const startY =
            centerY + sin * 80;


        const midX =
            centerX + cos * 150;

        const midY =
            centerY + sin * 150;


        const endX =
            centerX + cos * length;

        const endY =
            centerY + sin * length;


        /* Main circuit */

        ctx.beginPath();

        ctx.moveTo(
            startX,
            startY
        );

        ctx.lineTo(
            midX,
            midY
        );

        ctx.lineTo(
            endX,
            endY
        );

        ctx.strokeStyle =
            "rgba(0,255,149,0.15)";

        ctx.lineWidth = 1;

        ctx.stroke();


        /* Circuit branch */

        const branchX =
            midX - sin * 28;

        const branchY =
            midY + cos * 28;


        ctx.beginPath();

        ctx.moveTo(
            midX,
            midY
        );

        ctx.lineTo(
            branchX,
            branchY
        );

        ctx.lineTo(
            branchX - cos * 35,
            branchY - sin * 35
        );

        ctx.strokeStyle =
            "rgba(0,255,149,0.10)";

        ctx.stroke();


        /* End node */

        ctx.beginPath();

        ctx.arc(
            endX,
            endY,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#00ff95";

        ctx.shadowBlur = 14;

        ctx.shadowColor =
            "#00ff95";

        ctx.fill();

        ctx.shadowBlur = 0;


        /* Moving data pulse */

        const progress =
            (pulse + pulseOffset) % 1;


        const px =
            startX +
            (endX - startX) *
            progress;

        const py =
            startY +
            (endY - startY) *
            progress;


        ctx.beginPath();

        ctx.arc(
            px,
            py,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#ffffff";

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "#00ff95";

        ctx.fill();

        ctx.shadowBlur = 0;

    }


    /* =====================================
       DRAW HEXAGON
    ===================================== */

    function drawHexagon(
        centerX,
        centerY,
        radius,
        rotationAngle,
        opacity
    ) {

        ctx.beginPath();


        for (let i = 0; i <= 6; i++) {

            const angle =
                rotationAngle +
                i * Math.PI / 3;


            const x =
                centerX +
                Math.cos(angle) *
                radius;

            const y =
                centerY +
                Math.sin(angle) *
                radius;


            if (i === 0) {

                ctx.moveTo(x, y);

            } else {

                ctx.lineTo(x, y);

            }

        }


        ctx.closePath();


        ctx.strokeStyle =
            `rgba(0,255,149,${opacity})`;

        ctx.lineWidth = 1.5;

        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "rgba(0,255,149,0.4)";

        ctx.stroke();

        ctx.shadowBlur = 0;

    }


    /* =====================================
       DRAW CORE
    ===================================== */

    function drawCore() {

        const center =
            getCenter();

        const cx =
            center.x;

        const cy =
            center.y;


        /* Outer glow */

        const glow =
            ctx.createRadialGradient(
                cx,
                cy,
                10,
                cx,
                cy,
                260
            );


        glow.addColorStop(
            0,
            "rgba(0,255,149,0.09)"
        );

        glow.addColorStop(
            0.4,
            "rgba(0,255,149,0.035)"
        );

        glow.addColorStop(
            1,
            "rgba(0,255,149,0)"
        );


        ctx.fillStyle =
            glow;

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            260,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* Outer hexagons */

        drawHexagon(
            cx,
            cy,
            210,
            rotation * 0.25,
            0.08
        );


        drawHexagon(
            cx,
            cy,
            170,
            -rotation * 0.35,
            0.12
        );


        drawHexagon(
            cx,
            cy,
            125,
            rotation * 0.55,
            0.20
        );


        /* Inner hexagon */

        drawHexagon(
            cx,
            cy,
            78,
            -rotation,
            0.45
        );


        /* Circuit arms */

        const arms = 8;


        for (let i = 0; i < arms; i++) {

            const angle =
                rotation * 0.15 +
                i *
                (Math.PI * 2 / arms);


            drawCircuit(
                cx,
                cy,
                angle,
                220 + (i % 3) * 35,
                i * 0.11
            );

        }


        /* Central core */

        const coreGradient =
            ctx.createRadialGradient(
                cx - 10,
                cy - 10,
                2,
                cx,
                cy,
                55
            );


        coreGradient.addColorStop(
            0,
            "rgba(255,255,255,0.9)"
        );

        coreGradient.addColorStop(
            0.08,
            "rgba(0,255,149,0.9)"
        );

        coreGradient.addColorStop(
            0.35,
            "rgba(0,255,149,0.25)"
        );

        coreGradient.addColorStop(
            1,
            "rgba(0,255,149,0)"
        );


        ctx.fillStyle =
            coreGradient;

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            58,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* Core ring */

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            42,
            rotation,
            rotation +
            Math.PI * 1.55
        );

        ctx.strokeStyle =
            "rgba(0,255,149,0.8)";

        ctx.lineWidth = 2;

        ctx.stroke();


        /* Core center */

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            9 + Math.sin(pulse * 10) * 2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#00ff95";

        ctx.shadowBlur = 25;

        ctx.shadowColor =
            "#00ff95";

        ctx.fill();

        ctx.shadowBlur = 0;


        /* Center cross */

        ctx.beginPath();

        ctx.moveTo(cx - 20, cy);
        ctx.lineTo(cx + 20, cy);

        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx, cy + 20);

        ctx.strokeStyle =
            "rgba(255,255,255,0.25)";

        ctx.lineWidth = 1;

        ctx.stroke();

    }


    /* =====================================
       SMALL HUD TEXT
    ===================================== */

    function drawHUDText() {

        const center =
            getCenter();

        const x =
            center.x;

        const y =
            center.y;


        ctx.save();

        ctx.font =
            "10px monospace";

        ctx.fillStyle =
            "rgba(0,255,149,0.35)";


        ctx.fillText(
            "SECURITY_CORE",
            x - 42,
            y + 115
        );


        ctx.fillText(
            "SYSTEM_ACTIVE",
            x - 42,
            y + 132
        );


        ctx.fillText(
            "ENCRYPTED",
            x - 42,
            y + 149
        );


        ctx.restore();

    }


    /* =====================================
       MAIN ANIMATION
    ===================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* Smooth mouse movement */

        mouseX +=
            (targetMouseX - mouseX) *
            0.04;

        mouseY +=
            (targetMouseY - mouseY) *
            0.04;


        rotation += 0.004;

        pulse += 0.006;


        drawCore();

        drawHUDText();


        requestAnimationFrame(
            animate
        );

    }


    animate();

});