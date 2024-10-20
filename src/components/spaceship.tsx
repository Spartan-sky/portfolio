import { useGLTF } from "@react-three/drei";

export function Model() {
  const gltf = useGLTF("./SpaceShip.gltf");

  return <primitive object={gltf.scene} />;
}

export default function Spaceship() {
  return <Model />;
}
