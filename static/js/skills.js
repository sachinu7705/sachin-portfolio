console.log("Skills page loaded.");/* =========================================
   CONTACT PAGE
   DIGITAL MATRIX ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("contactCanvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let columns;
    let drops;

    const fontSize = 15;

    const characters =
        "01ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "{}[]<>/\\|$#@%&*+-=_:";


    /* =====================================
       RESIZE
    ===================================== */

    function resize() {

        const dpr =
            window.devicePixelRatio || 1;

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        columns =
            Math.floor(
                width / fontSize
            );

        drops = [];

        for (
            let i = 0;
            i < columns;
            i++
        ) {

            drops[i] =
                Math.random() *
                -100;
        }
    }


    /* =====================================
       MATRIX DRAW
    ===================================== */

    function draw() {

        /*
         * Slight transparent black layer.
         * This creates the long fading trails.
         */

        ctx.fillStyle =
            "rgba(2, 4, 4, 0.075)";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        ctx.font =
            fontSize +
            "px monospace";


        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const character =
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];


            const x =
                i * fontSize;

            const y =
                drops[i] *
                fontSize;


            /*
             * Occasional brighter character
             */

            if (
                Math.random() < 0.025
            ) {

                ctx.fillStyle =
                    "rgba(170,255,220,0.9)";

            } else {

                ctx.fillStyle =
                    "rgba(0,255,149,0.38)";
            }


            ctx.fillText(
                character,
                x,
                y
            );


            /*
             * Reset column after it
             * reaches the bottom.
             */

            if (
                y > height &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;
            }


            /*
             * Different falling speeds
             */

            drops[i] +=
                0.35 +
                Math.random() * 0.35;
        }


        requestAnimationFrame(draw);
    }


    /* =====================================
       START
    ===================================== */

    resize();

    draw();


    /* =====================================
       WINDOW RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        resize
    );

});