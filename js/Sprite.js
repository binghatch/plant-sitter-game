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
            ]
        },
        this.currentAnimation = config.currentAnimation || "idleDown",
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

    draw() {
        const x = this.gameObject.x;
        const y = this.gameObject.y;

        // Draw Shadow
        if (this.useShadow) {
            image(this.shadow, x - 8, y - 19);
        }

        // Animate Sprite
        const animationFrames = this.animations[this.currentAnimation];
        const [frameX, frameY] = animationFrames[this.currentAnimationFrame];
        const frame = this.image.get(animationFrames[frameX][0] * 32, animationFrames[frameY][1] * 32, 32, 32);
        image(frame, x - 8, y - 18);

        // Set Animation Speed
        if (frameCount % this.animationSpeed === 0) {
            this.currentAnimationFrame++;
        }
        
        // Reset Animation
        if (this.currentAnimationFrame === animationFrames.length - 1) {
            this.currentAnimationFrame = 0;
        }

        // const crop = this.image.get(0, 0, 32, 32);

        // image(crop, x - 8, y - 18);
    }
}