import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import {
  PositionalAudio,
  useAnimations,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";
import isMobileWidth from "./isMobileWidth";
import Helicopter from "./helicopter";

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }
  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const { scene, nodes, materials, animations } = useGLTF(
    "./Models/helicopter2.glb"
  );
  console.log(scene);
  nodes;
  materials;

  const { actions, names, mixer } = useAnimations(animations, scene);

  const NORMAL_SPEED = 1.6;
  const BOOST_SPEED = 3.2;
  const ROT_SPEED = degToRad(0.5);
  const MAX_Y = 6;

  const [isStarting, setStarting] = useState<Boolean>(false);

  const heliAudio = useRef<any>(null);
  const rb = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null!);
  const character = useRef<Group>(null!);
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null!);
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  const [, get] = useKeyboardControls();

  const isClicking = useRef(false);
  const isTouching = useRef(false);

  const isMobile = isMobileWidth();

  useEffect(() => {
    scene.traverse((child) => {
      child.castShadow = true;
    });
  });

  useEffect(() => {
    const onMouseDown = () => {
      isClicking.current = true;
    };
    const onMouseUp = () => {
      isClicking.current = false;
    };
    const onTouchingStart = () => {
      isTouching.current = true;
    };
    const onTouchingEnd = () => {
      isTouching.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onTouchingStart);
    document.addEventListener("touchend", onTouchingEnd);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onTouchingStart);
      document.removeEventListener("touchend", onTouchingEnd);
    };
  }, []);

  useFrame(({ camera, pointer, clock }) => {
    mixer.setTime(clock.getElapsedTime() * 2);

    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        y: 0,
        z: 0,
      };

      if (isStarting && vel.x <= 0.0001 && vel.y <= 0.0001 && vel.z <= 0.0001) {
        heliAudio.current.stop();
        actions[names[0]]?.reset().fadeIn(0.5).stop();
        actions[names[1]]?.reset().fadeIn(0.5).stop();
        setStarting(!isStarting);
      }

      if (get().forward) {
        movement.z = 1;
        movement.y += rb.current.translation().y < MAX_Y ? 1 : 0;
      }

      if (get().backward) {
        movement.z = -0.2;
      }

      let speed = !get().boost ? NORMAL_SPEED : BOOST_SPEED;

      if (isClicking.current || isTouching.current) {
        if (Math.abs(pointer.x) > 0.1) {
          movement.x = -pointer.x;
        }
        movement.z = pointer.y + 0.4;

        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = BOOST_SPEED;
        }
      }

      if (get().left) {
        movement.x = 1;
      }

      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROT_SPEED * movement.x * 0.5;
      }

      if (movement.x === 0 || movement.z === 0) {
        characterRotationTarget.current = 0;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        if (!isStarting) {
          heliAudio.current.play();
          setStarting(!isStarting);
          actions[names[0]]?.reset().fadeIn(0.5).play();
          actions[names[1]]?.reset().fadeIn(0.5).play();
        }
        characterRotationTarget.current =
          Math.atan2(movement.x, movement.z) * 0.2;
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.y = movement.y;
      }
      character.current.rotation.z = lerpAngle(
        character.current.rotation.z,
        -characterRotationTarget.current,
        isTouching.current ? 0.03 : 0.01
      );

      rb.current.setLinvel(vel, true);
    }

    // Camera
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <group>
      <RigidBody lockRotations ref={rb}>
        <group ref={container}>
          <group ref={cameraTarget} position-z={1.5} />
          <group
            ref={cameraPosition}
            position-y={!isMobile ? 10 : 16}
            position-z={!isMobile ? -10 : -14}
          />
          <PositionalAudio
            url="./Sounds/heliSound.mp3"
            distance={1}
            ref={heliAudio}
          />
          <group ref={character}>
            <Helicopter />
          </group>
        </group>
      </RigidBody>
    </group>
  );
};
