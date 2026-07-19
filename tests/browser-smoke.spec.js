const { test, expect } = require("@playwright/test");

const completedBeforeFinale = ["sdg-sprint", "chain-builder", "city-builder", "reef-rescue"];

async function setAdultMode(page, progress = null) {
  await page.addInitScript((savedProgress) => {
    localStorage.setItem("cyri-learning-audience", "adults");
    localStorage.setItem("cyri-language", "en");
    if (savedProgress) {
      localStorage.setItem("cyri-game-progress-v2", JSON.stringify(savedProgress));
    }
  }, progress);
}

async function expectRenderedModel(page, type) {
  const stage = page.locator(`[data-learning-3d="${type}"]`);
  await expect(stage).toHaveAttribute("data-model-ready", "true");
  const canvas = stage.locator("canvas");
  await expect(canvas).toBeVisible();
  const pixels = await canvas.evaluate((element) => {
    const probe = document.createElement("canvas");
    probe.width = 96;
    probe.height = 64;
    const context = probe.getContext("2d", { willReadFrequently: true });
    context.drawImage(element, 0, 0, probe.width, probe.height);
    const data = context.getImageData(0, 0, probe.width, probe.height).data;
    let opaque = 0;
    let darkest = 255;
    let brightest = 0;
    for (let index = 0; index < data.length; index += 4) {
      if (data[index + 3] === 0) continue;
      opaque += 1;
      const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
      darkest = Math.min(darkest, brightness);
      brightest = Math.max(brightest, brightness);
    }
    return { opaque, range: brightest - darkest };
  });
  expect(pixels.opaque).toBeGreaterThan(300);
  expect(pixels.range).toBeGreaterThan(25);
}

test("five-minute path unlocks puzzles in sequence", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await setAdultMode(page);
  await page.goto("http://127.0.0.1:5173/#learn");

  await expect(page.locator("[data-learning-games]")).toContainText("SDG Sprint");
  await expect(page.locator('[data-learning-game="chain-builder"]')).toBeDisabled();

  for (const answer of [11, 14, 13, 12, 2, 17]) {
    await page.locator(`[data-sdg-sprint-option="${answer}"]`).click();
    await page.locator("[data-sdg-sprint-next]").click();
  }

  await expect(page.locator('[data-learning-game="chain-builder"]')).toBeEnabled();
  for (const choice of ["infiltration", "runoff", "flood", "sponge"]) {
    await page.locator(`[data-chain-choice="${choice}"]`).click();
  }
  await page.locator("[data-chain-next]").click();
  for (const choice of ["stress", "bleach", "starve", "care"]) {
    await page.locator(`[data-chain-choice="${choice}"]`).click();
  }
  await page.locator("[data-chain-next]").click();
  for (const choice of ["demand", "resources", "waste", "circular"]) {
    await page.locator(`[data-chain-choice="${choice}"]`).click();
  }
  await page.locator("[data-chain-complete]").click();

  await expect(page.locator("[data-learning-games]")).toContainText("Path complete");
  expect(errors).toEqual([]);
});

