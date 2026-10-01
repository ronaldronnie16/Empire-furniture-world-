/* ════════════════════════════════════════════════════════════════
   EMPIRE FURNITURE WORLD — STORE ENGINE
   ────────────────────────────────────────────────────────────────
   HOW TO EDIT THIS FILE:
   • CATEGORIES  →  edit the CATEGORIES list below
   • PRODUCTS    →  products are managed only from the hidden admin panel
   • WHATSAPP #  →  change the WHATSAPP constant below
   • STYLING     →  lives in style.css (not here)
   ════════════════════════════════════════════════════════════════ */


/* ────────────────────────────────────────────────────────────────
   ✏️ EDIT ZONE 1 — CATEGORIES
   Each category shows up as a thumbnail tile on the home page.
   img  → path to the thumbnail photo (put your file in /assets)
   blurb→ small caption shown under the category name
   ──────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { name: "Sofa Sets", img: "assets/sofa.jpg", blurb: "Comfort & style for your living room" },
  { name: "Beds", img: "assets/bed.png", blurb: "Sleep in luxury, wake up refreshed" },
  { name: "Centre Tables", img: "assets/centretables.jpg", blurb: "Statement pieces for every lounge" },
  { name: "Wardrobes", img: "assets/dressm.jpg", blurb: "Smart storage, custom built" },
  { name: "Sideboards", img: "assets/side.png", blurb: "Elegant storage for dining & halls" },
  { name: "TV Stands", img: "assets/tvstand.jpg", blurb: "Entertainment units that impress" },
  { name: "Set of products", img: "assets/combo.jpg", blurb: "Grab many at fair prices" }
];


/* ────────────────────────────────────────────────────────────────
   ✏️ EDIT ZONE 2 — PUBLIC CATALOG SOURCE
   Copy any line, change the values, and give it a new id number.
   That's it — the tile, category page, search & cart update alone.
   ────────────────────────────────────────────────────────────────
   id ........ unique number (never repeat)
   name ...... product title
   category .. MUST match a category name above exactly
   price ..... current price in UGX
   old ....... previous price (shows a strikethrough deal), or null
   img ....... photo in /assets
   tag ....... "Best Seller" | "Hot Deal" | "New"  — or null
   rating .... 1–5 stars
   reviews ... number of reviews shown
   desc ...... short description for the product pop-up
   ──────────────────────────────────────────────────────────────── */
const FALLBACK_PRODUCTS = [];
let PRODUCTS = [];


/* Dynamic categories: coded categories + categories used by uploaded products. */
function categoryList() {
  const result = CATEGORIES.map(c => ({ ...c }));
  for (const p of PRODUCTS) {
    const name = String(p?.category || "").trim();
    if (!name || result.some(c => c.name === name)) continue;
    result.push({ name, img: String(p.img || "assets/sofa.jpg"), blurb: "Quality furniture for your space" });
  }
  return result;
}

function categoryInfo(name) {
  return categoryList().find(c => c.name === name) || null;
}

/* ────────────────────────────────────────────────────────────────
   ✏️ EDIT ZONE 3 — SETTINGS
   ──────────────────────────────────────────────────────────────── */
const WHATSAPP = "256705381983";   // WhatsApp number (country code + number)


/* ════════════════════════════════════════════════════════════════
   HELPERS  —  you normally don't need to touch anything below
   ════════════════════════════════════════════════════════════════ */

const $       = id  => document.getElementById(id);
const fmt     = n   => "UGX " + n.toLocaleString("en-US");
const byId    = id  => PRODUCTS.find(p => String(p.id) === String(id));
const safeRating = r => Math.max(0, Math.min(5, Number(r) || 0));
const inCat   = cat => PRODUCTS.filter(p => p.category === cat);
const stars   = r   => { const n = safeRating(r); return "★".repeat(n) + "☆".repeat(5 - n); };

let cart        = JSON.parse(localStorage.getItem("efw_cart_v2") || "{}");
let currentSort = "featured";


/* ── product card template (used everywhere products appear) ── */
function cardHTML(p) {

  const tagClass = p.tag === "Hot Deal" ? "ember" : p.tag === "New" ? "ghost" : "gold";
  const productId = JSON.stringify(p.id);

  return `
  <div class="card">
    <div class="imgwrap" onclick="openProduct(${productId})">
      ${p.tag ? `<span class="tag ${tagClass}">${p.tag}</span>` : ""}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <button class="quick" onclick="event.stopPropagation();openProduct(${productId})">👁 Quick View</button>
    </div>
    <div class="card-body">
      <span class="cat">${p.category}</span>
      <h3 onclick="openProduct(${productId})">${p.name}</h3>
      <div class="stars" aria-label="${safeRating(p.rating)} out of 5 stars">${stars(p.rating)} <span>(${Number(p.reviews) || 0})</span></div>
      <div class="price-row">
        <span class="price">${fmt(p.price)}</span>
        ${p.old ? `<span class="old-price">${fmt(p.old)}</span>` : ""}
      </div>
      <button class="add" onclick="addToCart(${JSON.stringify(p.id)})">＋ Add to Cart</button>
    </div>
  </div>`;
}


