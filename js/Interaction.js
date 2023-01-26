class Interaction {
    constructor(config) {
        this.x = config.x,
        this.y = config.y,
        this.accessibleFrom = config.accessibleFrom || "up",
        this.type = config.type,
        this.gameObject = config.gameObject,
        this.sound = new Sound({
            soundSrc: config.soundSrc
        })
    }

    preload() {
        this.sprite && this.sprite.preload();
        this.sound && this.sound.preload();
    }

    activate() {

    }
}