import * as THREE from "three";
import AnimationMixer from "../component/AnimationMixer";
import GLTFModel from "../component/GLTFModel";
import { Entity } from "../entity/types";
import System from "./System";
import Animation from "../component/Animation";
import WinGameDetector from "../component/WinGameDetector";

export default class CharacterAnimationSystem extends System {
    public lastAnimationAction: THREE.AnimationAction;

    public requiredComponents = new Set<Function>([AnimationMixer, GLTFModel, Animation, WinGameDetector]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const components = this.engine.getComponents(entity);
            const mixer = components.get(AnimationMixer);
            const model = components.get(GLTFModel).three;
            const animation = components.get(Animation);
            const winGameDetector = components.get(WinGameDetector);

            mixer.three.update(this.engine.getDeltaTime() * animation.timeScale);

            if (winGameDetector.value) {
                animation.name = "6 Win";
            }

            if (this.lastAnimationAction && this.lastAnimationAction.getClip().name === animation.name) {
                return;
            }

            const clips = model.animations;
            const clip = THREE.AnimationClip.findByName(clips, animation.name);
            const action = mixer.three.clipAction(clip);

            if (this.lastAnimationAction) {
                this.lastAnimationAction.fadeOut(0.3);
            }

            action.reset();
            action.play();
            this.lastAnimationAction = action;
        });
    }
}
