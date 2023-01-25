class Person extends GameObject {
    constructor(config) {
        super(config),
        this.movingProgressRemaining = 0,

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (state.arrow && this.movingProgressRemaining === 0 && !state.map.isSpaceTaken(this.x, this.y, state.arrow)) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
        
        this.updateSprite();
        this.updatePosition();
    }


    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [axis, change] = this.directionUpdate[this.direction];
            this[axis] += change;
            this.movingProgressRemaining--;
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.currentAnimation = "run" + this.direction[0].toUpperCase() + this.direction.substring(1);
            console.log(this.sprite.currentAnimation);
        } else if (this.movingProgressRemaining === 0) {
            this.sprite.currentAnimation = "idle" + this.direction[0].toUpperCase() + this.direction.substring(1);
        }
    }

    trigger(state) {
        // Trigger UI Drawing
        if (this.movingProgressRemaining === 0 && state.map.isInteractiveTile(utils.pixelsToCoord(this.x), utils.pixelsToCoord(this.y))) {
            const x = utils.pixelsToCoord(this.x);
            const y = utils.pixelsToCoord(this.y);
            state.map.interactions[utils.asGridCoord(x, y)].interaction.activate(state);
        }
    }
}