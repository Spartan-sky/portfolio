import { useRef } from "react";
import { Mesh } from "three";

export default function Sphere(props: {
  pos: [number, number, number];
  rad: number;
  widthSeg: number;
  heightSeg: number;
  color: string;
}) {
  const { pos, rad, widthSeg, heightSeg, color } = props;
  const ref = useRef<Mesh>(new Mesh());

  return (
    <mesh position={pos} ref={ref}>
      <sphereGeometry args={[rad, widthSeg, heightSeg]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

Sphere.defaultProps = {
  pos: [0, 0, 0],
  rad: 1,
  widthSeg: 32,
  heightSeg: 16,
  color: "white",
};
