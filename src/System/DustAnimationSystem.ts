import * as THREE from "three";
import InstancedMesh from "../component/InstancedMesh";
import ParticleInformation from "../component/ParticleInformation";
import { Entity } from "../entity/types";
import System from "./System";

export default class DustAnimationSystem extends System {
    public requiredComponents = new Set<Function>([InstancedMesh, ParticleInformation]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const instancedMesh = entityContainer.get(InstancedMesh);
            const particles = entityContainer.get(ParticleInformation).map;

            const matrix = new THREE.Matrix4();
            const dummy = new THREE.Object3D();

            particles.forEach((particle, index) => {
                let { speed } = particle;
                const t = (particle.time += speed);
                const s = Math.cos(t);

                instancedMesh.three.getMatrixAt(index, matrix);
                matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

                dummy.rotation.set(s * 5, s * 5, s * 5);
                dummy.scale.set(s, s, s);
                dummy.updateMatrix();

                instancedMesh.three.setMatrixAt(index, dummy.matrix);
            });

            instancedMesh.three.instanceMatrix.needsUpdate = true;
        });
    }
}
