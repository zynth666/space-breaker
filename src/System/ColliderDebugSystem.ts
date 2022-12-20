import * as THREE from "three";
import PhysicsWorld from "../component/PhysicsWorld";
import Scene from "../component/Scene";
import { Entity } from "../entity/types";
import System from "./System";

export default class ColliderDebugSystem extends System {
    private lines: THREE.LineSegments;

    public requiredComponents = new Set<Function>([PhysicsWorld, Scene]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const physicsWorld = entityContainer.get(PhysicsWorld);
            const scene = entityContainer.get(Scene);

            if (!this.lines) {
                let material = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    vertexColors: true
                });
                let geometry = new THREE.BufferGeometry();
                this.lines = new THREE.LineSegments(geometry, material);
                scene.three.add(this.lines);
            }

            let buffers = physicsWorld.value.debugRender();
            this.lines.geometry.setAttribute('position', new THREE.BufferAttribute(buffers.vertices, 3));
            this.lines.geometry.setAttribute('color', new THREE.BufferAttribute(buffers.colors, 4));
        });
    }
}