/* ════════════════════════════════════════════════════════════════
   VIEW 1 — HOME  (hero + category tiles + rails + why + branches)
   ════════════════════════════════════════════════════════════════ */
function renderHome() {

  const bestSellers = PRODUCTS.filter(p => p.tag === "Best Seller");
  const hotDeals    = PRODUCTS.filter(p => p.tag === "Hot Deal");
  const newArrivals = PRODUCTS.filter(p => p.tag === "New");

  const catTiles = categoryList().map(c => `
    <div class="cat-tile" onclick="showCategory(${JSON.stringify(c.name)})">
      <span class="ct-arrow">→</span>
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="ct-info">
        <h3>${c.name}</h3>
        <p>${inCat(c.name).length} PRODUCTS · ${c.blurb.toUpperCase()}</p>
      </div>
    </div>`).join("");

  $("view").innerHTML = `

  <!-- HERO -->
  <div class="hero">
    <div class="wrap hero-inner">
      <div>
        <h1>Modern Furniture for <em>Every Space</em> — Guaranteed &amp; Life Changing</h1>
        <p>Quality furniture at an affordable price. From luxurious sofa sets to custom wardrobes, we turn your house into a home. Delivery across Kampala &amp; upcountry.</p>
        <a class="btn" onclick="scrollToCats()">Shop by Category →</a>
        <a class="btn ghost" onclick="scrollToEl('branches')">Visit Our Branches</a>
        <div class="badges">
          <div class="badge">✦ <b>High Quality</b> &amp; Durable</div>
          <div class="badge">✦ <b>Custom Designs</b> Available</div>
          <div class="badge">✦ <b>Reliable Delivery</b></div>
        </div>
      </div>
      <div class="hero-img"><img src="assets/showroom.jpg" alt="Empire Furniture World showroom"></div>
    </div>
  </div>

  <!-- CATEGORY TILES -->
  <section id="categories">
    <div class="wrap">
      <div class="sec-head">
        <div><div class="kicker">Collections</div><h2>Shop by Category</h2></div>
      </div>
      <div class="cat-grid">${catTiles}</div>
    </div>
  </section>

  <!-- BEST SELLERS RAIL -->
  <section style="padding-top:0">
    <div class="wrap">
      <div class="sec-head">
        <div><div class="kicker">Customer Favourites</div><h2>Best Sellers</h2></div>
        <a class="see-all" onclick="showCategory('Sofa Sets')">See all →</a>
      </div>
      <div class="rail">${bestSellers.map(cardHTML).join("")}</div>
    </div>
  </section>

  <!-- HOT DEALS RAIL -->
  <section style="padding-top:0">
    <div class="wrap">
      <div class="sec-head">
        <div><div class="kicker">Limited Time</div><h2>🔥 Hot Deals</h2></div>
        <a class="see-all" onclick="showCategory('Centre Tables')">See all →</a>
      </div>
      <div class="rail">${hotDeals.map(cardHTML).join("")}</div>
    </div>
  </section>

  <!-- NEW ARRIVALS RAIL -->
  <section style="padding-top:0">
    <div class="wrap">
      <div class="sec-head">
        <div><div class="kicker">Just Landed</div><h2>New Arrivals</h2></div>
      </div>
      <div class="rail">${newArrivals.map(cardHTML).join("")}</div>
    </div>
  </section>

  <!-- WHY US -->
  <section class="why" id="why">
    <div class="wrap">
      <div class="sec-head"><div><div class="kicker">Why Choose Us?</div><h2>The Empire Difference</h2></div></div>
      <div class="why-grid">
        <div class="why-card"><div class="ico">💎</div><h3>High Quality Furniture</h3><p>Durable and long lasting pieces built to serve your family for years.</p></div>
        <div class="why-card"><div class="ico">✏️</div><h3>Custom Designs</h3><p>Tailored to your style &amp; space — we build to your exact measurements.</p></div>
        <div class="why-card"><div class="ico">💰</div><h3>Affordable Prices</h3><p>Great value for your money with flexible payment options.</p></div>
        <div class="why-card"><div class="ico">🚚</div><h3>Reliable Delivery</h3><p>Safe &amp; on-time delivery to your doorstep, anywhere in Uganda.</p></div>
        <div class="why-card"><div class="ico">🎧</div><h3>Excellent Customer Service</h3><p>Your satisfaction is our priority — before and after the sale.</p></div>
      </div>
    </div>
  </section>

  <!-- BRANCHES -->
  <section id="branches">
    <div class="wrap">
      <div class="sec-head"><div><div class="kicker">Our Branches</div><h2>Visit Us in Kampala</h2></div></div>
      <div class="branches">
        <div class="branch"><h3>📍 Nateete Branch</h3><p>Nateete, Kampala, Uganda</p><span class="tel">0705 381 983</span></div>
        <div class="branch"><h3>📍 Lungujja Branch</h3><p>Lungujja, Kampala, Uganda</p><span class="tel">0771 032 137</span></div>
        <div class="branch"><h3>🚚 Delivery</h3><p>Safe &amp; on-time delivery across Kampala and upcountry.</p><span class="tel">Call / WhatsApp anytime</span></div>
      </div>
    </div>
  </section>`;
}


