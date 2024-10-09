import * as THREE from "three";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";

// import frag from "../shaders/fragmentShader.glsl?raw";
// import vert from "../shaders/vertexShader.glsl?raw";
import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Suzanne: THREE.Mesh;
  };
  materials: {};
};

function Model(props: JSX.IntrinsicElements["group"]) {
  const mesh = useRef<any>();

  const [, get] = useKeyboardControls();

  console.log("get:", get());

  // useFrame((state) => {
  //   // const { forward, backward, left, right, jump } = get();
  // });

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

  const { nodes } = useGLTF("/monkey.gltf") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={mesh}
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={!get().forward ? [0, 0, 0] : [1, 1, 1]}
      >
        {/* <shaderMaterial
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          /> */}
      </mesh>
    </group>
  );
}

export default function MonkeyTest() {
  return <Model />;
}
