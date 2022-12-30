import Component from "./Component";

export default class Renderer extends Component {
    three: THREE.WebGLRenderer;

    constructor(renderer: THREE.WebGLRenderer) {
        super();
        this.three = renderer;
    }
}
