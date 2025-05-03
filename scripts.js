import { MindARThree } from 'mindar-three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialize MindAR and Three.js
const mindarThree = new MindARThree({ container: document.body });
const { renderer, scene, camera } = mindarThree;

// Load 3D Model
const loader = new THREE.GLTFLoader();
loader.load('model.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Set initial scale and position
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    // Enable touch controls using OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.enableZoom = true; // Enable pinch-to-zoom
    controls.enableRotate = true; // Enable rotation
    controls.enablePan = false; // Disable movement of model
    controls.target.set(0, 0, 0); // Ensure model is centered

    // Touch event handling for mobile gestures
    let lastTouchDistance = null;

    document.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1) {
            // Single-finger rotation
            const touchX = event.touches[0].clientX;
            const touchY = event.touches[0].clientY;
            model.rotation.y += touchX * 0.001;
            model.rotation.x -= touchY * 0.001;
        } else if (event.touches.length === 2) {
            // Two-finger pinch-to-zoom
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

            if (lastTouchDistance) {
                const zoomFactor = (distance - lastTouchDistance) * 0.005;
                model.scale.multiplyScalar(1 + zoomFactor);
            }
            lastTouchDistance = distance;
        }
    });

    document.addEventListener('touchend', () => {
        lastTouchDistance = null;
    });

    // Start rendering
    mindarThree.start();
});
