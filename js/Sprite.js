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
            idleDown: [
                [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]
            ]
        },
        this.currentAnimation = config.currentAnimation || "idleDown",
        this.currentAnimationFrame = 0,

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
            image(this.shadow, x * 16 - 8, y * 16 - 19);
        }
        const crop = this.image.get(0, 0, 32, 32);

        image(crop, x * 16 - 8, y * 16 - 18);
    }
}