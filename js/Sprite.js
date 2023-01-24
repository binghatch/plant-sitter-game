class Sprite {
    constructor(config) {
        // Spritesheet Data and Image
        this.spriteSheet = config.spriteSheet,
        this.spriteData = config.spriteData,
        this.image = null,

        // Shadow
        this.shadow = null,
        this.useShadow = config.useShadow || false;

        // Animation
        this.animations = config.animations || {
            idleRight: [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]
            ],
            idleUp: [
                [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]
            ],
            idleLeft: [
                [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]
            ],
            idleDown: [
                [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]
            ],
            runRight: [
                [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4]
            ],
            runUp: [
                [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]
            ],
            runLeft: [
                [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
            ],
            runDown: [
                [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]
            ]
        },
        this.currentAnimation = config.currentAnimation || "idleRight",
        this.currentAnimationFrame = 0,
        this.animationSpeed = 10;

        this.gameObject = config.gameObject
    }

    preload() {
        this.image = loadImage(this.spriteSheet);

        if (this.useShadow) {
            this.shadow = loadImage("../assets/characters/shadow.png");
        }
    }

    draw(cameraPerson) {
        const x = this.gameObject.x + utils.withGrid(11) - cameraPerson.x;
        const y = this.gameObject.y + utils.withGrid(6) - cameraPerson.y;

        // Draw Shadow
        if (this.useShadow) {
            image(this.shadow, x - 8, y - 19);
        }

        // Animate Sprite
        const animationFrames = this.animations[this.currentAnimation];
        const [frameX, frameY] = animationFrames[this.currentAnimationFrame];
        const frame = this.image.get(frameX * 32, frameY * 32, 32, 32);
        image(frame, x - 8, y - 18);

        // Set Animation Speed
        if (frameCount % this.animationSpeed === 0) {
            this.currentAnimationFrame++;
        }
        
        // Reset Animation
        if (this.currentAnimationFrame === animationFrames.length) {
            this.currentAnimationFrame = 0;
        }
    }
}