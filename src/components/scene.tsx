import * as THREE from "three";

import { useHelper } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
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

  // console.log("univTime:", univTime);

  const mesh = useRef<any>(null!);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // console.log("DirLight", directionalLightRef);
  // console.log("Type of mesh", typeof mesh);
  // console.log("Type of mesh.current", typeof mesh.current);
  // console.log("Mesh", mesh);

  useHelper(directionalLightRef, DirectionalLightHelper);

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
      <mesh ref={mesh}>
        <directionalLight
          position={[3, 5, 4]}
          intensity={1}
          ref={directionalLightRef}
        />
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
