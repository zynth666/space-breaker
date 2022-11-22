import * as THREE from "three";
import Component from "./Component";

export default class Rotation extends Component {
    axis: THREE.Vector3;
    velocity: number;

    constructor(axis: THREE.Vector3, velocity: number) {
        super();

        this.axis = axis.normalize();
        this.velocity = velocity;
    }
}
