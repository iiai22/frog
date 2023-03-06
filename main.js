import './style.css'

import * as THREE from './three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera );

// Objetos

let loadedModel;

const loader = new GLTFLoader();

loader.load( './frog.gltf', function ( gltf ) {

  loadedModel = gltf;

  gltf.scene.scale.set(10,10,10);
	scene.add( gltf.scene );


}, undefined, function ( error ) {

	console.error( error );

} );

//const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
//const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
//const torus = new THREE.Mesh( geometry, material );

//scene.add( torus )

var boxGeo = new THREE.BoxGeometry( 100, 100, 100 );
var boxMat = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
var box = new THREE.Mesh( boxGeo, boxMat );

var geo = new THREE.EdgesGeometry( boxGeo ); // or WireframeGeometry( geometry )
var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
var wireframe = new THREE.LineSegments( geo, mat );


scene.add( wireframe );




//const geometry = new THREE.BoxGeometry( 10, 10, 10)
//const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
//const torus = new THREE.Mesh( geometry, material );

//scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add( pointLight, ambientLight )

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add( gridHelper )

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add( star )
}



Array(200).fill().forEach(addStar)




//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;

function animate() {
  

  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;
  if(loadedModel) {
    loadedModel.scene.rotation.x += 0.01;
    loadedModel.scene.rotation.y += 0.005;
    loadedModel.scene.rotation.z += 0.01;
  }
  
  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );
}

animate()


// salvar conteudo

const textarea = document.querySelector('textarea');

window.salvarValor = function() {
  localStorage.setItem('textoSalvo', textarea.value);
};


// Recupera o valor do localStorage quando a página for recarregada
if (localStorage.getItem('textoSalvo')) {
  textarea.value = localStorage.getItem('textoSalvo');
}

