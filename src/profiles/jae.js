// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { jaeTagGroup } from '../../main';
import { jaeNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const jae = new THREE.TextureLoader().load('../../avatars/jae.jpeg');

export const jaeCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: jae
  })
);

jaeCube.position.set(-15, 1, 330);

// Tag Font
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
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `JAE CHUN YANG`, {
      size: 1,
      height: 0.6,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0xF4442E });
    const jaeMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    jaeMesh.position.set(-3.5, 0, 0)
    jaeNameGroup.add(jaeMesh);
  }
)

// Backboard
const backboardLength = 8, backboardWidth = 1;

const backboardShape = new THREE.Shape();
backboardShape.moveTo(0, 0);
backboardShape.lineTo(0, backboardWidth);
backboardShape.lineTo(backboardLength, backboardWidth);
backboardShape.lineTo(backboardLength, 0);
backboardShape.lineTo(0, 0);

const backboardGeometry = new THREE.ExtrudeGeometry(backboardShape, extrudeSettings);
const backboardMaterial = new THREE.MeshBasicMaterial({ color: 0x020122 });
export const jaeBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
jaeBoard.position.set(-3.5, 0, 0);