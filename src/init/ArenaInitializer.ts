import * as THREE from "three";

export default class ArenaInitializer {
    public static create(): THREE.Group {
        const arenaHorizontalGeometry = new THREE.BoxGeometry(1, 1, 50);
        const arenaVerticalGeometry = new THREE.BoxGeometry(41, 1, 1);
        const arenaMaterial = new THREE.MeshPhongMaterial({ color: 0x22ff22 });

        const arenaLeftMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaRightMesh = new THREE.Mesh(arenaHorizontalGeometry, arenaMaterial);
        const arenaTopMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);
        const arenaBottomMesh = new THREE.Mesh(arenaVerticalGeometry, arenaMaterial);

        arenaLeftMesh.position.set(-20, 0, 0);
        arenaRightMesh.position.set(20, 0, 0);
        arenaTopMesh.position.set(0, 0, -25);
        arenaBottomMesh.position.set(0, 0, 25);

        const arena = new THREE.Group();
        arena.add(arenaLeftMesh, arenaRightMesh, arenaTopMesh, arenaBottomMesh);

        return arena;
    }
}
