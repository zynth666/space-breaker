import { World } from "@dimforge/rapier3d";
import * as THREE from "three";
import CuboidCollider from "../component/CuboidCollider";
import FixedRigidBody from "../component/FixedRigidBody";
import Position from "../component/Position";
import { TripleTuple } from "../types";

export default class ArenaInitializer {
    public static create(world: World): THREE.Group {
        const horizontalGeometry: TripleTuple<number> = [1, 1, 50];
        const arenaHorizontalGeometry = new THREE.BoxGeometry(...horizontalGeometry);
        const verticalGeometry: TripleTuple<number> = [41, 1, 1];
        const arenaVerticalGeometry = new THREE.BoxGeometry(...verticalGeometry);
        const arenaMaterial = new THREE.MeshPhongMaterial({ color: 0x22ff22 });

        const arenaLeftMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaRightMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaTopMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);
        const arenaBottomMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);

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
        const arenaBottomPositionComponent = new Position(...arenaLeftPosition);
        arenaBottomMesh.position.set(...arenaBottomPosition);

        const arenaLeftCollider = new CuboidCollider(...horizontalGeometry, world);
        arenaLeftCollider.value.setTranslation(arenaLeftPositionComponent.value);
        const arenaRightCollider = new CuboidCollider(...horizontalGeometry, world);
        arenaRightCollider.value.setTranslation(arenaRightPositionComponent.value);
        const arenaTopCollider = new CuboidCollider(...verticalGeometry, world);
        arenaTopCollider.value.setTranslation(arenaTopPositionComponent.value);
        const arenaBottomCollider = new CuboidCollider(...verticalGeometry, world);
        arenaBottomCollider.value.setTranslation(arenaBottomPositionComponent.value);

        const arena = new THREE.Group();
        arena.add(arenaLeftMesh, arenaRightMesh, arenaTopMesh, arenaBottomMesh);

        return arena;
    }
}
