import Entity from "./entity";

export default class Player extends Entity {
  static JUMPPOWER = -13;
  static GRAVITY = 0.5;

  constructor(game) {
    super(); // Assuming Entity's constructor doesn't need `game`, adjust if necessary
    this.game = game;
    this.y = 100;
    this.vy = 0; // Vertical velocity
    this.onGround = false;
    this.frameCounter = 0; // For controlling animation speed

    // Load and initialize the run animation image
    this.runImage = new Image();
    this.runImage.src = "./Run.png";
    this.runImage.onload = () => {
      this.width = this.runImage.width / 8; // Assuming 7 frames
      this.height = 103; // Assuming height is known
      this.totalFrames = 8;
      this.currentFrame = 0;
      // Position player in the middle of the game area
      this.x = Math.floor(game.width / 2) - Math.floor(this.width / 2);
    };

    this._input();
  }

  update() {
    // Apply gravity
    this.vy += Player.GRAVITY;
    this.y += this.vy;

    // Check ground collision
    if (
      this.y >=
      this.game.height - this.height - this.game.background.layers[5].height
    ) {
      this.y =
        this.game.height - this.height - this.game.background.layers[5].height;
      this.vy = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    // Animation frame control
    this.frameCounter = (this.frameCounter + 1) % 5; // Change 10 to adjust speed
    if (this.frameCounter === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    }
  }

  draw() {
    if (!this.runImage) return; // Guard in case image hasn't loaded yet

    const frameX = this.currentFrame * this.width;
    this.game.context.drawImage(
      this.runImage,
      frameX,
      20,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  jump() {
    if (this.onGround) {
      this.vy = Player.JUMPPOWER;
      this.onGround = false; // Fix typo here (was `this.isOnGround`)
    }
  }

  // Input handler
  _input() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const keycodes = { JUMP: { 38: 1, 32: 1 } }; // For jumping

    if (isMobile) {
      window.addEventListener("touchstart", () => this.jump());
    } else {
      window.addEventListener("keydown", ({ keyCode }) => {
        if (keycodes.JUMP[keyCode]) this.jump();
      });
    }
  }
}
