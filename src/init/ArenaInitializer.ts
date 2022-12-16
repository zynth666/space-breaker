import { Vector3, World } from "@dimforge/rapier3d";
import * as THREE from "three";
import CuboidCollider from "../component/CuboidCollider";
import Dirty from "../component/Dirty";
import Position from "../component/Position";
import Scene from "../component/Scene";
import Size from "../component/Size";
import Engine from "../engine/Engine";
import { TripleTuple } from "../types";

export default class ArenaInitializer {
    public static create(engine: Engine, world: World, scene: Scene): THREE.Group {
        const horizontalGeometry: TripleTuple<number> = [1, 1, 50];
        const arenaHorizontalGeometry = new THREE.BoxGeometry(...horizontalGeometry);
        const verticalGeometry: TripleTuple<number> = [41, 1, 1];
        const arenaVerticalGeometry = new THREE.BoxGeometry(...verticalGeometry);
        const floorGeometry: TripleTuple<number> = [40, 1, 50];
        const arenaFloorGeometry = new THREE.BoxGeometry(...floorGeometry);
        const arenaMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.1, metalness: 0 });

        const arenaLeftMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaRightMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaTopMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);
        const arenaBottomMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);
        const arenaFloorMesh = new THREE.Mesh(arenaFloorGeometry, arenaMaterial);

        const arenaLeftPosition: TripleTuple<number> = [-20, 0, 0];
        const arenaLeftPositionComponent = new Position(...arenaLeftPosition);
        arenaLeftMesh.position.set(...arenaLeftPosition);

        const arenaRightPosition: TripleTuple<number> = [20, 0, 0];
        const arenaRightPositionComponent = new Position(...arenaRightPosition);
        arenaRightMesh.position.set(...arenaRightPosition);

        const arenaTopPosition: TripleTuple<number> = [0, 0, -25];
        const arenaTopPositionComponent = new Position(...arenaTopPosition);
        arenaTopMesh.position.set(...arenaTopPosition);

        const arenaBottomPosition: TripleTuple<number> = [0, 0, 25];
        const arenaBottomPositionComponent = new Position(...arenaBottomPosition);
        arenaBottomMesh.position.set(...arenaBottomPosition);

        const arenaFloorPosition: TripleTuple<number> = [0, -1.25, 0];
        arenaFloorMesh.position.set(...arenaFloorPosition);

        const arenaLeftColliderSize = new Size(...horizontalGeometry);
        const arenaLeftCollider = new CuboidCollider(...horizontalGeometry, world);
        arenaLeftCollider.value.setTranslation(arenaLeftPositionComponent.value);
        const leftCollider = engine.addEntity();
        this.addComponentsToCollider(engine, leftCollider, arenaLeftCollider, arenaLeftPositionComponent, arenaLeftColliderSize, scene);

        const arenaRightColliderSize = new Size(...horizontalGeometry);
        const arenaRightCollider = new CuboidCollider(...horizontalGeometry, world);
        arenaRightCollider.value.setTranslation(arenaRightPositionComponent.value);
        const rightCollider = engine.addEntity();
        this.addComponentsToCollider(engine, rightCollider, arenaRightCollider, arenaRightPositionComponent, arenaRightColliderSize, scene);

        const arenaTopColliderSize = new Size(...verticalGeometry);
        const arenaTopCollider = new CuboidCollider(...verticalGeometry, world);
        arenaTopCollider.value.setTranslation(arenaTopPositionComponent.value);
        const topCollider = engine.addEntity();
        this.addComponentsToCollider(engine, topCollider, arenaTopCollider, arenaTopPositionComponent, arenaTopColliderSize, scene);

        const arenaBottomColliderSize = new Size(...verticalGeometry);
        const arenaBottomCollider = new CuboidCollider(...verticalGeometry, world);
        arenaBottomCollider.value.setTranslation(arenaBottomPositionComponent.value);
        const bottomCollider = engine.addEntity();
        this.addComponentsToCollider(engine, bottomCollider, arenaBottomCollider, arenaBottomPositionComponent, arenaBottomColliderSize, scene);

        const arena = new THREE.Group();
        arena.add(arenaLeftMesh, arenaRightMesh, arenaTopMesh, arenaBottomMesh, arenaFloorMesh);

        return arena;
    }

    public static addComponentsToCollider(engine: Engine, entity: number, collider: CuboidCollider, position: Position, size: Size, scene: Scene): void {
        engine.addComponent(entity, collider);
        engine.addComponent(entity, position);
        engine.addComponent(entity, size);
        engine.addComponent(entity, scene);
    }
}
