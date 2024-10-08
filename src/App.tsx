import { Canvas } from "@react-three/fiber";
import Cube from "./components/basic_shapes/cube.tsx";
import Sphere from "./components/basic_shapes/sphere.tsx";

function App() {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 1]} />
      <ambientLight color="red" intensity={0.2} />
      <group position={[0, 0, 0]}>
        <Cube pos={[2, 2, 0]} size={[1, 1, 1]} color="blue" />
        <Cube pos={[-2, 2, 0]} size={[1, 1, 1]} color="green" />
        <Cube pos={[2, -2, 0]} size={[1, 1, 1]} color="orange" />
        <Cube pos={[-2, -2, 0]} size={[1, 1, 1]} color="purple" />
        <Sphere />
      </group>
    </Canvas>
  );
}

export default App;
