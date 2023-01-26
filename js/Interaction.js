class Interaction {
    constructor(config) {
        this.x = config.x,
        this.y = config.y,
        this.accessibleFrom = config.accessibleFrom || "up",
        this.type = config.type,
        this.gameObject = config.gameObject
    }

    activate() {

    }
}