"use client"
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { func } from 'three/examples/jsm/nodes/Nodes.js';

function Wall() {

  const containerRef = useRef<HTMLDivElement>(null);

  const [wallParams, setWallParams] = useState({ width: 4, height: 4, depth: 1 });

  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [cube, setCube] = useState<THREE.Mesh | null>(null);
  const [controls, setControls] = useState<OrbitControls | null>(null);

  const [cubesArray, setCubesArray] = useState<THREE.Mesh[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      const newScene = new THREE.Scene();
      const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const newRenderer = new THREE.WebGLRenderer();


      newRenderer.setPixelRatio(window.devicePixelRatio);
      newRenderer.setSize(window.innerWidth, window.innerHeight);
      newCamera.position.set(0, 0, 20);

      const newControls = new OrbitControls(newCamera, newRenderer.domElement);

      setScene(newScene);
      setCamera(newCamera);
      setRenderer(newRenderer);
      setControls(newControls);

      containerRef.current.appendChild(newRenderer.domElement);

      const geometry = new THREE.BoxGeometry(wallParams.width, wallParams.height, wallParams.depth);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      const newCube = new THREE.Mesh(geometry, material);
      setCube(newCube);
      newScene.add(newCube);

      const animate = () => {
        requestAnimationFrame(animate);
        newRenderer.render(newScene, newCamera);
      }

      animate();

      return () => {
        newRenderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (scene && cube) {
      scene.remove(cube);
      const geometry = new THREE.BoxGeometry(wallParams.width, wallParams.height, wallParams.depth);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      const newCube = new THREE.Mesh(geometry, material);
      setCube(newCube);

      scene.add(newCube);
    }
  }, [wallParams]);

  useEffect(() => {
    if (scene && cube) {
      scene.remove(cube);

      let start = -wallParams.width / 2;
      
      cubesArray.forEach(cube => {
        cube.position.x = start + wallParams.width / 2;
        scene.add(cube);
        start += wallParams.width;
      }
      );
    }
  }, [cubesArray]);

  function setWidth(e: React.ChangeEvent<HTMLInputElement>) {
    setWallParams({ ...wallParams, width: parseInt(e.target.value) || 0 });
  }

  function setHeight(e: React.ChangeEvent<HTMLInputElement>) {
    setWallParams({ ...wallParams, height: parseInt(e.target.value) || 0 });
  }

  function setDepth(e: React.ChangeEvent<HTMLInputElement>) {
    setWallParams({ ...wallParams, depth: parseInt(e.target.value) || 0 });
  }

  function addCube() {
    const geometry = new THREE.BoxGeometry(wallParams.width, wallParams.height, wallParams.depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const newCube = new THREE.Mesh(geometry, material);

    setCubesArray([...cubesArray, newCube]);
  }


  return (
    <div className="w-full">
      <input type="number" value={wallParams.width} onChange={setWidth} />
      <input type="number" value={wallParams.height} onChange={setHeight} />
      <input type="number" value={wallParams.depth} onChange={setDepth} />
      <button onClick={addCube}>Add item</button>
      <div ref={containerRef} />
    </div>
  )
}

export default Wall