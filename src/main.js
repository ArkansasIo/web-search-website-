import "./style.css";

const PROVIDERS = {
  google: { label: "Google", url: "https://www.google.com/search" },
  bing: { label: "Bing", url: "https://www.bing.com/search" },
  duckduckgo: { label: "DuckDuckGo", url: "https://duckduckgo.com/" },
  brave: { label: "Brave Search", url: "https://search.brave.com/search" },
  ecosia: { label: "Ecosia", url: "https://www.ecosia.org/search" }
};

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="page-shell">
    <header class="topbar">
      <a class="brand" href="./" aria-label="Northstar Search home">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="17" cy="17" r="10" fill="none" stroke="currentColor" stroke-width="4"/><path d="M25 25 34 34" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>
        <span>Northstar<span class="brand-muted"> Search</span></span>
      </a>
      <nav class="top-links" aria-label="Primary">
        <a href="#about">About</a>
        <a href="https://github.com/ArkansasIo/web-search-website-" target="_blank" rel="noreferrer">Source <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <section class="hero" aria-labelledby="headline">
      <div class="eyebrow"><span class="pulse-dot"></span> A clearer way to explore</div>
      <h1 id="headline">The web is wide.<br><span>Find your direction.</span></h1>
      <p class="intro">One simple starting point for your next question, discovery, or big idea.</p>
      <form id="search-form" class="search-panel">
        <label class="sr-only" for="query">Search the web</label>
        <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
        <input id="query" name="q" type="search" placeholder="What are you looking for?" autocomplete="off" required maxlength="500" autofocus />
        <button type="submit" class="search-button"><span>Search</span><span aria-hidden="true">→</span></button>
      </form>
      <div class="search-options">
        <label for="provider">Search with</label>
        <select id="provider" aria-label="Search provider">
          <option value="duckduckgo">DuckDuckGo</option><option value="google">Google</option><option value="bing">Bing</option><option value="brave">Brave Search</option><option value="ecosia">Ecosia</option>
        </select>
        <span class="option-note">Your query opens directly with the selected provider.</span>
      </div>
      <p id="status" class="status" role="status" aria-live="polite"></p>
    </section>
    <section class="discovery" aria-label="Popular starting points">
      <div class="section-heading"><span>START EXPLORING</span><span class="section-line"></span></div>
      <div class="topic-grid">
        <button class="topic-card" type="button" data-query="technology trends"><span class="topic-icon blue">⌘</span><span class="topic-copy"><strong>Technology</strong><small>Ideas shaping tomorrow</small></span><span class="topic-arrow">↗</span></button>
        <button class="topic-card" type="button" data-query="science discoveries"><span class="topic-icon violet">✳</span><span class="topic-copy"><strong>Science</strong><small>Understand the unknown</small></span><span class="topic-arrow">↗</span></button>
        <button class="topic-card" type="button" data-query="learn programming"><span class="topic-icon teal">⌘</span><span class="topic-copy"><strong>Learn</strong><small>Build a new skill</small></span><span class="topic-arrow">↗</span></button>
        <button class="topic-card" type="button" data-query="world news"><span class="topic-icon amber">◎</span><span class="topic-copy"><strong>World</strong><small>Explore beyond your feed</small></span><span class="topic-arrow">↗</span></button>
      </div>
    </section>
    <section id="about" class="about">
      <span class="about-symbol" aria-hidden="true">✦</span><div><h2>Curiosity starts here.</h2><p>Northstar is a lightweight search front end. Choose a provider, enter a query, and continue your search on that provider's website.</p></div>
    </section>
    <footer><span>© <span id="year"></span> Northstar Search</span><span>Simple by design <span class="footer-star">✦</span></span></footer>
  </main>`;

const form = document.querySelector("#search-form");
const queryInput = document.querySelector("#query");
const providerSelect = document.querySelector("#provider");
const status = document.querySelector("#status");

function search(query) {
  const normalized = query.trim();
  if (!normalized) {
    status.textContent = "Enter a search term to continue.";
    queryInput.focus();
    return;
  }
  if (normalized.length > 500) {
    status.textContent = "Search queries must be 500 characters or fewer.";
    return;
  }
  const provider = PROVIDERS[providerSelect.value] ?? PROVIDERS.duckduckgo;
  const destination = new URL(provider.url);
  destination.searchParams.set("q", normalized);
  window.location.assign(destination.toString());
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search(queryInput.value);
});
document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    queryInput.value = button.dataset.query ?? "";
    search(queryInput.value);
  });
});
document.querySelector("#year").textContent = String(new Date().getFullYear());
