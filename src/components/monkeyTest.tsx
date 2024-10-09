import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import frag from "../shaders/fragmentShader.glsl?raw";
import vert from "../shaders/vertexShader.glsl?raw";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Suzanne: THREE.Mesh;
  };
  materials: {};
};

function Model(props: JSX.IntrinsicElements["group"]) {
  const mesh = useRef<any>();

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

  const { nodes, materials } = useGLTF("/monkey.gltf") as GLTFResult;

  materials;

  console.log("Nodes:", nodes);
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={mesh}
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
      >
        <shaderMaterial
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}

export default function MonkeyTest() {
  return <Model />;
}
