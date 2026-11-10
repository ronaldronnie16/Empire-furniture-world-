/* ============================================================
   EMPIRE FURNITURE WORLD — STORE ENGINE
   FINAL CATALOGUE / CART / QUICK VIEW VERSION
   Products come ONLY from the Netlify Admin Panel.
   ============================================================ */

"use strict";

const WHATSAPP = "256705381983";
const CART_KEY = "efw_cart_v3";

const $ = (id) => document.getElementById(id);
const view = () => $("view");

const fmt = (n) => "UGX " + Number(n || 0).toLocaleString("en-US");
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
}[c]));

const safeRating = (r) => Math.max(0, Math.min(5, Number(r) || 0));
const stars = (r) => {
  const n = Math.round(safeRating(r));
  return "★".repeat(n) + "☆".repeat(5 - n);
};

const discPct = (p) => (p.old && p.old > p.price) ? Math.round((p.old - p.price) / p.old * 100) : 0;
let STORIES = [];
let PRODUCTS = [];
let currentSort = "featured";
let cart = {};

try {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  if (!cart || typeof cart !== "object") cart = {};
} catch {
  cart = {};
}

/* ------------------------------------------------------------
   PRODUCT DATA
   The public site has NO hard-coded products.
   ------------------------------------------------------------ */

function normalizeProduct(p) {
  if (!p || p.id == null || !p.name) return null;

  const price = Number(p.price);
  if (!Number.isFinite(price) || price <= 0) return null;

  return {
    id: String(p.id),
    name: String(p.name).trim(),
    category: String(p.category || "Other").trim() || "Other",
    price,
    old: p.old == null || p.old === "" ? null : Number(p.old),
    img: String(p.img || "").trim(),
    tag: ["Best Seller", "Hot Deal", "New"].includes(p.tag) ? p.tag : null,
    rating: safeRating(p.rating),
    reviews: Math.max(0, Number(p.reviews) || 0),
    desc: String(p.desc || "").trim()
  };
}

function setProducts(data) {
  PRODUCTS = Array.isArray(data)
    ? data.map(normalizeProduct).filter(Boolean)
    : [];
}

function byId(id) {
  return PRODUCTS.find((p) => String(p.id) === String(id)) || null;
}

function inCat(category) {
  return PRODUCTS.filter((p) => p.category === category);
}

function categories() {
  const map = new Map();

  PRODUCTS.forEach((p) => {
    if (!map.has(p.category)) {
      map.set(p.category, {
        name: p.category,
        img: p.img,
        count: 0
      });
    }
    map.get(p.category).count++;
  });

  return [...map.values()];
}

/* ------------------------------------------------------------
   PRODUCT CARD
   ------------------------------------------------------------ */

