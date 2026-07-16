import * as THREE from "./vendor/three/three.module.min.js";

const palette = {
  ink: 0x17302b,
  green: 0x4f8b57,
  greenLight: 0x8fbd68,
  blue: 0x2a7f9e,
  blueLight: 0x72c7d4,
  yellow: 0xf2c14e,
  coral: 0xe56b5d,
  sand: 0xd9bd7d,
  concrete: 0x7f8b8b,
  white: 0xf7f8ef,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.72,
    metalness: options.metalness ?? 0.04,
    transparent: options.opacity !== undefined && options.opacity < 1,
    opacity: options.opacity ?? 1,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
  });
}

function box(width, height, depth, color, options) {
  return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color, options));
}

function cylinder(radius, height, color, radialSegments = 20, options) {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, radialSegments),
    material(color, options)
  );
}

function sphere(radius, color, options) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 18), material(color, options));
}

function tagAction(object, actionId) {
  object.userData.actionId = actionId;
  object.traverse((child) => {
    child.userData.actionId = actionId;
  });
  return object;
}

function setShadows(object) {
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return object;
}

function createTree(scale = 1) {
  const tree = new THREE.Group();
  const trunk = cylinder(0.1 * scale, 0.75 * scale, 0x805b3d, 12);
  trunk.position.y = 0.38 * scale;
  const crown = sphere(0.42 * scale, palette.greenLight);
  crown.scale.set(1, 1.18, 1);
  crown.position.y = 0.98 * scale;
  tree.add(trunk, crown);
  return tree;
}

