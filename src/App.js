import "./App.css";
import Footer from "./footer.js";
import { Route, Routes } from "react-router-dom";

import MainPanel from "./MainPanel.js";
import Sketch1 from "./sketches/Sketch1.js";
import Sketch2 from "./sketches/Sketch2.js";
import Sketch3 from "./sketches/Sketch3.js";
import Sketch4 from "./sketches/Sketch4.js";
import Sketch5 from "./sketches/Sketch5.js";
import NotFound from "./NotFound.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPanel />} />
        <Route path="/sketch-01" element={<Sketch1 />} />
        <Route path="/sketch-02" element={<Sketch2 />} />
        <Route path="/sketch-03" element={<Sketch3 />} />
        <Route path="/sketch-04" element={<Sketch4 />} />
        <Route path="/sketch-05" element={<Sketch5 />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
