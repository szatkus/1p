export class BasicObject {
  x = 0
  y = 0
  width = 1
  height = 1
  speed = 1
  color = '#000'
  destinationX: number
  destinationY: number

  constructor (properties: {x: number, y: number}) {
    for (let name in properties) {
      this[name] = properties[name];
    }
    this.destinationX = this.x;
    this.destinationY = this.y;
  }

  step(delta) {
    if (Math.abs(this.x - this.destinationX) < this.speed * delta) {
      this.x = this.destinationX;
    }
    if (this.x > this.destinationX) {
      this.x -= this.speed * delta;
    }
    if (this.x < this.destinationX) {
      this.x += this.speed * delta;
    }
    if (Math.abs(this.y - this.destinationY) < this.speed * delta) {
      this.y = this.destinationY;
    }
    if (this.y > this.destinationY) {
      this.y -= this.speed * delta;
    }
    if (this.y < this.destinationY) {
      return this.y += this.speed * delta;
    }
  }

};

export class Player extends BasicObject {
  constructor(properties) {
    super(properties);
    window.addEventListener('keydown', (e) => {
      return this.keydown(e);
    });
    window.addEventListener('keyup', (e) => {
      return this.keyup(e);
    });
  }

  keydown(event) {
    if (event.key === 'ArrowLeft') {
      this.destinationX = Math.round(this.x) - 1;
    }
    if (event.key === 'ArrowRight') {
      this.destinationX = Math.round(this.x) + 1;
    }
    if (event.key === 'ArrowUp') {
      this.destinationY = Math.round(this.y) - 1;
    }
    if (event.key === 'ArrowDown') {
      return this.destinationY = Math.round(this.y) + 1;
    }
  }

  keyup(event) {

  }

};
