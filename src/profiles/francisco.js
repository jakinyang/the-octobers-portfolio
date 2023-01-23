// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { franciscoTagGroup } from '../../main';
import { franciscoNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const francisco = new THREE.TextureLoader().load('../../avatars/francisco.jpeg');

export const franciscoCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: francisco
  })
);

franciscoCube.position.set(15, 1, 120);

// Tag Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `
    FOOD LOVER
    CHALLENGE SEEKER
    USER FOCUSED
    `, {
      size: 1,
      height: 0.4,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xff6d00 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    franciscoTagGroup.add(tagtextMesh);
  }
)
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `FRANCISCO OCAMPO`, {
      size: 1,
      height: 0.6,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0xF4442E });
    const franciscoMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    franciscoMesh.position.set(-3.5, 0, 0)
    franciscoNameGroup.add(franciscoMesh);
  }
)

// Backboard
const backboardLength = 10, backboardWidth = 1;

const backboardShape = new THREE.Shape();
backboardShape.moveTo(0, 0);
backboardShape.lineTo(0, backboardWidth);
backboardShape.lineTo(backboardLength, backboardWidth);
backboardShape.lineTo(backboardLength, 0);
backboardShape.lineTo(0, 0);

const backboardGeometry = new THREE.ExtrudeGeometry(backboardShape, extrudeSettings);
const backboardMaterial = new THREE.MeshBasicMaterial({ color: 0x020122 });
export const franciscoBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
franciscoBoard.position.set(-3.5, 0, 0);