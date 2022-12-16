import "./assets/sass/styles.scss";
import Engine from "./engine/Engine";

import RenderSystem from "./system/RenderSystem";
import RendererInitializer from "./init/RendererInitializer";
import ControllerSystem from "./system/ControllerSystem";
import CharacterMovementSystem from "./system/CharacterMovementSystem";
import PaddleInitializer from "./init/PaddleInitializer";
import Level1Initializer from "./init/Level1Initializer";
import ArenaInitializer from "./init/ArenaInitializer";
import BallInitializer from "./init/BallInitializer";
import FireBallSystem from "./system/FireBallSystem";
import KeyboardControls from "./system/KeyboardControls";
import Scene from "./component/Scene";
import { World } from "@dimforge/rapier3d";
import RectangularLightInitializer from "./init/RectangularLightInitializer";
import ColliderDebugSystem from "./system/ColliderDebugSystem";
import PhysicsWorld from "./component/PhysicsWorld";

const engine = new Engine();
let physicsWorld: World;

import('@dimforge/rapier3d').then(async RAPIER => {
    const world = new RAPIER.World({ x: 0.0, y: 0.0, z: 0.0 });
    physicsWorld = world;

    await init(world);
    renderFrame();
});

async function init(world: World) {
    KeyboardControls.init();
    const renderSystem = new RenderSystem();
    const controllerSystem = new ControllerSystem();
    const fireBallSystem = new FireBallSystem();
    const characterMovementSystem = new CharacterMovementSystem();
    const colliderDebugSystem = new ColliderDebugSystem();

    engine.addSystem(renderSystem);
    engine.addSystem(controllerSystem);
    engine.addSystem(fireBallSystem);
    engine.addSystem(characterMovementSystem);
    engine.addSystem(colliderDebugSystem);

    const renderer = RendererInitializer.create(engine);
    const sceneComponent = engine.getComponents(renderer).get(Scene);
    const scene = engine.getComponents(renderer).get(Scene).three;

    const worldEntity = engine.addEntity();
    engine.addComponent(worldEntity, new PhysicsWorld(world));
    engine.addComponent(worldEntity, sceneComponent);

    RectangularLightInitializer.create(engine, scene);

    /* const dustGeometry = new THREE.DodecahedronGeometry(1, 0);
    const dustMaterial = new THREE.MeshPhongMaterial({ color: 0x010101 });
    const mesh = new Mesh(dustGeometry, dustMaterial);
    mesh.three.position.set(30, 0, 0);

    scene.add(mesh.three); */

    const paddle = PaddleInitializer.create(engine, scene, world);

    BallInitializer.create(engine, paddle);

    const arena = ArenaInitializer.create(engine, world, sceneComponent);
    scene.add(arena);

    await Level1Initializer.create(engine, scene);
}

function renderFrame() {
    physicsWorld.step();
    engine.update();
    requestAnimationFrame(renderFrame);
}
