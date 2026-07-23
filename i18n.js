/**
 * OZ-LEK — UZ/EN til almashtirish tizimi.
 * Statik matnlar uchun: HTML ichida <span class="lang-uz">...</span> va
 * <span class="lang-en">...</span> juftlik sifatida yoziladi, JS kerakli
 * birini ko'rsatib, ikkinchisini yashiradi.
 * Dinamik (JSON'dan keladigan) matnlar uchun sahifalar "langchange"
 * hodisasini tinglab, o'zi qayta chizadi (render qiladi).
 */
function getLang() {
  return localStorage.getItem("ozlek_lang") || "uz";
}

function applyLang() {
  const lang = getLang();
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-uz").forEach((el) => {
    el.style.display = lang === "uz" ? "" : "none";
  });
  document.querySelectorAll(".lang-en").forEach((el) => {
    el.style.display = lang === "en" ? "" : "none";
  });

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.langBtn === lang);
  });

  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function setLang(lang) {
  localStorage.setItem("ozlek_lang", lang);
  applyLang();
}

document.addEventListener("DOMContentLoaded", () => {
  applyLang();
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.langBtn));
  });
});
