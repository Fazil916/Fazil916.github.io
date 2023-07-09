import * as THREE from 'https://threejs.org/build/three.module.js';

// Create renderer
var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

// Create the camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// Get the container element
var container = document.getElementById('renderer-container');

// Set the renderer size to match the container's size
function resizeRenderer() {
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// Call this function now and whenever the window is resized
resizeRenderer();
window.addEventListener('resize', resizeRenderer);

// Append renderer to the container
container.appendChild(renderer.domElement);

// Create the scene
var scene = new THREE.Scene();

// Create a light and add it to the scene
var light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 200, 0);
scene.add(light);

document.getElementById('calculate').addEventListener('click', function () {
    // Remove previous room if it exists
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Get the length and width
    var length = parseInt(document.getElementById("length").value);
    var width = parseInt(document.getElementById("width").value);

    // Create the geometry for the room
    var geometry = new THREE.BoxGeometry(length, width, 1);

    // Create the material for the room
    var material = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });

    // Create the room and add it to the scene
    var room = new THREE.Mesh(geometry, material);
    scene.add(room);

    // Create edge lines to emphasize the room shape
    var edges = new THREE.EdgesGeometry(geometry);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    scene.add(line);

    // Angle in radians
    var angle = 20 * Math.PI / 180;

    // Compute camera's Z position
    var zPos = Math.max(length, width) / Math.tan(angle / 2);

    // Adjust camera position for a top-down view with an angle
    camera.position.x = length / 2;
    camera.position.y = width / 2;
    camera.position.z = zPos;
    camera.lookAt(new THREE.Vector3(length / 2, width / 2, 0));
    camera.up.set(0, 0, 1); // Set the up direction of the camera to Z axis
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
