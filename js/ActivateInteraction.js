class ActivateInteraction extends Interaction {
    constructor(config) {
        super(config),
        this.sprite = new Sprite({
            spriteSheet: "../assets/interactions/default_anim_32x32.png",
            spriteData: "../assets/interactions/default_anim_32x32.json",
            offsetX: 0,
            offsetY: 22,
            useShadow: false,
            gameObject: config.gameObject
        })
    }

    preload() {
        console.log("loaded");
        this.sprite.preload();
    }

    activate(state) {
        this.sprite.currentAnimation = "idle";
        console.log(state.cameraPerson);
        this.sprite.draw(state.cameraPerson);
    }
}