export default class Background {
  constructor(game) {
    this.game = game;
    // Define layers for the parallax effect
    this.layers = [
      {
        src: "./plx-1.png",
        speed: -2,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./plx-2.png",
        speed: -3,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./plx-3.png",
        speed: -4,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./plx-4.png",
        speed: -5,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      }, // The ground layer
      {
        src: "./plx-5.png",
        speed: -5,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./ground.png",
        speed: -1,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
    ];

    this.layers.forEach((layer) => {
      layer.img.src = layer.src;
      layer.img.onload = () => {
        layer.width = layer.img.naturalWidth;
        layer.height = layer.img.naturalHeight;
      };
    });
  }

  update() {
    this.layers.forEach((layer) => {
      layer.x += layer.speed;
      // Reset layer position when it completely scrolls out of view
      if (layer.x <= -layer.width) layer.x += layer.width;
    });
  }

  draw() {
    this.layers.forEach((layer) => {
      this._drawLayer(layer);
    });
  }

  _drawLayer(layer) {
    // Draw each layer and repeat it across the canvas width as needed
    // let posX = layer.x;
    for (let i = 0; i <= 5; i++) {
      this.game.context.drawImage(
        layer.img,
        layer.x + layer.width * i,
        this.game.height - layer.height
      );
      // posX += layer.width;
    }
  }
}
