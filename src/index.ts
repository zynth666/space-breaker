import "./assets/sass/styles.scss";
import Engine from "./engine/Engine";
import * as THREE from "three";

import RenderSystem from "./system/RenderSystem";
import RendererInitializer from "./init/RendererInitializer";
import CharacterControllerSystem from "./system/CharacterControllerSystem";
import CharacterMovementSystem from "./system/CharacterMovementSystem";
import PlayerInitializer from "./init/PlayerInitializer";
import Level1Initializer from "./init/Level1Initializer";
import ArenaInitializer from "./init/ArenaInitializer";
import BallInitializer from "./init/BallInitializer";
import FireBallSystem from "./system/FireBallSystem";
import KeyboardControls from "./system/KeyboardControls";
import Scene from "./component/Scene";
import RAPIER, { World } from "@dimforge/rapier3d";
import ColliderDebugSystem from "./system/ColliderDebugSystem";
import PhysicsWorld from "./component/PhysicsWorld";
import BallMovementSystem from "./system/BallMovementSystem";
import AttachedBallMovementSystem from "./system/AttachedBallMovementSystem";
import HitDetectionSystem from "./system/HitDetectionSystem";
import RapierEventQueue from "./component/RapierEventQueue";
import HitSoundSystem from "./system/HitSoundSystem";
import CharacterSoundSystem from "./system/CharacterSoundSystem";
import CharacterAnimationSystem from "./system/CharacterAnimationSystem";
import DirectionalLightInitializer from "./init/DirectionalLightInitializer";
import AmbientLightInitializer from "./init/AmbientLightInitializer";
import titleTrackUrl from "./assets/audio/quentins-quest-theme-v2-drums.wav";
import SpaceDustInitializer from "./init/SpaceDustInitializer";
import DustAnimationSystem from "./system/DustAnimationSystem";
import WinGameSystem from "./system/WinGameSystem";
import LoseGameSystem from "./system/LoseGameSystem";

const engine = new Engine();
let physicsWorld: World;
let eventQueue: RAPIER.EventQueue;
let lastRender = 0;
let scene: THREE.Scene;

import('@dimforge/rapier3d').then(async RAPIER => {
    const world = new RAPIER.World({ x: 0.0, y: 0.0, z: 2.5 });
    physicsWorld = world;
    await init(world);
    eventQueue = addEventQueueEntity();
    requestAnimationFrame(renderFrame);
});

async function init(world: World) {
    /* const titleTrack = new Audio(titleTrackUrl);

    titleTrack.addEventListener("canplaythrough", () => {
        titleTrack.play();
    }); */

    const renderer = RendererInitializer.create(engine);
    const sceneComponent = engine.getComponents(renderer).get(Scene);
    scene = engine.getComponents(renderer).get(Scene).three;

    const worldEntity = engine.addEntity();
    engine.addComponent(worldEntity, new PhysicsWorld(world));
    engine.addComponent(worldEntity, sceneComponent);

    AmbientLightInitializer.create(scene);
    DirectionalLightInitializer.create(scene);
    SpaceDustInitializer.create(engine, scene);

    const player = await PlayerInitializer.create(engine, scene, world);
    BallInitializer.create(engine, scene, world, player);
    await ArenaInitializer.create(engine, world, sceneComponent);
    await Level1Initializer.create(engine, scene, world);

    KeyboardControls.init();
    const renderSystem = new RenderSystem();
    const characterControllerSystem = new CharacterControllerSystem();
    const fireBallSystem = new FireBallSystem();
    const characterMovementSystem = new CharacterMovementSystem();
    const attachedBallMovementSystem = new AttachedBallMovementSystem();
    const hitDetectionSystem = new HitDetectionSystem();
    const ballMovementSystem = new BallMovementSystem();
    const characterSoundSystem = new CharacterSoundSystem();
    const characterAnimationSystem = new CharacterAnimationSystem();
    const dustAnimationSystem = new DustAnimationSystem();
    const hitSoundSystem = new HitSoundSystem();
    const loseGameSystem = new LoseGameSystem();
    const winGameSystem = new WinGameSystem();
    const colliderDebugSystem = new ColliderDebugSystem();

    engine.addSystem(renderSystem);
    engine.addSystem(characterControllerSystem);
    engine.addSystem(fireBallSystem);
    engine.addSystem(characterMovementSystem);
    engine.addSystem(attachedBallMovementSystem);
    engine.addSystem(hitDetectionSystem);
    engine.addSystem(ballMovementSystem);
    engine.addSystem(characterSoundSystem);
    engine.addSystem(characterAnimationSystem);
    engine.addSystem(dustAnimationSystem);
    engine.addSystem(hitSoundSystem);
    engine.addSystem(loseGameSystem);
    engine.addSystem(winGameSystem);
    //engine.addSystem(colliderDebugSystem);
}

function renderFrame(timestamp: number) {
    physicsWorld.step(eventQueue);
    engine.update(timestamp - lastRender);
    lastRender = timestamp;
    requestAnimationFrame(renderFrame);
}

function addEventQueueEntity() {
    const eventQueue = new RAPIER.EventQueue(true);
    const entity = engine.addEntity();
    engine.addComponent(entity, new RapierEventQueue(eventQueue));
    engine.addComponent(entity, new PhysicsWorld(physicsWorld));
    engine.addComponent(entity, new Scene(scene));

    return eventQueue;
}
