// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { russelTagGroup } from '../../main';
import { russelNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const russel = new THREE.TextureLoader().load('../../avatars/russel.png');

export const russelCube = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: russel
  })
);

russelCube.position.set(-15, -1, 140);

// Tag Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `
    AVID ROCK-CLIMBER
    ENTHUSIASTIC DANCER
    SPICY-NOODLE LOVER`, {
      size: 1,
      height: 0.2,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xED217C });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    russelTagGroup.add(tagtextMesh);
  }
)
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `RUSSEL MUELLER`, {
      size: 1,
      height: 0.4,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0x157A6E });
    const russelMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    russelMesh.position.set(-3.5, 0, 0)
    russelNameGroup.add(russelMesh);
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
const backboardMaterial = new THREE.MeshBasicMaterial({ color: 0x12233F });
export const russelBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
russelBoard.position.set(-3.5, 0, 0);