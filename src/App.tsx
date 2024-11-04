import { KeyboardControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene";

const keyboardMap = [
  { name: "forward", keys: ["w", "W", "ArrowUp"] },
  { name: "backward", keys: ["s", "S", "ArrowDown"] },
  { name: "left", keys: ["a", "A", "ArrowLeft"] },
  { name: "right", keys: ["d", "D", "ArrowRight"] },
  { name: "boost", keys: ["Shift"] },
];

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas shadows style={{ touchAction: "none" }}>
        {/* <Sky sunPosition={[100, 20, 100]} /> */}
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[20, 2, 2]} />
        <Scene />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
