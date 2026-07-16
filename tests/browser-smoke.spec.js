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

test("five-minute path unlocks puzzles in sequence", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await setAdultMode(page);
  await page.goto("http://127.0.0.1:5173/#learn");

  await expect(page.locator("[data-learning-games]")).toContainText("SDG Sprint");
  await expect(page.locator('[data-learning-game="chain-builder"]')).toBeDisabled();

  for (const answer of [11, 14, 13, 12]) {
    await page.locator(`[data-sdg-sprint-option="${answer}"]`).click();
    await page.locator("[data-sdg-sprint-next]").click();
  }

  await expect(page.locator('[data-learning-game="chain-builder"]')).toBeEnabled();
  for (const choice of ["infiltration", "runoff", "flood"]) {
    await page.locator(`[data-chain-choice="${choice}"]`).click();
  }
  await page.locator("[data-chain-next]").click();
  for (const choice of ["stress", "bleach", "care"]) {
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

  for (const control of ["energy", "energy", "nature", "nature", "fairness", "fairness"]) {
    await page.locator(`[data-climate-control="${control}"][data-climate-change="1"]`).click();
  }
  await expect(page.locator("[data-climate-complete]")).toBeEnabled();
  await page.locator("[data-climate-complete]").click();
  await page.locator("[data-certificate-name]").fill("Alex Climate");
  const downloadPromise = page.waitForEvent("download");
  await page.locator("[data-certificate-download]").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^CYRI-Climate-Certificate-.*\.pdf$/);
  await page.screenshot({ path: "/tmp/cyri-learn-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("learning arcade has no horizontal overflow on mobile", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await setAdultMode(page, { minutes: 30, completed: completedBeforeFinale, history: [] });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5173/#learn");
  await page.locator('[data-learning-game="climate-council"]').click();
  await expect(page.locator("[data-learning-games]")).toContainText("Climate Council 2035");
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );
  expect(hasOverflow).toBe(false);
  await page.screenshot({ path: "/tmp/cyri-learn-mobile.png", fullPage: true });
  await page.locator(".game-stage").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "/tmp/cyri-learn-mobile-stage.png", fullPage: false });
  expect(errors).toEqual([]);
});
