let CURRENT_PRODUCT = null;

function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container || !CURRENT_PRODUCT) return;
  const lang = getLang();
  const p = CURRENT_PRODUCT;

  const name = lang === "uz" ? p.name_uz : (p.name_en || p.name_uz);
  const short = lang === "uz" ? p.short_uz : (p.short_en || p.short_uz || "");
  const full = lang === "uz" ? p.full_uz : (p.full_en || p.full_uz || "");
  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${name}">`
    : (lang === "uz" ? "Rasm yo'q" : "No image");

  document.title = `${name} — OZ-LEK`;

  container.innerHTML = `
    <div class="product-hero">
      <div class="card-img" style="border-radius:10px;">${imgHtml}</div>
      <div>
        ${p.category ? `<span class="badge">${p.category}</span>` : ""}
        <h1 style="margin:10px 0;">${name}</h1>
        <p style="color:#666; margin-bottom:20px;">${short}</p>
        <div style="white-space:pre-line; color:#333;">${full}</div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  try {
    const products = await loadProducts();
    CURRENT_PRODUCT = products.find((p) => p.id === id);
    if (!CURRENT_PRODUCT) {
      const lang = getLang();
      container.innerHTML = `<p>${lang === "uz" ? "Mahsulot topilmadi." : "Product not found."}</p>`;
      return;
    }
    renderProductDetail();
  } catch (err) {
    container.innerHTML = "<p>Xatolik yuz berdi.</p>";
    console.error(err);
  }

  document.addEventListener("langchange", renderProductDetail);
});
