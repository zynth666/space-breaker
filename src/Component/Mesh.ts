import Component from "./Component";
import * as THREE from "three";

export default class Mesh extends Component {
    three: THREE.Mesh;

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
        super();
        this.three = new THREE.Mesh(geometry, material);
    }
}
