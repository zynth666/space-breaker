import * as THREE from "three";
import { World } from "@dimforge/rapier3d";
import Scene from "../component/Scene";
import Engine from "../engine/Engine";
import arenaUrl from "../assets/gltf/Arena.gltf";
import GLTFInitializer from "./GLTFInitializer";
import GLTFModel from "../component/GLTFModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TripleTuple } from "../types";
import CuboidCollider from "../component/CuboidCollider";

export default class ArenaInitializer {
    public static async create(engine: Engine, world: World, scene: Scene) {
        const loader = new GLTFLoader();
        const arena = await GLTFInitializer.create(engine, loader, arenaUrl);
        const mesh = engine.getComponents(arena).get(GLTFModel).three.scene.getObjectByName("Scene") as THREE.Mesh;

        mesh.scale.set(3, 3, 3);
        mesh.rotation.set(0, Math.PI / 2, 0);
        mesh.position.set(0, -2.5, 0);
        scene.three.add(mesh);

        const arenaLeftPosition: TripleTuple<number> = [-22, 0, 0];
        const arenaRightPosition: TripleTuple<number> = [22, 0, 0];
        const arenaTopPosition: TripleTuple<number> = [0, 0, -29];
        const arenaBottomPosition: TripleTuple<number> = [0, 0, 29];

        const horizontalSize: TripleTuple<number> = [1, 1, 57];
        const verticalSize: TripleTuple<number> = [45, 1, 1];

        this.createArenaWallCollider(engine, world, scene, arenaLeftPosition, horizontalSize);
        this.createArenaWallCollider(engine, world, scene, arenaRightPosition, horizontalSize);
        this.createArenaWallCollider(engine, world, scene, arenaTopPosition, verticalSize);
        this.createArenaWallCollider(engine, world, scene, arenaBottomPosition, verticalSize);
    }

    private static createArenaWallCollider(engine: Engine, world: World, scene: Scene, position: TripleTuple<number>, size: TripleTuple<number>) {
        const collider = new CuboidCollider(...size, world);
        collider.value.setTranslation(new THREE.Vector3(...position));
        const colliderEntity = engine.addEntity();
        engine.addComponent(colliderEntity, collider);
    }
}
