import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import React, { useRef, useEffect, useState } from "react";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const eases = require("eases");

const cursor = { x: 9999, y: 9999 };

function SketchPage02(props) {
  let arowPathLeft = "/sketch-01";
  let arowPathRight = "/sketch-03";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);

  let canvas, context, width, height, x, y, particle, radius;
  let bacgroundColor = "#1a1a1a";
  const particles = [];
  const numCircles = 16;
  let dotRadius = 12;
  let cirRadius = 0;
  const fitRadius = dotRadius;
  const gapCircle = 8;
  const gapDot = 4;

  const updateCanvasData = () => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
  };

  const onMousedown = (e) => {
    console.log("down");

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("touchcancel", onMouseUp);

    onMouseMove(e);
  };

  const onMouseMove = (e) => {
    console.log("move");
    console.log(e);

    const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (e.offsetY / canvas.offsetHeight) * canvas.height;
    cursor.x = x;
    cursor.y = y;

    console.log(x, y);
  };

  const onMouseUp = () => {
    console.log("up");

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    cursor.x = 9999;
    cursor.y = 9999;
  };

  const renderFrame = () => {
    try {
      updateCanvasData();
      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(context);
      });

      requestAnimationFrame(renderFrame);
    } catch (error) {}
  };

  const initCanva = () => {
    try {
      updateCanvasData();
      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);

      canvas.addEventListener("mousedown", onMousedown);
      canvas.addEventListener("touchstart", onMousedown);

      for (let i = 0; i < numCircles; i++) {
        const circumference = Math.PI * 2 * cirRadius;
        const numFit = i
          ? Math.floor(circumference / (fitRadius * 2 + gapDot))
          : 1;
        const fitSlice = (Math.PI * 2) / numFit;

        for (let j = 0; j < numFit; j++) {
          const theta = fitSlice * j;

          x = Math.cos(theta) * cirRadius;
          y = Math.sin(theta) * cirRadius;

          x += width * 0.5;
          y += height * 0.5;

          radius = dotRadius;

          particle = new Particle({ x, y, radius });
          particles.push(particle);
        }

        cirRadius += fitRadius * 2 + gapCircle;
        dotRadius = (1 - eases.quadOut(i / numCircles)) * fitRadius;
      }
      renderFrame();
    } catch (error) {}
  };

  useEffect(() => {
    initCanva();
  }, []);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURI = canvas.toDataURL("image / png");
    props.saveAsPng(dataURI);
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={arowPathLeft} pathRight={arowPathRight} />
      <div className="mainPageContainer">
        <div className="canvas">
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            width={"1080px"}
            height={"1080px"}
            {...props}
          />
        </div>

        {navbarStatus == true && (
          <div className="panel">
            <Navbar />
          </div>
        )}

        {navbarStatus == false && (
          <div className="panel">
            <h2 className="skethTitle">sketch-02</h2>
            <div className="optionsList"></div>
            <button className="button-main" onClick={downloadImage}>
              save as png
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SketchPage02;

class Particle {
  constructor({ x, y, radius = 10 }) {
    this.x = x;
    this.y = y;
    this.xAcceleration = 0;
    this.yAcceleration = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.xInitial = x;
    this.yInitial = y;

    this.radius = radius;
    this.scale = 1;
    this.minDist = random.range(100, 200);
    this.pushFactor = random.range(0.015, 0.03);
    this.pullFactor = random.range(0.002, 0.006);
    this.dampFactor = random.range(0.9, 0.95);
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = "white";
    context.beginPath();
    context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  update() {
    let dx, dy, dd, distDelta;
    // pull force
    dx = this.xInitial - this.x;
    dy = this.yInitial - this.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    this.scale = math.mapRange(dd, 0, 200, 1, 5);
    this.xAcceleration = dx * this.pullFactor;
    this.yAcceleration = dy * this.pullFactor;

    // push force
    dx = this.x - cursor.x;
    dy = this.y - cursor.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    distDelta = this.minDist - dd;

    if (dd < this.minDist - dd) {
      this.xAcceleration += (dx / dd) * distDelta * this.pushFactor;
      this.yAcceleration += (dy / dd) * distDelta * this.pushFactor;
    }

    this.xVelocity += this.xAcceleration;
    this.yVelocity += this.yAcceleration;
    this.xVelocity *= this.dampFactor;
    this.yVelocity *= this.dampFactor;
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}
