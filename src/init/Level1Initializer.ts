import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cubeUrl from "../assets/gltf/SpaceCube.gltf";
import GLTFModel from "../component/GLTFModel";
import Engine from "../engine/Engine";
import Position from "../component/Position";
import CuboidCollider from "../component/CuboidCollider";
import RAPIER, { World } from "@dimforge/rapier3d";
import { Entity } from "../entity/types";
import { Mesh } from "three";
import MeshComponent from "../component/Mesh";
import Breakable from "../component/Breakable";
import Hit from "../component/Hit";
import breakCubeUrl from "../assets/audio/break-cube.wav";
import Sound from "../component/Sound";

export default class Level1Initializer {
    public static async create(engine: Engine, scene: THREE.Scene, world: World) {
        const loader = new GLTFLoader();
        const model = new GLTFModel();
        await model.init(loader, cubeUrl);
        const cube = model.three.scene.getObjectByName("Cube") as Mesh;
        const geometry = cube.geometry;
        const material = cube.material as THREE.Material;

        const count = 50;
        const offsetX = 18;
        const offsetZ = -20;
        const spacing = 4;

        for (let i = 0; i < count / 10; i++) {
            for (let j = 0; j < count / 5; j++) {
                const entity = engine.addEntity();
                const cube = new MeshComponent(geometry, material);
                engine.addComponent(entity, cube);
                cube.three.position.set(offsetX - j * spacing, 0, offsetZ + i * spacing);
                this.createCubeEntity(entity, engine, world, cube.three.position);
                scene.add(cube.three);
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
        engine.addComponent(entity, new Breakable());
        engine.addComponent(entity, new Hit());
        engine.addComponent(entity, new Sound(breakCubeUrl));
    }
}
