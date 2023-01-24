// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { benMTagGroup } from '../../main';
import { benMNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const benM = new THREE.TextureLoader().load('../../avatars/benm.jpeg');

export const benMCube = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: benM
  })
);

benMCube.position.set(15, -1, 100);

// Tag Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `
    CAT LOVER
    COFFEE ADDICT
    GRAPHIC DESIGNER`, {
      size: 1,
      height: 0.2,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xff6d00 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-7, 2, 0)
    benMTagGroup.add(tagtextMesh);
  }
)
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `BENJAMIN MENG`, {
      size: 1,
      height: 0.4,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0xF4442E });
    const benMMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    benMMesh.position.set(-3.5, 0, 0)
    benMNameGroup.add(benMMesh);
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
export const benMBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
benMBoard.position.set(-3.5, 0, 0);