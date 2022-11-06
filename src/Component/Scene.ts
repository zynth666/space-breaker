import Component from "./Component";

export default class Scene extends Component {
    three: THREE.Scene;

    constructor(scene: THREE.Scene) {
        super();
        this.three = scene
    }
}
