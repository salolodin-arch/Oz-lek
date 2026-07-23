# OZ-LEK — Statik sayt (HTML + CSS + JS + JSON)

Bu sayt **hech qanday backend/server talab qilmaydi** — faqat HTML, CSS,
JavaScript va JSON fayllardan iborat. Vercel yoki Netlify'ga to'g'ridan-to'g'ri
yuklab qo'yish mumkin.

## Fayl tuzilishi

```
ozlek-static-site/
├── index.html          — Bosh sahifa
├── mahsulotlar.html      — Mahsulotlar katalogi
├── mahsulot.html          — Bitta mahsulot (URL: mahsulot.html?id=1)
├── kompaniya.html          — Kompaniya haqida
├── kontakt.html             — Kontakt (Telegram bot havolasi)
├── css/style.css             — Barcha sahifalar uchun umumiy dizayn
├── js/
│   ├── config.js               — Railway API manzili (ixtiyoriy)
│   ├── data-loader.js            — JSON ma'lumot yuklash (API yoki lokal)
│   ├── i18n.js                     — UZ/EN til almashtirish
│   ├── main.js                      — Mobil menyu va umumiy skript
│   ├── products.js                    — Mahsulotlar ro'yxatini chizish
│   ├── product-detail.js                — Bitta mahsulot sahifasi
│   └── company.js                          — Kompaniya sahifasi
└── data/
    ├── company.json      — Kompaniya ma'lumotlari
    └── products.json       — Mahsulotlar ro'yxati (demo ma'lumot)
```

## Ma'lumotlar qayerdan keladi?

Sayt ikki xil rejimda ishlashi mumkin:

1. **Faqat statik (hozirgi holat):** `data/products.json` va
   `data/company.json` fayllaridan o'qiydi. Yangi mahsulot qo'shish uchun
   shu JSON fayllarni qo'lda tahrirlab, qayta deploy qilish kerak.

2. **Railway backend bilan bog'langan (tavsiya etiladi):** Sizda
   allaqachon Railway'da `admin_bot.py` + `api.py` ishlab turibdi. Agar
   `api.py` mahsulotlarni JSON qilib qaytarsa (`/api/products`,
   `/api/company` kabi manzillarda), `js/config.js` faylida shu manzilni
   ko'rsating:

   ```js
   const CONFIG = {
     RAILWAY_API_URL: "https://sizning-loyiha.up.railway.app",
     TELEGRAM_BOT_URL: "https://t.me/ozlek_farm_bot",
   };
   ```

   Shundan keyin sayt avval Railway API'dan so'raydi, agar u ishlamasa
   (masalan uxlab qolgan bo'lsa), avtomatik lokal JSON'ga o'tadi — sayt
   hech qachon butunlay "sinmaydi".

   **Muhim:** `api.py`da CORS yoqilgan bo'lishi kerak, aks holda brauzer
   boshqa domendan (Vercel) so'rovni bloklaydi:
   ```python
   from flask_cors import CORS
   CORS(app)
   ```

## Vercel'ga deploy qilish

### Variant A — GitHub orqali (tavsiya etiladi)
```bash
cd ozlek-static-site
git init
git add .
git commit -m "OZ-LEK statik sayt"
git branch -M main
git remote add origin https://github.com/dasturlashcurssalohiddin-collab/ozlek-site.git
git push -u origin main
```
Keyin [vercel.com](https://vercel.com) → **Add New Project** → GitHub
repo'ni tanlang → **Framework Preset: Other** → **Deploy**. Vercel
statik fayllarni avtomatik aniqlaydi, hech qanday build buyrug'i
kerak emas.

### Variant B — Vercel CLI orqali (tezroq)
```bash
npm install -g vercel
cd ozlek-static-site
vercel
```
Savollarga javob bering (loyiha nomi va h.k.), tayyor bo'lgach link
beriladi.

## Netlify'ga deploy qilish (muqobil variant)
[app.netlify.com](https://app.netlify.com) → **Add new site** →
**Deploy manually** → `ozlek-static-site` papkasini shu yerga
sudrab tashlang (drag & drop). Bir necha soniyada tayyor.

## Rasm qo'shish

`images/` papkasiga rasm fayllarini joylashtirib, `data/products.json`
ichida `"image": "images/nomi.jpg"` deb ko'rsating.
