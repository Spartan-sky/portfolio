import { Physics, RigidBody } from "@react-three/rapier";
import { CharacterController } from "./characterController";

export default function Scene() {
  return (
    <>
      <Physics>
        <mesh castShadow position={[0, 5, 0]}>
          <CharacterController />
        </mesh>
        <RigidBody type="fixed">
          <group>
            <mesh receiveShadow position={[0, 0, 0]} scale={[100, 1, 100]}>
              <boxGeometry />
            </mesh>
          </group>
        </RigidBody>
      </Physics>
    </>
  );
}
