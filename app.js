/**
 * EngCalc v2 — camada de renderização "memória de cálculo"
 * Usa ICONS + DATA de data.js (motor original, intacto).
 */
"use strict";

/* ── Helpers ── */
function iconHTML(key) {
  const raw = (ICONS[key] || ICONS.tool);
  return raw.replace("<svg ", `<svg fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" `);
}
const pad2 = n => String(n + 1).padStart(2, "0");
const esc  = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Divide o label "Sym — descrição" em símbolo + resto */
function splitLabel(label) {
  const m = label.match(/^\s*([^—–-]+?)\s*[—–-]\s*(.+)$/);
  if (m) return { sym: m[1].trim(), rest: m[2].trim() };
  return { sym: "", rest: label };
}

/* ── Histórico (mesma lógica/armazenamento do original) ── */
const MAX_HISTORY = 8;
let calcHistory = JSON.parse(localStorage.getItem("engcalc_history") || "[]");

function saveHistory(entry) {
  calcHistory.unshift(entry);
  if (calcHistory.length > MAX_HISTORY) calcHistory = calcHistory.slice(0, MAX_HISTORY);
  try { localStorage.setItem("engcalc_history", JSON.stringify(calcHistory)); } catch (e) {}
  renderHistory();
}

function renderHistory() {
  const host = document.getElementById("history");
  if (!host) return;

  const body = calcHistory.length === 0
    ? `<div class="hist-empty">Nenhum cálculo no histórico ainda.<br>Os cálculos que você realizar aparecem aqui.</div>`
    : calcHistory.map((e, i) => `
        <button class="hist-item" data-hidx="${i}">
          <span class="hist-num">${pad2(i)}</span>
          <span class="calc-info">
            <span class="hist-name">${esc(e.calcName)}</span>
            <span class="hist-sub">${esc(e.area)} · ${esc(e.inputSummary)}</span>
          </span>
          <span class="hist-res">${esc(e.resultStr)}</span>
        </button>`).join("")
      + `<button class="hist-clear" id="hist-clear">limpar histórico</button>`;

  host.innerHTML = `
    <div class="sheet">
      <div class="sheet-head">
        <span class="sheet-code">LOG</span>
        <span class="sheet-title">Histórico</span>
        <span class="sheet-count">${calcHistory.length} registro(s)</span>
      </div>
      ${body}
    </div>`;

  host.querySelectorAll(".hist-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const e = calcHistory[+btn.dataset.hidx];
      selectArea(e.areaKey);
      selectCalc(e.areaKey, e.calcId, e.vals);
    });
  });
  const clearBtn = document.getElementById("hist-clear");
  if (clearBtn) clearBtn.addEventListener("click", () => {
    calcHistory = [];
    try { localStorage.removeItem("engcalc_history"); } catch (e) {}
    renderHistory();
  });
}

/* ── Estado ── */
let currentArea = null;
let currentCalc = null;

