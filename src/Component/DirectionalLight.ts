import * as THREE from "three";
import Component from "./Component";

export default class DirectionalLight extends Component {
    three: THREE.DirectionalLight;

    constructor(skyColor?: THREE.ColorRepresentation, intensity?: number) {
        super();
        this.three = new THREE.DirectionalLight(skyColor, intensity);
    }
}
