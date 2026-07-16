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

function taperedCylinder(radiusTop, radiusBottom, height, color, radialSegments = 20, options) {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments),
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
  const crown = sphere(0.37 * scale, palette.greenLight);
  crown.scale.set(1.18, 1.28, 1.08);
  crown.position.y = 0.94 * scale;
  const crownSide = sphere(0.29 * scale, palette.green);
  crownSide.position.set(0.27 * scale, 0.95 * scale, 0.04 * scale);
  const crownTop = sphere(0.3 * scale, 0x79aa61);
  crownTop.position.set(-0.08 * scale, 1.22 * scale, -0.02 * scale);
  tree.add(trunk, crown, crownSide, crownTop);
  return tree;
}

function createBuilding(width, height, depth, color, index) {
  const building = new THREE.Group();
  const body = box(width, height, depth, color, { roughness: 0.78 });
  body.position.y = height / 2;
  building.add(body);

  const roof = box(width * 0.92, 0.1, depth * 0.9, index % 2 ? 0x697d79 : 0x8aa17f);
  roof.position.y = height + 0.05;
  building.add(roof);

  const windowMaterial = material(index % 2 ? 0xbce6e2 : 0xf3d887, {
    roughness: 0.2,
    emissive: index % 2 ? 0x4c9290 : 0xb78b32,
    emissiveIntensity: 0.2,
  });
  const rows = Math.max(2, Math.floor(height / 0.55));
  const columns = Math.max(2, Math.floor(width / 0.38));
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const window = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.025), windowMaterial);
      window.position.set(
        columns === 1 ? 0 : -width * 0.32 + (column / (columns - 1)) * width * 0.64,
        0.38 + row * ((height - 0.62) / Math.max(1, rows - 1)),
        depth / 2 + 0.016
      );
      building.add(window);
    }
  }
  return setShadows(building);
}

function createFish(color, scale = 1) {
  const fish = new THREE.Group();
  const body = sphere(0.18 * scale, color, { roughness: 0.42 });
  body.scale.set(1.55, 0.75, 0.62);
  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.16 * scale, 0.3 * scale, 3),
    material(color, { roughness: 0.5 })
  );
  tail.rotation.z = -Math.PI / 2;
  tail.position.x = -0.35 * scale;
  const eye = sphere(0.025 * scale, palette.ink, { roughness: 0.3 });
  eye.position.set(0.22 * scale, 0.06 * scale, 0.1 * scale);
  fish.add(body, tail, eye);
  return fish;
}

function createPerson(color, value, index) {
  const person = new THREE.Group();
  const body = new THREE.Group();
  const skinColors = [0x8b5c43, 0xb97855, 0xd4a47c, 0x6f4636, 0xe0b48e];
  const skin = skinColors[index % skinColors.length];
  const darkColor = new THREE.Color(color).multiplyScalar(0.72).getHex();

  [-0.12, 0.12].forEach((x, legIndex) => {
    const leg = cylinder(0.075, 0.48, darkColor, 12);
    leg.position.set(x, 0.25, 0);
    leg.rotation.z = legIndex === 0 ? -0.055 : 0.055;
    const foot = sphere(0.105, palette.ink);
    foot.scale.set(1.25, 0.48, 1.5);
    foot.position.set(x, 0.045, 0.05);
    body.add(leg, foot);
  });

  const torso = taperedCylinder(0.2, 0.3, 0.65, color, 18, {
    emissive: color,
    emissiveIntensity: 0.08 + value * 0.025,
  });
  torso.position.y = 0.78;
  body.add(torso);

  [-1, 1].forEach((direction) => {
    const arm = cylinder(0.065, 0.54, skin, 12);
    arm.position.set(direction * 0.31, 0.83, 0);
    arm.rotation.z = direction * (0.28 + value * 0.025);
    body.add(arm);
  });

  const neck = cylinder(0.08, 0.14, skin, 12);
  neck.position.y = 1.17;
  const head = sphere(0.22, skin, { roughness: 0.8 });
  head.scale.set(0.88, 1.05, 0.92);
  head.position.y = 1.39;
  const hair = sphere(0.225, index % 2 ? 0x3e2b25 : 0x6c482f, { roughness: 0.9 });
  hair.scale.set(0.9, 0.58, 0.94);
  hair.position.set(0, 1.5, -0.015);
  body.add(neck, head, hair);

  const growth = 0.86 + value * 0.115;
  body.scale.setScalar(growth);
  person.userData.body = body;
  person.userData.growth = growth;
  person.add(body);
  return setShadows(person);
}

