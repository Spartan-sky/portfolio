// import * as THREE from "three";

import { useState } from "react";

// import frag from "../shaders/fragmentShader.glsl?raw";
// import vert from "../shaders/vertexShader.glsl?raw";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { CharacterController } from "./characterController";

export default function Scene() {
  const [_univTime, setUnivTime] = useState(0);

  useFrame((state) => {
    const { clock } = state;
    setUnivTime(clock.getElapsedTime());
  });

  // const uniforms = useMemo(
  //   () => ({
  //     u_time: {
  //       value: 0.0,
  //     },
  //     u_color: {
  //       value: new THREE.Color(1, 1, 1),
  //     },
  //   }),
  //   []
  // );

  // useFrame((state) => {
  //   const { clock } = state;
  //   mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  // });

  return (
    <>
      <Physics debug>
        <RigidBody type="fixed">
          <group>
            <mesh position={[0, 0, 0]} scale={[10, 1, 10]}>
              <boxGeometry />
            </mesh>
          </group>
        </RigidBody>
        <mesh position={[0, 5, 0]}>
          <CharacterController />
          {/* <shaderMaterial
            vertexShader={vert}
            fragmentShader={frag}
            uniforms={uniforms}
          /> */}
        </mesh>
      </Physics>
    </>
  );
}
