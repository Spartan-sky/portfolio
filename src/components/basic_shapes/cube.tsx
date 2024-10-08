import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxGeometry, Mesh } from "three";

export default function Cube(props: {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const { pos, size, color } = props;
  const ref = useRef<Mesh>(new Mesh());

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });

  return (
    <mesh position={pos} ref={ref}>
      <boxGeometry args={size}></boxGeometry>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
