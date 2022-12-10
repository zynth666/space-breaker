import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cubeUrl from "../assets/gltf/MetalCube.gltf";
import GLTFInitializer from "../init/GLTFInitializer";
import GLTFModel from "../component/GLTFModel";
import * as THREE from "three";
import { Mesh } from "three";
import Engine from "../engine/Engine";

export default class Level1Initializer {
    public static async create(engine: Engine, scene: THREE.Scene) {
        const count = 70;
        const loader = new GLTFLoader();
        const brickEntity = await GLTFInitializer.create(engine, loader, cubeUrl);

        const brick = engine.getComponents(brickEntity).get(GLTFModel).three.scene.getObjectByName("Cube") as Mesh;
        const instancedMesh = new THREE.InstancedMesh(brick.geometry, brick.material, count);

        const dummy = new THREE.Object3D();

        const offsetX = 14;
        const offsetZ = -20;
        const spacing = 3;
        let index = 0;

        for (let i = 0; i <= count / 10; i++) {
            for (let j = 0; j < count / 7; j++) {
                dummy.position.set(offsetX - j * spacing, 0, offsetZ + i * spacing);
                dummy.updateMatrix();
                instancedMesh.setMatrixAt(index++, dummy.matrix);
            }
        }

        instancedMesh.instanceMatrix.needsUpdate = true;
        scene.add(instancedMesh);
    }
}
