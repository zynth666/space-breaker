import "./assets/sass/styles.scss";
import * as THREE from "three";
import Ammo from 'ammojs-typed';
import Engine from "./engine/Engine";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from "./system/Renderer";
import RendererComponent from "./component/Renderer";
import Scene from "./component/Scene";
import Camera from "./component/Camera";
import Mesh from "./component/Mesh";
import SceneInitializer from "./init/SceneInitializer";
import RendererInitializer from "./init/RendererInitializer";
import CameraInitializer from "./init/CameraInitializer";
import HemisphereLightInitializer from "./init/HemisphereLightInitializer";
import HemisphereLight from "./component/HemisphereLight";
import DirectionalLightInitializer from "./init/DirectionalLightInitializer";
import DirectionalLight from "./component/DirectionalLight";

const engine = new Engine();

Ammo(Ammo).then(() => {
    init();
    renderFrame();
});

function init() {
    const renderer = new Renderer();

    const renderEntity = engine.addEntity();

    const rendererComponent = RendererInitializer.create(RendererComponent)
    const sceneComponent = SceneInitializer.create(Scene);
    const cameraComponent = CameraInitializer.create(Camera);

    engine.addComponent(renderEntity, rendererComponent);
    engine.addComponent(renderEntity, sceneComponent);
    engine.addComponent(renderEntity, cameraComponent);

    engine.addSystem(renderer);

    new OrbitControls(cameraComponent.three, rendererComponent.three.domElement);

    const hemiLight = HemisphereLightInitializer.create(HemisphereLight);
    sceneComponent.three.add(hemiLight.three);

    let dirLight = DirectionalLightInitializer.create(DirectionalLight)
    sceneComponent.three.add(dirLight.three);

    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    const mesh = new Mesh(cubeGeo, cubeMat);
    mesh.three.position.set(cubeSize + 1, cubeSize / 2, 0);
    sceneComponent.three.add(mesh.three);
}

function renderFrame() {
    engine.update();
    requestAnimationFrame(renderFrame);
}
