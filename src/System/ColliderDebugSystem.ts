import * as THREE from "three";
import CuboidCollider from "../component/CuboidCollider";
import Dirty from "../component/Dirty";
import Mesh from "../component/Mesh";
import Scene from "../component/Scene";
import Size from "../component/Size";
import { Entity } from "../entity/types";
import System from "./System";

export default class ColliderDebugSystem extends System {
    public requiredComponents = new Set<Function>([CuboidCollider, Size, Scene, Dirty]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const collider = entityContainer.get(CuboidCollider);
            const size = entityContainer.get(Size);
            const scene = entityContainer.get(Scene);
            const dirty = entityContainer.get(Dirty);

            if (!dirty.value) {
                return;
            }

            console.log("ColliderDebugSystem: Updating collider debug mesh");

            const boxGeometry = new THREE.BoxGeometry(size.value.x, size.value.y, size.value.z);
            const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            boxMaterial.wireframe = true;
            const mesh = new Mesh(boxGeometry, boxMaterial);

            scene.three.add(mesh.three);

            const translation = collider.value.translation();
            mesh.three.position.set(translation.x, translation.y, translation.z);
            dirty.value = false;
        });
    }
}
