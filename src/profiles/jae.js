import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { jaeTagGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

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

// Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `MUSIC DOER
  FOOD EATER
  TREE PLANTER`, {
      size: 1,
      height: 0.4,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xff6d00 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    jaeTagGroup.add(tagtextMesh);
  }
)

// Backboard
const tagboardLength = 10, tagboardWidth = 5.5;

const tagboardShape = new THREE.Shape();
tagboardShape.moveTo(0, 0);
tagboardShape.lineTo(-0.7, tagboardWidth);
tagboardShape.lineTo(tagboardLength - 0.7, tagboardWidth);
tagboardShape.lineTo(tagboardLength + 0.7, 0);
tagboardShape.lineTo(0.7, 0);

const tagboardGeometry = new THREE.ExtrudeGeometry(tagboardShape, extrudeSettings);
const tagboardMaterial = new THREE.MeshBasicMaterial({ color: 0x027a00 });
const tagboard = new THREE.Mesh(tagboardGeometry, tagboardMaterial);
tagboard.position.set(10, 0, 10);