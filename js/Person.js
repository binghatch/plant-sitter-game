class Person extends GameObject {
    constructor(config) {
        super(config),

        // Movement
        this.movingProgressRemaining = 0,

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }

        // Health
        //this.thirst = 0;

    }

    update(state) {
        if (state.arrow && this.movingProgressRemaining === 0) {
            if (!state.map.isSpaceTaken(this.x, this.y, state.arrow)) {
                this.direction = state.arrow;
                this.movingProgressRemaining = 16;
            } else {
                this.direction = state.arrow;
            }
        }
        
        this.updateSprite();
        this.updatePosition();
        //this.getThirsty();
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

    // getThirsty() {
    //     if (frameCount % 1000 === 0) {
    //         this.thirst++;
    //         console.log(this.thirst);
    //     }
    // }

    trigger(state) {
        // Trigger UI Drawing
        if (this.movingProgressRemaining === 0 && state.map.isInteractiveTile(utils.pixelsToCoord(this.x), utils.pixelsToCoord(this.y)) && this.direction === "up") {
            const x = utils.pixelsToCoord(this.x);
            const y = utils.pixelsToCoord(this.y);
            state.map.interactions[utils.asGridCoord(x, y)].interaction.activate(state);
        }
    }
}