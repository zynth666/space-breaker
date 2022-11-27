import * as THREE from "three";
import Component from "./Component";

export default class Direction extends Component {
    vec: THREE.Vector3;

    constructor() {
        super();

        this.vec = new THREE.Vector3(0, 0, 0).normalize();
    }
}
