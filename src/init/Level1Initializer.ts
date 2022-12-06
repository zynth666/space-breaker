import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cubeUrl from "../assets/gltf/MetalCube.gltf";
import GLTFInitializer from "../init/GLTFInitializer";
import GLTFModel from "../component/GLTFModel";
import * as THREE from "three";
import Scene from "../component/Scene";
import { Mesh } from "three";

export default class Level1Initializer {
    public static async init(scene: Scene) {
        const count = 50;
        const loader = new GLTFLoader();
        const brickGLTF = await GLTFInitializer.create(GLTFModel, loader, cubeUrl);

        const brick = brickGLTF.three.scene.getObjectByName("Cube") as Mesh;
        const instancedMesh = new THREE.InstancedMesh(brick.geometry, brick.material, count);

        const dummy = new THREE.Object3D();

        const offsetX = 9;
        let index = 0;
        for (let i = 0; i <= count / 10; i++) {
            for (let j = 0; j < count / 5; j++) {
                dummy.position.set(offsetX - j * 2, 0, i * 2);
                dummy.updateMatrix();
                instancedMesh.setMatrixAt(index++, dummy.matrix);
            }
        }

        instancedMesh.instanceMatrix.needsUpdate = true;
        scene.three.add(instancedMesh);
    }
}
