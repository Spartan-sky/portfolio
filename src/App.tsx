import { Canvas, useLoader } from "@react-three/fiber";
// import Cube from "./components/basic_shapes/cube.tsx";
// import Sphere from "./components/basic_shapes/sphere.tsx";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";

const Scene = () => {
  const gltf = useLoader(GLTFLoader, "./LowpolyHouseIsland.gltf");

  return <primitive object={gltf.scene} scale={0.4} />;
};

function App() {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 1]} />
      <ambientLight color="red" intensity={0.2} />
      {/* <group position={[0, 0, 0]}>
        <Cube pos={[2, 2, 0]} size={[1, 1, 1]} color="blue" />
        <Cube pos={[-2, 2, 0]} size={[1, 1, 1]} color="green" />
        <Cube pos={[2, -2, 0]} size={[1, 1, 1]} color="orange" />
        <Cube pos={[-2, -2, 0]} size={[1, 1, 1]} color="purple" />
        <Sphere />
      </group> */}
      {/* <Suspense fallback={null}> */}
      <Scene />
      <OrbitControls />
      <Environment preset="sunset" background />
      {/* </Suspense> */}
    </Canvas>
  );
}

export default App;

// import "./styles.css";
// import { Canvas } from "@react-three/fiber";
// import { useLoader } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { Suspense } from "react";

// const Model = () => {
//   const gltf = useLoader(GLTFLoader, "./monkey.gltf");
//   return (
//     <>
//       <primitive object={gltf.scene} scale={0.4} />
//     </>
//   );
// };

// export default function App() {
//   return (
//     <div className="App">
//       <Canvas>
//         <Suspense fallback={null}>
//           <Model />
//           <OrbitControls />
//           <Environment preset="sunset" background />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }
