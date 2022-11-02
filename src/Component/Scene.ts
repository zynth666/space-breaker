import Component from "./Component";

export default class Scene extends Component {
    scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        super();
        this.scene = scene
    }
}
