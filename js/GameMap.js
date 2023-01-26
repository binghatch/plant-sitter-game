class GameMap {
    constructor(config) {
        this.gameObjects = config.gameObjects,

        this.walls = config.walls,
        this.interactions = config.interactions,

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
        image(this.lowerImage, utils.withGrid(11) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(cameraPerson) {
        image(this.upperImage, utils.withGrid(11) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return (this.walls[utils.asGridCoord(x, y)]) || false;
    }

    isInteractiveTile(currentX, currentY) {
        return (utils.asGridCoord(currentX, currentY) in this.interactions) || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(object => {
            object.mount(this);
        })
    }

    addWall(x, y) {
        this.walls[`${x}, ${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x}, ${y}`];
    }

    addInteraction(interaction) {
        const {relativeX, relativeY} = utils.relativePosition(interaction.x, interaction.y, interaction.gameObject);
        this.interactions[utils.asGridCoord(utils.pixelsToCoord(relativeX), utils.pixelsToCoord(relativeY))] = {
            type: interaction.type,
            interaction: interaction,
            gameObject: interaction.gameObject
        }
    }

    removeInteraction(interaction) {
        delete this.interactions[utils.asGridCoord(interaction.x, interaction.y)];
    }  
}

window.GameMaps = {
    Office: {
        lowerSrc: "../assets/maps/office-lower.png",
        upperSrc: "../assets/maps/office-upper.png",
        gameObjects: {
            vendingMachine: new UsableObject({
                x: utils.withGrid(11),
                y: utils.withGrid(5),
                sprite: {
                    spriteSheet: "../assets/objects/vending_machine_32x48.png",
                    spriteData: "../assets/objects/vending_machine_32x48.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(1),
                        y: utils.withGrid(2),
                        type: "activate",
                        spriteOffsetX: -0,
                        spriteOffsetY: -22
                    },
                walls: [
                    {
                        x: utils.withGrid(0),
                        y: utils.withGrid(1)
                    },
                    {
                        x: utils.withGrid(1),
                        y: utils.withGrid(1)
                    }
                ]
            }),
            waterDispenser: new UsableObject({
                x: utils.withGrid(2),
                y: utils.withGrid(5),
                sprite: {
                    spriteSheet: "../assets/objects/Sprite-0010.png",
                    spriteData: "../assets/objects/Sprite-0010.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(0),
                        y: utils.withGrid(2),
                        type: "activate",
                        spriteOffsetX: -8,
                        spriteOffsetY: -22
                    },
                walls: [
                    {
                        x: utils.withGrid(0),
                        y: utils.withGrid(1)
                    }
                ]
            }),
            plant: new Plant({
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                sprite: {
                    spriteSheet: "../assets/objects/plants/plant_01_16x32.png",
                    spriteData: "../assets/objects/plants/plant_01_16x32.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(0),
                        y: utils.withGrid(2),
                        type: "activate",
                        spriteOffsetX: -1,
                        spriteOffsetY: -16,
                        spriteIsVisible: false
                    },
                walls: [
                    {
                        x: utils.withGrid(0),
                        y: utils.withGrid(1)
                    }
                ]
            }),
            hero: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(4),
                sprite: {
                    spriteSheet: "../assets/characters/Bob_anim_32x32.png",
                    spriteData: "../assets/characters/Bob_anim_32x32.json",
                    useShadow: true,
                    offsetX: -8,
                    offsetY: -18
                },
                isPlayerControlled: true
            })
        },
        interactions: {

        },
        walls: {
            // Outer Walls
            "0, 0": true,
            "1, 0": true,
            "2, 0": true,
            "3, 0": true,
            "4, 0": true,
            "5, 0": true,
            "6, 0": true,
            "7, 0": true,
            "8, 0": true,
            "9, 0": true,
            "10, 0": true,
            "11, 0": true,
            "12, 0": true,
            "13, 0": true,
            "14, 0": true,
            "15, 0": true,
            "0, 1": true,
            "1, 1": true,
            "2, 1": true,
            "3, 1": true,
            "4, 1": true,
            "5, 1": true,
            "6, 1": true,
            "7, 1": true,
            "8, 1": true,
            "9, 1": true,
            "10, 1": true,
            "11, 1": true,
            "12, 1": true,
            "13, 1": true,
            "14, 1": true,
            "15, 1": true,
            "0, 2": true,
            "15, 2": true,
            "0, 3": true,
            "15, 3": true,
            "15, 4": true,
            "15, 5": true,
            "0, 6": true,
            "15, 6": true,
            "0, 7": true,
            "15, 7": true,
            "0, 8": true,
            "15, 8": true,
            "0, 9": true,
            "15, 9": true,
            "0, 10": true,
            "15, 10": true,
            "0, 11": true,
            "1, 11": true,
            "2, 11": true,
            "3, 11": true,
            "3, 12": true,
            "15, 12": true,
            "3, 13": true,
            "15, 13": true,
            "3, 14": true,
            "15, 14": true,
            "3, 15": true,
            "4, 15": true,
            "14, 15": true,
            "15, 15": true,
            "3, 17": true,
            "4, 17": true,
            "5, 17": true,
            "6, 17": true,
            "7, 17": true,
            "8, 17": true,
            "9, 17": true,
            "10, 17": true,
            "11, 17": true,
            "12, 17": true,
            "13, 17": true,
            "14, 17": true,
            "15, 17": true,

            // Inner Walls
            "4, 11": true,
            "5, 11": true,
            "6, 11": true,
            "7, 11": true,
            "8, 11": true,
            "9, 11": true,
            "11, 11": true,
            "12, 11": true,
            "13, 11": true,
            "14, 11": true,
        }
    }
}