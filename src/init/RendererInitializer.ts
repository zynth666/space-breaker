import * as THREE from "three";
import Renderer from "../component/Renderer";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";
import CameraInitializer from "./CameraInitializer";
import SceneInitializer from "./SceneInitializer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class RendererInitializer {
    public static create(engine: Engine): Entity {
        const canvas = document.querySelector('#canvas');
        const webGlRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
        webGlRenderer.setClearColor(0xbfd1e5);
        webGlRenderer.outputEncoding = THREE.sRGBEncoding;
        webGlRenderer.shadowMap.enabled = true;

        const scene = SceneInitializer.create();
        const cameraComponent = CameraInitializer.create();

        const rendererComponent = new Renderer(webGlRenderer);
        const renderEntity = engine.addEntity();
        engine.addComponent(renderEntity, rendererComponent);
        engine.addComponent(renderEntity, scene);
        engine.addComponent(renderEntity, cameraComponent);
        new OrbitControls(cameraComponent.three, rendererComponent.three.domElement);
        return renderEntity;
    }
}
