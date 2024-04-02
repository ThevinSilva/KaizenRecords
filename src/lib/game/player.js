import Entity from "./entity";

export default class Player extends Entity {
  static JUMPPOWER = -13;
  static GRAVITY = 0.5;

  constructor(
    game,
    src = {
      run: { src: "./Run.png", frames: 8 },
      jump: { src: "./Jump.png", frames: 2 },
      idle: { src: "./Idle.png", frames: 8 },
      death: { src: "./Death.png", frames: 6, noRepeat: true },
      arrow: { src: "./arrow.png", frames: 3 },
    }
  ) {
    super(src);
    this.game = game;
    this.width = 200;
    this.height = 103;
    this.x = Math.floor(game.width / 2) - Math.floor(this.width / 2);
    this.y = game.height - this.height - game.floor;
    this.vy = 0; // Vertical velocity
    this.onGround = false;
    this.hitboxWidth = 25;
    this.hitboxHeight = 50;
    this.paused = false;
    this.death = false;

    this.preload().then(() => {
      this.ready = true;
    });
  }

  update() {
    if (this.paused) return;

    // Apply gravity
    this.vy += Player.GRAVITY;
    this.y += this.vy;

    // Check ground collision
    if (this.y >= this.game.height - this.height - this.game.floor) {
      this.y = this.game.height - this.height - this.game.floor;
      this.vy = 0;
      this.onGround = true;
      this.currentState = "run";
    } else {
      this.onGround = false;
    }

    if (!this.game.running) this.currentState = "idle";
    if (this.death) this.currentState = "death";

    // Call the inherited method to update animation
    this.updateAnimation();
  }

  draw() {
    if (!this.ready) return;

    // Call the inherited method to draw the entity
    super.draw(this.game.context, this.x, this.y, this.width, this.height, 20);

    // Draw hitbox (optional)
    // this.game.context.fillStyle = "green";
    // this.game.context.fillRect(this.x + 85, this.y + 50, 25, 50);
  }

  reset() {
    this.currentState = "idle";
    this.x = Math.floor(this.game.width / 2) - Math.floor(this.width / 2);
    this.y = this.game.height - this.height - this.game.floor;
    this.vy = 0;
    this.currentFrame = 0;
    this.death = false;
  }

  jump() {
    if (this.onGround && !this.paused && !this.death) {
      this.vy = Player.JUMPPOWER;
      this.onGround = false;
      this.currentState = "jump";
    }
  }
}
