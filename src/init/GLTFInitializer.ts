import GLTFModel from "../component/GLTFModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Entity } from "../entity/types";
import Engine from "../engine/Engine";

export default class GLTFInitializer {
    public static async create(engine: Engine, loader: GLTFLoader, path: string): Promise<Entity> {
        const model = new GLTFModel();
        await model.init(loader, path);

        const entity = engine.addEntity();
        engine.addComponent(entity, model);

        return entity;
    }
}
