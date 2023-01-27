class Sprite {
    constructor(config) {
        // Spritesheet Data and Image
        this.spriteSheet = config.spriteSheet,
        this.spriteData = config.spriteData,
        this.image,
        this.isVisible = config.isVisible,

        // Sprite Offset
        this.offsetX = config.offsetX,
        this.offsetY = config.offsetY,

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
        this.currentAnimation = config.currentAnimation || "standard",
        this.currentAnimationFrame = config.currentAnimationFrame || 0,
        this.animationSpeed = config.animationSpeed;

        this.gameObject = config.gameObject
    }

    preload() {
        this.image = loadImage(this.spriteSheet);
        this.spriteData = loadJSON(this.spriteData);

        if (this.useShadow) {
            this.shadow = loadImage("./assets/characters/shadow.png");
        }
    }

    draw(cameraPerson, layer) {
        if (!this.isVisible) {
            return;
        }

        let x;
        let y;
        if (this.gameObject.isAbsolute) {
            x = this.gameObject.x;
            y = this.gameObject.y;
        } else {
            x = this.gameObject.x + utils.withGrid(11) - cameraPerson.x;
            y = this.gameObject.y + utils.withGrid(6) - cameraPerson.y;
        }

        // Draw Shadow
        if (this.useShadow) {
            image(this.shadow, x + this.offsetX, y + this.offsetY);
        }

        // Animate Sprite
        const frames = this.spriteData[this.currentAnimation];
        let frame;
        
        // Get coordinate set that corresponds to right layer
        if (layer) {
            frame = frames[this.currentAnimationFrame][layer];
        } else {
            frame = frames[this.currentAnimationFrame];
        }
        const currentImage = this.image.get(utils.withGrid(frame.x), utils.withGrid(frame.y), frame.w, frame.h);

        // If layer is lower layer, get height of upper layer and offset y by upper layer's height
        let layerOffset;
        (layer === "lower") ? layerOffset = frames[this.currentAnimationFrame]["upper"].h : layerOffset = 0;  
        
        image(currentImage, x + this.offsetX, y + this.offsetY + layerOffset);

        // Set Animation Speed
        if (this.animationSpeed > 0 && frameCount % this.animationSpeed === 0) {
            this.currentAnimationFrame++;
        } else {
            return;
        }
        
        // Reset Animation
        if (this.currentAnimationFrame === frames.length) {
            this.currentAnimationFrame = 0;
        }
    }
}