function cardHTML(p) {
  const id = esc(p.id);
  const tagClass = p.tag === "Hot Deal" ? "ember" : p.tag === "New" ? "ghost" : "gold";

  return `
    <article class="card" data-product-id="${id}">
      <div class="imgwrap" onclick="openProduct('${id}')">
        ${p.tag ? `<span class="tag ${tagClass}">${esc(p.tag)}</span>` : ""}
        ${discPct(p) ? `<span class="disc-badge">-${discPct(p)}%</span>` : ""}
        ${p.img
          ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"
                onerror="this.style.display='none'">`
          : `<div class="empty-img">No image</div>`}
      </div>

      <div class="card-body">
        <span class="cat">${esc(p.category)}</span>
        <h3 onclick="openProduct('${id}')">${esc(p.name)}</h3>

        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
          ${discPct(p)
            ? `<span class="old-price">${fmt(p.old)}</span>`
            : ""}
        </div>
        ${discPct(p) ? `<div class="save-line">Save ${discPct(p)}% - ${fmt(p.old - p.price)}</div>` : ""}

        <div class="card-btns">
          <button type="button" class="add" onclick="addToCart('${id}')">＋ Add to Cart</button>
          <button type="button" class="more" onclick="openProduct('${id}')">View More</button>
        </div>
      </div>
    </article>`;
}

/* ------------------------------------------------------------
   HOME
   ------------------------------------------------------------ */

function renderHome() {
  const cats = categories();

  const catTiles = cats.map((c) => `
    <div class="cat-tile" onclick="showCategory('${esc(c.name)}')">
      <span class="ct-arrow">→</span>
      ${c.img
        ? `<img src="${esc(c.img)}" alt="${esc(c.name)}" loading="lazy">`
        : ""}
      <div class="ct-info">
        <h3>${esc(c.name)}</h3>
        <p>${c.count} PRODUCT${c.count === 1 ? "" : "S"} · VIEW COLLECTION</p>
      </div>
    </div>
  `).join("");

  const best = PRODUCTS.filter((p) => p.tag === "Best Seller");
  const hot = PRODUCTS.filter((p) => p.tag === "Hot Deal");
  const fresh = PRODUCTS.filter((p) => p.tag === "New");

  view().innerHTML = `
    <div class="hero">
      <div class="wrap hero-inner">
        <div>
          <h1>Modern Furniture for <em>Every Space</em> — Guaranteed &amp; Life Changing</h1>
          <p>Quality furniture at an affordable price. From luxurious sofa sets to custom wardrobes, we turn your house into a home. Delivery across Kampala &amp; upcountry.</p>
          <button class="btn" type="button" onclick="showCatalogue()">Browse Catalogue →</button>
          <button class="btn ghost" type="button" onclick="scrollToEl('branches')">Visit Our Branches</button>
          <div class="badges">
            <div class="badge">✦ <b>High Quality</b> &amp; Durable</div>
            <div class="badge">✦ <b>Custom Designs</b> Available</div>
            <div class="badge">✦ <b>Reliable Delivery</b></div>
            <div class="badge">✦ <b>24/7</b> Open for Orders</div>
          </div>
        </div>
        <div class="hero-img">
          <img src="assets/showroom.jpg" alt="Empire Furniture World showroom">
        </div>
      </div>
    </div>

    <section id="categories">
      <div class="wrap">
        <div class="sec-head">
          <div><div class="kicker">Collections</div><h2>Shop by Category</h2></div>
          ${PRODUCTS.length ? `<button class="see-all" onclick="showCatalogue()">View All →</button>` : ""}
        </div>

        ${
          cats.length
            ? `<div class="cat-grid">${catTiles}</div>`
            : `<div class="empty-msg">
                 <h3>Our catalogue is ready for your products.</h3>
                 <p>Products uploaded from the Admin Panel will appear here automatically.</p>
               </div>`
        }
      </div>
    </section>

    ${railSection("Customer Favourites", "Best Sellers", best)}
    ${railSection("Limited Time", "🔥 Hot Deals", hot)}
    ${railSection("Just Landed", "New Arrivals", fresh)}
    ${storiesSection()}

    <section class="why" id="why">
      <div class="wrap">
        <div class="sec-head"><div><div class="kicker">Why Choose Us?</div><h2>The Empire Difference</h2></div></div>
        <div class="why-grid">
          <div class="why-card"><div class="ico">💎</div><h3>High Quality Furniture</h3><p>Durable and long lasting pieces built to serve your family for years.</p></div>
          <div class="why-card"><div class="ico">✏️</div><h3>Custom Designs</h3><p>Tailored to your style &amp; space — we build to your exact measurements.</p></div>
          <div class="why-card"><div class="ico">💰</div><h3>Affordable Prices</h3><p>Great value for your money with flexible payment options.</p></div>
          <div class="why-card"><div class="ico">🚚</div><h3>Reliable Delivery</h3><p>Safe &amp; on-time delivery to your doorstep, anywhere in Uganda.</p></div>
          <div class="why-card"><div class="ico">🕐</div><h3>24/7 Open for Orders</h3><p>Anytime, anywhere you can order for whatever piece of furniture you need.</p></div>
          <div class="why-card"><div class="ico">🎧</div><h3>Excellent Customer Service</h3><p>Your satisfaction is our priority — before and after the sale.</p></div>
        </div>
      </div>
    </section>

    <section id="branches">
      <div class="wrap">
        <div class="sec-head"><div><div class="kicker">Our Branches</div><h2>Visit Us in Kampala</h2></div></div>
        <div class="branches">
          <div class="branch"><h3>📍 Nateete Branch</h3><p>Nateete, Kampala, Uganda</p><span class="tel">0705 381 983</span></div>
          <div class="branch"><h3>📍 Lungujja Branch</h3><p>Lungujja, Kampala, Uganda</p><span class="tel">0771 032 137</span></div>
          <div class="branch"><h3>🚚 Delivery</h3><p>Safe &amp; on-time delivery across Kampala and upcountry.</p><span class="tel">Call / WhatsApp anytime</span></div>
        </div>
      </div>
    </section>
  `;

  rebuildFooterCategories();
}

function railSection(kicker, title, items) {
  if (!items.length) return "";

  return `
    <section style="padding-top:0">
      <div class="wrap">
        <div class="sec-head">
          <div><div class="kicker">${kicker}</div><h2>${title}</h2></div>
        </div>
        <div class="rail">${items.map(cardHTML).join("")}</div>
      </div>
    </section>`;
}

/* ------------------------------------------------------------
   STORIES
   ------------------------------------------------------------ */

const LOGO = "assets/logo.png";
const storyTitle = (s) => s.title || "Empire Furniture World";
function timeAgo(t) {
  const m = Math.max(1, Math.round((Date.now() - (t || Date.now())) / 60000));
  if (m < 60) return m + "m";
  if (m < 1440) return Math.round(m / 60) + "h";
  return Math.round(m / 1440) + "d";
}

function storyTile(s, i) {
  return `
    <div class="story-tile" onclick="openStory(${i})" role="button" tabindex="0">
      ${s.img ? `<img src="${esc(s.img)}" alt="" loading="lazy" onerror="this.style.display='none'">` : ""}
      <img class="st-avatar" src="${LOGO}" alt="">
      <div class="st-cap">${esc(s.title || s.desc.slice(0, 40))}</div>
      <span class="st-age">${timeAgo(s.created)}</span>
    </div>`;
}

function storiesSection() {
  if (!STORIES.length) return "";
  return `
    <section id="stories" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head">
          <div><div class="kicker">Latest from us</div><h2>Stories</h2></div>
          <button class="see-all" onclick="showStories()">All Stories →</button>
        </div>
        <div class="story-strip">${STORIES.slice(0, 12).map(storyTile).join("")}</div>
      </div>
    </section>`;
}

function showStories() {
  closeMenu();
  view().innerHTML = `
    <section>
      <div class="wrap">
        <div class="crumb"><a href="#/" onclick="event.preventDefault();goHome()">Home</a><span>/</span><span>Stories</span></div>
        <div class="sec-head"><div><div class="kicker">Empire Furniture World</div><h2>Stories</h2></div></div>
        ${STORIES.length ? `<div class="story-grid">${STORIES.map(storyTile).join("")}</div>` : `<div class="empty-msg"><h3>No stories yet.</h3><p>Check back soon for news and offers.</p></div>`}
      </div>
    </section>`;
  window.scrollTo({ top: 0, behavior: "instant" });
}

/* ---- full-screen story viewer (progress bars, auto-advance, hold to pause) ---- */
const SV = { i: 0, t: 0, tick: null, paused: false, DUR: 6000 };

function ensureViewer() {
  if ($("storyViewer")) return;
  const d = document.createElement("div");
  d.id = "storyViewer";
  d.className = "story-viewer";
  d.innerHTML = `
    <div class="sv-box" id="svBox">
      <div class="sv-bars" id="svBars"></div>
      <div class="sv-head">
        <img src="${LOGO}" alt=""><div><b id="svTitle"></b><small id="svAge"></small></div>
        <button type="button" class="sv-x" onclick="closeStory()" aria-label="Close">✕</button>
      </div>
      <div class="sv-media" id="svMedia"></div>
      <div class="sv-tap l" onclick="prevStory()"></div>
      <div class="sv-tap r" onclick="nextStory()"></div>
      <div class="sv-foot"><p id="svDesc"></p><button type="button" class="btn wa" id="svWa">💬 Open more on WhatsApp</button></div>
    </div>`;
  document.body.appendChild(d);
  const box = $("svBox");
  const hold = (v) => () => { SV.paused = v; box.classList.toggle("paused", v); };
  box.addEventListener("pointerdown", (e) => { if (!e.target.closest("button")) hold(true)(); });
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => box.addEventListener(ev, hold(false)));
  d.addEventListener("click", (e) => { if (e.target === d) closeStory(); });
  document.addEventListener("keydown", (e) => {
    if (!d.classList.contains("open")) return;
    if (e.key === "ArrowRight") nextStory();
    if (e.key === "ArrowLeft") prevStory();
    if (e.key === "Escape") closeStory();
  });
}

function openStory(i) {
  if (!STORIES.length) return;
  ensureViewer();
  SV.i = Math.max(0, Math.min(i, STORIES.length - 1));
  $("storyViewer").classList.add("open");
  document.body.classList.add("modal-open");
  showStory();
}

function showStory() {
  const s = STORIES[SV.i];
  clearInterval(SV.tick);
  SV.t = 0;
  SV.paused = false;
  $("svBars").innerHTML = STORIES.map((_, k) => `<i><b style="width:${k < SV.i ? 100 : 0}%"></b></i>`).join("");
  $("svTitle").textContent = storyTitle(s);
  $("svAge").textContent = timeAgo(s.created) + " ago";
  $("svMedia").innerHTML = s.img
    ? `<img class="kb" src="${esc(s.img)}" alt="" onerror="this.style.display='none'">`
    : `<div class="sv-textonly"></div>`;
  $("svDesc").textContent = s.desc;
  $("svWa").onclick = () => storyWhatsApp(s.id);
  const bar = $("svBars").children[SV.i].firstChild;
  SV.tick = setInterval(() => {
    if (SV.paused) return;
    SV.t += 50;
    bar.style.width = Math.min(100, (SV.t / SV.DUR) * 100) + "%";
    if (SV.t >= SV.DUR) nextStory();
  }, 50);
}

function nextStory() { SV.i + 1 >= STORIES.length ? closeStory() : (SV.i++, showStory()); }
function prevStory() { SV.i > 0 ? (SV.i--, showStory()) : showStory(); }
function closeStory() {
  clearInterval(SV.tick);
  $("storyViewer")?.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function storyWhatsApp(id) {
  const s = STORIES.find((x) => String(x.id) === String(id));
  if (!s) return;
  const link = s.img && /^https?:/i.test(s.img) ? s.img : (s.img ? location.origin + s.img : "");
  const msg = `Hello Empire Furniture World! I saw your story${s.title ? ` "${s.title}"` : ""} and I'd like to know more.\n\n${s.desc.slice(0, 300)}${link ? `\n\n${link}` : ""}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

