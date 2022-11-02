import Component from "./Component";

export default class Renderer extends Component {
    renderer: THREE.WebGLRenderer;

    constructor(renderer: THREE.WebGLRenderer) {
        super();
        this.renderer = renderer;
    }
}
