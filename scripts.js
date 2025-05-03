// Load MindAR and Three.js from CDN instead of import statements
const mindarThree = new window.MindARThree({ container: document.body });
const { renderer, scene, camera } = mindarThree;

// Load 3D Model
const loader = new THREE.GLTFLoader();
loader.load('model.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Set initial scale and position
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    // Initialize OrbitControls for smooth interactions
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);

    mindarThree.start();
});
