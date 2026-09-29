// Pre-computes the static map geometry used by the site (world land outline,
// academic-journey arc, port positions) so no mapping library ships to the browser.
// Run with: npm run generate:maps
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { geoNaturalEarth1, geoPath, geoMercator } from "d3-geo";
import { feature } from "topojson-client";
import { presimplify, simplify, quantile, sphericalTriangleArea } from "topojson-simplify";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const land110 = JSON.parse(readFileSync(join(root, "node_modules/world-atlas/land-110m.json"), "utf8"));
const countries110 = JSON.parse(readFileSync(join(root, "node_modules/world-atlas/countries-110m.json"), "utf8"));
const land50 = JSON.parse(readFileSync(join(root, "node_modules/world-atlas/land-50m.json"), "utf8"));
const countries50 = JSON.parse(readFileSync(join(root, "node_modules/world-atlas/countries-50m.json"), "utf8"));

const round = (n) => Math.round(n * 10) / 10;
const clone = (o) => JSON.parse(JSON.stringify(o));
const simplified = (topology, keep) => {
  const pre = presimplify(clone(topology), sphericalTriangleArea);
  return simplify(pre, quantile(pre, 1 - keep));
};
const landWorldTopo = simplified(land110, 0.55);
const landMiniTopo = simplified(land110, 0.22);

// ---------- 1. World map (control-tower views): Natural Earth, Antarctica removed
const landWorld = feature(landWorldTopo, landWorldTopo.objects.land);
const withoutAntarctica = {
  type: "FeatureCollection",
  features: landWorld.features.map((f) => ({
    ...f,
    geometry: {
      type: "MultiPolygon",
      coordinates: (f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates]).filter(
        (poly) => Math.max(...poly[0].map((p) => p[1])) > -58,
      ),
    },
  })),
};
const W = 1000;
const H = 470;
const world = geoNaturalEarth1().fitExtent(
  [
    [6, 6],
    [W - 6, H - 6],
  ],
  withoutAntarctica,
);
const worldPath = geoPath(world).digits(1)(withoutAntarctica);

// Ports / hubs used by the demonstration shipment data (coordinates are public geography).
const ports = {
  shanghai: [121.47, 31.23],
  singapore: [103.85, 1.29],
  busan: [129.04, 35.1],
  nhavaSheva: [72.95, 18.95],
  jebelAli: [55.06, 25.01],
  rotterdam: [4.48, 51.92],
  hamburg: [9.99, 53.55],
  leHavre: [0.1, 49.49],
  fos: [4.9, 43.4],
  newYork: [-74.04, 40.67],
  losAngeles: [-118.27, 33.74],
  santos: [-46.33, -23.96],
  durban: [31.03, -29.87],
  sydney: [151.21, -33.87],
};
const portXY = Object.fromEntries(Object.entries(ports).map(([k, ll]) => [k, world(ll).map(round)]));

// ---------- 2. Academic journey (Hyderabad -> Montpellier), higher-detail 50m land
const hyderabad = [78.4867, 17.385];
const montpellier = [3.8767, 43.6108];
const JW = 1000;
const JH = 560;
const region = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-11, 4],
        [-11, 58],
        [98, 58],
        [98, 4],
        [-11, 4],
      ],
    ],
  },
};
const journey = geoMercator().fitExtent(
  [
    [0, 0],
    [JW, JH],
  ],
  region,
);
journey.clipExtent([
  [-2, -2],
  [JW + 2, JH + 2],
]);
const landJ = feature(land110, land110.objects.land);
const journeyLand = geoPath(journey).digits(0)(landJ);
const c50 = feature(countries50, countries50.objects.countries);
const france = c50.features.find((f) => f.id === "250");
const india = c50.features.find((f) => f.id === "356");
const franceMainland = {
  ...france,
  geometry: {
    type: "MultiPolygon",
    coordinates: france.geometry.coordinates.filter((poly) => {
      const lon = poly[0][0][0];
      const lat = poly[0][0][1];
      return lon > -6 && lon < 10 && lat > 41 && lat < 52;
    }),
  },
};
const journeyFrance = geoPath(journey).digits(0)(franceMainland);
const journeyIndia = geoPath(journey).digits(0)(india);
// great-circle arc
const arc = geoPath(journey).digits(1)({ type: "LineString", coordinates: [hyderabad, montpellier] });
const hydXY = journey(hyderabad).map(round);
const mplXY = journey(montpellier).map(round);

