import * as THREE from "three";
import Component from "./Component";

export default class AnimationMixer extends Component {
    public three: THREE.AnimationMixer;

    constructor(object: THREE.Object3D) {
        super();
        this.three = new THREE.AnimationMixer(object);
    }
}