/* ---- light / dark theme ---- */
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  const b = $("themeBtn");
  if (b) b.textContent = t === "light" ? "🌙" : "☀️";
}
function toggleTheme() {
  const t = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  try { localStorage.setItem("efw_theme", t); } catch {}
  applyTheme(t);
}

/* ------------------------------------------------------------
   FULL CATALOGUE
   ------------------------------------------------------------ */

function showCatalogue(category = "All") {
  currentSort = "featured";

  const selected = category === "All"
    ? PRODUCTS
    : inCat(category);

  const catButtons = [
    `<button type="button" class="back-btn ${category === "All" ? "active" : ""}"
       onclick="showCatalogue('All')">All Products</button>`,
    ...categories().map((c) => `
      <button type="button" class="back-btn ${category === c.name ? "active" : ""}"
        onclick="showCatalogue('${esc(c.name)}')">${esc(c.name)}</button>
    `)
  ].join("");

  view().innerHTML = `
    <section>
      <div class="wrap">
        <div class="crumb">
          <a href="#/" onclick="event.preventDefault();goHome()">Home</a>
          <span>/</span>
          <span>Catalogue</span>
        </div>

        <div class="sec-head">
          <div>
            <div class="kicker">Empire Furniture World</div>
            <h2>${category === "All" ? "All Products" : esc(category)}</h2>
          </div>
        </div>

        <div class="toolbar">
          <div class="category-filter">${catButtons}</div>
          <span class="count">${selected.length} item${selected.length === 1 ? "" : "s"}</span>
          <select id="catalogueSort" onchange="sortCatalogue(this.value, '${esc(category)}')">
            <option value="featured">Sort: Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>
        </div>

        <div class="grid" id="catalogueGrid">
          ${
            selected.length
              ? selected.map(cardHTML).join("")
              : `<div class="empty-msg">
                   <h3>No products uploaded yet.</h3>
                   <p>Log in to the Admin Panel and add products. They will appear here automatically.</p>
                 </div>`
          }
        </div>
      </div>
    </section>`;

  window.scrollTo({ top: 0, behavior: "instant" });
}

