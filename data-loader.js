/**
 * OZ-LEK — ma'lumot yuklash yordamchisi.
 * Avval Railway API'ni sinab ko'radi (agar CONFIG'da manzil bo'lsa),
 * ishlamasa yoki sozlanmagan bo'lsa, lokal JSON fayldan o'qiydi.
 */
async function loadData(apiPath, localPath) {
  if (CONFIG.RAILWAY_API_URL) {
    try {
      const res = await fetch(`${CONFIG.RAILWAY_API_URL}${apiPath}`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("API'ga ulanib bo'lmadi, lokal JSON ishlatiladi:", err);
    }
  }
  const res = await fetch(localPath, { cache: "no-store" });
  if (!res.ok) throw new Error(`Ma'lumot topilmadi: ${localPath}`);
  return await res.json();
}

async function loadProducts() {
  return loadData("/api/products", "data/products.json");
}

async function loadCompany() {
  return loadData("/api/company", "data/company.json");
}
