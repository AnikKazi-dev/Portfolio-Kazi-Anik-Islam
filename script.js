const GITHUB_USER = "AnikKazi-dev";

// Repos you don't want displayed publicly on the website.
const HIDDEN_REPOS = new Set([
  "Hemapta", // confidential
  "Liberation_War_Hero_Museum-Unity",
  "Portfolio-Kazi-Anik-Islam",
  "72-Hour-Renewable-Energy-Percentage-Predictions-for-Sustainable-AI-Training",
  "Food-Recipe-Flutter",
  "AnikKazi-dev",
  "Remove-red-grid-line-from-multiple-ECG-images-Jupyter-notebook",
  "Robot-VS-Zombie-Unity_engine-",
]);

const featuredProjects = [
  {
    name: "72-Hour Renewable Energy % Predictions",
    subtitle: "Python · TensorFlow · CodeCarbon",
    when: "Sep 2025",
    description:
      "Developed 41 forecasting models (deep learning + hybrid) to predict 72-hour renewable electricity share; tracked training/inference emissions with CodeCarbon and produced reproducible JSON outputs + plots.",
    repo: "72-Hour-Renewable-Energy-Percentage-Predictions-for-Sustainable-AI-Training",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AnikKazi-dev/72-Hour-Renewable-Energy-Percentage-Predictions-for-Sustainable-AI-Training",
      },
    ],
  },
  {
    name: "Hemapta : Blood Transfusion Safety App",
    subtitle: "Flutter · Google ML Kit · SQLite",
    when: "Sep 2025",
    description:
      "Collaborated with Uniklinikum Erlangen: barcode + OCR + patient matching via Google ML Kit, GDPR-compliant local processing with SQLite, and PDF/CSV/HL7 report generation. Built toreduce transfusion workflow errors.",
    repo: null,
    links: [
      { label: "Partner", href: "https://www.uk-erlangen.de/" },
      {
        label: "Transfusure",
        href: "https://www.mad.tf.fau.de/teaching/innolab/transfusure/",
      },
    ],
    confidential: true,
    embedUrl: "https://www.youtube-nocookie.com/embed/AY6Ph4JgjeU",
    disableScreenshot: true,
  },
  {
    name: "Food Recipe",
    subtitle: "Flutter",
    description:
      "A Flutter food recipe app with a clean, modern UI featuring recipe browsing and a polished mockup-style presentation for showcasing screens and flows. Designed for quick discovery with clear layout, readable typography, and smooth navigation between recipe details. Built as a solid Flutter UI showcase that’s easy to extend with categories, favorites, and search.",
    repo: "Food-Recipe-Flutter",
    screenshotUrl: "Assets/screenshots/Food-Recipe-Flutter.jpg",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AnikKazi-dev/Food-Recipe-Flutter",
      },
    ],
  },
  {
    name: "Liberation War Hero Museum (VR)",
    subtitle: "Unity · C# · Google VR SDK",
    when: "Jun 2020",
    description:
      "Android VR museum experience featuring interactive exhibitions and multimedia biographies for 1971 Bangladesh Liberation War heroes.",
    repo: "Liberation_War_Hero_Museum-Unity",
    videoUrl: "Assets/videos/Liberation_War_Hero_Museum-Unity.mp4",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AnikKazi-dev/Liberation_War_Hero_Museum-Unity",
      },
    ],
  },
  {
    name: "Climate Confluence",
    subtitle: "Python · Jayvee · Power BI",
    when: "Jun 2024",
    description:
      "Built an ETL pipeline for CO₂ + temperature datasets; analyzed correlation trends and visualized country-wise differences using matplotlib/seaborn FacetGrid plots.",
    repo: "Climate-Confluence",
    screenshotKey: "kazi_MADE",
    links: [],
  },
  {
    name: "Robot vs Zombie",
    subtitle: "Unity · C#",
    description:
      "A Unity game prototype featuring robot-vs-zombie gameplay, with a short gameplay preview. Focused on responsive controls, moment-to-moment action.",
    repo: "Robot-VS-Zombie-Unity_engine-",
    videoUrl: "Assets/videos/Robot-VS-Zombie-Unity_engine-.mp4",
    disableScreenshot: true,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AnikKazi-dev/Robot-VS-Zombie-Unity_engine-",
      },
    ],
  },
];

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null) continue;
    if (k === "text") node.textContent = String(v);
    else if (k === "html") node.innerHTML = String(v);
    else node.setAttribute(k, String(v));
  }
  return node;
}

