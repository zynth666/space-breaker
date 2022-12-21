import * as THREE from "three";
import Renderer from "../component/Renderer";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";
import CameraInitializer from "./CameraInitializer";
import SceneInitializer from "./SceneInitializer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default class RendererInitializer {
    public static create(engine: Engine): Entity {
        const canvas = document.querySelector('#canvas');
        const webGlRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
        webGlRenderer.setClearColor(0xbfd1e5);
        webGlRenderer.outputEncoding = THREE.sRGBEncoding;
        webGlRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        webGlRenderer.shadowMap.enabled = true;

        const pmremGenerator = new THREE.PMREMGenerator(webGlRenderer);
        pmremGenerator.compileEquirectangularShader();

        const envMap = pmremGenerator.fromScene(new RoomEnvironment()).texture;

        const scene = SceneInitializer.create(envMap);
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
