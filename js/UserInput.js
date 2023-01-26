class UserInput {
    constructor() {
        this.keysPressed = [],
        this.userHasInteracted = false,
        this.keyMapping = {
            "directional": {
                38: "up",
                40: "down",
                37: "left",
                39: "right"
            },
            "interactional": {
                32: "interact"
            }
        }
    }

    get direction() {
        return this.keysPressed[0];
    }

    get interaction() {
        return this.userHasInteracted;
    }

    keyPressed(keyCode) {
        // Handle directional input
        if (keyCode in this.keyMapping.directional) {
            const dir = this.keyMapping.directional[keyCode];
            this.keysPressed.unshift(dir);
        }

        // Handle interactional input
        if (keyCode in this.keyMapping.interactional) {
            this.userHasInteracted = true;
            console.log("interaction");
            console.log(this.userHasInteracted);
        }
    }

    keyReleased(keyCode) {
        const keyCodeIndex = this.keysPressed.indexOf(this.keyMapping[keyCode]);
        this.keysPressed.splice(keyCodeIndex, 1);
    }

}