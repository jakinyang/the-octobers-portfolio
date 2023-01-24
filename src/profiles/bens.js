// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { benSTagGroup } from '../../main';
import { benSNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const benS = new THREE.TextureLoader().load('../../avatars/bens.jpeg');

export const benSCube = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: benS
  })
);

benSCube.position.set(15, -1, 340);

// Tag Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `
    SOLUTION-ATTEMPTER
    COOKIE BRINGER
    DORK MASTER
    `, {
      size: 1,
      height: 0.2,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0x862809 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    benSTagGroup.add(tagtextMesh);
  }
)
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `B STOLB`, {
      size: 1,
      height: 0.4,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0x665200 });
    const benSMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    benSMesh.position.set(-3.5, 0, 0)
    benSNameGroup.add(benSMesh);
  }
)

// Backboard
const backboardLength = 4, backboardWidth = 1;

const backboardShape = new THREE.Shape();
backboardShape.moveTo(0, 0);
backboardShape.lineTo(0, backboardWidth);
backboardShape.lineTo(backboardLength, backboardWidth);
backboardShape.lineTo(backboardLength, 0);
backboardShape.lineTo(0, 0);

const backboardGeometry = new THREE.ExtrudeGeometry(backboardShape, extrudeSettings);
const backboardMaterial = new THREE.MeshBasicMaterial({ color: 0x003552 });
export const benSBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
benSBoard.position.set(-3.5, 0, 0);