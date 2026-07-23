// Backend API manzilini shu yerga yozing (Railway'ga deploy qilgach olasiz)
// Masalan: "https://oz-lek-backend-production.up.railway.app"
const API_BASE = "https://worker-production-e33b.up.railway.app";

const grid = document.getElementById("catalog-grid");
const emptyMsg = document.getElementById("catalog-empty");

function renderMedicines(list) {
  if (!list || list.length === 0) {
    emptyMsg.hidden = false;
    return;
  }
  grid.innerHTML = list.map(m => `
    <article class="med-card">
      ${m.photo_url ? `<img src="${m.photo_url}" alt="${escapeHtml(m.name)}">` : ""}
      <div class="med-card-body">
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(truncate(m.description, 110))}</p>
      </div>
    </article>
  `).join("");
}

function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trim() + "…" : text;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

async function loadMedicines() {
  try {
    const res = await fetch(`${API_BASE}/api/medicines`);
    if (!res.ok) throw new Error("API xatosi");
    const data = await res.json();
    renderMedicines(data);
  } catch (err) {
    console.warn("Dorilar ro'yxatini yuklab bo'lmadi:", err);
    emptyMsg.hidden = false;
  }
}

async function loadCompanyInfo() {
  const container = document.getElementById("company-info-text");
  if (!container) return;
  try {
    const res = await fetch(`${API_BASE}/api/company-info`);
    if (!res.ok) throw new Error("API xatosi");
    const data = await res.json();
    if (!data.text) return;
    // Matndagi bo'sh qatorlar orqali paragraflarga bo'lib chiqaramiz
    container.innerHTML = data.text
      .split(/\n\s*\n/)
      .map(part => `<p>${escapeHtml(part).replace(/\n/g, "<br>")}</p>`)
      .join("");
  } catch (err) {
    console.warn("Kompaniya ma'lumotini yuklab bo'lmadi, statik matn qoladi:", err);
  }
}

loadMedicines();
loadCompanyInfo();
