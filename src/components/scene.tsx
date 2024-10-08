import { OrbitControls, useHelper } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import Cube from "./basic_shapes/cube";
import Sphere from "./basic_shapes/sphere";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./LowpolyHouseIsland.gltf");

  return <primitive object={gltf.scene} scale={0.4} />;
};

export default function Scene() {
  const directionalLightRef = useRef<any>();

  useHelper(directionalLightRef, DirectionalLightHelper);

  return (
    <>
      <directionalLight
        position={[3, 5, 4]}
        intensity={2}
        ref={directionalLightRef}
      />
      <ambientLight color="red" intensity={1} />
      <group position={[0, 0, 0]}>
        <Cube pos={[2, 2, 0]} size={[1, 1, 1]} color="blue" />
        <Cube pos={[-2, 2, 0]} size={[1, 1, 1]} color="green" />
        <Cube pos={[2, -2, 0]} size={[1, 1, 1]} color="orange" />
        <Cube pos={[-2, -2, 0]} size={[1, 1, 1]} color="purple" />
        <Sphere />
      </group>
      <Model />
      <OrbitControls />
    </>
  );
}