test("finale and certificate work on desktop", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await setAdultMode(page, { minutes: 30, completed: completedBeforeFinale, history: [] });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:5173/#learn");
  await page.locator('[data-learning-game="climate-council"]').click();
  await expect(page.locator("[data-learning-games]")).toContainText("Climate Council 2035");
  await expect(page.locator(".climate-person-symbol")).toHaveCount(5);
  await expect(page.locator('[data-learning-3d="climate"] canvas')).toHaveAttribute(
    "aria-label",
    /Five people grow/
  );
  await expect(page.locator('[data-learning-3d="climate"]')).toHaveAttribute(
    "data-model-values",
    /energy:1/
  );

  for (const control of ["energy", "energy", "nature", "nature", "fairness", "fairness"]) {
    await page.locator(`[data-climate-control="${control}"][data-climate-change="1"]`).click();
  }
  await expect(page.locator('[data-learning-3d="climate"]')).toHaveAttribute(
    "data-model-values",
    /energy:3/
  );
  await expect(page.locator('[data-learning-3d="climate"]')).toHaveAttribute(
    "data-model-ready",
    "true"
  );
  await page.locator('[data-learning-3d="climate"]').screenshot({
    path: "/tmp/cyri-climate-grown-3d.png",
  });
  await expect(page.locator("[data-learning-games]")).toContainText("Tokens: 11/14");
  await expect(page.locator("[data-climate-complete]")).toBeEnabled();
  await page.locator("[data-climate-complete]").click();
  await expect(page.locator("[data-certificate-download]")).toBeDisabled();
  await page.locator("[data-certificate-name]").fill("Alex Klimaschützer");
  await expect(page.locator("[data-certificate-download]")).toBeEnabled();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("[data-certificate-download]").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^CYRI-Climate-Certificate-.*\.pdf$/);
  await download.saveAs("/tmp/cyri-climate-certificate.pdf");
  await expect(page.locator("[data-certificate-issued]")).toBeVisible();
  await expect(page.locator("[data-certificate-download]")).toHaveCount(0);
  await expect(page.locator("[data-certificate-name]")).toHaveCount(0);
  const issuance = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("cyri-certificate-issuance-v2") || "null")?.gold
  );
  expect(issuance?.id).toMatch(/^CYRI-GOLD-/);
  await page.screenshot({ path: "/tmp/cyri-learn-desktop.png", fullPage: true });
  const persistedPage = await page.context().newPage();
  await persistedPage.goto("http://127.0.0.1:5173/#learn");
  await expect(persistedPage.locator("[data-certificate-issued]")).toContainText(issuance.id);
  await persistedPage.close();
  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("[data-learning-games-reset]").click();
  await expect(page.locator("[data-learning-games]")).toContainText("0/5");
  await expect(page.locator('[data-learning-game="climate-council"]')).toBeDisabled();
  expect(
    await page.evaluate(() => localStorage.getItem("cyri-certificate-issuance-v2"))
  ).toBeNull();
  expect(errors).toEqual([]);
});

test("city target unlocks before every token is used", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await setAdultMode(page, {
    minutes: 30,
    completed: ["sdg-sprint", "chain-builder"],
    history: [],
  });
  await page.goto("http://127.0.0.1:5173/#learn");
  await page.locator('[data-learning-game="city-builder"]').click();
  await expect(page.locator("[data-city-complete]")).toBeDisabled();
  await page.locator('[data-city-control="routes"][data-city-change="1"]').click();
  await page.locator('[data-city-control="soil"][data-city-change="1"]').click();
  await page.locator('[data-city-control="soil"][data-city-change="1"]').click();
  await expect(page.locator("[data-learning-games]")).toContainText("Tokens: 11/12");
  await expect(page.locator("[data-learning-games]")).toContainText("Continue from 62%");
  await expect(page.locator("[data-city-complete]")).toBeEnabled();
  expect(errors).toEqual([]);
});

test("all three 3D learning models render nonblank pixels", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await setAdultMode(page, { minutes: 30, completed: completedBeforeFinale, history: [] });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("http://127.0.0.1:5173/?model-pixel-check=1#learn");

  for (const [game, model] of [
    ["city-builder", "city"],
    ["reef-rescue", "reef"],
    ["climate-council", "climate"],
  ]) {
    await page.locator(`[data-learning-game="${game}"]`).click();
    await expectRenderedModel(page, model);
    await page.locator(`[data-learning-3d="${model}"]`).screenshot({
      path: `/tmp/cyri-${model}-3d.png`,
    });
  }
  expect(errors).toEqual([]);
});

test("learning arcade has no horizontal overflow on mobile", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await setAdultMode(page, { minutes: 30, completed: completedBeforeFinale, history: [] });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5173/?model-pixel-check=1#learn");
  await page.locator('[data-learning-game="climate-council"]').click();
  await expect(page.locator("[data-learning-games]")).toContainText("Climate Council 2035");
  await expectRenderedModel(page, "climate");
  await page.locator('[data-learning-3d="climate"]').screenshot({
    path: "/tmp/cyri-climate-mobile-3d.png",
  });
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );
  expect(hasOverflow).toBe(false);
  await page.screenshot({ path: "/tmp/cyri-learn-mobile.png", fullPage: true });
  await page.locator(".game-stage").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "/tmp/cyri-learn-mobile-stage.png", fullPage: false });
  expect(errors).toEqual([]);
});
