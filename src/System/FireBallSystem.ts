import * as THREE from "three";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import GLTFModel from "../component/GLTFModel";
import Mesh from "../component/Mesh";
import ParentEntity from "../component/ParentEntity";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class FireBallSystem extends System {
    public requiredComponents = new Set<Function>([Fireable, DynamicRigidBody, ParentEntity]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const fireable = entityContainer.get(Fireable);
            const mesh = entityContainer.get(Mesh).three;
            const rigidBody = entityContainer.get(DynamicRigidBody);
            const paddle = entityContainer.get(ParentEntity);
            const paddleComponents = this.engine.getComponents(paddle.value);
            const paddleMesh = paddleComponents.get(GLTFModel).three.scene;

            if (KeyboardControls.isPressed(fireable.fireKey)) {
                this.engine.removeComponent(entity, Fireable);

                const forward = new THREE.Vector3(0, 0, -1);
                const paddleVelocity = paddleComponents.get(Velocity) ?? new Velocity();

                const velocity = new Velocity();
                velocity.vec.copy(forward.add(paddleVelocity.vec).multiplyScalar(10));
                rigidBody.value.setLinvel(velocity.vec, true);
                rigidBody.value.setAngvel(velocity.vec, true);
                this.engine.addComponent(entity, velocity);

                const scene = paddleMesh.parent;
                scene.attach(mesh);
            }
        });
    }
}