function createEarthPatch(radius, latitude, longitude, scaleX, scaleY, color) {
  const latitudeRadians = THREE.MathUtils.degToRad(latitude);
  const longitudeRadians = THREE.MathUtils.degToRad(longitude);
  const normal = new THREE.Vector3(
    Math.cos(latitudeRadians) * Math.cos(longitudeRadians),
    Math.sin(latitudeRadians),
    Math.cos(latitudeRadians) * Math.sin(longitudeRadians)
  );
  const patch = sphere(0.42, color, { roughness: 0.86 });
  patch.scale.set(scaleX, scaleY, 0.12);
  patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  patch.position.copy(normal.multiplyScalar(radius + 0.04));
  return patch;
}

function createCityModel(root, values) {
  const shade = clamp(Number(values.shade) || 0, 0, 6);
  const soil = clamp(Number(values.soil) || 0, 0, 6);
  const water = clamp(Number(values.water) || 0, 0, 6);
  const routes = clamp(Number(values.routes) || 0, 0, 6);

  const base = box(11.8, 0.48, 7.7, 0x8faf7a, { roughness: 0.96 });
  base.position.y = -0.34;
  base.receiveShadow = true;
  root.add(base);

  const cityDeck = box(11.35, 0.1, 7.25, 0xd7d8cd, { roughness: 0.92 });
  cityDeck.position.y = -0.06;
  cityDeck.receiveShadow = true;
  root.add(cityDeck);

  const roadMaterial = material(0x4e5b5c, { roughness: 0.9 });
  const roadA = new THREE.Mesh(new THREE.BoxGeometry(11.3, 0.08, 1.45), roadMaterial);
  const roadB = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.08, 7.2), roadMaterial);
  roadA.position.y = roadB.position.y = -0.03;
  tagAction(roadA, "routes");
  tagAction(roadB, "routes");
  root.add(roadA, roadB);

  const sidewalkMaterial = material(0xc7cec8, { roughness: 0.94 });
  [-0.93, 0.93].forEach((z) => {
    const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.1, 0.34), sidewalkMaterial);
    sidewalk.position.set(0, 0.04, z);
    tagAction(sidewalk, "routes");
    root.add(sidewalk);
  });
  [-0.93, 0.93].forEach((x) => {
    const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 7.05), sidewalkMaterial);
    sidewalk.position.set(x, 0.04, 0);
    tagAction(sidewalk, "routes");
    root.add(sidewalk);
  });

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

  for (let index = -2; index <= 2; index += 1) {
    const crossing = box(0.22, 0.04, 1.22, 0xf4f0d9, { emissive: 0xffffff, emissiveIntensity: 0.08 });
    crossing.position.set(index * 0.38, 0.07, 0);
    tagAction(crossing, "routes");
    root.add(crossing);
  }

  const buildings = [
    [-4.25, -2.35, 1.45, 2.2],
    [-2.35, -2.35, 1.2, 1.6],
    [2.45, -2.35, 1.5, 2.6],
    [4.35, -2.25, 1.2, 1.8],
    [-4.1, 2.25, 1.45, 2.7],
    [3.9, 2.25, 1.5, 2.1],
  ];
  const buildingGroups = [];
  buildings.forEach(([x, z, width, height], index) => {
    const building = createBuilding(
      width,
      height,
      width * 0.8,
      index % 2 ? 0x9caeaa : palette.concrete,
      index
    );
    building.position.set(x, 0, z);
    buildingGroups.push(building);
    root.add(building);
  });

  if (shade + soil >= 5) {
    [buildingGroups[1], buildingGroups[5]].filter(Boolean).forEach((building, index) => {
      const roofGarden = box(0.82 + index * 0.18, 0.09, 0.66 + index * 0.12, 0x5e9354);
      const buildingHeight = buildings[index ? 5 : 1][3];
      roofGarden.position.y = buildingHeight + 0.13;
      tagAction(roofGarden, "shade");
      building.add(roofGarden);
    });
  }

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
    const plantCount = 2 + Math.min(4, soil);
    for (let index = 0; index < plantCount; index += 1) {
      const plant = taperedCylinder(0.02, 0.06, 0.2 + (index % 2) * 0.08, 0x4f8b57, 8);
      plant.position.set(
        x - width * 0.32 + (index / Math.max(1, plantCount - 1)) * width * 0.64,
        0.18,
        z + ((index % 2) - 0.5) * depth * 0.38
      );
      soilGroup.add(plant);
    }
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
  const rainChannel = box(2.35, 0.055, 0.24, palette.blueLight, {
    roughness: 0.2,
    opacity: 0.84,
  });
  rainChannel.position.set(3.2, 0.075, 1.42);
  rainChannel.rotation.y = -0.38;
  waterGroup.add(rainChannel);
  for (let index = 0; index < Math.max(1, water); index += 1) {
    const tank = cylinder(0.2, 0.42 + index * 0.025, palette.blue, 18, { metalness: 0.16 });
    tank.position.set(1.15 + (index % 3) * 0.48, 0.22, 3.05 - Math.floor(index / 3) * 0.5);
    waterGroup.add(tank);
  }
  tagAction(waterGroup, "water");
  root.add(setShadows(waterGroup));

  const bus = new THREE.Group();
  const busBody = box(0.92, 0.38, 0.42, routes >= 3 ? palette.yellow : 0x8c968f, {
    emissive: routes >= 3 ? 0x9c7624 : 0x000000,
    emissiveIntensity: routes >= 3 ? 0.14 : 0,
  });
  busBody.position.y = 0.32;
  const busTop = box(0.72, 0.22, 0.4, 0xd7e9e6);
  busTop.position.y = 0.56;
  bus.add(busBody, busTop);
  [-0.28, 0.28].forEach((x) => {
    [-0.2, 0.2].forEach((z) => {
      const wheel = cylinder(0.08, 0.06, palette.ink, 12);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.15, z);
      bus.add(wheel);
    });
  });
  bus.position.set(-4.2, 0.02, 0.34);
  tagAction(bus, "routes");
  root.add(setShadows(bus));

  const rainCount = 68;
  const rainPositions = new Float32Array(rainCount * 6);
  for (let index = 0; index < rainCount; index += 1) {
    const offset = index * 6;
    const x = (Math.random() - 0.5) * 11;
    const y = 1 + Math.random() * 6;
    const z = (Math.random() - 0.5) * 7;
    rainPositions[offset] = x;
    rainPositions[offset + 1] = y;
    rainPositions[offset + 2] = z;
    rainPositions[offset + 3] = x - 0.04;
    rainPositions[offset + 4] = y - 0.24;
    rainPositions[offset + 5] = z + 0.02;
  }
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
  const rain = new THREE.LineSegments(
    rainGeometry,
    new THREE.LineBasicMaterial({ color: palette.blueLight, transparent: true, opacity: 0.48 })
  );
  root.add(rain);

  return {
    camera: [8.8, 6.8, 10.2],
    animate(time) {
      const positions = rain.geometry.attributes.position.array;
      for (let index = 0; index < rainCount; index += 1) {
        const offset = index * 6;
        positions[offset + 1] -= 0.025 + water * 0.002;
        positions[offset + 4] -= 0.025 + water * 0.002;
        if (positions[offset + 4] < 0.2) {
          positions[offset + 1] = 6.7;
          positions[offset + 4] = 6.46;
        }
      }
      rain.geometry.attributes.position.needsUpdate = true;
      pond.position.y = 0.05 + Math.sin(time * 0.0018) * 0.02;
      bus.position.x = -5.1 + ((time * (0.00034 + routes * 0.000025)) % 10.2);
    },
  };
}

