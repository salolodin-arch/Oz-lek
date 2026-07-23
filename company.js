function renderCompany(company) {
  const lang = getLang();
  const container = document.getElementById("company-info");
  if (!container) return;

  container.innerHTML = `
    <p style="max-width:760px; color:#444; margin-bottom:24px;">
      ${lang === "uz" ? company.about_uz : (company.about_en || company.about_uz)}
    </p>
    <div class="grid" style="margin-bottom:40px;">
      <div class="card"><div class="card-body">
        <h3>${lang === "uz" ? "STIR" : "Tax ID"}</h3><p>${company.stir}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <h3>${lang === "uz" ? "Faoliyat turi" : "Activity"}</h3>
        <p>${lang === "uz" ? company.activity_uz : company.activity_en}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <h3>${lang === "uz" ? "Ro'yxatdan o'tgan" : "Registered"}</h3><p>${company.registered_date}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <h3>${lang === "uz" ? "Holati" : "Status"}</h3><p>${lang === "uz" ? company.status_uz : company.status_en}</p>
      </div></div>
    </div>
    <h2 class="section-title">${lang === "uz" ? "Manzil" : "Address"}</h2>
    <p style="color:#444;">${lang === "uz" ? company.address_uz : company.address_en}</p>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("company-info");
  if (!container) return;

  try {
    const company = await loadCompany();
    window.OZLEK_COMPANY = company;
    renderCompany(company);
  } catch (err) {
    container.innerHTML = "<p>Ma'lumot yuklanmadi.</p>";
    console.error(err);
  }

  document.addEventListener("langchange", () => {
    if (window.OZLEK_COMPANY) renderCompany(window.OZLEK_COMPANY);
  });
});
