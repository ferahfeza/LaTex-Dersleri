// Basit yardımcılar
const $ = (sel) => document.querySelector(sel);
const qs = (key) => new URL(location.href).searchParams.get(key);
const fmtDate = (iso) => {
  try {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("tr-TR", { year: "numeric", month: "short", day: "2-digit" });
  } catch { return iso; }
};

const Theme = {
  get() { return localStorage.getItem('theme') || 'auto'; },
  set(v) {
    localStorage.setItem('theme', v);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = v === 'auto' ? (prefersDark ? 'dark' : 'light') : v;
    document.documentElement.setAttribute('data-bs-theme', next);
  },
  initDropdown() {
    document.querySelectorAll('[data-bs-theme-value]').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.getAttribute('data-bs-theme-value');
        Theme.set(v);
      });
    });
    // Sistem teması değiştiğinde 'auto' ise güncelle
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', () => {
        if (Theme.get() === 'auto') Theme.set('auto');
      });
    } catch {}
  }
};

const state = {
  lessons: [],
  byPath: new Map(),
};

async function loadLessons() {
  const res = await fetch("data/lessons.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("lessons.json yüklenemedi");
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("lessons.json formatı geçersiz");
  state.lessons = data;
  state.byPath = new Map(data.map(x => [x.path, x]));
  return data;
}

function renderTable(filter = "") {
  const tbody = $("#list-body");
  tbody.innerHTML = "";
  const norm = (s) => (s || "").toString().toLowerCase();
  const q = norm(filter);

  const filtered = state.lessons.filter(item => {
    if (!q) return true;
    const hay = [
      item.title,
      item.summary,
      ...(item.tags || []),
      item.path
    ].map(norm).join(" ");
    return hay.includes(q);
  });

  if (filtered.length === 0) {
    $("#table-wrap").hidden = true;
    $("#empty").hidden = false;
    return;
  } else {
    $("#empty").hidden = true;
    $("#table-wrap").hidden = false;
  }

  filtered
    .sort((a,b) => (b.date || "").localeCompare(a.date || ""))
    .forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <a class="fw-semibold link-body-emphasis text-decoration-none" href="ders.html?dosya=${encodeURIComponent(item.path)}">${item.title}</a>
        </td>
        <td class="text-nowrap">${item.date ? fmtDate(item.date) : ""}</td>
        <td>${Array.isArray(item.tags) && item.tags.length ? item.tags.map(t => `<span class=\"badge text-bg-secondary me-1\">${t}</span>`).join("") : ""}</td>
        <td class="text-secondary">${item.summary || ""}</td>
      `;
      tbody.appendChild(tr);
    });
}

async function initIndex() {
  $("#year").textContent = new Date().getFullYear();
  Theme.initDropdown();

  try {
    await loadLessons();
    $("#loading").remove();
    $("#table-wrap").hidden = false;
    renderTable();
  } catch (e) {
    console.error(e);
    $("#loading").textContent = "Veriler yüklenemedi.";
  }

  $("#search")?.addEventListener("input", (e) => {
    renderTable(e.target.value);
  });
}

async function initDetail() {
  $("#year").textContent = new Date().getFullYear();
  Theme.initDropdown();

  const path = qs("dosya");
  if (!path) {
    $("#content .card-body").innerHTML = "";
    $("#error").hidden = false;
    return;
  }

  try { await loadLessons(); } catch (e) {}

  const meta = state.byPath.get(path);
  if (meta?.title) {
    document.title = `${meta.title} · LaTeX Ders Notları`;
    $("#note-title").textContent = meta.title;
    $("#note-meta").innerHTML = `
      ${meta.date ? `Tarih: ${fmtDate(meta.date)}` : ""}
      ${Array.isArray(meta.tags) && meta.tags.length ? ` · Etiketler: ${meta.tags.join(", ")}` : ""}
    `;
  }

  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error("Markdown bulunamadı");
    const text = await res.text();

    if (window.marked) {
      marked.setOptions({ gfm: true, breaks: false });
      const html = marked.parse(text);
      const body = document.createElement('div');
      body.className = 'markdown-body';
      body.innerHTML = html;

      const container = $("#content .card-body");
      container.innerHTML = "";
      container.appendChild(body);

      if (window.hljs) {
        body.querySelectorAll("pre code").forEach(block => {
          try { hljs.highlightElement(block); } catch {}
        });
      }
    } else {
      $("#content .card-body").textContent = text;
    }
  } catch (e) {
    console.error(e);
    $("#content .card-body").innerHTML = "";
    $("#error").hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "index") initIndex();
  if (page === "detail") initDetail();
});
