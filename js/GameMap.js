class GameMap {
    constructor(config) {
        this.gameObjects = config.gameObjects,
        this.uiElements = config.uiElements,

        this.walls = config.walls,
        this.interactions = config.interactions,

        this.lowerSrc = config.lowerSrc,
        this.lowerImage = null,

        this.musicSrc = config.musicSrc,
        this.music = null,

        this.upperSrc = config.upperSrc,
        this.upperImage = null
    }

    preload() {
        this.lowerImage = loadImage(this.lowerSrc);
        this.upperImage = loadImage(this.upperSrc);
        // this.music = loadSound(this.music);
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
        lowerSrc: "./assets/maps/office-lower.png",
        upperSrc: "./assets/maps/office-upper.png",
        musicSrc: "./assets/music/",
        uiElements: {
            waterBar: new UiWaterBar({
                x: utils.withGrid(19),
                y: utils.withGrid(1),
                sprite: {
                    spriteSheet: "./assets/ui/waterBar_anim_48x16.png",
                    spriteData: "./assets/ui/waterBar_anim_48x18.json"
                }
            }),
            dayDisplay: new UiDayDisplay({
                x: utils.withGrid(19),
                y: utils.withGrid(0 ),
                sprite: {
                    spriteSheet: "./assets/ui/dayDisplay_anim_48x16.png",
                    spriteData: "./assets/ui/waterBar_anim_48x18.json"
                }
            })
        },
        gameObjects: {
            waterDispenser1: new WaterDispenser({
                x: utils.withGrid(7),
                y: utils.withGrid(8),
                sprite: {
                    spriteSheet: "./assets/objects/Sprite-0010.png",
                    spriteData: "./assets/objects/Sprite-0010.json",
                    useShadow: false
                },
                interaction: {
                    x: utils.withGrid(0),
                    y: utils.withGrid(2),
                    accessibleFrom: "up",
                    type: "dispense",
                    spriteOffsetX: -1,
                    spriteOffsetY: -16,
                    spriteIsVisible: true,
                    soundSrc: "./assets/sounds/Drink.wav"
                },
                walls: [
                    {
                        x: utils.withGrid(0),
                        y: utils.withGrid(1)
                    }
                ]
            }),
            waterDispenser2: new WaterDispenser({
                x: utils.withGrid(22),
                y: utils.withGrid(16),
                sprite: {
                    spriteSheet: "./assets/objects/Sprite-0010.png",
                    spriteData: "./assets/objects/Sprite-0010.json",
                    useShadow: false
                },
                interaction: {
                    x: utils.withGrid(0),
                    y: utils.withGrid(2),
                    accessibleFrom: "up",
                    type: "dispense",
                    spriteOffsetX: -1,
                    spriteOffsetY: -16,
                    spriteIsVisible: true,
                    soundSrc: "./assets/sounds/Drink.wav"
                },
                walls: [
                    {
                        x: utils.withGrid(0),
                        y: utils.withGrid(1)
                    }
                ]
            }),
            plant: new Plant({
                x: utils.withGrid(11),
                y: utils.withGrid(2),
                sprite: {
                    spriteSheet: "./assets/objects/plants/plant_01_16x32.png",
                    spriteData: "./assets/objects/plants/plant_01_16x32.json",
                    useShadow: false
                },
                interaction: {
                    x: utils.withGrid(0),
                    y: utils.withGrid(2),
                    accessibleFrom: "up",
                    type: "water",
                    spriteOffsetX: -1,
                    spriteOffsetY: -16,
                    spriteIsVisible: false,
                },
                walls: [
                    {
                        x: utils.withGrid(0),
                        y: utils.withGrid(1)
                    }
                ]
            }),
            plant2: new Plant({
                x: utils.withGrid(12),
                y: utils.withGrid(9),
                sprite: {
                    spriteSheet: "./assets/objects/plants/plant_01_16x32.png",
                    spriteData: "./assets/objects/plants/plant_01_16x32.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(0),
                        y: utils.withGrid(2),
                        accessibleFrom: "up",
                        type: "water",
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
            plant3: new Plant({
                x: utils.withGrid(20),
                y: utils.withGrid(7),
                sprite: {
                    spriteSheet: "./assets/objects/plants/plant_01_16x32.png",
                    spriteData: "./assets/objects/plants/plant_01_16x32.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(1),
                        y: utils.withGrid(1),
                        accessibleFrom: "left",
                        type: "water",
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
            plant4: new Plant({
                x: utils.withGrid(17),
                y: utils.withGrid(21),
                sprite: {
                    spriteSheet: "./assets/objects/plants/plant_01_16x32.png",
                    spriteData: "./assets/objects/plants/plant_01_16x32.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(0),
                        y: utils.withGrid(0),
                        accessibleFrom: "down",
                        type: "water",
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
            plant5: new Plant({
                x: utils.withGrid(10),
                y: utils.withGrid(6),
                sprite: {
                    spriteSheet: "./assets/objects/plants/plant_01_16x32.png",
                    spriteData: "./assets/objects/plants/plant_01_16x32.json",
                    useShadow: false
                },
                interaction: {
                        x: utils.withGrid(0),
                        y: utils.withGrid(2),
                        accessibleFrom: "up",
                        type: "water",
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
                x: utils.withGrid(3),
                y: utils.withGrid(10),
                sprite: {
                    spriteSheet: "./assets/characters/Bob_anim_32x32.png",
                    spriteData: "../assets/characters/Bob_anim_32x32.json",
                    useShadow: true,
                    offsetX: -8,
                    offsetY: -18
                },
                soundSrc: "./assets/sounds/Steps.wav",
                isPlayerControlled: true
            })
        },
        interactions: {

        },
        walls: {
            // Walls
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
            "1, 2": true,
            "2, 2": true,
            "3, 2": true,
            "4, 2": true,
            "5, 2": true,
            "6, 2": true,
            "7, 2": true,
            "8, 2": true,
            "9, 2": true,
            "10, 2": true,
            "11, 2": true,
            "12, 2": true,
            "1, 3": true,
            "12, 3": true,
            "1, 4": true,
            "12, 4": true,
            "1, 5": true,
            "12, 5": true,
            "0, 6": true,
            "1, 6": true,
            "2, 6": true,
            "12, 6": true,
            "13, 6": true,
            "14, 6": true,
            "15, 6": true,
            "16, 6": true,
            "17, 6": true,
            "18, 6": true,
            "19, 6": true,
            "20, 6": true,
            "21, 6": true,
            "22, 6": true,
            "23, 6": true,
            "24, 6": true,
            "25, 6": true,
            "26, 6": true,
            "27, 6": true,
            "28, 6": true,
            "0, 7": true,
            "1, 7": true,
            "2, 7": true,
            "3, 7": true,
            "5, 7": true,
            "6, 7": true,
            "12, 7": true,
            "13, 7": true,
            "14, 7": true,
            "15, 7": true,
            "16, 7": true,
            "17, 7": true,
            "18, 7": true,
            "19, 7": true,
            "20, 7": true,
            "21, 7": true,
            "22, 7": true,
            "23, 7": true,
            "24, 7": true,
            "25, 7": true,
            "26, 7": true,
            "27, 7": true,
            "28, 7": true,
            "0, 8": true,
            "6, 8": true,
            "12, 8": true,
            "13, 8": true,
            "28, 8": true,
            "0, 9": true,
            "6, 9": true,
            "7, 9": true,
            "8, 9": true,
            "9, 9": true,
            "10, 9": true,
            "11, 9": true,
            "12, 9": true,
            "13, 9": true,
            "28, 9": true,
            "0, 10": true,
            "28, 10": true,
            "0, 11": true,
            "28, 11": true,
            "0, 13": true,
            "1, 13": true,
            "2, 13": true,
            "3, 13": true,
            "4, 13": true,
            "5, 13": true,
            "6, 13": true,
            "7, 13": true,
            "8, 13": true,
            "9, 13": true,
            "10, 13": true,
            "11, 13": true,
            "12, 13": true,
            "13, 13": true,
            "28, 13": true,
            "13, 13": true,
            "28, 13": true,
            "13, 14": true,
            "28, 14": true,
            "13, 15": true,
            "28, 15": true,
            "28, 16": true,
            "13, 17": true,
            "14, 17": true,
            "15, 17": true,
            "16, 17": true,
            "24, 17": true,
            "25, 17": true,
            "26, 17": true,
            "27, 17": true,
            "28, 17": true,
            "16, 18": true,
            "28, 18": true,
            "16, 19": true,
            "28, 19": true,
            "16, 20": true,
            "28, 20": true,
            "16, 21": true,
            "28, 21": true,
            "16, 22": true,
            "28, 22": true,
            "17, 23": true,
            "18, 23": true,
            "19, 23": true,
            "20, 23": true,
            "21, 23": true,
            "22, 23": true,
            "23, 23": true,
            "24, 23": true,
            "25, 23": true,
            "26, 23": true,
            "27, 23": true,

            // Objects
            "2, 3": true,
            "3, 3": true,
            "4, 3": true,
            "2, 4": true,
            "3, 4": true,
            "4, 4": true,
            "5, 4": true,
            "6, 4": true,
            "2, 5": true,
            "3, 5": true,
            "2, 6": true,
            "8, 6": true,
            "9, 6": true,
            "10, 6": true,
            "11, 6": true,
            "8, 7": true,
            "9, 7": true,
            "11, 7": true,
            "17, 8": true,
            "16, 9": true,
            "17, 9": true,
            "18, 9": true,
            "19, 9": true,
            "20, 9": true,
            "21, 9": true,
            "22, 9": true,
            "23, 9": true,
            "24, 9": true,
            "16, 10": true,
            "17, 10": true,
            "18, 10": true,
            "19, 10": true,
            "20, 10": true,
            "21, 10": true,
            "22, 10": true,
            "23, 10": true,
            "24, 10": true,
            "26, 10": true,
            "27, 10": true,
            "20, 11": true,
            "7, 12": true,
            "8, 12": true,
            "9, 12": true,
            "16, 12": true,
            "22, 12": true,
            "15, 13": true,
            "16, 13": true,
            "17, 13": true,
            "18, 13": true,
            "19, 13": true,
            "20, 13": true,
            "21, 13": true,
            "22, 13": true,
            "23, 13": true,
            "24, 13": true,
            "25, 13": true,
            "26, 13": true,
            "15, 14": true,
            "16, 14": true,
            "17, 14": true,
            "18, 14": true,
            "19, 14": true,
            "20, 14": true,
            "21, 14": true,
            "22, 14": true,
            "23, 14": true,
            "24, 14": true,
            "25, 14": true,
            "26, 14": true,
            "16, 15": true,
            "19, 15": true,
            "22, 15": true,
            "17, 18": true,
            "18, 18": true,
            "19, 18": true,
            "20, 18": true,
            "21, 18": true,
            "17, 19": true,
            "18, 19": true,
            "21, 19": true,
            "25, 19": true,
            "26, 19": true,
            "17, 20": true,
            "18, 20": true,
            "20, 20": true,
            "21, 20": true,
            "25, 20": true,
            "26, 20": true,
            "25, 21": true,
            "26, 21": true,
            "18, 22": true,
            "19, 22": true,
        }
    }
}