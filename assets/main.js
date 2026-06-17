/* Bioinformatics 21 Days — site engine
   - Theme toggle
   - LocalStorage progress (day done, task done, quiz scores)
   - Day page renderer (reads ?day=N from URL using DAYS data)
   - Quiz arena renderer
*/

const STORE_KEY = "bi21d_v1";

const store = {
  load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  },
  save(s) { localStorage.setItem(STORE_KEY, JSON.stringify(s)); },
  get(path, def = null) {
    const s = this.load();
    return path.split(".").reduce((o, k) => (o && k in o) ? o[k] : undefined, s) ?? def;
  },
  set(path, val) {
    const s = this.load();
    const keys = path.split(".");
    let o = s;
    for (let i = 0; i < keys.length - 1; i++) {
      o[keys[i]] = o[keys[i]] || {};
      o = o[keys[i]];
    }
    o[keys[keys.length - 1]] = val;
    this.save(s);
  },
  reset() { localStorage.removeItem(STORE_KEY); }
};

/* ---------- Theme ---------- */
function applyTheme(t) {
  if (t === "light") document.documentElement.setAttribute("data-theme", "light");
  else document.documentElement.removeAttribute("data-theme");
}
function initTheme() {
  const saved = localStorage.getItem("bi21d_theme") || "dark";
  applyTheme(saved);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = saved === "light" ? "🌙 Dark" : "☀️ Light";
    btn.addEventListener("click", () => {
      const cur = localStorage.getItem("bi21d_theme") || "dark";
      const next = cur === "light" ? "dark" : "light";
      localStorage.setItem("bi21d_theme", next);
      applyTheme(next);
      btn.textContent = next === "light" ? "🌙 Dark" : "☀️ Light";
    });
  }
}

/* ---------- Helpers ---------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  })[c]);
}
function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

/* ---------- Day grid (index page) ---------- */
function renderDayGrid(targetId = "dayGrid") {
  const grid = document.getElementById(targetId);
  if (!grid || typeof DAYS === "undefined") return;
  const done = store.get("daysDone", {}) || {};
  grid.innerHTML = DAYS.map(d => {
    const isDone = !!done[d.day];
    const tagHtml = (d.tags || []).map(t =>
      `<span class="tag ${t.cls || ''}">${esc(t.label)}</span>`).join("");
    return `
      <a class="day-card" href="day.html?day=${d.day}">
        <span class="check ${isDone ? 'done' : ''}" title="${isDone ? 'Completed' : 'Not done'}">${isDone ? '✓' : ''}</span>
        <div class="day-num">
          <span>Day ${String(d.day).padStart(2,'0')} / 21</span>
          <span>${esc(d.week || '')}</span>
        </div>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.summary)}</p>
        <div class="tags">${tagHtml}</div>
      </a>`;
  }).join("");

  renderProgressBar();
}

function renderProgressBar(targetId = "progressBar") {
  const pb = document.getElementById(targetId);
  if (!pb || typeof DAYS === "undefined") return;
  const done = store.get("daysDone", {}) || {};
  const n = Object.values(done).filter(Boolean).length;
  const total = DAYS.length;
  const pct = Math.round((n / total) * 100);
  pb.querySelector(".bar > div").style.width = pct + "%";
  pb.querySelector(".meta-pct").textContent = pct + "%";
  pb.querySelector(".meta-count").textContent = `${n} / ${total} days complete`;
}