// ---------- 3. Small world silhouette for thumbnails (110m, lower precision)
const sw = 320;
const sh = 160;
const small = geoNaturalEarth1().fitExtent(
  [
    [2, 2],
    [sw - 2, sh - 2],
  ],
  withoutAntarctica,
);
const miniLand = feature(landMiniTopo, landMiniTopo.objects.land);
const smallBig = {
  type: "FeatureCollection",
  features: miniLand.features.map((f) => ({
    ...f,
    geometry: {
      type: "MultiPolygon",
      coordinates: (f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates]).filter((poly) => {
        if (Math.max(...poly[0].map((p) => p[1])) <= -58) return false;
        const pts = poly[0].map((p) => small(p)).filter(Boolean);
        const xs = pts.map((p) => p[0]);
        const ys = pts.map((p) => p[1]);
        return Math.max(...xs) - Math.min(...xs) > 6 || Math.max(...ys) - Math.min(...ys) > 6;
      }),
    },
  })),
};
const smallPath = geoPath(small).digits(0)(smallBig);
const smallPorts = Object.fromEntries(Object.entries(ports).map(([k, ll]) => [k, small(ll).map(Math.round)]));

// unused import guard (countries110 kept for future country-level views)
void countries110;

const header = `// AUTO-GENERATED by scripts/build-geo.mjs. Do not edit by hand.
// Source geometry: Natural Earth via the world-atlas package (public domain).
`;
const files = {
  "src/content/geo/world.generated.ts": `${header}
export const WORLD_VIEWBOX = { width: ${W}, height: ${H} } as const;
/** Land outline lives in /public/images/geo/world-land.svg (loaded lazily as an image). */
export const WORLD_LAND_SRC = "/images/geo/world-land.svg";
export const WORLD_PORTS = ${JSON.stringify(portXY)} as const;
export type PortId = keyof typeof WORLD_PORTS;
`,
  "src/content/geo/mini-world.generated.ts": `${header}
export const MINI_WORLD_VIEWBOX = { width: ${sw}, height: ${sh} } as const;
export const MINI_WORLD_SRC = "/images/geo/mini-world.svg";
export const MINI_WORLD_PORTS = ${JSON.stringify(smallPorts)} as const;
`,
  "src/content/geo/journey.generated.ts": `${header}
export const JOURNEY_VIEWBOX = { width: ${JW}, height: ${JH} } as const;
/** Land, France and India outlines, cropped to the map window, as a static image. */
export const JOURNEY_BASE_SRC = "/images/geo/journey-base.svg";
export const JOURNEY_WINDOW = { x: 150, y: 150, w: 700, h: 400 } as const;
export const JOURNEY_ARC_PATH = ${JSON.stringify(arc)};
export const JOURNEY_POINTS = { hyderabad: ${JSON.stringify(hydXY)}, montpellier: ${JSON.stringify(mplXY)} } as const;
`,
};

// ---------- static geometry images (cached by the browser, never in the JS bundle)
mkdirSync(join(root, "public/images/geo"), { recursive: true });
writeFileSync(
  join(root, "public/images/geo/world-land.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="${worldPath}" fill="#1a3160" stroke="#26437a" stroke-width="0.6"/></svg>`,
);
writeFileSync(
  join(root, "public/images/geo/mini-world.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sw} ${sh}" width="${sw}" height="${sh}"><path d="${smallPath}" fill="#dbe6f5"/></svg>`,
);
writeFileSync(
  join(root, "public/images/geo/journey-base.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="150 150 700 400" width="700" height="400"><path d="${journeyLand}" fill="#e4ecf6" stroke="#ffffff" stroke-width="1.2"/><path d="${journeyFrance}" fill="#145fe5" fill-opacity="0.22" stroke="#145fe5" stroke-opacity="0.35" stroke-width="0.8"/><path d="${journeyIndia}" fill="#145fe5" fill-opacity="0.22" stroke="#145fe5" stroke-opacity="0.35" stroke-width="0.8"/></svg>`,
);

// ---------- 4. Static SVG thumbnail for the menu preview (loaded as an <img>, not JS)
const [hx, hy] = hydXY;
const [mx, my] = mplXY;
const vx = Math.round(mx - 150);
const vy = Math.round(my - 130);
const vw = Math.round(hx - mx + 300);
const vh = Math.round(vw * 0.6);
const journeyThumb = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" width="480" height="288">
<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#eef4fb"/>
<path d="${journeyLand}" fill="#d3e1f3" stroke="#ffffff" stroke-width="1.2"/>
<path d="${journeyFrance}" fill="#145fe5" fill-opacity="0.28"/>
<path d="${journeyIndia}" fill="#145fe5" fill-opacity="0.28"/>
<path d="${arc}" fill="none" stroke="#0b3d91" stroke-width="3.2" stroke-linecap="round"/>
<circle cx="${mx}" cy="${my}" r="9" fill="#ffffff" stroke="#0b3d91" stroke-width="4"/>
<circle cx="${hx}" cy="${hy}" r="9" fill="#0b3d91"/>
</svg>`;
mkdirSync(join(root, "public/images/ui"), { recursive: true });
writeFileSync(join(root, "public/images/ui/journey-thumb.svg"), journeyThumb);

mkdirSync(join(root, "src/content/geo"), { recursive: true });
for (const [rel, text] of Object.entries(files)) {
  writeFileSync(join(root, rel), text);
  console.log(rel, (text.length / 1024).toFixed(1) + " KB");
}
