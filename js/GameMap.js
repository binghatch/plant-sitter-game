class GameMap {
    constructor(config) {
        this.gameObjects = config.gameObjects,

        this.lowerSrc = config.lowerSrc,
        this.lowerImage = config.null,

        this.upperSrc = config.upperSrc,
        this.upperImage = null
    }

    preload() {
        this.lowerImage = loadImage(this.lowerImage);
        this.upperImage = loadImage(this.upperSrc);
    }

    drawLowerImage() {
        image(this.lowerImage, 0, 0);
    }

    drawUpperImage() {
        image(this.upperImage, 0, 0);
    }
}