function truncate(text, max = 140) {
  if (!text) return "";
  const t = String(text).trim();
  if (t.length <= max) return t;
  return t;
}

function toRepoUrl(repo) {
  return `https://github.com/${GITHUB_USER}/${repo}`;
}

function screenshotCandidate(repoName) {
  return `Assets/screenshots/${encodeURIComponent(repoName)}.png`;
}

function projectCard({
  name,
  description,
  badges = [],
  links = [],
  repoName,
  screenshotUrl,
  confidential,
  videoUrl,
  embedUrl,
}) {
  const card = el("article", "card project", { "data-reveal": "" });

  const top = el("div", "project__top");
  const titleWrap = el("div", "");
  titleWrap.appendChild(el("h4", "project__name", { text: name }));

  if (badges.length) {
    const meta = el("div", "project__meta");
    for (const b of badges.slice(0, 4))
      meta.appendChild(el("span", "badge", { text: b }));
    titleWrap.appendChild(meta);
  }

  if (confidential) {
    const meta =
      titleWrap.querySelector(".project__meta") || el("div", "project__meta");
    if (!meta.parentElement) titleWrap.appendChild(meta);
    meta.appendChild(el("span", "badge", { text: "Confidential" }));
  }

  const right = el("div", "");
  if (repoName) {
    right.appendChild(
      el("a", "badge", {
        href: toRepoUrl(repoName),
        target: "_blank",
        rel: "noreferrer",
        text: "Repo",
      })
    );
  }

  top.appendChild(titleWrap);
  top.appendChild(right);

  card.appendChild(top);
  if (description)
    card.appendChild(
      el("p", "project__desc", { text: String(description).trim() })
    );

  const media = el("div", "project__media", {
    role: "img",
    "aria-label": `${name} preview`,
  });
  // Always render a placeholder; if the screenshot exists it will cover it.
  const ph = el("div", "placeholder");
  media.appendChild(ph);

  if (videoUrl) {
    const video = el("video", "", {
      src: videoUrl,
      preload: "metadata",
      playsinline: "",
      muted: "",
      controls: "",
    });
    video.addEventListener(
      "error",
      () => {
        video.remove();
      },
      { once: true }
    );
    media.appendChild(video);
  }

  if (embedUrl) {
    const frame = el("iframe", "", {
      src: embedUrl,
      title: `${name} video`,
      loading: "lazy",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: "",
      referrerpolicy: "strict-origin-when-cross-origin",
    });
    frame.addEventListener(
      "error",
      () => {
        frame.remove();
      },
      { once: true }
    );
    media.appendChild(frame);
  }

  if (screenshotUrl) {
    const img = el("img", "", {
      src: screenshotUrl,
      alt: `${name} screenshot`,
      loading: "lazy",
    });
    let triedJpgFallback = false;
    img.addEventListener("error", () => {
      // Many GitHub screenshots are .jpg; repo cards default to .png.
      if (!triedJpgFallback && String(img.src).toLowerCase().endsWith(".png")) {
        triedJpgFallback = true;
        img.src = String(img.src).replace(/\.png(\?.*)?$/i, ".jpg$1");
        return;
      }
      img.remove();
    });
    media.appendChild(img);
  }
  card.appendChild(media);

  const actions = el("div", "project__actions");
  for (const link of links.slice(0, 3)) {
    actions.appendChild(
      el("a", "link", {
        href: link.href,
        target: "_blank",
        rel: "noreferrer",
        text: link.label,
      })
    );
  }
  if (repoName) {
    actions.appendChild(
      el("a", "link", {
        href: toRepoUrl(repoName),
        target: "_blank",
        rel: "noreferrer",
        text: "Open repo",
      })
    );
  }

  if (actions.childElementCount) card.appendChild(actions);

  return card;
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setupReveal() {
  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15 }
  );

  for (const item of items) io.observe(item);
}

function setupTilt() {
  const els = Array.from(document.querySelectorAll("[data-tilt]"));
  if (!els.length) return;

  for (const node of els) {
    const strength = 10;

    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * strength;
      const ry = (x - 0.5) * strength;
      node.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    };

    const onLeave = () => {
      node.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
  }
}

