import * as THREE from "three";
import Engine from "../engine/Engine";
import InstancedMesh from "../component/InstancedMesh";

export default class SpaceDustInitializer {
    public static create(engine: Engine, scene: THREE.Scene) {
        const dustGeometry = new THREE.DodecahedronGeometry(1, 0);
        const dustMaterial = new THREE.MeshPhongMaterial({ color: 0x010101 });
        const count = 100000;
        const mesh = new InstancedMesh(dustGeometry, dustMaterial, count);

        const dummy = new THREE.Object3D();

        const offsetX = -1000;
        const offsetY = -100;
        const offsetZ = -1000;
        const spacing = 1000;
        let index = 0;

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 100; y++) {
                for (let z = 0; z < 100; z++) {
                    const randomX = this.getRandomPositionComponent(offsetX, spacing);
                    const randomY = this.getRandomPositionComponent(offsetY, spacing);
                    const randomZ = this.getRandomPositionComponent(offsetZ, spacing);

                    dummy.position.set(randomX, randomY, randomZ);
                    dummy.updateMatrix();
                    mesh.three.setMatrixAt(index++, dummy.matrix);
                }
            }
        }

        mesh.three.instanceMatrix.needsUpdate = true;
        scene.add(mesh.three);
    }

    private static getRandomPositionComponent(offset: number, spacing: number): number {
        return Math.random() * offset + Math.random() * spacing;
    }
}
