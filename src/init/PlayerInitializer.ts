import * as THREE from "three";
import Controller from "../component/Controller";
import Velocity from "../component/Velocity";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";
import CharacterController from "../component/CharacterController";
import RAPIER, { World } from "@dimforge/rapier3d";
import type { TripleTuple } from "../types";
import CuboidCollider from "../component/CuboidCollider";
import Position from "../component/Position";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLTFInitializer from "./GLTFInitializer";
import spaceshipUrl from "../assets/gltf/Spaceship_Quentin.gltf";
import GLTFModel from "../component/GLTFModel";
import { Mesh } from "three";
import Sound from "../component/Sound";
import swivelUrl from "../assets/audio/swivel-long.wav";
import AnimationMixer from "../component/AnimationMixer";
import Animation from "../component/Animation";

export default class PlayerInitializer {
    public static async create(engine: Engine, scene: THREE.Scene, world: World): Promise<Entity> {
        const dimensions: TripleTuple<number> = [6, 1, 6.5];
        const loader = new GLTFLoader();
        const playerEntity = await GLTFInitializer.create(engine, loader, spaceshipUrl);
        const mesh = engine.getComponents(playerEntity).get(GLTFModel).three.scene.getObjectByName("Scene") as Mesh;

        const position = new Position(0, 0, 20);
        mesh.position.set(position.value.x, position.value.y, position.value.z);
        mesh.rotation.set(0, Math.PI / 2, 0);
        mesh.scale.set(.1, .1, .1);
        scene.add(mesh);

        const playerVelocity = new Velocity();
        const playerController = new Controller({ "ArrowLeft": "left", "ArrowRight": "right" });

        const rigidBody = new KinematicPositionBasedRigidBody(world);
        rigidBody.value.enableCcd(true);
        rigidBody.value.lockRotations(true, true);
        rigidBody.value.setTranslation(position.value, true);
        rigidBody.value.lockTranslations(true, true);
        rigidBody.value.setEnabledTranslations(true, false, false, true);

        const characterController = new CharacterController(world);
        const playerCollider = new CuboidCollider(...dimensions, world, rigidBody.value);
        playerCollider.value.setRestitution(4);
        playerCollider.value.setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Max);

        engine.addComponent(playerEntity, playerVelocity);
        engine.addComponent(playerEntity, playerController);
        engine.addComponent(playerEntity, rigidBody);
        engine.addComponent(playerEntity, characterController);
        engine.addComponent(playerEntity, playerCollider);
        engine.addComponent(playerEntity, position);
        engine.addComponent(playerEntity, new Sound(swivelUrl));
        engine.addComponent(playerEntity, new AnimationMixer(mesh));
        engine.addComponent(playerEntity, new Animation("1 Idle", 0.001));

        return playerEntity;
    }
}