function createCoral(color, height = 1.5) {
  const coral = new THREE.Group();
  const stem = taperedCylinder(0.09, 0.18, height, color, 12, {
    emissive: color,
    emissiveIntensity: 0.06,
  });
  stem.position.y = height / 2;
  coral.add(stem);
  [-1, 1, -1, 1].forEach((direction, index) => {
    const branchHeight = height * (0.35 + (index % 2) * 0.11);
    const branch = taperedCylinder(0.055, 0.1, branchHeight, color, 10, {
      emissive: color,
      emissiveIntensity: 0.06,
    });
    branch.rotation.z = direction * (0.48 + (index % 2) * 0.14);
    branch.rotation.x = (index - 1.5) * 0.08;
    branch.position.set(
      direction * (0.16 + (index % 2) * 0.06),
      height * (0.42 + index * 0.11),
      (index - 1.5) * 0.035
    );
    coral.add(branch);
  });
  const crown = sphere(0.12, color, { emissive: color, emissiveIntensity: 0.1 });
  crown.position.y = height;
  coral.add(crown);
  return coral;
}

function createSeaGrass(color, scale = 1) {
  const grass = new THREE.Group();
  [-0.16, -0.08, 0, 0.08, 0.16].forEach((x, index) => {
    const blade = taperedCylinder(0.018, 0.045, (0.55 + (index % 3) * 0.15) * scale, color, 8);
    blade.position.set(x * scale, (0.28 + (index % 3) * 0.075) * scale, 0);
    blade.rotation.z = (index - 2) * 0.08;
    grass.add(blade);
  });
  return grass;
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

  const reefRocks = new THREE.Group();
  [
    [-3.9, -0.3, 0.7], [-2.6, 1.7, 0.55], [-1.1, 0.25, 0.72],
    [1.15, -0.15, 0.82], [2.8, 1.2, 0.6], [3.75, -1.2, 0.65],
  ].forEach(([x, z, rockScale], index) => {
    const rock = sphere(rockScale, index % 2 ? 0x758b76 : 0x8c927b, { roughness: 0.98 });
    rock.scale.set(1.25, 0.62, 0.95);
    rock.position.set(x, -0.22, z);
    reefRocks.add(rock);
  });
  root.add(setShadows(reefRocks));

  const bleached = new THREE.Color(palette.white);
  const coralPositions = [
    [-3.6, -1.3, 1.55], [-2.2, 0.7, 1.95], [-0.8, -1.5, 1.35],
    [0.65, 0.65, 2.1], [2.05, -1.25, 1.65], [3.45, 0.65, 1.45],
    [-3.1, 1.55, 1.25], [2.7, 1.65, 1.15],
  ];
  const reef = new THREE.Group();
  coralPositions.forEach(([x, z, height], index) => {
    const healthyColor = new THREE.Color(index % 3 === 1 ? palette.yellow : index % 3 === 2 ? 0xd46e94 : palette.coral);
    const livingColor = bleached.clone().lerp(healthyColor, recovery / 100).getHex();
    const coral = createCoral(livingColor, height);
    coral.position.set(x, -0.2, z);
    tagAction(coral, actionIds[index % actionIds.length]);
    reef.add(coral);
  });
  root.add(setShadows(reef));

  const grassGroup = new THREE.Group();
  [
    [-4.3, 1.25], [-3.4, -2], [-1.6, 1.75], [0.1, -2.2],
    [1.9, 1.9], [3.25, -1.7], [4.15, 0.25],
  ].forEach(([x, z], index) => {
    const grass = createSeaGrass(index % 2 ? 0x4b9271 : 0x72ad73, 0.8 + recovery * 0.004);
    grass.position.set(x, -0.24, z);
    grass.userData.phase = index * 0.72;
    grassGroup.add(grass);
  });
  tagAction(grassGroup, "clean-water");
  root.add(setShadows(grassGroup));

  const fishSchool = new THREE.Group();
  const fishCount = 5 + Math.round((recovery + community) / 22);
  for (let index = 0; index < fishCount; index += 1) {
    const fish = createFish(index % 3 === 0 ? palette.yellow : index % 2 ? palette.coral : palette.blue, 0.7 + (index % 3) * 0.14);
    fish.userData.radius = 2.4 + (index % 5) * 0.5;
    fish.userData.phase = (index / fishCount) * Math.PI * 2;
    fish.userData.speed = 0.00022 + (index % 3) * 0.000035;
    fish.userData.height = 1 + (index % 4) * 0.55;
    fishSchool.add(fish);
  }
  tagAction(fishSchool, "local-guides");
  root.add(fishSchool);

  const protectionRing = new THREE.Mesh(
    new THREE.TorusGeometry(4.75, 0.075 + community * 0.00065, 12, 80),
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
  const buoy = taperedCylinder(0.2, 0.34, 0.48, palette.yellow, 16);
  buoy.position.y = 0.38;
  const signal = sphere(0.22, palette.coral, {
    emissive: palette.coral,
    emissiveIntensity: 0.7,
  });
  signal.position.y = 1.35;
  const alertRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.36, 0.035, 8, 32),
    material(palette.coral, { emissive: palette.coral, emissiveIntensity: 0.65 })
  );
  alertRing.rotation.x = Math.PI / 2;
  alertRing.position.y = 1.35;
  beacon.add(pole, buoy, signal, alertRing);
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

  const bubbleCount = 26;
  const bubblePositions = new Float32Array(bubbleCount * 3);
  for (let index = 0; index < bubbleCount; index += 1) {
    bubblePositions[index * 3] = (Math.random() - 0.5) * 9;
    bubblePositions[index * 3 + 1] = Math.random() * 4;
    bubblePositions[index * 3 + 2] = (Math.random() - 0.5) * 5.5;
  }
  const bubbleGeometry = new THREE.BufferGeometry();
  bubbleGeometry.setAttribute("position", new THREE.BufferAttribute(bubblePositions, 3));
  const bubbles = new THREE.Points(
    bubbleGeometry,
    new THREE.PointsMaterial({ color: 0xe9ffff, size: 0.08, transparent: true, opacity: 0.68 })
  );
  root.add(bubbles);

  const caustic = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.045, 8, 80),
    new THREE.MeshBasicMaterial({ color: 0xeafff9, transparent: true, opacity: 0.22 })
  );
  caustic.rotation.x = Math.PI / 2;
  caustic.scale.z = 0.72;
  caustic.position.y = -0.17;
  root.add(caustic);

  return {
    camera: [8.5, 5.4, 10.5],
    animate(time) {
      reef.children.forEach((coral, index) => {
        coral.rotation.z = Math.sin(time * 0.0012 + index) * 0.025;
      });
      grassGroup.children.forEach((grass) => {
        grass.rotation.z = Math.sin(time * 0.001 + grass.userData.phase) * 0.045;
      });
      fishSchool.children.forEach((fish) => {
        const angle = fish.userData.phase + time * fish.userData.speed;
        fish.position.set(
          Math.cos(angle) * fish.userData.radius,
          fish.userData.height + Math.sin(time * 0.0014 + fish.userData.phase) * 0.12,
          Math.sin(angle) * fish.userData.radius * 0.62
        );
        fish.rotation.y = -angle;
      });
      const bubbleValues = bubbles.geometry.attributes.position.array;
      for (let index = 0; index < bubbleCount; index += 1) {
        bubbleValues[index * 3 + 1] += 0.008 + (index % 4) * 0.001;
        if (bubbleValues[index * 3 + 1] > 4.5) bubbleValues[index * 3 + 1] = 0;
      }
      bubbles.geometry.attributes.position.needsUpdate = true;
      protectionRing.rotation.z = time * 0.00008;
      signal.scale.setScalar(1 + Math.sin(time * 0.004) * 0.1);
      alertRing.scale.setScalar(0.92 + Math.sin(time * 0.0032) * 0.13);
      debris.rotation.y = time * 0.00006;
      caustic.rotation.z = time * 0.000055;
    },
  };
}

