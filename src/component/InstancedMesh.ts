import Component from "./Component";
import * as THREE from "three";

export default class InstancedMesh extends Component {
    three: THREE.InstancedMesh;

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material, count: number) {
        super();
        this.three = new THREE.InstancedMesh(geometry, material, count);
    }
}
