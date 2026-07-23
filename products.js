let ALL_PRODUCTS = [];
let ACTIVE_CATEGORY = null;

function noImageText(lang) {
  return lang === "uz" ? "Rasm yo'q" : "No image";
}

function renderProductCard(p, lang) {
  const name = lang === "uz" ? p.name_uz : (p.name_en || p.name_uz);
  const short = lang === "uz" ? p.short_uz : (p.short_en || p.short_uz || "");
  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${name}" loading="lazy">`
    : noImageText(lang);

  return `
    <a href="mahsulot.html?id=${p.id}" class="card">
      <div class="card-img">${imgHtml}</div>
      <div class="card-body">
        ${p.category ? `<span class="badge">${p.category}</span>` : ""}
        <h3>${name}</h3>
        <p>${short}</p>
      </div>
    </a>
  `;
}

function renderCategoryFilters(categories, lang) {
  const bar = document.getElementById("filter-bar");
  if (!bar) return;
  const allLabel = lang === "uz" ? "Barchasi" : "All";
  let html = `<a href="#" data-category="" class="${!ACTIVE_CATEGORY ? "active" : ""}">${allLabel}</a>`;
  categories.forEach((c) => {
    html += `<a href="#" data-category="${c}" class="${ACTIVE_CATEGORY === c ? "active" : ""}">${c}</a>`;
  });
  bar.innerHTML = html;

  bar.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      ACTIVE_CATEGORY = a.dataset.category || null;
      renderProducts();
    });
  });
}

function renderProducts() {
  const lang = getLang();
  const grid = document.getElementById("products-grid");
  const emptyMsg = document.getElementById("products-empty");
  if (!grid) return;

  const filtered = ACTIVE_CATEGORY
    ? ALL_PRODUCTS.filter((p) => p.category === ACTIVE_CATEGORY)
    : ALL_PRODUCTS;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (emptyMsg) {
      emptyMsg.style.display = "block";
      emptyMsg.textContent = lang === "uz" ? "Mahsulot topilmadi." : "No products found.";
    }
    return;
  }
  if (emptyMsg) emptyMsg.style.display = "none";
  grid.innerHTML = filtered.map((p) => renderProductCard(p, lang)).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("products-grid");
  if (!grid) return; // bu sahifada mahsulotlar ro'yxati yo'q

  try {
    ALL_PRODUCTS = await loadProducts();
    const categories = [...new Set(ALL_PRODUCTS.map((p) => p.category).filter(Boolean))];
    renderCategoryFilters(categories, getLang());
    renderProducts();
  } catch (err) {
    grid.innerHTML = `<p style="color:#888;">${getLang() === "uz" ? "Mahsulotlarni yuklab bo'lmadi." : "Failed to load products."}</p>`;
    console.error(err);
  }

  document.addEventListener("langchange", () => {
    const categories = [...new Set(ALL_PRODUCTS.map((p) => p.category).filter(Boolean))];
    renderCategoryFilters(categories, getLang());
    renderProducts();
  });
});
