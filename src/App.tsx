import { KeyboardControls, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
];

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} />
        <Scene />
        <OrbitControls
          enableDamping
          minDistance={5}
          maxDistance={15}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
