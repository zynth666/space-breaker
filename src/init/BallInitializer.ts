import RAPIER, { World } from "@dimforge/rapier3d";
import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import CharacterController from "../component/CharacterController";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import GLTFModel from "../component/GLTFModel";
import Mesh from "../component/Mesh";
import ParentEntity from "../component/ParentEntity";
import Position from "../component/Position";
import Sound from "../component/Sound";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";
import { TripleTuple } from "../types";
import ballHitUrl from "../assets/audio/ball-hit.wav";
import Hit from "../component/Hit";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLTFInitializer from "./GLTFInitializer";
import astroidUrl from "../assets/gltf/Asteroid.gltf";
import WinGameDetector from "../component/WinGameDetector";

export default class BallInitializer {
    public static async create(engine: Engine, scene: THREE.Scene, world: World, player: Entity): Promise<Entity> {
        const playerContainer = engine.getComponents(player);
        const playerScene = playerContainer.get(GLTFModel).three.scene;

        const loader = new GLTFLoader();
        const ball = await GLTFInitializer.create(engine, loader, astroidUrl);
        const mesh = engine.getComponents(ball).get(GLTFModel).three.scene.getObjectByName("Scene") as THREE.Mesh;
        mesh.scale.set(0.2, 0.2, 0.2);

        const ballFireable = new Fireable();
        engine.addComponent(ball, ballFireable);

        const offset = playerScene.position.z;
        const positionOffset: TripleTuple<number> = [0, 0, offset];
        const position = new Position(...positionOffset);
        engine.addComponent(ball, position);

        const rigidBody = new DynamicRigidBody(world);
        rigidBody.value.lockTranslations(true, true);
        rigidBody.value.setEnabledTranslations(true, false, true, true);
        rigidBody.value.setGravityScale(0, true);
        engine.addComponent(ball, rigidBody);

        const collider = new BallCollider(0.75, world, rigidBody.value);
        collider.value.setRestitution(1.5);
        collider.value.setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Max);
        collider.value.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
        engine.addComponent(ball, collider);

        const characterController = new CharacterController(world);
        engine.addComponent(ball, characterController);

        const parentEntity = new ParentEntity(player);
        engine.addComponent(ball, parentEntity);

        const sound = new Sound(ballHitUrl);
        engine.addComponent(ball, sound);

        const hit = new Hit();
        engine.addComponent(ball, hit);

        const winGameDetector = new WinGameDetector();
        engine.addComponent(ball, winGameDetector);

        scene.add(mesh);

        return ball;
    }
}