function sortProducts(items, mode) {
  const arr = [...items];

  if (mode === "low") arr.sort((a, b) => a.price - b.price);
  if (mode === "high") arr.sort((a, b) => b.price - a.price);
  if (mode === "name") arr.sort((a, b) => a.name.localeCompare(b.name));

  return arr;
}

function sortCatalogue(mode, category) {
  const items = sortProducts(
    category === "All" ? PRODUCTS : inCat(category),
    mode
  );

  const grid = $("catalogueGrid");
  if (grid) grid.innerHTML = items.length
    ? items.map(cardHTML).join("")
    : `<div class="empty-msg">No products in this collection yet.</div>`;
}

function showCategory(category) {
  showCatalogue(category);
}

/* ------------------------------------------------------------
   SEARCH
   ------------------------------------------------------------ */

function showSearch(query) {
  const q = String(query || "").trim().toLowerCase();

  if (!q) {
    goHome();
    return;
  }

  const items = PRODUCTS.filter((p) =>
    `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q)
  );

  view().innerHTML = `
    <section>
      <div class="wrap">
        <div class="crumb">
          <a onclick="goHome()">Home</a><span>/</span><span>Search</span>
        </div>

        <div class="sec-head">
          <div>
            <div class="kicker">Search</div>
            <h2>${items.length} result${items.length === 1 ? "" : "s"} for “${esc(query)}”</h2>
          </div>
        </div>

        <div class="grid">
          ${
            items.length
              ? items.map(cardHTML).join("")
              : `<div class="empty-msg">Nothing found for “${esc(query)}”.</div>`
          }
        </div>
      </div>
    </section>`;

  window.scrollTo({ top: 0, behavior: "instant" });
}

/* ------------------------------------------------------------
   QUICK VIEW
   ------------------------------------------------------------ */

function openProduct(id) {
  const p = byId(id);
  if (!p || !$("productModal") || !$("productBox")) return;

  const related = inCat(p.category).filter((x) => x.id !== p.id).slice(0, 6);
  const tagClass = p.tag === "Hot Deal" ? "ember" : p.tag === "New" ? "ghost" : "gold";
  const pct = discPct(p);

  $("productBox").innerHTML = `
    <button type="button" class="close-x pd-close" onclick="closeProduct()" aria-label="Close">✕</button>

    <div class="pd-grid">
      <div class="pd-img">
        ${p.tag ? `<span class="tag ${tagClass}" style="top:14px;left:14px">${esc(p.tag)}</span>` : ""}
        ${pct ? `<span class="disc-badge" style="top:14px;right:60px">-${pct}%</span>` : ""}
        ${p.img
          ? `<img src="${esc(p.img)}" alt="${esc(p.name)}">`
          : `<div class="empty-img">No image</div>`}
      </div>

      <div class="pd-body">
        <span class="cat">${esc(p.category)}</span>
        <h2>${esc(p.name)}</h2>

        <div class="pd-price">
          <span class="price">${fmt(p.price)}</span>
          ${pct ? `<span class="old-price">${fmt(p.old)}</span><span class="pd-off">${pct}% OFF</span>` : ""}
        </div>
        ${pct ? `<div class="pd-save">Save ${pct}% - ${fmt(p.old - p.price)}</div>` : ""}

        <div class="pd-actions">
          <button type="button" class="btn" onclick="addToCart('${esc(p.id)}')">＋ Add to Cart</button>
          <button type="button" class="btn wa" onclick="buyNow('${esc(p.id)}')">Buy Now</button>
        </div>

        <div class="pd-specs">
          <span>✓ High quality</span>
          <span>✓ Custom sizes available</span>
          <span>✓ Reliable delivery</span>
          <span>✓ 24/7 ordering</span>
        </div>
      </div>
    </div>

    <div class="pd-full">
      <h4>Product Description</h4>
      <div class="pd-text">${esc(p.desc || "Quality furniture from Empire Furniture World.")}</div>
    </div>

    ${related.length ? `
      <div class="pd-related">
        <h4>More in ${esc(p.category)}</h4>
        <div class="mini-rail">
          ${related.map((r) => `
            <div class="mini-card" onclick="openProduct('${esc(r.id)}')">
              ${r.img ? `<img src="${esc(r.img)}" alt="${esc(r.name)}">` : ""}
              <p>${esc(r.name)}</p>
              <span class="mp">${fmt(r.price)}</span>
            </div>`).join("")}
        </div>
      </div>` : ""}
  `;

  $("productBox").scrollTop = 0;
  $("productModal").classList.add("open");
  document.body.classList.add("modal-open");
}
function closeProduct() {
  $("productModal")?.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function buyNow(id) {
  if (!byId(id)) return;
  addToCart(id, true);
  closeProduct();
  openCheckout();
}

/* ------------------------------------------------------------
   CART
   ------------------------------------------------------------ */

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {}
}

function addToCart(id, silent = false) {
  const product = byId(id);
  if (!product) {
    toast("Product is no longer available.");
    return;
  }

  const key = String(product.id);
  cart[key] = Math.max(0, Number(cart[key]) || 0) + 1;

  saveCart();
  renderCart();

  if (!silent) {
    toast(`${product.name} added to cart ✓`);
    toggleCart(true);
  }
}

function changeQty(id, delta) {
  const key = String(id);
  if (!byId(key)) {
    delete cart[key];
  } else {
    cart[key] = (Number(cart[key]) || 0) + Number(delta);
    if (cart[key] <= 0) delete cart[key];
  }

  saveCart();
  renderCart();
}

function removeItem(id) {
  delete cart[String(id)];
  saveCart();
  renderCart();
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = byId(id);
      if (!product) return null;
      return { ...product, qty: Math.max(0, Number(qty) || 0) };
    })
    .filter((item) => item && item.qty > 0);
}

function cartTotal() {
  return cartEntries().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  if (!$("cartItems")) return;

  const entries = cartEntries();
  const count = entries.reduce((sum, item) => sum + item.qty, 0);

  if ($("cartCount")) $("cartCount").textContent = count;
  if ($("cartTotal")) $("cartTotal").textContent = fmt(cartTotal());
  if ($("checkoutBtn")) $("checkoutBtn").style.display = entries.length ? "" : "none";

  $("cartItems").innerHTML = entries.length
    ? entries.map((e) => `
      <div class="citem">
        ${
          e.img
            ? `<img src="${esc(e.img)}" alt="${esc(e.name)}"
                 onclick="openProduct('${esc(e.id)}')">`
            : `<div class="cart-no-img">🪑</div>`
        }

        <div class="info">
          <h4>${esc(e.name)}</h4>
          <div class="p">${fmt(e.price)} × ${e.qty}</div>
        </div>

        <div class="qty">
          <button type="button" onclick="changeQty('${esc(e.id)}',-1)">−</button>
          <span>${e.qty}</span>
          <button type="button" onclick="changeQty('${esc(e.id)}',1)">+</button>
        </div>

        <button type="button" class="rm"
          onclick="removeItem('${esc(e.id)}')" aria-label="Remove">
          🗑
        </button>
      </div>
    `).join("")
    : `<div class="cart-empty">🛒<br><br>Your cart is empty.<br>Browse the catalogue and add something you love!</div>`;
}

function toggleCart(open) {
  $("drawer")?.classList.toggle("open", Boolean(open));
  $("overlay")?.classList.toggle("open", Boolean(open));
}

function openCheckout() {
  if (!cartEntries().length) {
    toast("Your cart is empty.");
    return;
  }

  toggleCart(false);
  $("checkoutModal")?.classList.add("open");
}

function closeCheckout() {
  $("checkoutModal")?.classList.remove("open");
}

function submitOrder() {
  const entries = cartEntries();
  if (!entries.length) {
    toast("Your cart is empty.");
    return;
  }

  const name = $("fName")?.value.trim() || "";
  const phone = $("fPhone")?.value.trim() || "";

  if (!name || !phone) {
    toast("Please fill in your name & phone.");
    return;
  }

  const delivery = $("fDelivery")?.value || "Not specified";
  const address = $("fAddress")?.value.trim() || "";

  const lines = entries.map((e) =>
    `• ${e.qty} × ${e.name} — ${fmt(e.price * e.qty)}`
  );

  const msg = `Hello Empire Furniture World! I'd like to place an order:

${lines.join("\n")}

TOTAL: ${fmt(cartTotal())}

Name: ${name}
Phone: ${phone}
Delivery: ${delivery}${address ? `\nAddress: ${address}` : ""}

Please confirm availability. Thank you!`;

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");

  closeCheckout();
  toast("Order prepared for WhatsApp ✓");
}

/* ------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------ */

function goHome(e) {
  if (e?.preventDefault) e.preventDefault();
  renderHome();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function goCategories(e) {
  if (e?.preventDefault) e.preventDefault();
  closeMenu();
  showCatalogue();
}

function goWhy(e) {
  if (e?.preventDefault) e.preventDefault();
  renderHome();
  setTimeout(() => scrollToEl("why"), 50);
}

function goBranches(e) {
  if (e?.preventDefault) e.preventDefault();
  renderHome();
  setTimeout(() => scrollToEl("branches"), 50);
}

function scrollToCats() {
  scrollToEl("categories");
}

function scrollToEl(id) {
  const el = $(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleMenu() {
  $("mobileMenu")?.classList.toggle("open");
  $("hamburger")?.classList.toggle("open");
}

function closeMenu() {
  $("mobileMenu")?.classList.remove("open");
  $("hamburger")?.classList.remove("open");
}

function menuGo(dest) {
  closeMenu();

  if (dest === "stories") showStories();
  else if (dest === "cart") toggleCart(true);
  else if (dest === "home") goHome();
  else if (dest === "cats") showCatalogue();
  else {
    renderHome();
    setTimeout(() => scrollToEl(dest), 60);
  }
}

/* ------------------------------------------------------------
   FOOTER
   ------------------------------------------------------------ */

function rebuildFooterCategories() {
  const el = $("footCats");
  if (!el) return;

  const cats = categories();

  el.innerHTML = cats.length
    ? cats.map((c) =>
        `<li><a href="#/" onclick="event.preventDefault();showCategory('${esc(c.name)}')">${esc(c.name)}</a></li>`
      ).join("")
    : `<li>No products yet</li>`;
}

/* ------------------------------------------------------------
   TOAST
   ------------------------------------------------------------ */

let toastTimer;

function toast(message) {
  const t = document.getElementById("toast");
  if (!t) return;

  // Cancel any previous timer
  clearTimeout(toastTimer);

  // Show notification
  t.textContent = message;

  t.style.display = "block";
  t.style.opacity = "1";
  t.style.visibility = "visible";
  t.style.pointerEvents = "auto";

  // Completely hide after 5 seconds
  toastTimer = setTimeout(() => {
    t.style.opacity = "0";
    t.style.visibility = "hidden";
    t.style.pointerEvents = "none";
    t.style.display = "none";
    t.textContent = "";
  }, 3000);
}

/* ------------------------------------------------------------
   SEARCH
   ------------------------------------------------------------ */

let searchTimer;

function setupSearch() {
  const input = $("search");
  if (!input) return;

  input.addEventListener("input", (event) => {
    clearTimeout(searchTimer);

    const q = event.target.value.trim();

    searchTimer = setTimeout(() => {
      if (q.length >= 2) showSearch(q);
      else if (!q) renderHome();
    }, 250);
  });
}

/* ------------------------------------------------------------
   MODAL / OUTSIDE CLICK
   ------------------------------------------------------------ */

function setupGlobalEvents() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleCart(false);
      closeCheckout();
      closeProduct();
      closeMenu();
    }
  });

  $("productModal")?.addEventListener("click", (event) => {
    if (event.target === $("productModal")) closeProduct();
  });

  $("checkoutModal")?.addEventListener("click", (event) => {
    if (event.target === $("checkoutModal")) closeCheckout();
  });
}

/* ------------------------------------------------------------
   LOAD PRODUCTS FROM NETLIFY BLOBS
   ------------------------------------------------------------ */

async function loadProducts() {
  renderHome();
  renderCart();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch("/.netlify/functions/products", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Product service returned HTTP ${response.status}`);
    }

    const data = await response.json();
    setProducts(data);

    // Remove cart items that no longer exist in Admin.
    const validIds = new Set(PRODUCTS.map((p) => String(p.id)));
    Object.keys(cart).forEach((id) => {
      if (!validIds.has(String(id))) delete cart[id];
    });

    saveCart();
  } catch (error) {
    console.error("Could not load products:", error);
    setProducts([]);
    toast("Catalogue could not be loaded. Please try again.");
  }

  try {
    const sr = await fetch("/.netlify/functions/stories", { cache: "no-store" });
    STORIES = sr.ok ? await sr.json() : [];
    if (!Array.isArray(STORIES)) STORIES = [];
  } catch { STORIES = []; }

  renderHome();
  renderCart();
  rebuildFooterCategories();
}

/* ------------------------------------------------------------
   START
   ------------------------------------------------------------ */

function startStore() {
  let th = "dark";
  try { th = localStorage.getItem("efw_theme") || "dark"; } catch {}
  applyTheme(th);
  setupSearch();
  setupGlobalEvents();
  renderHome();
  renderCart();
  rebuildFooterCategories();
  loadProducts();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startStore);
} else {
  startStore();
}
