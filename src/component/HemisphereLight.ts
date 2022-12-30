import * as THREE from "three";
import Component from "./Component";

export default class HemisphereLight extends Component {
    three: THREE.HemisphereLight;

    constructor(skyColor?: THREE.ColorRepresentation, groundColor?: THREE.ColorRepresentation, intensity?: number) {
        super();
        this.three = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    }
}
