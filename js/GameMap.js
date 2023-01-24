class GameMap {
    constructor(config) {
        this.gameObjects = config.gameObjects,

        this.lowerSrc = config.lowerSrc,
        this.lowerImage = null,

        this.upperSrc = config.upperSrc,
        this.upperImage = null
    }

    preload() {
        this.lowerImage = loadImage(this.lowerSrc);
        this.upperImage = loadImage(this.upperSrc);
    }

    drawLowerImage(cameraPerson) {
        image(this.lowerImage, utils.withGrid(10) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(cameraPerson) {
        image(this.upperImage, utils.withGrid(10) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
}

window.GameMaps = {
    Office: {
        lowerSrc: "../assets/maps/office-lower.png",
        upperSrc: "../assets/maps/office-upper.png",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(4),
                sprite: {
                    spriteSheet: "../assets/characters/Bob_anim_16x16.png",
                    spriteData: "../assets/characters/Bob_anim_16x16.json"
                },
                useShadow: true
            })
        }
    }
}