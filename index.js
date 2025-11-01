
gsap.from("h1", {duration: 1, y: -50, opacity: 0, ease: "power2.out"});
gsap.from("h2", {duration: 1, y: -50, opacity: 0, ease: "power2.out", delay: 0.5});

gsap.utils.toArray("h3").forEach(h3 => {
    gsap.from(h3, {
        scrollTrigger: {
            trigger: h3,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

gsap.utils.toArray("img").forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2 // slight delay after h3 animation
    });
});

// Three.js setup
let scene, camera, renderer, textMesh;

function initThreeJS() {
    const container = document.getElementById('threejs-container');

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Font Loader
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new THREE.TextGeometry('Sree Raj', {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });
        textGeometry.center();
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x0077ff });
        textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    const container = document.getElementById('threejs-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

initThreeJS();
