import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cubeUrl from "../assets/gltf/MetalCube.gltf";
import GLTFInitializer from "../init/GLTFInitializer";
import GLTFModel from "../component/GLTFModel";
import * as THREE from "three";
import Scene from "../component/Scene";
import { Mesh } from "three";

export default class Level1Initializer {
    public static async init(scene: Scene) {
        const count = 10;
        const loader = new GLTFLoader();
        const brickGLTF = await GLTFInitializer.create(GLTFModel, loader, cubeUrl);

        const brick = brickGLTF.three.scene.getObjectByName("Cube") as Mesh;
        const instancedMesh = new THREE.InstancedMesh(brick.geometry, brick.material, count);

        const dummy = new THREE.Object3D();

        const offset = 9;

        for (let i = 0; i < count; i++) {
            dummy.position.set(offset - i * 2, 0, 0);
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
        }

        instancedMesh.instanceMatrix.needsUpdate = true;
        scene.three.add(instancedMesh);
    }
}
