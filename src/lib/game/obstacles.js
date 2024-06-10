import Entity from "./entity";

export default class Obstacle extends Entity {
  static src = {
    arrow: {
      src: "./arrow.png",
      frames: 3,
      width: 100,
      height: 14,
      hitboxWidth: 75,
      hitboxHeight: 8,
      randomY: true,
      speed: -10,
      xOffset: 20,
      yOffset: 3,
    },
    // fireball: {
    //   src: "./fireball.png",
    //   frames: 1,
    //   width: 64,
    //   height: 32,
    //   yOffset: false,
    //   speed: -10,
    //   gravity: 0.5, // Adjust gravity effect on the fireball
    //   bounceVelocity: -10, // Initial bounce velocity (upwards)
    // },
    barrel: {
      src: "./barrels.png",
      frames: 1,
      width: 80,
      height: 95,
      hitboxWidth: 60,
      hitboxHeight: 70,
      xOffset: 15,
      yOffset: 25,
    },
    thing: {
      src: "./thing.png",
      frames: 1,
      width: 60,
      height: 56,
      hitboxWidth: 50,
      hitboxHeight: 45,
      xOffset: 5,
      yOffset: 11,
    },
  };
  constructor(game, state) {
    super(Obstacle.src);
    this.game = game;
    this.currentState = state;
    const properties = Obstacle.src[state];
    this.width = properties.width;
    this.height = properties.height;
    this.hitboxWidth = properties.hitboxWidth || this.width;
    this.hitboxHeight = properties.hitboxHeight || this.height;
    this.xOffset = properties.xOffset || 0;
    this.yOffset = properties.yOffset || 0;
    this.randomY = properties.randomY
      ? Math.random() * 100 + 100
      : this.height + this.game.floor;
    this.x = game.width;
    this.y = this.game.height - this.randomY;
    this.speed = properties.speed || this.game.background.speed;

    // Initialize vertical velocity and gravity if the obstacle is a fireball
    if (state === "fireball") {
      this.yVelocity = properties.bounceVelocity;
      this.gravity = properties.gravity;
    }
    this.preload().then(() => {
      this.ready = true;
    });
  }

  update() {
    if (this.game.player.paused || !this.game.running) return;
    this.x += this.speed; // Move obstacle towards the left

    if (this.currentState === "fireball") {
      // Apply gravity
      this.yVelocity += this.gravity;
      // Update vertical position
      this.y += this.yVelocity;
      // Bounce if hitting the ground
      if (this.y > this.game.height - this.height - this.game.floor) {
        this.y = this.game.height - this.height - this.game.floor; // Reset position to ground level
        this.yVelocity *= -0.8; // Reverse direction and reduce magnitude
      }
    }

    if (this.x + this.width < 0) {
      // If obstacle moves out of the screen, remove it
      this.game.removeObstacle(this);
    }

    this.updateAnimation();
  }
  draw() {
    // Call the inherited method to draw the obstacle
    super.draw(this.game.context, this.x, this.y, this.width, this.height);
  }

  drawHitBox() {
    // // Draw hitbox (optional)
    this.game.context.fillStyle = "red";
    this.game.context.fillRect(
      this.x + this.xOffset,
      this.y + this.yOffset,
      this.hitboxWidth,
      this.hitboxHeight
    );
  }
}
