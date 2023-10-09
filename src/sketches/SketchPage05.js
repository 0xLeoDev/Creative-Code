import "./Sketch.css";
import Arows from "../Arows.js";
import Header from "../Header";
import Navbar from "../Navbar.js";
import Sketch05 from "./Sketch05";

import React, { useState, useRef } from "react";

function SketchPage05(props) {
  let pathLeft = "/sketch-04";
  let pathRight = "/sketch-01";

  const [navbarStatus, setNavbarStatus] = useState(false);

  let canvasDataURI = useRef("");
  const saveDataURIinParrent = (canvas) => {
    const dataURI = canvas.toDataURL("image / png");
    canvasDataURI = dataURI;
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={pathLeft} pathRight={pathRight} />
      <div className="App">
        <div className="canvas">
          <Sketch05 saveDataURIinParrent={saveDataURIinParrent} />
        </div>
        {navbarStatus == true && (
          <div className="panel">
            <Navbar />
          </div>
        )}

        {navbarStatus == false && (
          <div className="panel">
            <h2 className="skethTitle">sketch-05</h2>
            <div className="optionsList">
              <h3>Option 1</h3>
              <p>slider 1</p>
              <h3>Option 2</h3>
              <p>option 2</p>
              <h3>Option 3</h3>
              <p>option 3</p>
              <h3>Option 4</h3>
              <p>option 4</p>
            </div>
            <button onClick={() => props.saveAsPng(canvasDataURI)}>
              save as png
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SketchPage05;