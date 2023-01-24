class Person extends GameObject {
    constructor(config) {
        super(config),
        this.movingProgressRemaining = 0;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        // Check if next space is taken
        if (state.map.isSpaceTaken(this.x, this.y, state.arrow)) {
            console.log("TAKEN");
        }

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
}