import * as THREE from "three";
import Component from "./Component";

export default class Size extends Component {
    public value: THREE.Vector3;

    constructor(width: number, height: number, depth: number) {
        super();
        this.value = new THREE.Vector3(width, height, depth);
    }
}
