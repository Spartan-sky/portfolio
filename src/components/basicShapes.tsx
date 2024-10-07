export default function BasicShapes(props: {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const { pos, size, color } = props;

  return (
    <mesh position={pos}>
      <boxGeometry args={size}></boxGeometry>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
