import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Component from "./Component";

export default class GLTFModel extends Component {
    three: THREE.Group

    constructor() {
        super();
    }

    public async init(loader: GLTFLoader, path: string) {
        const model = await loader.loadAsync(path);
        this.three = model.scene;
    }
}
