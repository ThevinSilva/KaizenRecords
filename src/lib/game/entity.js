// A game object with collision detection and or Animation

export default class Entity {
  constructor() {}

  async preloadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }

  // animateSprite(frames) {

  // }

  // aniamtion

  // collision detection stuff ?
}
