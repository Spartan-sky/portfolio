import * as THREE from "three";

import { useMemo, useRef, useState } from "react";
import MonkeyTest from "./monkeyTest";

import frag from "../shaders/fragmentShader.glsl?raw";
import vert from "../shaders/vertexShader.glsl?raw";
import { useFrame } from "@react-three/fiber";

export default function Scene() {
  const [_univTime, setUnivTime] = useState(0);

  useFrame((state) => {
    const { clock } = state;
    setUnivTime(clock.getElapsedTime());
  });

  const mesh = useRef<any>(null!);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_color: {
        value: new THREE.Color(1, 1, 1),
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <MonkeyTest />
        <shaderMaterial
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
}