/* ════════════════════════════════════════════════════════════════
   VIEW 2 — CATEGORY PAGE  (banner + sortable product grid)
   ════════════════════════════════════════════════════════════════ */
function sortItems(items) {

  const arr = [...items];

  switch (currentSort) {
    case "low":  return arr.sort((a, b) => a.price - b.price);
    case "high": return arr.sort((a, b) => b.price - a.price);
    case "name": return arr.sort((a, b) => a.name.localeCompare(b.name));
    default:     return arr;
  }
}

function showCategory(cat) {

  currentSort = "featured";

  const c = categoryInfo(cat);
  if (!c) { goHome(); return; }

  $("view").innerHTML = `

  <div class="cat-banner">
    <img src="${c.img}" alt="${c.name}">
    <div class="cb-info">
      <div class="wrap">
        <h1>${c.name}</h1>
        <p>${inCat(cat).length} PRODUCTS · ${c.blurb.toUpperCase()}</p>
      </div>
    </div>
  </div>

  <section style="padding-top:0">
    <div class="wrap">

      <div class="toolbar" style="margin-top:24px">
        <button class="back-btn" onclick="goHome()">← All Categories</button>
        <span class="count" id="catCount"></span>
        <select id="sortSel" onchange="currentSort=this.value;renderCatGrid(${JSON.stringify(cat)})">
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>
      </div>

      <div class="grid" id="catGrid"></div>

      <!-- keep exploring -->
      <section style="padding:50px 0 0">
        <div class="sec-head"><div><div class="kicker">Keep Exploring</div><h2>Other Collections</h2></div></div>
        <div class="cat-grid">
          ${categoryList().filter(x => x.name !== cat).map(x => `
          <div class="cat-tile" onclick="showCategory(${JSON.stringify(x.name)})">
            <span class="ct-arrow">→</span>
            <img src="${x.img}" alt="${x.name}" loading="lazy">
            <div class="ct-info">
              <h3>${x.name}</h3>
              <p>${inCat(x.name).length} PRODUCTS · ${x.blurb.toUpperCase()}</p>
            </div>
          </div>`).join("")}
        </div>
      </section>

    </div>
  </section>`;

  renderCatGrid(cat);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderCatGrid(cat) {

  const items = sortItems(inCat(cat));

  $("catCount").textContent = items.length + " items";

  $("catGrid").innerHTML = items.length
    ? items.map(cardHTML).join("")
    : `<div class="empty-msg">No products in this collection yet.</div>`;
}


/* ════════════════════════════════════════════════════════════════
   VIEW 3 — SEARCH RESULTS
   ════════════════════════════════════════════════════════════════ */
function showSearch(q) {

  const query  = q.toLowerCase();
  const items  = PRODUCTS.filter(p => (p.name + " " + p.category).toLowerCase().includes(query));

  $("view").innerHTML = `
  <section>
    <div class="wrap">
      <div class="crumb"><a onclick="goHome()">Home</a> <span>/</span> <span>Search results for “${q}”</span></div>
      <div class="sec-head">
        <div><div class="kicker">Search</div><h2>${items.length} result${items.length === 1 ? "" : "s"} for “${q}”</h2></div>
      </div>
      <div class="grid">${items.length ? items.map(cardHTML).join("") : `<div class="empty-msg">Nothing found — try “sofa”, “bed”, “wardrobe”…</div>`}</div>
    </div>
  </section>`;

  window.scrollTo({ top: 0, behavior: "instant" });
}


/* ════════════════════════════════════════════════════════════════
   PRODUCT DETAIL POP-UP
   ════════════════════════════════════════════════════════════════ */
function openProduct(id) {

  const p = byId(id);
  if (!p) return;

  const related = inCat(p.category).filter(x => x.id !== id).slice(0, 6);
  const tagClass = p.tag === "Hot Deal" ? "ember" : p.tag === "New" ? "ghost" : "gold";
  const productId = JSON.stringify(p.id);

  $("productBox").innerHTML = `
    <div class="pd-grid">
      <div class="pd-img">
        ${p.tag ? `<span class="tag ${tagClass}" style="top:14px;left:14px">${p.tag}</span>` : ""}
        <img src="${p.img}" alt="${p.name}">
        <button class="close-x pd-close" onclick="closeProduct()">✕</button>
      </div>
      <div class="pd-body">
        <span class="cat">${p.category}</span>
        <h2>${p.name}</h2>
        <div class="stars" aria-label="${safeRating(p.rating)} out of 5 stars">${stars(p.rating)} <span>${Number(p.reviews) || 0} reviews</span></div>
        <div class="pd-price"><span class="price">${fmt(p.price)}</span>${p.old ? `<span class="old-price">${fmt(p.old)}</span>` : ""}</div>
        <p class="pd-desc">${p.desc}</p>
        <div class="pd-specs"><span>✓ High quality</span><span>✓ Custom sizes available</span><span>✓ 1-year warranty</span><span>✓ Free Kampala delivery over UGX 2M</span></div>
        <div class="pd-actions">
          <button class="btn" onclick="addToCart(${productId})">＋ Add to Cart</button>
          <button class="btn wa" onclick="buyNow(${productId})">Buy Now</button>
        </div>
      </div>
    </div>
    <div class="pd-related">
      <h4>More in ${p.category}</h4>
      <div class="mini-rail">
        ${related.map(r => `
        <div class="mini-card" onclick="openProduct(${JSON.stringify(r.id)})">
          <img src="${r.img}" alt="${r.name}">
          <p>${r.name}</p>
          <span class="mp">${fmt(r.price)}</span>
        </div>`).join("")}
      </div>
    </div>`;

  $("productModal").classList.add("open");
}

function closeProduct() { $("productModal").classList.remove("open"); }

function buyNow(id) {
  addToCart(id, true);
  closeProduct();
  openCheckout();
}


/* ════════════════════════════════════════════════════════════════
   CART  (saved in the browser so it survives page refreshes)
   ════════════════════════════════════════════════════════════════ */
function saveCart() { localStorage.setItem("efw_cart_v2", JSON.stringify(cart)); }

function addToCart(id, silent) {
  const key = String(id);
  cart[key] = (Number(cart[key]) || 0) + 1;
  saveCart();
  renderCart();
  if (!silent) { toast("Added to cart ✓"); toggleCart(true); }
}

function changeQty(id, d) {
  const key = String(id);
  cart[key] = (Number(cart[key]) || 0) + Number(d);
  if (cart[key] <= 0) delete cart[key];
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
    .map(([id, qty]) => ({ ...byId(id), qty: Number(qty) || 0 }))
    .filter(e => e.id);
}

function cartTotal() {
  return cartEntries().reduce((s, e) => s + e.price * e.qty, 0);
}

function renderCart() {

  const entries = cartEntries();
  const count   = entries.reduce((s, e) => s + e.qty, 0);

  $("cartCount").textContent  = count;
  $("cartTotal").textContent  = fmt(cartTotal());
  $("checkoutBtn").style.display = entries.length ? "" : "none";

  $("cartItems").innerHTML = entries.length ? entries.map(e => `
    <div class="citem">
      <img src="${e.img}" alt="${e.name}" onclick="openProduct(${JSON.stringify(e.id)})">
      <div class="info">
        <h4>${e.name}</h4>
        <div class="p">${fmt(e.price)} × ${e.qty}</div>
      </div>
      <div class="qty">
        <button onclick="changeQty(${JSON.stringify(e.id)},-1)" aria-label="Decrease">−</button>
        <span>${e.qty}</span>
        <button onclick="changeQty(${JSON.stringify(e.id)},1)" aria-label="Increase">+</button>
      </div>
      <button class="rm" onclick="removeItem(${JSON.stringify(e.id)})" aria-label="Remove">🗑</button>
    </div>`).join("")

    : `<div class="cart-empty">🛒<br><br>Your cart is empty.<br>Browse our collections and add something you love!</div>`;
}


/* ════════════════════════════════════════════════════════════════
   CART DRAWER + CHECKOUT  (order is sent to your WhatsApp)
   ════════════════════════════════════════════════════════════════ */
function toggleCart(open) {
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("open", open);
}

function openCheckout() {
  if (!cartEntries().length) return;
  toggleCart(false);
  $("checkoutModal").classList.add("open");
}

function closeCheckout() { $("checkoutModal").classList.remove("open"); }

function submitOrder() {

  const name    = $("fName").value.trim();
  const phone   = $("fPhone").value.trim();

  if (!name || !phone) { toast("Please fill in your name & phone ✱"); return; }

  const delivery = $("fDelivery").value;
  const address  = $("fAddress").value.trim();
  const lines    = cartEntries().map(e => `• ${e.qty} × ${e.name} — ${fmt(e.price * e.qty)}`);

  const msg =
`Hello Empire Furniture World! I'd like to place an order:

${lines.join("\n")}

TOTAL: ${fmt(cartTotal())}

Name: ${name}
Phone: ${phone}
Delivery: ${delivery}${address ? "\nAddress: " + address : ""}

Please confirm availability. Thank you!`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  closeCheckout();
  toast("Order sent! We'll confirm on WhatsApp ✓");
}


/* ════════════════════════════════════════════════════════════════
   NAVIGATION  (home / categories / sections)
   ════════════════════════════════════════════════════════════════ */
function goHome(e)     { if (e) e.preventDefault(); renderHome(); window.scrollTo({ top: 0 }); }
function goCategories(e){ if (e) e.preventDefault(); renderHome(); scrollToCats(); }
function goWhy(e)      { if (e) e.preventDefault(); renderHome(); setTimeout(() => scrollToEl("why"), 60); }
function goBranches(e) { if (e) e.preventDefault(); renderHome(); setTimeout(() => scrollToEl("branches"), 60); }

function scrollToCats()          { scrollToEl("categories"); }
function scrollToEl(id)          { const el = $(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }


/* ── mobile hamburger menu ── */
function toggleMenu() {
  $("mobileMenu").classList.toggle("open");
  $("hamburger").classList.toggle("open");
}

function closeMenu() {
  $("mobileMenu").classList.remove("open");
  $("hamburger").classList.remove("open");
}

function menuGo(dest) {
  closeMenu();
  if (dest === "home") goHome();
  else if (dest === "cats") { renderHome(); setTimeout(scrollToCats, 60); }
  else { renderHome(); setTimeout(() => scrollToEl(dest), 60); }
}


/* ── toast notifications ── */
let toastTimer;

function toast(text) {
  const t = $("toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}


/* ── live search (waits until you stop typing) ── */
let searchTimer;

$("search").addEventListener("input", e => {
  clearTimeout(searchTimer);
  const q = e.target.value.trim();
  searchTimer = setTimeout(() => { if (q.length >= 2) showSearch(q); }, 350);
});


/* ── Escape key closes everything ── */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { toggleCart(false); closeCheckout(); closeProduct(); closeMenu(); }
});


/* ── build footer category links automatically ── */
function rebuildFooterCategories() {
  if (!$('footCats')) return;
  $('footCats').innerHTML = categoryList().map(c =>
    `<li><a href="#/" onclick="event.preventDefault();showCategory(${JSON.stringify(c.name)})">${c.name}</a></li>`
  ).join('');
}
rebuildFooterCategories();


/* ════════════════════════════════════════════════════════════════
   START THE STORE
   ════════════════════════════════════════════════════════════════ */
async function loadProducts() {
  renderHome();
  renderCart();
  rebuildFooterCategories();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch('/.netlify/functions/products', {
      cache: 'no-store', credentials: 'same-origin', signal: controller.signal
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error('Product service returned HTTP ' + response.status);
    const data = await response.json();
    PRODUCTS = Array.isArray(data) ? data.filter(p => p && p.id != null && p.name).map(p => ({
      ...p, id:p.id, name:String(p.name), category:String(p.category || 'Other'),
      price:Number(p.price)||0, old:p.old==null||p.old===''?null:Number(p.old),
      img:String(p.img||''), tag:p.tag||null, rating:safeRating(p.rating),
      reviews:Math.max(0,Number(p.reviews)||0), desc:String(p.desc||'')
    })) : [];
  } catch (error) {
    console.warn('Product service unavailable; showing the admin-only catalogue.', error);
    PRODUCTS = [];
  }

  renderHome();
  renderCart();
  rebuildFooterCategories();
}

loadProducts();