function setupCursor() {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) return;

  cursor.classList.add("is-on");

  const move = (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  };

  document.addEventListener("mousemove", move, { passive: true });

  const hoverables = "a, button, .card";
  document.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add("is-hover");
    },
    { passive: true }
  );
  document.addEventListener(
    "mouseout",
    (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove("is-hover");
    },
    { passive: true }
  );
}

async function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  for (const p of featuredProjects) {
    const screenshotUrl = p.disableScreenshot
      ? null
      : p.screenshotUrl ||
        screenshotCandidate(p.screenshotKey || p.repo || p.name);
    const badges = [p.subtitle, p.when].filter(Boolean);

    grid.appendChild(
      projectCard({
        name: p.name,
        description: p.description,
        badges,
        links: p.links,
        repoName: p.repo || null,
        screenshotUrl,
        confidential: Boolean(p.confidential),
        videoUrl: p.videoUrl,
        embedUrl: p.embedUrl,
      })
    );
  }
}

function guessDemoLink(repo) {
  // If the repo has a homepage, we use that.
  // If it has GitHub Pages enabled, we can guess the pages URL.
  if (repo.homepage) {
    return { label: "Live", href: repo.homepage };
  }
  if (repo.has_pages) {
    return {
      label: "Live",
      href: `https://${GITHUB_USER}.github.io/${repo.name}/`,
    };
  }
  return null;
}

async function fetchRepos() {
  const status = document.getElementById("repoStatus");
  const setStatus = (t) => status && (status.textContent = t);

  setStatus("Loading GitHub repos…");
  const perPage = 100;

  const all = [];
  for (let page = 1; page <= 3; page++) {
    const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${perPage}&page=${page}&sort=updated`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < perPage) break;
  }

  setStatus(`Loaded ${all.length} repos.`);
  return all;
}

async function renderRepos() {
  const grid = document.getElementById("repoGrid");
  if (!grid) return;

  let repos;
  try {
    repos = await fetchRepos();
  } catch (e) {
    const status = document.getElementById("repoStatus");
    if (status)
      status.textContent = "Could not load repos (rate-limited or offline).";
    return;
  }

  const sorted = repos
    .filter((r) => !r.fork)
    .filter((r) => !HIDDEN_REPOS.has(r.name))
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

  for (const repo of sorted) {
    const screenshotUrl = screenshotCandidate(repo.name);
    const demo = guessDemoLink(repo);

    const badges = [
      repo.language ? repo.language : null,
      repo.stargazers_count ? `★ ${repo.stargazers_count}` : null,
      repo.updated_at
        ? `Updated ${new Date(repo.updated_at).toLocaleDateString()}`
        : null,
    ].filter(Boolean);

    const links = [];
    if (demo) links.push(demo);
    links.push({ label: "GitHub", href: repo.html_url });

    grid.appendChild(
      projectCard({
        name: repo.name,
        description: repo.description || "",
        badges,
        links,
        repoName: repo.name,
        screenshotUrl,
      })
    );
  }
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function kickRevealAfterAsync() {
  // Re-run reveal observation after dynamic nodes are appended.
  const existing = document.querySelectorAll("[data-reveal]");
  for (const node of existing) node.classList.remove("is-visible");
  setupReveal();
}

function setupRepoCollapse(limit = 3) {
  const grid = document.getElementById("repoGrid");
  const toggle = document.getElementById("repoToggle");
  if (!grid || !toggle) return;

  const items = Array.from(grid.children);
  const total = items.length;

  if (total <= limit) {
    toggle.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    grid.classList.remove("is-collapsed");
    return;
  }

  toggle.hidden = false;

  const apply = (expanded) => {
    toggle.textContent = expanded ? "Show less" : "Show more";
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");

    grid.classList.toggle("is-collapsed", !expanded);

    if (expanded) setupReveal();
  };

  if (!toggle.dataset.bound) {
    toggle.dataset.bound = "true";
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      apply(!expanded);
    });
  }

  apply(false);
}

(async function main() {
  setYear();
  setupNav();
  setupCursor();
  setupTilt();
  setupReveal();

  await renderFeatured();
  await renderRepos();

  setupRepoCollapse(3);

  kickRevealAfterAsync();
})();
