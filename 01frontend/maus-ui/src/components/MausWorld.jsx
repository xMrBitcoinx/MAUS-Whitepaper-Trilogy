// 01frontend/src/components/MAUSWorld.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { MAUSEngine } from '../maus-engine/core/MAUSEngine';
import { EarthWorld } from '../maus-engine/worlds/EarthWorld';
import { MarsWorld } from '../maus-engine/worlds/MarsWorld';
import { MoonWorld } from '../maus-engine/worlds/MoonWorld';
import { JupiterWorld } from '../maus-engine/worlds/JupiterWorld';
import { SaturnWorld } from '../maus-engine/worlds/SaturnWorld';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default function MAUSWorld() {
    const mountRef = useRef(null);
    const [engine, setEngine] = useState(null);
    const [currentWorld, setCurrentWorld] = useState(null);
    const [planets, setPlanets] = useState({});
    const [planetLabels, setPlanetLabels] = useState([]);
    const [labelRenderer, setLabelRenderer] = useState(null);

    const planetPositions = {
        Earth: new THREE.Vector3(-5, 0, 0),
        Mars: new THREE.Vector3(5, 0, 0),
        Moon: new THREE.Vector3(0, 3, 0),
        Jupiter: new THREE.Vector3(-7, 3, 0),
        Saturn: new THREE.Vector3(7, 3, 0),
    };

    // -----------------------------
    // Initial setup (scene, engine, planets, labels)
    // -----------------------------
    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();

        const loader = new THREE.TextureLoader();
        loader.load('/src/assets/skyboxes/nebula_bg.jpg', (texture) => {
            scene.background = texture;
        });

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
        pointLight.position.set(0, 10, 10);
        scene.add(pointLight);

        // MAUS Engine
        const mausEngine = new MAUSEngine(mountRef.current);
        setEngine(mausEngine);

        // Initialize planets with default 5-min update interval
        const planetObjects = {
            Earth: new EarthWorld(scene, 300000),
            Mars: new MarsWorld(scene, 300000),
            Moon: new MoonWorld(scene, 300000),
            Jupiter: new JupiterWorld(scene, 300000),
            Saturn: new SaturnWorld(scene, 300000),
        };

        Object.keys(planetObjects).forEach((name) => {
            const world = planetObjects[name];
            if (world.planetMesh && planetPositions[name]) {
                world.planetMesh.position.copy(planetPositions[name]);
            }
        });

        setPlanets(planetObjects);
        mausEngine.loadWorld(planetObjects.Earth);
        setCurrentWorld(planetObjects.Earth);

        // Initialize labels (CSS2D)
        initPlanetInfoPanels(scene, planetObjects);

        mausEngine.start();

        return () => {
            mausEngine.stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // -----------------------------
    // Planet Info Panels
    // -----------------------------
    const initPlanetInfoPanels = (scene, planetObjects) => {
        if (!mountRef.current) return;

        const renderer = new CSS2DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0px';

        // Avoid duplicate appends (e.g., HMR)
        if (!mountRef.current.contains(renderer.domElement)) {
            mountRef.current.appendChild(renderer.domElement);
        }

        setLabelRenderer(renderer);

        const labelsArray = [];
        Object.keys(planetObjects).forEach((name) => {
            const planet = planetObjects[name];
            if (!planetPositions[name]) return;

            const div = document.createElement('div');
            div.className = 'planet-info';
            div.style.color = 'white';
            div.style.backgroundColor = 'rgba(0,0,0,0.6)';
            div.style.padding = '6px';
            div.style.borderRadius = '5px';
            div.style.fontSize = '0.8rem';
            div.innerHTML = `
                <b>${name}</b><br/>
                Type: ${getPlanetType(name)}<br/>
                Radius: ${getPlanetRadius(name)}<br/>
                Atmosphere: ${getPlanetAtmosphere(name)}
            `;

            const label = new CSS2DObject(div);
            label.position.copy(
                planetPositions[name].clone().add(new THREE.Vector3(0, 1.5, 0))
            );
            scene.add(label);
            labelsArray.push({ name, label });
        });

        setPlanetLabels(labelsArray);
    };

    // Cleanup CSS2DRenderer DOM element on unmount
    useEffect(() => {
        return () => {
            if (mountRef.current && labelRenderer && labelRenderer.domElement) {
                if (mountRef.current.contains(labelRenderer.domElement)) {
                    mountRef.current.removeChild(labelRenderer.domElement);
                }
            }
        };
    }, [labelRenderer]);

    const animatePlanetLabels = () => {
        if (!engine) return;

        planetLabels.forEach((p) => {
            if (!planetPositions[p.name]) return;
            p.label.position.copy(
                planetPositions[p.name].clone().add(new THREE.Vector3(0, 1.5, 0))
            );
        });

        if (labelRenderer && engine && engine.sceneManager && engine.sceneManager.scene) {
            labelRenderer.render(engine.sceneManager.scene, engine.camera);
        }
    };

    // -----------------------------
    // Fly & Portal
    // -----------------------------
    const flyAndTransitionToPlanet = async (planetName) => {
        if (!engine || !currentWorld || !planetPositions[planetName]) return;

        const targetPos = planetPositions[planetName];
        const start = {
            x: engine.camera.position.x,
            y: engine.camera.position.y,
            z: engine.camera.position.z,
        };

        const end = {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z + 5,
        };

        const tween = new TWEEN.Tween(start)
            .to(end, 2000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(() => {
                engine.camera.position.set(start.x, start.y, start.z);
                engine.camera.lookAt(targetPos);
                animateEffects();
            })
            .onComplete(() => {
                handleSwitchWorld(planetName);
            });

        tween.start();
    };

    const handleSwitchWorld = async (worldName) => {
        if (!engine || !planets[worldName]) return;
        const newWorld = planets[worldName];

        await portalTransition(newWorld);
        setCurrentWorld(newWorld);

        // Call live updates for planet immediately after switch
        if (newWorld.updateLiveTexture && newWorld.liveTextureURL) {
            await newWorld.updateLiveTexture(newWorld.liveTextureURL);
        }
    };

    const portalTransition = async (newWorld) => {
        // Placeholder: implement warp/portal VFX and transitions here
        // Integrate moons, rings, asteroid belts, labels, etc.
        return Promise.resolve(newWorld);
    };

    // -----------------------------
    // Animate Effects
    // -----------------------------
    const animateEffects = () => {
        // animate moons, rings, asteroid belts, warp particles, starfield, nebula...
        animatePlanetLabels();
    };

    // Global animation loop for tweens + label updates
    useEffect(() => {
        if (!engine) return;

        let isMounted = true;

        const animate = (time) => {
            if (!isMounted) return;
            TWEEN.update(time);
            animateEffects();
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [engine, labelRenderer, planetLabels]);

    // -----------------------------
    // Helper functions for planet data
    // -----------------------------
    const getPlanetType = (name) => {
        switch (name) {
            case 'Earth':
                return 'Terrestrial';
            case 'Mars':
                return 'Terrestrial';
            case 'Moon':
                return 'Satellite';
            case 'Jupiter':
                return 'Gas Giant';
            case 'Saturn':
                return 'Gas Giant';
            default:
                return 'Unknown';
        }
    };

    const getPlanetRadius = (name) => {
        switch (name) {
            case 'Earth':
                return '6371 km';
            case 'Mars':
                return '3389 km';
            case 'Moon':
                return '1737 km';
            case 'Jupiter':
                return '69911 km';
            case 'Saturn':
                return '58232 km';
            default:
                return '-';
        }
    };

    const getPlanetAtmosphere = (name) => {
        switch (name) {
            case 'Earth':
                return 'Nitrogen/Oxygen';
            case 'Mars':
                return 'CO2';
            case 'Moon':
                return 'None';
            case 'Jupiter':
                return 'Hydrogen/Helium';
            case 'Saturn':
                return 'Hydrogen/Helium';
            default:
                return 'Unknown';
        }
    };

    // -----------------------------
    // JSX
    // -----------------------------
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }} ref={mountRef}>
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 10,
                    display: 'flex',
                    gap: '8px',
                }}
            >
                {Object.keys(planetPositions).map((name) => (
                    <button key={name} onClick={() => flyAndTransitionToPlanet(name)}>
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
