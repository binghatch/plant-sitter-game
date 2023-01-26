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
            spriteOffsetX: config.interaction.spriteOffsetX,
            spriteOffsetY: config.interaction.spriteOffsetY,
            spriteIsVisible: config.spriteIsVisible,
            gameObject: this,
        })

        // Decay happens every this.decayDelay frames
        this.decayDelay = config.decayDelay || 50
    }  

    update(state) {
        if (this.thirst > 5) {
            this.interaction.sprite.isVisible = true;
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
        if (frameCount % this.decayDelay === 0 && this.thirst < 10) {
            this.updateSprite();
            this.sprite.currentAnimationFrame++;
        }

        // Water plant
        if (state.interaction === true) {
            console.log("interacted");
            this.water();
        }
    }

    decay() {
        this.thirst++;
    }

    water() {
        this.thirst--;
    }

    updateSprite() {
        if (this.isAlive) {
            this.sprite.currentAnimation = "standard";
        } else {
            this.sprite.animationSpeed = 10;
            this.sprite.currentAnimation = "dead";
        } 
    }
}