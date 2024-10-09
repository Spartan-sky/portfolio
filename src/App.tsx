import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene";
function App() {
  return (
    <Canvas camera={{ position: [1.0, 1, 3.0] }}>
      <Scene />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
