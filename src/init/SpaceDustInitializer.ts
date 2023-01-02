import * as THREE from "three";
import Engine from "../engine/Engine";
import InstancedMesh from "../component/InstancedMesh";
import PointLight from "../component/PointLight";
import ParticleInformation from "../component/ParticleInformation";
import Random from "canvas-sketch-util/random";

export default class SpaceDustInitializer {
    public static create(engine: Engine, scene: THREE.Scene) {
        const dustGeometry = new THREE.DodecahedronGeometry(1, 0);
        const dustMaterial = new THREE.MeshPhongMaterial({ color: 0x010101 });
        const count = 1000;
        const mesh = new InstancedMesh(dustGeometry, dustMaterial, count);

        const dummy = new THREE.Object3D();

        const offsetX = -100;
        const offsetY = -100;
        const offsetZ = -100;
        const spacing = 100;
        let index = 0;

        const outsidePosition = new THREE.Vector3(999, 999, 999);

        const particleSystemEntity = engine.addEntity();
        engine.addComponent(particleSystemEntity, mesh);

        const particleInformation = new Map<number, { time: number, speed: number }>();

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                for (let z = 0; z < 10; z++) {
                    const randomX = this.getRandomPositionComponent(offsetX, spacing);
                    const randomY = this.getRandomPositionComponent(offsetY, spacing);
                    const randomZ = this.getRandomPositionComponent(offsetZ, spacing);

                    if (!this.isInArena(randomX, randomY, randomZ)) {
                        dummy.position.set(randomX, randomY, randomZ);
                    } else {
                        dummy.position.copy(outsidePosition);
                    }

                    dummy.updateMatrix();
                    mesh.three.setMatrixAt(index++, dummy.matrix);

                    if (index % 100 === 0) {
                        this.addPointLight(scene, engine, dummy.position);
                    }

                    let time = Random.range(1, 100);
                    let speed = Random.range(0.01, 0.015) / 2;

                    particleInformation.set(index, { time, speed });
                }
            }
        }

        mesh.three.instanceMatrix.needsUpdate = true;
        scene.add(mesh.three);

        engine.addComponent(particleSystemEntity, new ParticleInformation(particleInformation));
    }

    private static getRandomPositionComponent(offset: number, spacing: number): number {
        return Math.random() * offset + Math.random() * spacing;
    }

    private static isInArena(x: number, y: number, z: number): boolean {
        return x > -40 && x < 40 && y > -10 && y < 100 && z > -50 && z < 50;
    }

    private static getRandomColor(): number {
        return Math.random() * 0xffffff;
    }

    private static addPointLight(scene: THREE.Scene, engine: Engine, position: THREE.Vector3) {
        const entity = engine.addEntity();
        const pointLight = new PointLight(this.getRandomColor(), 1, position.length() * 10, 2);
        pointLight.three.position.copy(position);
        scene.add(pointLight.three);
        engine.addComponent(entity, pointLight);
        //scene.add(new THREE.PointLightHelper(pointLight.three, 5));
    }
}
