class DispenseInteraction extends Interaction {
    constructor(config) {
        super(config),
        this.sprite = new Sprite({
            spriteSheet: "../assets/interactions/default_anim_32x32.png",
            spriteData: "../assets/interactions/default_anim_32x32.json",
            offsetX: config.spriteOffsetX,
            offsetY: config.spriteOffsetY,
            isVisible: config.spriteIsVisible,
            animationSpeed: 10,
            currentAnimationFrame: 0,
            useShadow: false,
            gameObject: config.gameObject
        })
    }

    preload() {
        this.sprite.preload();
    }

    activate(state) {
        this.sprite.currentAnimation = "standard";
        this.sprite.draw(state.cameraPerson);
    }

    trigger(player) {
        if (player.carriedWater < 20) {
            player.carriedWater = 20;
        }
    }
}