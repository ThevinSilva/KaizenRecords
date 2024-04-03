import Entity from "./entity";

export default class Obstacle extends Entity {
  static src = {
    arrow: {
      src: "./arrow.png",
      frames: 3,
      width: 100,
      height: 14,
      yOffset: true,
      speed: -14,
    },
    barrel: { src: "./barrels.png", frames: 1, width: 80, height: 95 },
    thing: { src: "./barrels.png", frames: 1, width: 80, height: 95 },
  };
  constructor(game, state) {
    super(Obstacle.src);
    this.game = game;
    this.currentState = state;
    this.width = Obstacle.src[state].width;
    this.height = Obstacle.src[state].height;
    this.yOffset = Obstacle.src[state].yOffset
      ? Math.random() * 100 + 100
      : this.height + this.game.floor;
    this.x = game.width;
    this.y = this.game.height - this.yOffset;
    this.speed =
      Obstacle.src[state].speed || this.game.background.floor().speed;
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
