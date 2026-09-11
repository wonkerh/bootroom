# BOOTROOM

**A soccer boot storefront. Plain HTML, CSS, and vanilla JavaScript. No build step.**

Browse the room, filter by the surface you actually play on, pick your size, add to bag, and check out — all client-side. The whole thing opens in a browser with zero setup.

---

## Live demo

https://YOUR-USERNAME.github.io/bootroom/

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, surface tiles, featured boots, brand strip |
| `shop.html` | Full catalogue with brand/surface/size filters and sorting |
| `product.html` | Single product view with photo gallery and options |
| `cart.html` | Full cart page with quantity controls |
| `checkout.html` | Delivery + payment form with confirmation |
| `tracking.html` | Order tracking with a visual status stepper |

---

## What's interesting about it

**Photos with a fallback.** Every product tries to load a real photograph from `images/`. If a photo is missing, the grid renders a procedurally-generated SVG boot in that product's colour instead — so nothing ever breaks.

**Surface-first filtering.** Most shops make you filter by brand. Here, surface (Firm Ground / Soft Ground / Turf / Indoor) is the primary axis, because on match day that's what matters.

**Persistent cart.** The bag lives in `localStorage`. Refreshing the tab, closing the browser, or navigating between pages doesn't lose it. Order history works the same way, which is what powers the tracking page.

**Zero dependencies.** No framework, no bundler, no npm install. Every line of JS is readable and traceable.

---

## Project structure
bootroom/
├── index.html Home
├── shop.html Catalogue
├── product.html Product detail
├── cart.html Cart page
├── checkout.html Checkout
├── tracking.html Order tracking
├── styles.css Shared stylesheet
├── data.js Products, state, helpers
├── script.js SVG renderer, header, footer, cart drawer
├── pages.js Per-page logic
└── images/ Product photography


---

## Run it locally

Clone the repo:

```bash
git clone https://github.com/YOUR-USERNAME/bootroom.git
cd bootroom
