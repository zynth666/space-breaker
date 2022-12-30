import Component from "./Component";

export default class Camera extends Component {
    three: THREE.PerspectiveCamera;

    constructor(camera: THREE.PerspectiveCamera) {
        super();
        this.three = camera
    }
}
