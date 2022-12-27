import * as THREE from "three";
import Component from "./Component";

export default class PointLight extends Component {
    public three: THREE.PointLight;

    constructor(color?: number, intensity?: number, distance?: number, decay?: number) {
        super();
        this.three = new THREE.PointLight(color, intensity, distance, decay);
    }
}
