// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { timTagGroup } from '../../main';
import { timNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const tim = new THREE.TextureLoader().load('../../avatars/tim.jpeg');

export const timCube = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: tim
  })
);

timCube.position.set(15, -1, 260);

// Tag Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `
    PUZZLE SOLVER
    FAMILY ENJOYER
    MUSIC LOVER`, {
      size: 1,
      height: 0.2,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xff6d00 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    timTagGroup.add(tagtextMesh);
  }
)
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `TIM QUIGG`, {
      size: 1,
      height: 0.4,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0xF4442E });
    const timMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    timMesh.position.set(-3.5, 0, 0)
    timNameGroup.add(timMesh);
  }
)

// Backboard
const backboardLength = 5, backboardWidth = 1;

const backboardShape = new THREE.Shape();
backboardShape.moveTo(0, 0);
backboardShape.lineTo(0, backboardWidth);
backboardShape.lineTo(backboardLength, backboardWidth);
backboardShape.lineTo(backboardLength, 0);
backboardShape.lineTo(0, 0);

const backboardGeometry = new THREE.ExtrudeGeometry(backboardShape, extrudeSettings);
const backboardMaterial = new THREE.MeshBasicMaterial({ color: 0x020122 });
export const timBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
timBoard.position.set(-3.5, 0, 0);