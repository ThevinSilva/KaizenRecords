export default class Background {
  // Dummy Data

  constructor(game) {
    this.game = game;
    // Define layers for the parallax effect
    this.layers = [
      {
        src: "./backdrop.png",
        speed: 0,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./clouds_2.png",
        speed: -0.25,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./mountain_2.png",
        speed: 0,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./ground_2.png",
        speed: -1,
        floor: true,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
    ];
    this.paused = false;

    this.layers.forEach((layer) => {
      layer.img.src = layer.src;
      layer.img.onload = () => {
        layer.width = layer.img.naturalWidth;
        layer.height = layer.img.naturalHeight;
      };
    });
  }

  update() {
    if (this.paused) return;
    this.layers.forEach((layer) => {
      if (layer.speed !== 0) {
        // Only update layers that move
        layer.x += layer.floor && !this.game.running ? 0 : layer.speed;
        if (layer.width > 0) {
          layer.x %= layer.width; // Seamless looping
        }
      }
    });
  }

  draw() {
    this.layers.forEach((layer) => {
      if (layer.width > 0) {
        // Ensure the image is loaded
        this._drawLayer(layer);
      }
    });
  }

  _drawLayer(layer) {
    const pattern = this.game.context.createPattern(layer.img, "repeat-x"); // Create a pattern to repeat the image
    this.game.context.fillStyle = pattern;
    this.game.context.translate(layer.x, this.game.height - layer.height); // Adjust the starting position
    this.game.context.fillRect(-layer.x, 0, this.game.width, layer.height); // Draw the pattern
    this.game.context.translate(-layer.x, -(this.game.height - layer.height)); // Reset the translation
  }
}
