import * as THREE from "three";
import { World } from "@dimforge/rapier3d";
import Scene from "../component/Scene";
import Engine from "../engine/Engine";
import arenaUrl from "../assets/gltf/Arena.gltf";
import GLTFInitializer from "./GLTFInitializer";
import GLTFModel from "../component/GLTFModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class ArenaInitializer {
    public static async create(engine: Engine, world: World, scene: Scene) {
        const loader = new GLTFLoader();
        const arena = await GLTFInitializer.create(engine, loader, arenaUrl);
        const mesh = engine.getComponents(arena).get(GLTFModel).three.scene.getObjectByName("Scene") as THREE.Mesh;

        mesh.scale.set(3, 3, 3);
        mesh.rotation.set(0, Math.PI / 2, 0);
        mesh.position.set(0, -2.5, 0);
        scene.three.add(mesh);
    }
}