function createClimateModel(root, values) {
  const controls = ["energy", "mobility", "food", "nature", "fairness"];
  const colors = [palette.yellow, palette.blue, palette.coral, palette.greenLight, 0xc971b8];
  const table = new THREE.Group();
  const tableTop = cylinder(3.65, 0.3, 0x9eb5aa, 64, { roughness: 0.7, metalness: 0.05 });
  tableTop.position.y = -0.85;
  const tableEdge = new THREE.Mesh(
    new THREE.TorusGeometry(3.64, 0.1, 12, 96),
    material(0x3f625a, { roughness: 0.58, metalness: 0.12 })
  );
  tableEdge.rotation.x = Math.PI / 2;
  tableEdge.position.y = -0.72;
  const tableFoot = taperedCylinder(0.9, 1.32, 1.12, 0x365149, 40, { roughness: 0.74 });
  tableFoot.position.y = -1.48;
  table.add(tableTop, tableEdge, tableFoot);
  root.add(setShadows(table));

  const globeGroup = new THREE.Group();
  globeGroup.position.y = 0.83;
  const globe = sphere(1.55, 0x2385a5, {
    roughness: 0.5,
    metalness: 0.04,
    emissive: 0x0c4d61,
    emissiveIntensity: 0.22,
  });
  globeGroup.add(globe);

  const continents = new THREE.Group();
  [
    [45, -15, 1.05, 0.72], [17, 7, 0.78, 1.05], [-22, 18, 0.55, 0.82],
    [40, 92, 1.2, 0.66], [2, 112, 0.92, 0.78], [-27, 135, 0.76, 0.55],
    [54, -105, 1.08, 0.74], [8, -82, 0.58, 0.88], [-21, -60, 0.62, 1.02],
  ].forEach(([latitude, longitude, scaleX, scaleY], index) => {
    continents.add(
      createEarthPatch(
        1.55,
        latitude,
        longitude,
        scaleX,
        scaleY,
        index % 3 === 0 ? 0x86b967 : index % 2 ? 0x67a45d : 0xa4c66b
      )
    );
  });
  globeGroup.add(continents);

  const globeLines = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.585, 3)),
    new THREE.LineBasicMaterial({ color: 0xc3eee0, transparent: true, opacity: 0.17 })
  );
  globeGroup.add(globeLines);
  const atmosphere = sphere(1.69, 0x8ddce6, {
    roughness: 0.15,
    opacity: 0.12,
    emissive: 0x5fc7d1,
    emissiveIntensity: 0.22,
  });
  atmosphere.material.side = THREE.BackSide;
  globeGroup.add(atmosphere);
  root.add(globeGroup);

  const people = new THREE.Group();
  const tokenGroups = [];
  controls.forEach((control, index) => {
    const value = clamp(Number(values[control]) || 0, 0, 6);
    const angle = (index / controls.length) * Math.PI * 2 - Math.PI / 2;
    const person = createPerson(colors[index], value, index);
    person.position.set(Math.cos(angle) * 4.35, -1.88, Math.sin(angle) * 4.35);
    person.rotation.y = -angle - Math.PI / 2;
    person.userData.phase = index * 1.15;
    tagAction(person, control);
    people.add(person);

    const aura = new THREE.Mesh(
      new THREE.TorusGeometry(0.42 + value * 0.035, 0.045, 8, 38),
      material(colors[index], {
        emissive: colors[index],
        emissiveIntensity: 0.18 + value * 0.09,
        opacity: 0.5 + value * 0.065,
      })
    );
    aura.rotation.x = Math.PI / 2;
    aura.position.set(Math.cos(angle) * 4.35, -1.86, Math.sin(angle) * 4.35);
    tagAction(aura, control);
    people.add(aura);

    const tokenGroup = new THREE.Group();
    for (let token = 0; token < 6; token += 1) {
      const active = token < value;
      const tokenDot = sphere(0.085, active ? colors[index] : 0x65756f, {
        emissive: active ? colors[index] : 0x000000,
        emissiveIntensity: active ? 0.55 : 0,
        opacity: active ? 1 : 0.52,
      });
      const radius = 2.42 + token * 0.16;
      tokenDot.position.set(Math.cos(angle) * radius, -0.67, Math.sin(angle) * radius);
      tokenGroup.add(tokenDot);
    }
    tagAction(tokenGroup, control);
    tokenGroups.push(tokenGroup);
    root.add(tokenGroup);

    const tableMarker = cylinder(0.22, 0.035, colors[index], 24, {
      emissive: colors[index],
      emissiveIntensity: 0.18 + value * 0.04,
    });
    tableMarker.position.set(Math.cos(angle) * 3.28, -0.67, Math.sin(angle) * 3.28);
    tagAction(tableMarker, control);
    root.add(tableMarker);
  });
  root.add(people);

  const sharedGoalRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.12, 0.045, 8, 90),
    new THREE.MeshBasicMaterial({ color: 0xf4d66e, transparent: true, opacity: 0.62 })
  );
  sharedGoalRing.rotation.x = Math.PI / 2;
  sharedGoalRing.position.y = -0.66;
  root.add(sharedGoalRing);

  const starCount = 72;
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
    camera: [10.8, 6.6, 12.8],
    target: [0, -0.15, 0],
    animate(time) {
      globeGroup.rotation.y = time * 0.000075;
      atmosphere.scale.setScalar(1 + Math.sin(time * 0.0015) * 0.012);
      people.children.forEach((participant) => {
        if (!participant.userData.body) return;
        participant.userData.body.rotation.z = Math.sin(time * 0.0013 + participant.userData.phase) * 0.018;
        const pulse = 1 + Math.sin(time * 0.0015 + participant.userData.phase) * 0.012;
        participant.userData.body.scale.setScalar(participant.userData.growth * pulse);
      });
      tokenGroups.forEach((tokenGroup, index) => {
        tokenGroup.children.forEach((tokenDot, tokenIndex) => {
          tokenDot.position.y = -0.67 + Math.sin(time * 0.002 + index + tokenIndex * 0.35) * 0.018;
        });
      });
      sharedGoalRing.rotation.z = time * 0.00008;
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
  stage.dataset.modelValues = Object.entries(config.values || {})
    .map(([key, value]) => `${key}:${value}`)
    .join(",");

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
  camera.lookAt(...(model.target || [0, 0.35, 0]));

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