/* ── Abas de área ── */
const HISTORY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>`;

function buildTabs() {
  const nav = document.getElementById("area-tabs");
  nav.innerHTML = "";
  Object.entries(DATA).forEach(([key, area]) => {
    const b = document.createElement("button");
    b.className = "tb-tab";
    b.dataset.area = key;
    b.innerHTML = `${iconHTML(area.icon)}<span>${area.label}</span>`;
    b.addEventListener("click", () => selectArea(key));
    nav.appendChild(b);
  });

  const hb = document.createElement("button");
  hb.className = "tb-tab";
  hb.dataset.history = "1";
  hb.innerHTML = `${HISTORY_ICON}<span>Histórico</span>`;
  hb.addEventListener("click", selectHistory);
  nav.appendChild(hb);
}

/* ── Histórico (aba dedicada) ── */
function selectHistory() {
  currentArea = null;
  currentCalc = null;

  document.querySelectorAll(".tb-tab").forEach(t =>
    t.classList.toggle("active", t.dataset.history === "1"));

  document.getElementById("index-sheet").innerHTML = "";
  document.getElementById("worksheet").innerHTML = "";

  const host = document.getElementById("history");
  host.style.display = "";
  renderHistory();
  host.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Índice de cálculos da área ── */
function selectArea(key) {
  currentArea = key;
  currentCalc = null;
  const area = DATA[key];

  document.querySelectorAll(".tb-tab").forEach(t =>
    t.classList.toggle("active", t.dataset.area === key));

  document.getElementById("history").style.display = "none";

  const rows = area.calcs.map((c, i) => `
    <button class="calc-item" data-calc="${c.id}">
      <span class="calc-num">${pad2(i)}</span>
      <span class="calc-info">
        <span class="calc-name">${esc(c.name)}</span>
        <span class="calc-desc">${esc(c.desc)}</span>
      </span>
      ${c.norma
        ? `<span class="norma-stamp">${esc(c.norma)}</span>`
        : `<span class="calc-index-arrow"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>`}
    </button>`).join("");

  document.getElementById("index-sheet").innerHTML = `
    <div class="sheet-head">
      <span class="sheet-code">${esc(area.label.slice(0, 3).toUpperCase())}</span>
      <span class="sheet-title">${esc(area.label)}</span>
      <span class="sheet-count">${area.calcs.length} cálculos · selecione um item</span>
    </div>
    ${rows}`;

  document.querySelectorAll("#index-sheet .calc-item").forEach(btn => {
    btn.addEventListener("click", () => selectCalc(key, btn.dataset.calc));
  });

  document.getElementById("worksheet").innerHTML = "";
}

/* ── Worksheet (memória de cálculo) ── */
function selectCalc(areaKey, calcId, prefill) {
  const area = DATA[areaKey];
  const idx  = area.calcs.findIndex(x => x.id === calcId);
  const calc = area.calcs[idx];
  if (!calc) return;
  currentCalc = calcId;

  document.querySelectorAll("#index-sheet .calc-item").forEach(b =>
    b.classList.toggle("active", b.dataset.calc === calcId));

  const fields = calc.fields.map(f => {
    const { sym, rest } = splitLabel(f.label);
    const val = prefill && prefill[f.id] !== undefined ? prefill[f.id] : "";
    return `
      <div class="field-row" id="fr-${f.id}">
        <label class="field-label" for="in-${f.id}">
          ${sym ? `<span class="sym">${esc(sym)}</span> — ` : ""}${esc(rest)}
        </label>
        <div class="field-input-wrap">
          <input id="in-${f.id}" type="number" step="any" inputmode="decimal"
                 autocomplete="off" placeholder="${esc(f.ph)}" value="${esc(val)}">
          ${f.hint ? `<span class="field-unit">${esc(f.hint)}</span>` : ""}
        </div>
      </div>`;
  }).join("");

  document.getElementById("worksheet").innerHTML = `
    <div class="sheet ws">
      <div class="ws-head">
        <span class="ws-code">${esc(area.label.slice(0, 3).toUpperCase())}·${pad2(idx)}</span>
        <span class="ws-title">${esc(calc.name)}</span>
        ${calc.norma ? `<span class="norma-stamp">${esc(calc.norma)}</span>` : ""}
      </div>

      ${calc.context ? `
      <div class="ws-block">
        <div class="ws-block-label">Nota técnica</div>
        <div class="ws-block-body"><p class="ws-note">${esc(calc.context)}</p></div>
      </div>` : ""}

      ${calc.diagram ? `
      <div class="ws-block">
        <div class="ws-block-label">Esquema</div>
        <div class="ws-block-body"><div class="ws-diagram">${calc.diagram}</div></div>
      </div>` : ""}

      <div class="ws-block">
        <div class="ws-block-label">Dados de entrada</div>
        <div class="ws-block-body">${fields}</div>
      </div>

      <div class="ws-block">
        <div class="ws-block-label">Fórmula</div>
        <div class="ws-block-body"><div class="ws-formula">${esc(calc.formula)}</div></div>
      </div>

      <div class="ws-actions">
        <button class="btn-calc" id="btn-calc">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          Calcular
        </button>
      </div>

      <div id="result-host"></div>
    </div>`;

  document.getElementById("btn-calc").addEventListener("click", () => runCalc(areaKey, calcId));
  const inputs = document.querySelectorAll("#worksheet input");
  inputs.forEach(inp => inp.addEventListener("keydown", e => {
    if (e.key === "Enter") runCalc(areaKey, calcId);
  }));

  document.querySelector("#worksheet .ws").scrollIntoView({ behavior: "smooth", block: "start" });
  if (inputs[0] && !prefill) inputs[0].focus();
  if (prefill) runCalc(areaKey, calcId);
}

/* ── Renderiza relatório multi-linha como datasheet ── */
function renderReport(text) {
  const lines = text.split("\n").map(line => {
    if (/^\s*[─—-]{2,}|─{2,}/.test(line) || /──/.test(line)) {
      return `<span class="rl-sec">${esc(line.replace(/─+/g, "").replace(/─/g, "").trim() || " ")}</span>`;
    }
    let cls = "";
    if (/[✓]/.test(line)) cls = "rl-ok";
    else if (/[✗⚠]/.test(line)) cls = "rl-bad";
    const html = esc(line);
    return `<span class="${cls || "rl-key"}">${html}</span>`;
  });
  return `<div class="report">${lines.join("\n")}</div>`;
}

/* ── Cálculo (validação + execução, mesma lógica do motor) ── */
function runCalc(areaKey, calcId) {
  const calc = DATA[areaKey].calcs.find(x => x.id === calcId);
  if (!calc) return;

  const vals = {};
  let firstError = null, hasError = false;

  calc.fields.forEach(f => {
    const row = document.getElementById("fr-" + f.id);
    const inp = document.getElementById("in-" + f.id);
    row.classList.remove("error");
    const oldErr = row.querySelector(".field-err");
    if (oldErr) oldErr.remove();

    const v = parseFloat(inp ? inp.value : NaN);
    if (isNaN(v) || (inp && inp.value.trim() === "")) {
      hasError = true;
      row.classList.add("error");
      const msg = document.createElement("div");
      msg.className = "field-err";
      msg.textContent = "campo obrigatório";
      row.appendChild(msg);
      void inp.offsetWidth;
      inp.classList.add("field-shake");
      setTimeout(() => inp.classList.remove("field-shake"), 320);
      if (!firstError) firstError = f.id;
    }
    vals[f.id] = v;
  });

  if (hasError) {
    if (firstError) document.getElementById("in-" + firstError)?.focus();
    return;
  }

  const host = document.getElementById("result-host");

  try {
    const result = calc.calc(vals);

    if (result.multi) {
      host.innerHTML = `
        <div class="result">
          ${renderReport(result.val)}
          <div class="result-copy-bar">
            <button class="btn-copy-report" id="btn-copy">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="1"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              copiar relatório
            </button>
          </div>
        </div>`;
      document.getElementById("btn-copy").addEventListener("click", ev =>
        copyText(result.val, ev.currentTarget));
    } else {
      host.innerHTML = `
        <div class="result">
          <div class="result-single">
            <span class="result-tag">${esc(calc.result)}</span>
            <span class="result-value">${esc(result.val)}</span>
            <span class="result-unit">${esc(result.unit || "")}</span>
            <button class="result-copy" id="btn-copy" title="Copiar resultado">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="1"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>`;
      document.getElementById("btn-copy").addEventListener("click", ev =>
        copyText(`${result.val} ${result.unit || ""}`.trim(), ev.currentTarget));
    }

    const inputSummary = calc.fields.map(f => `${f.hint || f.id}=${vals[f.id]}`).join(", ");
    const resultStr = result.multi
      ? (result.val.split("\n").find(l => !/──/.test(l) && l.trim()) || "—")
          .replace(/\s+/g, " ").trim().slice(0, 40) + "…"
      : `${result.val} ${result.unit || ""}`.trim();

    saveHistory({
      areaKey, calcId, area: DATA[areaKey].label, calcName: calc.name,
      icon: calc.icon, inputSummary, resultStr, vals,
    });
  } catch (err) {
    host.innerHTML = `<div class="result"><div class="report-err">⚠ ${esc(err.message || "Erro no cálculo")}</div></div>`;
    console.error("[EngCalc v2]", err);
  }
}

/* ── Copiar ── */
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const prev = btn.innerHTML;
    btn.classList.add("copied");
    const isBar = btn.classList.contains("btn-copy-report");
    btn.innerHTML = isBar
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> copiado`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    setTimeout(() => { btn.classList.remove("copied"); btn.innerHTML = prev; }, 1600);
  }).catch(() => {});
}

/* ── Carimbo fixo: mede a altura real e reserva o espaço no conteúdo ── */
function syncCarimboHeight() {
  const el = document.querySelector(".carimbo");
  if (!el) return;
  document.documentElement.style.setProperty("--carimbo-h", el.offsetHeight + "px");
}

/* ── Init ── */
(function init() {
  buildTabs();
  selectArea(Object.keys(DATA)[0]);
  renderHistory();

  syncCarimboHeight();
  window.addEventListener("resize", syncCarimboHeight);
  if (window.ResizeObserver) {
    new ResizeObserver(syncCarimboHeight).observe(document.querySelector(".carimbo"));
  }
})();
