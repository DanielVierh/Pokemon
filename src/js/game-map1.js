const canvas = document.getElementById('canvas');


if (canvas) {
    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = './assets/main-map2.png';

    const playerImage = new Image();
    playerImage.src = './assets/playerDown.png';

    class Sprite {
        constructor({position, velocity, image}) {
            this.position = position;
            this.image = image;
        }

        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }

    const background = new Sprite({
        position: {
            x: 10,
            y: -400,
        },
        image: image,
    });

    const keys = {
        w: {
            pressed: false,
        },
        a: {
            pressed: false,
        },
        s: {
            pressed: false,
        },
        d: {
            pressed: false,
        },
    };

    // Animation loop
    function animate() {
        window.requestAnimationFrame(animate);

        // Draw Methods
        background.draw();

        ctx.drawImage(
            playerImage,
            0,
            0,
            playerImage.width / 3,
            playerImage.height,
            canvas.width / 2 - playerImage.width / 3,
            canvas.height / 2 - playerImage.height / 2,
            playerImage.width / 3,
            playerImage.height,
        );

        if(keys.w.pressed) background.position.y += 3
        else if(keys.a.pressed) background.position.x += 3
        else if(keys.s.pressed) background.position.y -= 3
        else if(keys.d.pressed) background.position.x -= 3

    }

    animate();

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                break;
            case 's':
                keys.s.pressed = true;
                break;
            case 'd':
                keys.d.pressed = true;
                break;

            default:
                break;
        }
    });

    ////////////////////////////////////////////////////////
    // Klasse um gedrückte Taste triggern
    class ClickAndHold {
        constructor(EventTarget, callback) {
            this.EventTarget = EventTarget;
            this.callback = callback;
            this.isHeld = false;
            this.activeHoldTimeoutId = null;

            ["mousedown", "touchstart"].forEach(type => {
                this.EventTarget.addEventListener(type, this._onHoldStart.bind(this))
            });

            ["mouseup", "mouseleave", "mouseout", "touchend", "touchcancel"].forEach(type => {
                this.EventTarget.addEventListener(type, this._onHoldEnd.bind(this))
            });
        }

        _onHoldStart() {
            this.isHeld = true;

            this.activeHoldTimeoutId = setTimeout(() => {
                if (this.isHeld) {
                    this.callback();
                }
            }, 200);
        }

        _onHoldEnd() {
            this.isHeld = false;
            clearTimeout(this.activeHoldTimeoutId)
            keys.w.pressed = false;
            keys.a.pressed = false;
            keys.s.pressed = false;
            keys.d.pressed = false;
        }
    }

    const upBtn = document.getElementById('up');
    const leftBtn = document.getElementById('left');
    const downBtn = document.getElementById('down');
    const rightBtn = document.getElementById('right');

    new ClickAndHold(upBtn, () => {
        keys.w.pressed = true;
    })
    new ClickAndHold(leftBtn, () => {
        keys.a.pressed = true;
    })
    new ClickAndHold(downBtn, () => {
        keys.s.pressed = true;
    })
    new ClickAndHold(rightBtn, () => {
        keys.d.pressed = true;
    })

    ////////////////////////////////////////////////////////

    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
            case 's':
                keys.s.pressed = false;
                break;
            case 'd':
                keys.d.pressed = false;
                break;

            default:
                break;
        }
    });
}
