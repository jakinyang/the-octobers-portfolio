import * as THREE from 'three';
// Profile Cube
const jae = new THREE.TextureLoader().load('../avatars/jae.jpeg');

export const jaeCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: jae
  })
);

jaeCube.position.set(-10, 1, 10);