/* ---------- Day page ---------- */
function renderDayPage() {
  if (typeof DAYS === "undefined") return;
  const dayNum = parseInt(qs("day") || "1", 10);
  const day = DAYS.find(d => d.day === dayNum);
  const root = document.getElementById("dayRoot");
  if (!root) return;
  if (!day) {
    root.innerHTML = `<section class="block"><h2>Day not found</h2>
      <p>Use the <a href="index.html">curriculum index</a> to pick a valid day.</p></section>`;
    return;
  }

  document.title = `Day ${day.day} · ${day.title} — Bioinformatics 21 Days`;

  const prev = DAYS.find(d => d.day === dayNum - 1);
  const next = DAYS.find(d => d.day === dayNum + 1);
  const done = !!(store.get("daysDone", {}) || {})[day.day];
  const tagHtml = (day.tags || []).map(t => `<span class="tag ${t.cls || ''}">${esc(t.label)}</span>`).join("");

  // Build sections
  const objHtml = `<ul class="bullets">${day.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>`;

  const ytHtml = (day.videos || []).map(v => {
    if (v.embed) {
      return `<div style="margin-bottom:16px">
        <div class="yt"><iframe src="${esc(v.embed)}" loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
        <div class="text-soft" style="margin-top:6px;font-size:.9rem">${esc(v.title)}</div>
      </div>`;
    }
    return `<div class="res-card" style="margin-bottom:10px">
      <h4>▶ ${esc(v.title)}</h4>
      <p>${esc(v.note || 'Curated YouTube search')}</p>
      <a href="${esc(v.url)}" target="_blank" rel="noopener">Open on YouTube ↗</a>
    </div>`;
  }).join("");

  const readingHtml = (day.reading || []).map(r =>
    `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a> <span class="text-soft">— ${esc(r.note || '')}</span></li>`
  ).join("");

  const taskDoneMap = store.get(`tasks.${day.day}`, {}) || {};
  const tasksHtml = `<ul class="tasks">${day.tasks.map((t, i) => {
    const tid = `t${day.day}_${i}`;
    const isDone = !!taskDoneMap[i];
    return `<li class="${isDone ? 'done' : ''}" data-task="${i}">
      <input type="checkbox" id="${tid}" ${isDone ? 'checked' : ''}>
      <label for="${tid}" style="cursor:pointer;flex:1">
        <span class="task-text">${esc(t)}</span>
      </label></li>`;
  }).join("")}</ul>`;

  const ghHtml = (day.github || []).map(g =>
    `<div class="res-card"><h4>🐙 ${esc(g.title)}</h4>
      <p>${esc(g.note || '')}</p>
      <a href="${esc(g.url)}" target="_blank" rel="noopener">Open on GitHub ↗</a></div>`
  ).join("");

  const rdHtml = (day.reddit || []).map(r =>
    `<div class="res-card"><h4>👽 ${esc(r.title)}</h4>
      <p>${esc(r.note || '')}</p>
      <a href="${esc(r.url)}" target="_blank" rel="noopener">Open on Reddit ↗</a></div>`
  ).join("");

  const caseHtml = day.caseStudy ? `
    <p><span class="level lvl-${day.caseStudy.level}">${['Level 0 · Zero','Level 1 · Beginner','Level 2 · Intermediate','Level 3 · Professional'][day.caseStudy.level]}</span></p>
    <h3 style="margin:0 0 6px">${esc(day.caseStudy.title)}</h3>
    <p>${esc(day.caseStudy.body)}</p>
    ${day.caseStudy.code ? `<pre><code>${esc(day.caseStudy.code)}</code></pre>` : ""}
  ` : `<p class="text-soft">No case study attached.</p>`;

  root.innerHTML = `
    <div class="row-between">
      <div>
        <div class="text-soft">Week ${day.weekNum || ''} · Day ${day.day} of 21</div>
        <h1 style="margin:6px 0">${esc(day.title)}</h1>
        <div class="tags">${tagHtml}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn small ghost" id="toggleDone">${done ? '✓ Marked done' : 'Mark day done'}</button>
        ${prev ? `<a class="btn small ghost" href="day.html?day=${prev.day}">← Day ${prev.day}</a>` : ''}
        ${next ? `<a class="btn small" href="day.html?day=${next.day}">Day ${next.day} →</a>` : ''}
      </div>
    </div>
    <div class="spacer"></div>
    <p>${esc(day.intro)}</p>

    <section class="block">
      <h2>🎯 Learning objectives</h2>
      ${objHtml}
    </section>

    <div class="section-row">
      <section class="block">
        <h2>📺 YouTube</h2>
        ${ytHtml || '<p class="text-soft">No videos curated for this day.</p>'}
      </section>
      <section class="block">
        <h2>📚 Reading</h2>
        <ul class="bullets">${readingHtml || '<li class="text-soft">No reading list.</li>'}</ul>
      </section>
    </div>

    <section class="block">
      <h2>🧪 Hands-on tasks</h2>
      <p class="text-soft" style="margin-top:-6px">Check off each one as you complete it. Progress is saved on this device.</p>
      ${tasksHtml}
    </section>

    <section class="block">
      <h2>🧠 Interactive quiz</h2>
      <p class="text-soft" style="margin-top:-6px">${day.quiz.length} questions. Click an option to reveal the answer + explanation.</p>
      <div class="quiz" id="quizMount"></div>
      <div class="spacer"></div>
      <div class="quiz-result" id="quizResult">Score: 0 / ${day.quiz.length}</div>
    </section>

    <div class="section-row">
      <section class="block">
        <h2>🐙 GitHub repos</h2>
        <div class="res-grid">${ghHtml || '<p class="text-soft">No repos for this day.</p>'}</div>
      </section>
      <section class="block">
        <h2>👽 Reddit threads</h2>
        <div class="res-grid">${rdHtml || '<p class="text-soft">No threads for this day.</p>'}</div>
      </section>
    </div>

    <section class="block">
      <h2>🧬 Case study</h2>
      ${caseHtml}
    </section>

    <div class="row-between">
      ${prev ? `<a class="btn ghost" href="day.html?day=${prev.day}">← Day ${prev.day}: ${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="day.html?day=${next.day}">Day ${next.day}: ${esc(next.title)} →</a>` : '<a class="btn" href="index.html">Back to curriculum</a>'}
    </div>
  `;

  // Wire up: tasks
  root.querySelectorAll(".tasks li").forEach(li => {
    const i = parseInt(li.dataset.task, 10);
    const cb = li.querySelector("input");
    cb.addEventListener("change", () => {
      const cur = store.get(`tasks.${day.day}`, {}) || {};
      cur[i] = cb.checked;
      store.set(`tasks.${day.day}`, cur);
      li.classList.toggle("done", cb.checked);
    });
  });

  // Wire up: day-done toggle
  document.getElementById("toggleDone").addEventListener("click", e => {
    const cur = store.get("daysDone", {}) || {};
    cur[day.day] = !cur[day.day];
    store.set("daysDone", cur);
    e.target.textContent = cur[day.day] ? '✓ Marked done' : 'Mark day done';
  });

  // Mount quiz
  mountQuiz(day.quiz, "quizMount", "quizResult", `quiz.${day.day}`);
}

/* ---------- Quiz engine ---------- */
function mountQuiz(questions, mountId, resultId, storeKey) {
  const mount = document.getElementById(mountId);
  const result = document.getElementById(resultId);
  if (!mount) return;

  const saved = store.get(storeKey, {}) || {};
  const answered = {}; // index -> bool correct
  Object.assign(answered, saved.answers || {});

  function refreshScore() {
    const total = questions.length;
    const correct = Object.values(answered).filter(Boolean).length;
    result.textContent = `Score: ${correct} / ${total}`;
    if (correct === total) {
      result.textContent += "  🎉 Perfect run!";
      result.style.borderColor = "var(--ok)";
    }
    store.set(storeKey, { answers: answered, lastScore: correct });
  }

  mount.innerHTML = questions.map((q, i) => {
    const opts = q.options.map((o, oi) =>
      `<div class="opt" data-q="${i}" data-o="${oi}">
        <span style="opacity:.6;min-width:18px">${String.fromCharCode(65 + oi)}.</span>
        <span>${esc(o)}</span>
      </div>`).join("");
    return `<div class="q" data-q="${i}">
      <div class="q-text">${i + 1}. ${esc(q.q)}</div>
      <div class="opts">${opts}</div>
      <div class="explain hidden">💡 ${esc(q.explain || '')}</div>
    </div>`;
  }).join("");

  mount.querySelectorAll(".opt").forEach(opt => {
    opt.addEventListener("click", () => {
      const qi = parseInt(opt.dataset.q, 10);
      const oi = parseInt(opt.dataset.o, 10);
      const qBlock = mount.querySelector(`.q[data-q="${qi}"]`);
      if (qBlock.dataset.locked) return;
      qBlock.dataset.locked = "1";
      const correctIdx = questions[qi].answer;
      qBlock.querySelectorAll(".opt").forEach((el, idx) => {
        if (idx === correctIdx) el.classList.add("correct");
        if (idx === oi && idx !== correctIdx) el.classList.add("wrong");
      });
      qBlock.querySelector(".explain").classList.remove("hidden");
      answered[qi] = (oi === correctIdx);
      refreshScore();
    });
  });

  // restore prior selections (visual only — we don't relock, simpler UX is re-take)
  refreshScore();
}

/* ---------- Quiz arena (all-days mixed quiz) ---------- */
function renderQuizArena() {
  const mount = document.getElementById("arenaMount");
  if (!mount || typeof DAYS === "undefined") return;
  const all = [];
  DAYS.forEach(d => d.quiz.forEach(q => all.push({ ...q, day: d.day, dayTitle: d.title })));
  // Shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  const subset = all.slice(0, 20); // 20-question arena
  mount.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "quiz";
  wrap.id = "arenaQuiz";
  mount.appendChild(wrap);
  const result = document.createElement("div");
  result.className = "quiz-result";
  result.id = "arenaResult";
  result.textContent = `Score: 0 / ${subset.length}`;
  mount.appendChild(result);

  // Tag each question with origin
  subset.forEach(q => {
    q.q = `(Day ${q.day}) ${q.q}`;
  });
  mountQuiz(subset, "arenaQuiz", "arenaResult", "arena.last");
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderDayGrid();
  renderProgressBar();
  renderDayPage();
  renderQuizArena();

  // Reset button on index (optional)
  const reset = document.getElementById("resetProgress");
  if (reset) {
    reset.addEventListener("click", () => {
      if (confirm("Reset ALL progress (days, tasks, quiz scores)?")) {
        store.reset();
        location.reload();
      }
    });
  }
});
