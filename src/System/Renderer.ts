import System from "./System";
import RendererComponent from "../component/Renderer";
import Camera from "../component/Camera";
import Scene from "../component/Scene";
import { Entity } from "../entity/types";

export default class Renderer extends System {
    public requiredComponents = new Set<Function>([RendererComponent, Camera, Scene]);

    public update(entities: Set<Entity>): void {
        entities.forEach((entity) => {
            const entityContainer = this.engine.getComponents(entity);

            const rendererComponent = entityContainer.get(RendererComponent)
            const renderer = rendererComponent.three;

            const cameraComponent = entityContainer.get(Camera)
            const camera = cameraComponent.three;

            const sceneComponent = entityContainer.get(Scene)
            const scene = sceneComponent.three;

            if (this.resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            renderer.render(scene, camera);
        });
    }

    private resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            renderer.setSize(width, height, false);
        }

        return needResize;
    }
}
