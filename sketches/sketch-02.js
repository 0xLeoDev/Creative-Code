const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "Bisque";
    context.fillRect(0, 0, width, height);

    let cx = width * 0.5;
    let cy = height * 0.5;

    let w = width * 0.01;
    let h = width * 0.1;

    let quantity = 20;
    let radius = width * 0.3;

    for (let i = 0; i < quantity; i++) {
      context.save();

      let slice = math.degToRad(360 / quantity);
      let angle = slice * i;

      let x = cx + radius * Math.sin(angle);
      let y = cy + radius * Math.cos(angle);

      context.fillStyle = "black";
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1, 3), random.range(0.5, 1.5));
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = random.range(10, 30);
      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * -0.3,
        slice * 5
      );
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
