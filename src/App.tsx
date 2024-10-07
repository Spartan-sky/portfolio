import { Canvas } from "@react-three/fiber";
import Cube from "./components/basic_shapes/cube.tsx";

function App() {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />
      <Cube pos={[0, 0, 0]} size={[1, 1, 1]} color="white" />
    </Canvas>
  );
}

export default App;
