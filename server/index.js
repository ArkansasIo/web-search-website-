import express from "express";
import helmet from "helmet";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3001", 10);
const host = process.env.HOST ?? "127.0.0.1";

const providers = Object.freeze({
  google: "https://www.google.com/search",
  bing: "https://www.bing.com/search",
  duckduckgo: "https://duckduckgo.com/",
  brave: "https://search.brave.com/search",
  ecosia: "https://www.ecosia.org/search"
});

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "web-search-api", timestamp: new Date().toISOString() });
});

app.get("/api/search", (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const providerKey = typeof req.query.provider === "string" ? req.query.provider.toLowerCase() : "duckduckgo";

  if (!q) return res.status(400).json({ error: "Query parameter q is required." });
  if (q.length > 500) return res.status(400).json({ error: "Query must be 500 characters or fewer." });
  const base = providers[providerKey];
  if (!base) return res.status(400).json({ error: "Unsupported provider.", supportedProviders: Object.keys(providers) });

  const destination = new URL(base);
  destination.searchParams.set("q", q);
  return res.status(200).json({ provider: providerKey, query: q, url: destination.toString() });
});

app.use((req, res) => res.status(404).json({ error: "Not found", path: req.path }));
app.use((err, _req, res, _next) => {
  console.error("Unhandled request error:", err?.message ?? err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, host, () => {
  console.log(`Web Search API listening at http://${host}:${port}`);
});
