import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
// import Scene from "./components/scene";
// import Blob from "./components/cmp_shapes/Blob";
import { useEffect, useRef, useState } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import Blob from "./components/cmp_shapes/Blob";
import Scene from "./components/scene";

import frag from "./shaders/fragmentShader.glsl?raw";
import vert from "./shaders/vertexShader.glsl?raw";

function App() {
  return (
    <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
      <mesh>
        <Scene />
        <sphereGeometry />
        <shaderMaterial fragmentShader={frag} vertexShader={vert} />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
