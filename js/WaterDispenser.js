class WaterDispenser extends UsableObject {
    constructor(config) {
        super(config),
        // Sprite overwrites
        this.sprite.animationSpeed = 10;
        this.sprite.currentAnimationFrame = 0;

        // Interaction overwrites
        this.interaction = new DispenseInteraction({
            x: config.interaction.x,
            y: config.interaction.y,
            type: config.interaction.type,
            accessibleFrom: config.interaction.accessibleFrom,
            spriteOffsetX: config.interaction.spriteOffsetX,
            spriteOffsetY: config.interaction.spriteOffsetY,
            spriteIsVisible: config.spriteIsVisible,
            gameObject: this,
        })
    }  

    update(state) {

    }

    updateSprite() {
        
    }
}