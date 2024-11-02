import { useGLTF } from "@react-three/drei";

export function Model() {
  const gltf = useGLTF("./helicopter.glb");
  console.log(gltf);

  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
}

export default function Helicopter() {
  return <Model />;
}

useGLTF.preload("./helicopter.glb");
