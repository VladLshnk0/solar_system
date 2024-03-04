'use client'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const ThreeScene: React.FC = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    function init() {
        if (typeof window !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.position.setZ(5);

            const spaceTexture = new THREE.TextureLoader().load('space.jpg');
            scene.background = spaceTexture;

            const sunTexture = new THREE.TextureLoader().load('sun.png');
            const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');

            const sunGeo = new THREE.SphereGeometry(2, 30, 30);
            const sunMat = new THREE.MeshBasicMaterial({
                map: sunTexture,
            });
            const sun = new THREE.Mesh(sunGeo, sunMat);
            scene.add(sun);


            const mercury = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: mercuryTexture,
                })
            );

            const mercuryObj = new THREE.Object3D();
            mercuryObj.add(mercury);
            scene.add(mercuryObj);

            // const moon = new THREE.Mesh(
            //     new THREE.SphereGeometry(4, 32, 32),
            //     new THREE.MeshStandardMaterial({
            //         map: moonTexture,
            //         normalMap: normalTexture
            //     })
            // );


            mercury.position.x = 2.5;

            const venus = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('venus.jpg'),
                })
            );

            venus.position.x = 5.5;


            const venusObj = new THREE.Object3D();
            venusObj.add(venus);

            scene.add(venusObj);

            const earth = new THREE.Mesh(
                new THREE.SphereGeometry(0.4, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('earth.jpg'),
                })
            );

            earth.position.x = 9.5;

            const moon = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('moon.jpg'),
                })
            );

            moon.position.x = 1;

            const moonObj = new THREE.Object3D();
            moonObj.add(moon);

            earth.add(moonObj);

            const earthObj = new THREE.Object3D();
            earthObj.add(earth);

            scene.add(earthObj);


            const mars = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('mars.jpg'),
                })
            );


            mars.position.x = 12.5;

            const marsObj = new THREE.Object3D();
            marsObj.add(mars);

            scene.add(marsObj);

            const jupiter = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('jupiter.jpg'),
                })
            );

            jupiter.position.x = 25.5;

            const jupiterObj = new THREE.Object3D();
            jupiterObj.add(jupiter);

            scene.add(jupiterObj);


            const saturnGeo = new THREE.SphereGeometry(0.7, 30, 30);
            const saturnMat = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('saturn.jpg'),
            });


            const saturn = new THREE.Mesh(saturnGeo, saturnMat);
            const saturnObj = new THREE.Object3D();

            saturn.position.x = 35.5;


            const ringGeo = new THREE.RingGeometry(0.8, 0.7, 30);
            const ringMat = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('rings.png'),
                side: THREE.DoubleSide
            });

            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.x = 35.5;
            ring.rotation.x = Math.PI / 1.8;

            saturnObj.add(saturn);
            saturnObj.add(ring);
            scene.add(saturnObj);

            const uranus = new THREE.Mesh(
                new THREE.SphereGeometry(0.65, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('uranus.jpg'),
                })
            );

            const uranusOrbit = new THREE.Object3D(); // Створення об'єкту, що утворює орбіту Урану
            scene.add(uranusOrbit);

            uranus.position.x = 55.5;

            const uranusRingsGeo = new THREE.RingGeometry(0.7, 0.65, 30);
            const uranusRingsMat = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('uranus_rings.png'),
                side: THREE.DoubleSide
            });

            const uranusRings = new THREE.Mesh(uranusRingsGeo, uranusRingsMat);
            uranusRings.position.x = 55.5;
            uranusRings.rotation.x = Math.PI;

            uranusOrbit.add(uranus);
            uranusOrbit.add(uranusRings);

            const tiltAngle = Math.PI / 60; // Нахил орбіти
            uranusOrbit.rotation.x = tiltAngle; // Нахил орбіти Урану


            const uranusObj = new THREE.Object3D();
            // uranusObj.add(uranus);
            // uranusObj.add(uranusRings);

            // scene.add(uranusObj);


            const neptune = new THREE.Mesh(
                new THREE.SphereGeometry(0.6, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: new THREE.TextureLoader().load('neptune.jpg'),
                })
            );

            neptune.position.x = 65.5;

            const neptuneObj = new THREE.Object3D();
            neptuneObj.add(neptune);

            scene.add(neptuneObj);


            const sunLight = new THREE.PointLight(0xFFFFFF, 1000, 0);
            scene.add(sunLight);


            // const ambientLight = new THREE.AmbientLight(0xffffff);
            // scene.add(ambientLight);


            const lightHelper = new THREE.PointLightHelper(sunLight);
            // scene.add(lightHelper);

            const gridHelper = new THREE.GridHelper(200, 50);
            // scene.add(gridHelper);

            const controls = new OrbitControls(camera, renderer.domElement);


            const renderScene = () => {
                sun.rotation.y += 0.001;

                mercury.rotation.y += 0.005;
                mercuryObj.rotation.y += 0.05;

                venus.rotation.y += 0.005;
                venusObj.rotation.y += 0.0125;

                earth.rotation.y += 0.05;
                earthObj.rotation.y += 0.01;

                moon.rotation.y += 0.05;
                moonObj.rotation.y += 0.0005;

                mars.rotation.y += 0.005;
                marsObj.rotation.y += 0.005;

                jupiter.rotation.y += 0.003;
                jupiterObj.rotation.y += 0.0005;

                saturn.rotation.y += 0.0003;
                saturnObj.rotation.y += 0.00077

                uranus.rotation.y += 0.0003;
                // uranusObj.rotation.y += 0.00095;
                uranusOrbit.rotation.y += 0.00095;


                neptune.rotation.y += 0.0003;
                neptuneObj.rotation.y += 0.00075;

                controls.update();

                renderer.render(scene, camera);
                requestAnimationFrame(renderScene);
            };

            renderScene();

            containerRef.current?.appendChild(renderer.domElement);

            const handleResize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);
            };

            window.addEventListener('resize', handleResize);

            // Clean up the event listener when the component is unmounted
            return () => {
                window.removeEventListener('resize', handleResize);
            };

        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className='fixed top-0 left-0'><div ref={containerRef} /></div>
    )
}

export default ThreeScene