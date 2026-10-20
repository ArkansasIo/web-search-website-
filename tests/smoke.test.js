import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("static app shell references the Vite entry point", async () => {
  const html = await read("../index.html");
  assert.match(html, /id="app"/);
  assert.match(html, /src="\/src\/main\.js"/);
});

test("search interface includes form, provider options, and topic shortcuts", async () => {
  const js = await read("../src/main.js");
  assert.match(js, /id="search-form"/);
  assert.match(js, /id="provider"/);
  assert.match(js, /data-query=/);
  for (const provider of ["google", "bing", "duckduckgo", "brave", "ecosia"]) {
    assert.match(js, new RegExp(provider));
  }
});

test("responsive styling and accessibility support exist", async () => {
  const css = await read("../src/style.css");
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.sr-only/);
});

test("API includes health and bounded provider search routes", async () => {
  const server = await read("../server/index.js");
  assert.match(server, /\/api\/health/);
  assert.match(server, /\/api\/search/);
  assert.match(server, /q\.length > 500/);
  assert.match(server, /Unsupported provider/);
  assert.match(server, /express\.json\(\{ limit: "16kb" \}\)/);
});
