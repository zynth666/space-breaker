import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Component from "./Component";

export default class GLTFModel extends Component {
    three: GLTF

    constructor() {
        super();
    }

    public async init(loader: GLTFLoader, path: string) {
        this.three = await loader.loadAsync(path);
    }
}
