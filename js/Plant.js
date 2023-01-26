class Plant extends UsableObject {
    constructor(config) {
        super(config),
        // Sprite overwrites
        this.sprite.animationSpeed = 0;
        this.sprite.currentAnimationFrame = 0;

        this.isAlive = config.isAlive || true,
        this.thirst = config.thirst || 1,

        // Interaction overwrites
        this.interaction = new WaterInteraction({
            x: config.interaction.x,
            y: config.interaction.y,
            type: config.interaction.type,
            accessibleFrom: config.interaction.accessibleFrom,
            spriteOffsetX: config.interaction.spriteOffsetX,
            spriteOffsetY: config.interaction.spriteOffsetY,
            spriteIsVisible: config.spriteIsVisible,
            gameObject: this,
        })

        // Decay happens every this.decayDelay frames
        this.decayDelay = config.decayDelay || 50
    }  

    update(state) {
        if (this.thirst > 5 && this.isAlive) {
            this.interaction.sprite.isVisible = true;
        } else {
            this.interaction.sprite.isVisible = false;
        }
        if (this.thirst === 10) {
            this.isAlive = false;
            this.interaction.sprite.isVisible = false;
            this.updateSprite();
            console.log("Plant died!")
        }

        // Decay thirst
        if (frameCount % this.decayDelay === 0 && this.thirst < 10) {
            this.decay();
        }

        // Update sprite on every second thirst
        if (frameCount % this.decayDelay === 0 && this.thirst < 10 && this.isAlive) {
            this.updateSprite();
            this.sprite.currentAnimationFrame = this.thirst;
        }

    }

    decay() {
        this.thirst++;
    }

    // water() {
    //     if (this.thirst > 0) {
    //         console.log(this.thirst);
    //         this.thirst--;
    //     }
    // }

    updateSprite() {
        if (this.isAlive) {
            this.sprite.currentAnimation = "standard";
        } else {
            this.sprite.animationSpeed = 10;
            this.sprite.currentAnimation = "dead";
        } 
    }
}