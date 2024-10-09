import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
// import Scene from "./components/scene";
// import Blob from "./components/cmp_shapes/Blob";
import { useEffect, useRef, useState } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";

const MyShaderMaterial = shaderMaterial({}, vertexShader, fragmentShader);

extend({ MyShaderMaterial });

const Flag = () => {
  return (
    <mesh
      // ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1.5}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        wireframe
      />
    </mesh>
  );
};

function App() {
  return (
    <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
      <Flag />
      <axesHelper />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
