import GLTFModel from "../component/GLTFModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFModelType<T> = new () => T

export default class GLTFInitializer {
    public static async create<T extends GLTFModel>(c: GLTFModelType<T>, loader: GLTFLoader, path: string): Promise<T> {
        const model = new c();
        await model.init(loader, path);

        return model;
    }
}
