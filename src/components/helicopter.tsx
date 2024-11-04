import { useGLTF } from "@react-three/drei";

export function Model() {
  const gltf = useGLTF("./Models/helicopter2.glb");

  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
}

export default function Helicopter() {
  return <Model />;
}

useGLTF.preload("./Models/helicopter.glb");
