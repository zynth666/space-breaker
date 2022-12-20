import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cubeUrl from "../assets/gltf/SpaceCube.gltf";
import GLTFInitializer from "../init/GLTFInitializer";
import GLTFModel from "../component/GLTFModel";
import * as THREE from "three";
import { Mesh } from "three";
import Engine from "../engine/Engine";
import Position from "../component/Position";
import CuboidCollider from "../component/CuboidCollider";
import RAPIER, { World } from "@dimforge/rapier3d";
import { Entity } from "../entity/types";

export default class Level1Initializer {
    public static async create(engine: Engine, scene: THREE.Scene, world: World) {
        const count = 70;
        const loader = new GLTFLoader();
        const offsetX = 18;
        const offsetZ = -20;
        const spacing = 4;

        for (let i = 0; i < count / 10; i++) {
            for (let j = 0; j < count / 7; j++) {
                const cubeEntity = await GLTFInitializer.create(engine, loader, cubeUrl);
                const cube = engine.getComponents(cubeEntity).get(GLTFModel).three.scene.getObjectByName("Cube") as Mesh;
                cube.position.set(offsetX - j * spacing, 0, offsetZ + i * spacing);
                this.createCubeEntity(cubeEntity, engine, world, cube.position);
                scene.add(cube);
            }
        }
    }

    private static createCubeEntity(entity: Entity, engine: Engine, world: World, dummyPosition: THREE.Vector3) {
        const position = new Position(0, 0, 0).value.copy(dummyPosition);
        engine.addComponent(entity, position);

        const collider = new CuboidCollider(2, 2, 2, world);
        collider.value.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
        collider.value.setTranslation(position);
        engine.addComponent(entity, collider);
    }
}
