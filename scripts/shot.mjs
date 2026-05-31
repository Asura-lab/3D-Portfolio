// 3D-г нүдээр шалгах Playwright screenshot script.
// Ажиллуулах: dev сервер асаалттай байхад  →  node scripts/shot.mjs
import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:3000/en";

// Хэсэг бүрийн scroll хувь — дохио зангааг харах (hero=wave, work=point, lab=excited)
const shots = [
  { name: "hero", frac: 0 },
  { name: "about", frac: 0.2 },
  { name: "work", frac: 0.45 },
  { name: "lab", frac: 0.85 },
  { name: "contact", frac: 1 },
];

const browser = await chromium.launch({
  // Headless дээр software WebGL зөвшөөрөх
  args: [
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
    "--use-gl=angle",
    "--use-angle=swiftshader",
  ],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference", // 3D ачаалагдахын тулд
});
const page = await context.newPage();
page.on("console", (m) => console.log("[page]", m.type(), m.text()));
page.on("pageerror", (e) => console.log("[pageerror]", e.message));

console.log("goto", url);
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3500); // 3D mount + эхний frame-үүд

for (const s of shots) {
  await page.evaluate((frac) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.round(max * frac);
    const l = window.__lenis;
    if (l) l.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  }, s.frac);
  await page.waitForTimeout(2000); // Lenis + gesture damp суух
  await page.screenshot({ path: `shots/${s.name}.png`, fullPage: false });
  console.log("shot:", s.name);
}

await browser.close();
console.log("DONE");
