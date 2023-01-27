class UserInput {
    constructor() {
        this.keysPressed = [],
        this.keyMapping = {
            "directional": {
                38: "up",
                40: "down",
                37: "left",
                39: "right"
            },
            "interactional": {
                87: "water",
                68: "dispense"
            }
        },
        this.interactionTyped;
    }

    get direction() {
        return this.keysPressed[0];
    }

    get interaction() {
        return this.interactionTyped;
    }

    keyPressed(keyCode) {
        // Handle directional input
        if (keyCode in this.keyMapping.directional) {
            const dir = this.keyMapping.directional[keyCode];
            this.keysPressed.unshift(dir);
        }
    }

    keyReleased(keyCode) {
        const keyCodeIndex = this.keysPressed.indexOf(this.keyMapping[keyCode]);
        this.keysPressed.splice(keyCodeIndex, 1);
    }

    keyTyped(keyCode) {
        // Handle interactional input
        if (keyCode in this.keyMapping.interactional) {
            this.interactionTyped = this.keyMapping.interactional[keyCode]
            console.log(this.interactionTyped);
        }
    }

}