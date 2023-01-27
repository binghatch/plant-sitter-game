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
        },

        // this.sound = new Sound({
        //     soundSrc: config.soundSrc
        // }),

        this.availableInteraction,

        this.carriedWater = 20

    }

    update(state) {
        if (state.arrow && this.movingProgressRemaining === 0) {
            if (!state.map.isSpaceTaken(this.x, this.y, state.arrow)) {
                //this.sound.stop();
                this.direction = state.arrow;
                this.movingProgressRemaining = 16;
            } else {
                this.direction = state.arrow;
            }
        }
        
        this.updateSprite();
        this.updatePosition();
    }


    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [axis, change] = this.directionUpdate[this.direction];
            this[axis] += change;
            this.movingProgressRemaining--;
            //this.sound.trigger();
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.currentAnimation = "run" + this.direction[0].toUpperCase() + this.direction.substring(1);
        } else if (this.movingProgressRemaining === 0) {
            this.sprite.currentAnimation = "idle" + this.direction[0].toUpperCase() + this.direction.substring(1);
        }
    }

    checkInteraction(state) {
        // Trigger UI Drawing
        if (this.movingProgressRemaining === 0 && state.map.isInteractiveTile(utils.pixelsToCoord(this.x), utils.pixelsToCoord(this.y))) {
            const x = utils.pixelsToCoord(this.x);
            const y = utils.pixelsToCoord(this.y);
            this.availableInteraction = state.map.interactions[utils.asGridCoord(x, y)].interaction;
            if (this.direction === this.availableInteraction.accessibleFrom) {
                state.map.interactions[utils.asGridCoord(x, y)].interaction.activate(state);
            }
        } else {
            this.availableInteraction = null;
        }
    }

    handleInteraction(state) {
        if (this.availableInteraction && state.interaction && state.interaction === this.availableInteraction.type && this.direction === this.availableInteraction.accessibleFrom) {        
            if (this.availableInteraction.type === "water" && this.carriedWater > 0) {
                this.availableInteraction.trigger(this);
            }

            if (this.availableInteraction.type === "dispense" && this.carriedWater < 20) {
                this.availableInteraction.trigger(this);
            }
        }
    }
}