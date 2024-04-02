import Entity from "./entity";

export default class Obstacle extends Entity {
  constructor(
    game,
    src = {
      arrow: { src: "./arrow.png", frames: 3 },
      barrel: { src: "./barrels.png", frames: 1 },
    }
  ) {
    super(src);
    this.game = game;
    this.currentState = "barrel";
    this.width = 60;
    this.height = 70;
    this.x = game.width;
    this.y = this.game.height - this.height - this.game.floor;
    this.speed = this.game.background.floor().speed;
    this.hitboxWidth = this.width;
    this.hitboxHeight = this.height;
    this.preload().then(() => {
      this.ready = true;
    });
  }

  update() {
    if (this.game.player.paused || !this.game.running) return;
    this.x += this.speed; // Move obstacle towards the left
    if (this.x + this.width < 0) {
      // If obstacle moves out of the screen, remove it
      this.game.removeObstacle(this);
    }

    this.updateAnimation();
  }

  draw() {
    // Call the inherited method to draw the obstacle
    super.draw(this.game.context, this.x, this.y, this.width, this.height);

    // // Draw hitbox (optional)
    // this.game.context.fillStyle = "red";
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
