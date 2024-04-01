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
      death: { src: "./Death.png", frames: 6 },
    }
  ) {
    super(src);
    this.width = 200;
    this.height = 103;
    this.game = game;
    this.x = Math.floor(game.width / 2) - Math.floor(this.width / 2);
    this.y =
      this.game.height -
      this.height -
      Player.findGroundHeight(this.game.background.layers);
    this.vy = 0; // Vertical velocity
    this.onGround = false;
    this.frameCounter = 0; // For controlling animation speed
    this.currentState = "idle"; // Default state
    this.currentFrame = 0;
    this.paused = false;

    this.preload().then(() => {
      this.ready = true; // Ensure we only start drawing/animating once images are loaded
    });
    this._input();
  }

  // Utility to find ground layer
  static findGroundHeight(layers) {
    return (
      layers.find((layer) => layer.src.toLowerCase().includes("ground"))
        .height && 46
    );
  }

  update() {
    if (this.paused) return;

    // Apply gravity
    this.vy += Player.GRAVITY;
    this.y += this.vy;
    // console.log(this.states);

    // Check ground collision
    if (
      this.y >=
      this.game.height -
        this.height -
        Player.findGroundHeight(this.game.background.layers)
    ) {
      this.y =
        this.game.height -
        this.height -
        Player.findGroundHeight(this.game.background.layers);
      this.vy = 0;
      this.onGround = true;
      this.currentState = "run";
    } else {
      this.onGround = false;
    }

    if (!this.game.running) this.currentState = "idle";

    // Animation frame control
    this.frameCounter = (this.frameCounter + 1) % 5; // Change 10 to adjust speed
    if (this.frameCounter === 0) {
      this.currentFrame =
        (this.currentFrame + 1) % this.states[this.currentState].frames;
    }
  }

  draw() {
    if (!this.ready) return; // Ensure we don't try to draw before images are loaded

    const state = this.states[this.currentState];
    if (!state || !state.image) return; // Guard in case state or image isn't properly defined

    const frameWidth = state.image.width / state.frames;
    const frameX = this.currentFrame * frameWidth;

    this.game.context.drawImage(
      state.image,
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
    if (this.onGround && !this.paused && this.game.running) {
      this.vy = Player.JUMPPOWER;
      this.onGround = false; // Fix typo here (was `this.isOnGround`)
      this.currentState = "jump";
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
