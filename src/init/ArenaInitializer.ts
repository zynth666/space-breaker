import { World } from "@dimforge/rapier3d";
import * as THREE from "three";
import FixedRigidBody from "../component/FixedRigidBody";
import { TripleTuple } from "../types";

export default class ArenaInitializer {
    public static create(world: World): THREE.Group {
        const arenaHorizontalGeometry = new THREE.BoxGeometry(1, 1, 50);
        const arenaVerticalGeometry = new THREE.BoxGeometry(41, 1, 1);
        const arenaMaterial = new THREE.MeshPhongMaterial({ color: 0x22ff22 });

        const arenaLeftMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaRightMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaTopMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);
        const arenaBottomMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);

        const arenaLeftPosition: TripleTuple<number> = [-20, 0, 0];
        arenaLeftMesh.position.set(...arenaLeftPosition);

        const arenaRightPosition: TripleTuple<number> = [20, 0, 0];
        arenaRightMesh.position.set(...arenaRightPosition);

        const arenaTopPosition: TripleTuple<number> = [0, 0, -25];
        arenaTopMesh.position.set(...arenaTopPosition);

        const arenaBottomPosition: TripleTuple<number> = [0, 0, 25];
        arenaBottomMesh.position.set(...arenaBottomPosition);

        const leftRigidBody = new FixedRigidBody(world);
        leftRigidBody.value.setTranslation(...arenaLeftPosition);

        const rightRigidBody = new FixedRigidBody(world);
        rightRigidBody.value.setTranslation(...arenaRightPosition);

        const topRigidBody = new FixedRigidBody(world);
        topRigidBody.value.setTranslation(...arenaTopPosition);

        const bottomRigidBody = new FixedRigidBody(world);
        bottomRigidBody.value.setTranslation(...arenaBottomPosition);

        const arena = new THREE.Group();
        arena.add(arenaLeftMesh, arenaRightMesh, arenaTopMesh, arenaBottomMesh);

        return arena;
    }
}