function createCityModel(root, values) {
  const shade = clamp(Number(values.shade) || 0, 0, 6);
  const soil = clamp(Number(values.soil) || 0, 0, 6);
  const water = clamp(Number(values.water) || 0, 0, 6);
  const routes = clamp(Number(values.routes) || 0, 0, 6);

  const base = box(11.5, 0.45, 7.4, 0xc4c7b8);
  base.position.y = -0.3;
  base.receiveShadow = true;
  root.add(base);

  const roadMaterial = material(0x4e5b5c, { roughness: 0.9 });
  const roadA = new THREE.Mesh(new THREE.BoxGeometry(11.3, 0.08, 1.45), roadMaterial);
  const roadB = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.08, 7.2), roadMaterial);
  roadA.position.y = roadB.position.y = -0.03;
  tagAction(roadA, "routes");
  tagAction(roadB, "routes");
  root.add(roadA, roadB);

  const routeColor = routes >= 3 ? palette.yellow : 0xb7a875;
  [-0.54, 0.54].forEach((z) => {
    const lane = box(11.1, 0.035, 0.08, routeColor, {
      emissive: routeColor,
      emissiveIntensity: routes * 0.04,
    });
    lane.position.set(0, 0.04, z);
    tagAction(lane, "routes");
    root.add(lane);
  });

  const buildings = [
    [-4.25, -2.35, 1.45, 2.2],
    [-2.35, -2.35, 1.2, 1.6],
    [2.45, -2.35, 1.5, 2.6],
    [4.35, -2.25, 1.2, 1.8],
    [-4.1, 2.25, 1.45, 2.7],
    [3.9, 2.25, 1.5, 2.1],
  ];
  buildings.forEach(([x, z, width, height], index) => {
    const building = box(width, height, width * 0.8, index % 2 ? 0xa9b2ae : palette.concrete);
    building.position.set(x, height / 2, z);
    root.add(setShadows(building));
  });

  const soilGroup = new THREE.Group();
  const soilColor = soil >= 3 ? 0x6d9e5a : 0x88785e;
  const soilPlots = [
    [-2.8, 2.25, 2.2, 1.35],
    [0, 2.3, 2.35, 1.4],
    [0, -2.35, 2.25, 1.3],
  ];
  soilPlots.slice(0, Math.max(1, Math.ceil(soil / 2))).forEach(([x, z, width, depth]) => {
    const plot = box(width, 0.12, depth, soilColor);
    plot.position.set(x, 0.03, z);
    soilGroup.add(plot);
  });
  tagAction(soilGroup, "soil");
  root.add(soilGroup);

  const treeGroup = new THREE.Group();
  const treePositions = [
    [-2.9, 2.3], [-1.9, 2.25], [-0.55, 2.3], [0.5, 2.25],
    [1.8, 2.25], [2.7, 2.2], [-1.2, -2.2], [0.2, -2.25],
    [1.25, -2.25], [3.05, -2.2], [-3.4, -0.9], [3.45, 0.9],
  ];
  treePositions.slice(0, 2 + shade * 2).forEach(([x, z], index) => {
    const tree = createTree(0.72 + (index % 3) * 0.08);
    tree.position.set(x, 0.1, z);
    treeGroup.add(tree);
  });
  tagAction(treeGroup, "shade");
  root.add(setShadows(treeGroup));

  const waterGroup = new THREE.Group();
  const pond = cylinder(0.72 + water * 0.08, 0.11, palette.blueLight, 32, {
    roughness: 0.2,
    opacity: 0.9,
  });
  pond.position.set(2.15, 0.05, 2.25);
  waterGroup.add(pond);
  for (let index = 0; index < Math.max(1, water); index += 1) {
    const tank = cylinder(0.2, 0.42 + index * 0.025, palette.blue, 18, { metalness: 0.16 });
    tank.position.set(1.15 + (index % 3) * 0.48, 0.22, 3.05 - Math.floor(index / 3) * 0.5);
    waterGroup.add(tank);
  }
  tagAction(waterGroup, "water");
  root.add(setShadows(waterGroup));

  const rainCount = 55;
  const rainPositions = new Float32Array(rainCount * 3);
  for (let index = 0; index < rainCount; index += 1) {
    rainPositions[index * 3] = (Math.random() - 0.5) * 11;
    rainPositions[index * 3 + 1] = 1 + Math.random() * 6;
    rainPositions[index * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
  const rain = new THREE.Points(
    rainGeometry,
    new THREE.PointsMaterial({ color: palette.blueLight, size: 0.075, transparent: true, opacity: 0.58 })
  );
  root.add(rain);

  return {
    camera: [8.8, 6.8, 10.2],
    animate(time) {
      const positions = rain.geometry.attributes.position.array;
      for (let index = 0; index < rainCount; index += 1) {
        positions[index * 3 + 1] -= 0.025 + water * 0.002;
        if (positions[index * 3 + 1] < 0.2) positions[index * 3 + 1] = 6.5;
      }
      rain.geometry.attributes.position.needsUpdate = true;
      pond.position.y = 0.05 + Math.sin(time * 0.0018) * 0.02;
    },
  };
}

function createCoral(color, height = 1.5) {
  const coral = new THREE.Group();
  const stem = cylinder(0.13, height, color, 10);
  stem.position.y = height / 2;
  coral.add(stem);
  [-1, 1].forEach((direction, index) => {
    const branch = cylinder(0.09, height * 0.58, color, 10);
    branch.rotation.z = direction * 0.58;
    branch.position.set(direction * 0.2, height * (0.48 + index * 0.08), 0);
    coral.add(branch);
  });
  return coral;
}

function createReefModel(root, values) {
  const recovery = clamp(Number(values.recovery) || 0, 0, 100);
  const pressure = clamp(Number(values.pressure) || 0, 0, 100);
  const community = clamp(Number(values.community) || 0, 0, 100);
  const actionIds = ["clean-water", "reef-zones", "heat-alert", "climate-cut", "local-guides"];

  const seabed = new THREE.Mesh(
    new THREE.CylinderGeometry(5.8, 6.4, 0.65, 48),
    material(palette.sand, { roughness: 0.94 })
  );
  seabed.scale.z = 0.72;
  seabed.position.y = -0.55;
  seabed.receiveShadow = true;
  root.add(seabed);

  const healthy = new THREE.Color(palette.coral);
  const bleached = new THREE.Color(palette.white);
  const coralColor = bleached.clone().lerp(healthy, recovery / 100).getHex();
  const coralPositions = [
    [-3.6, -1.3, 1.55], [-2.2, 0.7, 1.95], [-0.8, -1.5, 1.35],
    [0.65, 0.65, 2.1], [2.05, -1.25, 1.65], [3.45, 0.65, 1.45],
    [-3.1, 1.55, 1.25], [2.7, 1.65, 1.15],
  ];
  const reef = new THREE.Group();
  coralPositions.forEach(([x, z, height], index) => {
    const coral = createCoral(index % 3 === 1 ? palette.yellow : coralColor, height);
    coral.position.set(x, -0.2, z);
    tagAction(coral, actionIds[index % actionIds.length]);
    reef.add(coral);
  });
  root.add(setShadows(reef));

  const protectionRing = new THREE.Mesh(
    new THREE.TorusGeometry(4.75, 0.055 + community * 0.0005, 10, 80),
    material(palette.yellow, {
      emissive: palette.yellow,
      emissiveIntensity: community / 220,
    })
  );
  protectionRing.rotation.x = Math.PI / 2;
  protectionRing.position.y = -0.08;
  tagAction(protectionRing, "reef-zones");
  root.add(protectionRing);

  const beacon = new THREE.Group();
  const pole = cylinder(0.08, 1.7, palette.ink, 12);
  pole.position.y = 0.45;
  const signal = sphere(0.22, palette.coral, {
    emissive: palette.coral,
    emissiveIntensity: 0.7,
  });
  signal.position.y = 1.35;
  beacon.add(pole, signal);
  beacon.position.set(4.4, -0.2, -1.5);
  tagAction(beacon, "heat-alert");
  root.add(beacon);

  const debrisCount = Math.max(5, Math.round((100 - pressure) * 0.24));
  const debrisPositions = new Float32Array(debrisCount * 3);
  for (let index = 0; index < debrisCount; index += 1) {
    debrisPositions[index * 3] = (Math.random() - 0.5) * 10;
    debrisPositions[index * 3 + 1] = 0.25 + Math.random() * 3.8;
    debrisPositions[index * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const debrisGeometry = new THREE.BufferGeometry();
  debrisGeometry.setAttribute("position", new THREE.BufferAttribute(debrisPositions, 3));
  const debris = new THREE.Points(
    debrisGeometry,
    new THREE.PointsMaterial({ color: 0x566c6f, size: 0.09, transparent: true, opacity: 0.5 })
  );
  tagAction(debris, "clean-water");
  root.add(debris);

  return {
    camera: [8.5, 5.4, 10.5],
    animate(time) {
      reef.children.forEach((coral, index) => {
        coral.rotation.z = Math.sin(time * 0.0012 + index) * 0.025;
      });
      protectionRing.rotation.z = time * 0.00008;
      signal.scale.setScalar(1 + Math.sin(time * 0.004) * 0.1);
      debris.rotation.y = time * 0.00006;
    },
  };
}

function createClimateModel(root, values) {
  const controls = ["energy", "mobility", "food", "nature", "fairness"];
  const colors = [palette.yellow, palette.blue, palette.coral, palette.greenLight, 0xc971b8];
  const globe = sphere(2.15, palette.blue, {
    roughness: 0.56,
    metalness: 0.05,
    emissive: 0x123e47,
    emissiveIntensity: 0.18,
  });
  root.add(globe);

  const globeLines = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.19, 3)),
    new THREE.LineBasicMaterial({ color: 0xb8e2ce, transparent: true, opacity: 0.22 })
  );
  root.add(globeLines);

  const orbit = new THREE.Group();
  controls.forEach((control, index) => {
    const value = clamp(Number(values[control]) || 0, 0, 6);
    const angle = (index / controls.length) * Math.PI * 2 - Math.PI / 2;
    const height = 0.55 + value * 0.32;
    const pillar = new THREE.Group();
    const base = cylinder(0.44, 0.16, colors[index], 24, { metalness: 0.12 });
    const column = cylinder(0.27, height, colors[index], 20, {
      emissive: colors[index],
      emissiveIntensity: 0.05 + value * 0.05,
    });
    column.position.y = height / 2 + 0.08;
    const cap = sphere(0.33, colors[index], {
      emissive: colors[index],
      emissiveIntensity: 0.12 + value * 0.06,
    });
    cap.position.y = height + 0.16;
    pillar.add(base, column, cap);
    pillar.position.set(Math.cos(angle) * 4.05, -1.8, Math.sin(angle) * 4.05);
    pillar.rotation.y = -angle;
    tagAction(pillar, control);
    orbit.add(setShadows(pillar));
  });
  root.add(orbit);

  const orbitLine = new THREE.Mesh(
    new THREE.TorusGeometry(4.05, 0.035, 8, 100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 })
  );
  orbitLine.rotation.x = Math.PI / 2;
  orbitLine.position.y = -1.8;
  root.add(orbitLine);

  const starCount = 90;
  const starPositions = new Float32Array(starCount * 3);
  for (let index = 0; index < starCount; index += 1) {
    const radius = 6.5 + Math.random() * 4;
    const angle = Math.random() * Math.PI * 2;
    starPositions[index * 3] = Math.cos(angle) * radius;
    starPositions[index * 3 + 1] = (Math.random() - 0.5) * 7;
    starPositions[index * 3 + 2] = Math.sin(angle) * radius;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  root.add(
    new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.075, transparent: true, opacity: 0.6 })
    )
  );

  return {
    camera: [9.5, 6.2, 11.8],
    animate(time) {
      globe.rotation.y = time * 0.00008;
      globeLines.rotation.y = -time * 0.00005;
      orbit.rotation.y = Math.sin(time * 0.00022) * 0.12;
      orbit.children.forEach((pillar, index) => {
        pillar.position.y = -1.8 + Math.sin(time * 0.0015 + index) * 0.06;
      });
    },
  };
}

