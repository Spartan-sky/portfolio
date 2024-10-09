import vert from "../../shaders/blobV.glsl?raw";
import frag from "../../shaders/blobF.glsl?raw";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Blob() {
  const mesh = useRef<any>();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <shaderMaterial
        fragmentShader={frag}
        vertexShader={vert}
        uniforms={uniforms}
      />
    </mesh>
  );
}
