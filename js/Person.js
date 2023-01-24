class Person extends GameObject {
    constructor(config) {
        super(config),
        this.movingProgressRemaining = 16;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (state.arrow && this.movingProgressRemaining === 0) {
            this.direction = state.arrow;
            console.log(this.direction);
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
        } else {

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