const modelBuilders = {
  city: createCityModel,
  reef: createReefModel,
  climate: createClimateModel,
};

function actionFromObject(object) {
  let current = object;
  while (current) {
    if (current.userData?.actionId) return current.userData.actionId;
    current = current.parent;
  }
  return "";
}

function disposeScene(scene) {
  scene.traverse((object) => {
    object.geometry?.dispose?.();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((item) => item.dispose?.());
  });
}

export function mountLearningModel(stage, config) {
  const builder = modelBuilders[config.type];
  if (!stage || !builder || !window.WebGLRenderingContext) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const root = new THREE.Group();
  root.rotation.y = -0.48;
  scene.add(root);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const preserveDrawingBuffer = new URLSearchParams(window.location.search).has("model-pixel-check");
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const canvas = renderer.domElement;
  canvas.setAttribute("data-learning-3d-canvas", config.type);
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", config.label || "Interactive 3D learning model");
  canvas.tabIndex = 0;
  stage.replaceChildren(canvas);

  const hemiLight = new THREE.HemisphereLight(0xd9f3f0, 0x5d5a48, 2.25);
  scene.add(hemiLight);
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(7, 11, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x7ac9de, 1.15);
  rimLight.position.set(-8, 4, -6);
  scene.add(rimLight);

  const model = builder(root, config.values || {});
  camera.position.set(...model.camera);
  camera.lookAt(0, 0.35, 0);

  let frame = 0;
  let disposed = false;
  let dragging = false;
  let moved = false;
  let pointerX = 0;
  let pointerY = 0;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function resize() {
    if (disposed) return;
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  function render(time = 0) {
    if (disposed) return;
    model.animate?.(time);
    renderer.render(scene, camera);
    if (!reducedMotion) frame = window.requestAnimationFrame(render);
  }

  function pickAction(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(root.children, true).find((item) => actionFromObject(item.object));
    return hit ? actionFromObject(hit.object) : "";
  }

  function onPointerDown(event) {
    dragging = true;
    moved = false;
    pointerX = event.clientX;
    pointerY = event.clientY;
    canvas.setPointerCapture?.(event.pointerId);
    canvas.classList.add("is-dragging");
  }

  function onPointerMove(event) {
    if (!dragging) {
      canvas.classList.toggle("is-clickable", Boolean(pickAction(event)));
      return;
    }
    const deltaX = event.clientX - pointerX;
    const deltaY = event.clientY - pointerY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 3) moved = true;
    root.rotation.y += deltaX * 0.007;
    root.rotation.x = clamp(root.rotation.x + deltaY * 0.004, -0.32, 0.38);
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (reducedMotion) renderer.render(scene, camera);
  }

  function onPointerUp(event) {
    dragging = false;
    canvas.classList.remove("is-dragging");
    canvas.releasePointerCapture?.(event.pointerId);
    if (!moved) {
      const actionId = pickAction(event);
      if (actionId) config.onActivate?.(actionId);
    }
  }

  function onKeyDown(event) {
    const turns = { ArrowLeft: 0.12, ArrowRight: -0.12 };
    const tilts = { ArrowUp: 0.08, ArrowDown: -0.08 };
    if (turns[event.key]) root.rotation.y += turns[event.key];
    else if (tilts[event.key]) root.rotation.x = clamp(root.rotation.x + tilts[event.key], -0.32, 0.38);
    else return;
    event.preventDefault();
    renderer.render(scene, camera);
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("keydown", onKeyDown);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();
  render(performance.now());
  stage.dataset.modelReady = "true";

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
    canvas.removeEventListener("keydown", onKeyDown);
    disposeScene(scene);
    renderer.dispose();
    canvas.remove();
  };
}
