class UserInput {
    constructor() {
        this.keysPressed = [];
        this.keyMapping = {
            38: "up",
            40: "down",
            37: "left",
            39: "right"
        }
    }

    get direction() {
        return this.keysPressed[0];
    }

    keyPressed(keyCode) {
        if (keyCode in this.keyMapping) {
            const dir = this.keyMapping[keyCode];
            this.keysPressed.unshift(dir);
        }
    }

    keyReleased(keyCode) {
        const keyCodeIndex = this.keysPressed.indexOf(this.keyMapping[keyCode]);
        this.keysPressed.splice(keyCodeIndex, 1);
    }
}