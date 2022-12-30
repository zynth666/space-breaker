import * as THREE from "three";
import Component from "./Component";

export default class Position extends Component {
    public value: THREE.Vector3;

    constructor(x: number, y: number, z: number) {
        super();
        this.value = new THREE.Vector3(x, y, z);
    }
}
