import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function Cube(props: {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const { pos, size, color } = props;
  const ref = useRef<Mesh>(new Mesh());

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = 2 * Math.sin(state.clock.elapsedTime) - 1;
  });

  return (
    <mesh position={pos} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

Cube.defaultProps = {
  pos: [0, 0, 0],
  size: [1, 1, 1],
  color: "white",
};
