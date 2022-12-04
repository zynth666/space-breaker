import "./assets/sass/styles.scss";
import Ammo from 'ammojs-typed';
import Engine from "./engine/Engine";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import RenderSystem from "./system/RenderSystem";
import Renderer from "./component/Renderer";
import Scene from "./component/Scene";
import Camera from "./component/Camera";
import SceneInitializer from "./init/SceneInitializer";
import RendererInitializer from "./init/RendererInitializer";
import CameraInitializer from "./init/CameraInitializer";
import HemisphereLightInitializer from "./init/HemisphereLightInitializer";
import HemisphereLight from "./component/HemisphereLight";
import DirectionalLightInitializer from "./init/DirectionalLightInitializer";
import DirectionalLight from "./component/DirectionalLight";
import GLTFInitializer from "./init/GLTFInitializer";
import GLTFModel from "./component/GLTFModel";

import cubeUrl from "./assets/gltf/MetalCube.gltf";
import Mesh from "./component/Mesh";
import * as THREE from "three";
import Direction from "./component/Direction";
import ControllerSystem from "./system/ControllerSystem";
import Controller from "./component/Controller";
import Velocity from "./component/Velocity";
import MovementSystem from "./system/MovementSystem";
import PaddleInitializer from "./init/PaddleInitializer";

const engine = new Engine();

Ammo(Ammo).then(async () => {
    await init();
    renderFrame();
});

async function init() {
    const renderSystem = new RenderSystem();

    const rendererComponent = RendererInitializer.create(Renderer);
    const sceneComponent = SceneInitializer.create(Scene);
    const cameraComponent = CameraInitializer.create(Camera);

    const renderEntity = engine.addEntity();
    engine.addComponent(renderEntity, rendererComponent);
    engine.addComponent(renderEntity, sceneComponent);
    engine.addComponent(renderEntity, cameraComponent);

    engine.addSystem(renderSystem);

    new OrbitControls(cameraComponent.three, rendererComponent.three.domElement);

    const hemiLight = HemisphereLightInitializer.create(HemisphereLight, engine);
    sceneComponent.three.add(hemiLight.three);

    const dirLight = DirectionalLightInitializer.create(DirectionalLight, engine);
    sceneComponent.three.add(dirLight.three);

    const loader = new GLTFLoader();
    const brick = await GLTFInitializer.create(GLTFModel, loader, cubeUrl);
    sceneComponent.three.add(brick.three);
    const brickEntity = engine.addEntity();
    engine.addComponent(brickEntity, brick);

    /* const dustGeometry = new THREE.DodecahedronGeometry(1, 0);
    const dustMaterial = new THREE.MeshPhongMaterial({ color: 0x010101 });
    const mesh = new Mesh(dustGeometry, dustMaterial);
    mesh.three.position.set(30, 0, 0);

    sceneComponent.three.add(mesh.three); */

    const paddle = PaddleInitializer.create(Mesh, engine);
    sceneComponent.three.add(paddle.three);

    const controllerSystem = new ControllerSystem();
    engine.addSystem(controllerSystem);

    const movementSystem = new MovementSystem();
    engine.addSystem(movementSystem);

}

function renderFrame() {
    engine.update();
    requestAnimationFrame(renderFrame);
}
