import * as THREE from "three";
import Component from "./Component";

export default class Rotation extends Component {
    three: THREE.Quaternion;

    constructor(quaternion: THREE.Quaternion) {
        super();

        this.three = quaternion;
    }
}
