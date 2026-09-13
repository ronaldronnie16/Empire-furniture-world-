/* ════════════════════════════════════════════════════════════════
   EMPIRE FURNITURE WORLD — STORE ENGINE
   ────────────────────────────────────────────────────────────────
   HOW TO EDIT THIS FILE:
   • CATEGORIES  →  edit the CATEGORIES list below
   • PRODUCTS    →  edit the PRODUCTS list below (one line each)
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

  { name: "Sofa Sets",     img: "assets/sofa.jpg",     blurb: "Comfort & style for your living room" },
  { name: "Beds",          img: "assets/bed.jpg",          blurb: "Sleep in luxury, wake up refreshed" },
  { name: "Centre Tables", img: "assets/centre.jpg", blurb: "Statement pieces for every lounge" },
  { name: "Wardrobes",     img: "assets/wardrobe.jpg",     blurb: "Smart storage, custom built" },
  { name: "Sideboards",    img: "assets/side.jpg",    blurb: "Elegant storage for dining & halls" },
  { name: "TV Stands",     img: "assets/tv.jpg",     blurb: "Entertainment units that impress" },

];


/* ────────────────────────────────────────────────────────────────
   ✏️ EDIT ZONE 2 — PRODUCT CATALOG
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
const PRODUCTS = [

  /* ── SOFA SETS ── */
  { id: 1,  name: "L-Shaped Fabric Sofa Set",       category: "Sofa Sets", price: 2850000, old: 3200000, img: "assets/sofa.jpg",  tag: "Best Seller", rating: 5, reviews: 41, desc: "Spacious 6-seater L-shaped sofa in premium beige fabric with plush cushioning — the heart of your living room." },
  { id: 2,  name: "Luxury Blue 3-Seater Sofa",      category: "Sofa Sets", price: 1650000, old: null,    img: "assets/sofa1.jpg", tag: "New",         rating: 4, reviews: 18, desc: "Bold navy 3-seater with contrast pillows, deep seats and solid hardwood frame." },
  { id: 3,  name: "Royal Chesterfield Sofa",        category: "Sofa Sets", price: 3200000, old: null,    img: "assets/sofa2.jpg",      tag: null,          rating: 5, reviews: 26, desc: "Classic tufted chesterfield in soft-touch fabric with rolled arms and golden legs." },
  { id: 4,  name: "Modern Recliner Sofa Set",       category: "Sofa Sets", price: 2400000, old: 2750000, img: "assets/sofa3.jpg",  tag: "Hot Deal",    rating: 4, reviews: 33, desc: "3+2+1 recliner set with smooth manual recline — cinema comfort at home." },
  { id: 5,  name: "Beige Corner Sofa with Ottoman", category: "Sofa Sets", price: 2950000, old: null,    img: "assets/sofa4.jpg",      tag: null,          rating: 5, reviews: 12, desc: "Generous corner configuration with matching ottoman, built for family gatherings." },

  /* ── BEDS ── */
  { id: 6,  name: "Modern Upholstered Bed",         category: "Beds", price: 1950000, old: null,    img: "assets/bed.jpg",      tag: null,       rating: 5, reviews: 37, desc: "Elegant upholstered bed with tall channelled headboard and sturdy slatted base." },
  { id: 7,  name: "Grey Platform Bed with Linen",   category: "Beds", price: 1750000, old: null,    img: "assets/bed1.jpg", tag: "New",        rating: 4, reviews: 21, desc: "Low-profile platform bed wrapped in soft grey linen — minimalist luxury." },
  { id: 8,  name: "King Size Wingback Bed",         category: "Beds", price: 2600000, old: 2900000, img: "assets/bed2.jpg",      tag: "Hot Deal",   rating: 5, reviews: 29, desc: "Majestic wingback headboard, king size, with padded side rails for premium comfort." },
  { id: 9,  name: "Storage Drawer Bed Frame",       category: "Beds", price: 2150000, old: null,    img: "assets/bed3.jpg", tag: null,       rating: 4, reviews: 16, desc: "Clever 4-drawer underbed storage in a clean modern frame — space solved." },
  { id: 10, name: "Luxury Padded Headboard Bed",    category: "Beds", price: 2300000, old: null,    img: "assets/bed4.jpg",      tag: null,       rating: 5, reviews: 24, desc: "Extra-thick padded headboard with diamond stitching and gold-tone feet." },

  /* ── CENTRE TABLES ── */
  { id: 11, name: "Marble-Top Centre Table",        category: "Centre Tables", price: 850000, old: 980000, img: "assets/centre.jpg", tag: "Hot Deal", rating: 5, reviews: 52, desc: "Genuine marble-look top on a brushed gold geometric base — pure elegance." },
  { id: 12, name: "Nesting Coffee Table Set (2)",   category: "Centre Tables", price: 620000, old: null,   img: "assets/centre1.jpg", tag: null,       rating: 4, reviews: 19, desc: "Two nested tables in graduated sizes — flexible style for any room." },
  { id: 13, name: "Glass & Gold Centre Table",      category: "Centre Tables", price: 780000, old: null,   img: "assets/centre2.jpg", tag: "New",      rating: 4, reviews: 14, desc: "Tempered glass top with a sculptural gold frame that catches the light." },
  { id: 14, name: "Rustic Wooden Coffee Table",     category: "Centre Tables", price: 540000, old: null,   img: "assets/centre3.jpg", tag: null,       rating: 4, reviews: 22, desc: "Warm solid-wood top with industrial black legs — character in every grain." },

  /* ── WARDROBES ── */
  { id: 15, name: "6-Door Wooden Wardrobe",         category: "Wardrobes", price: 2400000, old: null,    img: "assets/wardrobe.jpg", tag: null,          rating: 5, reviews: 31, desc: "Six doors, mirrored centre panel, shelves and hanging rails — family sized." },
  { id: 16, name: "Sliding Door Wardrobe",          category: "Wardrobes", price: 2750000, old: null,    img: "assets/wardrobe1.jpg", tag: "New",         rating: 5, reviews: 17, desc: "Smooth-glide sliding doors with LED-ready interior and full-length mirror." },
  { id: 17, name: "Mirrored 4-Door Wardrobe",       category: "Wardrobes", price: 1980000, old: 2250000, img: "assets/wardrobe2.jpg", tag: "Hot Deal",    rating: 4, reviews: 28, desc: "Four doors with twin mirrors, deep drawers and a rich walnut finish." },
  { id: 18, name: "Walk-In Closet System",          category: "Wardrobes", price: 3500000, old: null,    img: "assets/wardrobe3.jpg", tag: "Best Seller", rating: 5, reviews: 9,  desc: "Custom-configured walk-in system — rails, shelves and drawers to your plan." },
  { id: 19, name: "3-Door Compact Wardrobe",        category: "Wardrobes", price: 1450000, old: null,    img: "assets/wardrobe4.jpg", tag: null,          rating: 4, reviews: 35, desc: "Space-smart 3-door wardrobe ideal for apartments and guest rooms." },

  /* ── SIDEBOARDS ── */
  { id: 20, name: "Fluted Wooden Sideboard",        category: "Sideboards", price: 1300000, old: null,    img: "assets/side.jpg",   tag: null,       rating: 5, reviews: 23, desc: "Trend-setting fluted front with brass handles and soft-close doors." },
  { id: 21, name: "Walnut Console Sideboard",       category: "Sideboards", price: 1450000, old: null,    img: "assets/side1.jpg", tag: "New",        rating: 4, reviews: 15, desc: "Rich walnut tones with round mirror pairing — hallway perfection." },
  { id: 22, name: "Art Deco Buffet Cabinet",        category: "Sideboards", price: 1600000, old: 1800000, img: "assets/side2.jpg",   tag: "Hot Deal",   rating: 5, reviews: 11, desc: "Glamorous art-deco lines with gold inlay detail and generous storage." },
  { id: 23, name: "Slim Entryway Console",          category: "Sideboards", price: 890000,  old: null,    img: "assets/side3.jpg", tag: null,       rating: 4, reviews: 27, desc: "Narrow-profile console for tight entryways — big style, small footprint." },
  { id: 24, name: "Bar Cabinet with Storage",       category: "Sideboards", price: 1750000, old: null,    img: "assets/side4.jpg",   tag: null,       rating: 5, reviews: 8,  desc: "Entertain in style: glass racks, bottle storage and a serving top." },

  /* ── TV STANDS ── */
  { id: 25, name: "Walnut TV Stand Unit",           category: "TV Stands", price: 1150000, old: null,    img: "assets/tv.jpg",   tag: null,          rating: 5, reviews: 44, desc: "Solid walnut unit with cable management and media storage drawers." },
  { id: 26, name: "Extended TV Entertainment Unit", category: "TV Stands", price: 1500000, old: null,    img: "assets/tv1.jpg", tag: "New",         rating: 5, reviews: 20, desc: "Wall-length entertainment wall with shelving for soundbars & decor." },
  { id: 27, name: "Floating Wall TV Console",       category: "TV Stands", price: 980000,  old: null,    img: "assets/tv2.jpg",   tag: null,          rating: 4, reviews: 16, desc: "Wall-mounted floating console — a clean, airy look for modern homes." },
  { id: 28, name: "Corner TV Stand",                category: "TV Stands", price: 720000,  old: 850000,  img: "assets/tv3.jpg",   tag: "Hot Deal",    rating: 4, reviews: 31, desc: "Smart corner fit that saves space without skimping on storage." },
  { id: 29, name: "TV Stand with Bookshelves",      category: "TV Stands", price: 1320000, old: null,    img: "assets/tv4.jpg", tag: "Best Seller", rating: 5, reviews: 25, desc: "Entertainment centre meets library — flanking shelves for books & plants." },
  { id: 30, name: "Low Profile Media Console",      category: "TV Stands", price: 1050000, old: null,    img: "assets/tv5.jpg",   tag: null,          rating: 4, reviews: 13, desc: "Sleek low-line console in dark oak that lets your TV shine." },

];


/* ────────────────────────────────────────────────────────────────
   ✏️ EDIT ZONE 3 — SETTINGS
   ──────────────────────────────────────────────────────────────── */
const WHATSAPP = "256705381983";   // WhatsApp number (country code + number)


/* ════════════════════════════════════════════════════════════════
   HELPERS  —  you normally don't need to touch anything below
   ════════════════════════════════════════════════════════════════ */

const $       = id  => document.getElementById(id);
const fmt     = n   => "UGX " + n.toLocaleString("en-US");
const byId    = id  => PRODUCTS.find(p => p.id === id);
const inCat   = cat => PRODUCTS.filter(p => p.category === cat);
const stars   = r   => "★".repeat(r) + "☆".repeat(5 - r);

let cart        = JSON.parse(localStorage.getItem("efw_cart_v2") || "{}");
let currentSort = "featured";


/* ── product card template (used everywhere products appear) ── */
function cardHTML(p) {

  const tagClass = p.tag === "Hot Deal" ? "ember" : p.tag === "New" ? "ghost" : "gold";

  return `
  <div class="card">
    <div class="imgwrap" onclick="openProduct(${p.id})">
      ${p.tag ? `<span class="tag ${tagClass}">${p.tag}</span>` : ""}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <button class="quick" onclick="event.stopPropagation();openProduct(${p.id})">👁 Quick View</button>
    </div>
    <div class="card-body">
      <span class="cat">${p.category}</span>
      <h3 onclick="openProduct(${p.id})">${p.name}</h3>
      <div class="stars">${stars(p.rating)} <span>(${p.reviews})</span></div>
      <div class="price-row">
        <span class="price">${fmt(p.price)}</span>
        ${p.old ? `<span class="old-price">${fmt(p.old)}</span>` : ""}
      </div>
      <button class="add" onclick="addToCart(${p.id})">＋ Add to Cart</button>
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

  const catTiles = CATEGORIES.map(c => `
    <div class="cat-tile" onclick="showCategory('${c.name}')">
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

  const c = CATEGORIES.find(x => x.name === cat);

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
        <select id="sortSel" onchange="currentSort=this.value;renderCatGrid('${cat}')">
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
          ${CATEGORIES.filter(x => x.name !== cat).map(x => `
          <div class="cat-tile" onclick="showCategory('${x.name}')">
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
        <div class="stars">${stars(p.rating)} <span>${p.reviews} reviews</span></div>
        <div class="pd-price"><span class="price">${fmt(p.price)}</span>${p.old ? `<span class="old-price">${fmt(p.old)}</span>` : ""}</div>
        <p class="pd-desc">${p.desc}</p>
        <div class="pd-specs"><span>✓ High quality</span><span>✓ Custom sizes available</span><span>✓ 1-year warranty</span><span>✓ Free Kampala delivery over UGX 2M</span></div>
        <div class="pd-actions">
          <button class="btn" onclick="addToCart(${p.id})">＋ Add to Cart</button>
          <button class="btn wa" onclick="buyNow(${p.id})">Buy Now</button>
        </div>
      </div>
    </div>
    <div class="pd-related">
      <h4>More in ${p.category}</h4>
      <div class="mini-rail">
        ${related.map(r => `
        <div class="mini-card" onclick="openProduct(${r.id})">
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
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  if (!silent) { toast("Added to cart ✓"); toggleCart(true); }
}

function changeQty(id, d) {
  cart[id] += d;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ ...byId(+id), qty }))
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
      <img src="${e.img}" alt="${e.name}" onclick="openProduct(${e.id})">
      <div class="info">
        <h4>${e.name}</h4>
        <div class="p">${fmt(e.price)} × ${e.qty}</div>
      </div>
      <div class="qty">
        <button onclick="changeQty(${e.id},-1)" aria-label="Decrease">−</button>
        <span>${e.qty}</span>
        <button onclick="changeQty(${e.id},1)" aria-label="Increase">+</button>
      </div>
      <button class="rm" onclick="removeItem(${e.id})" aria-label="Remove">🗑</button>
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
$("footCats").innerHTML = CATEGORIES.map(c =>
  `<li><a href="#/" onclick="event.preventDefault();showCategory('${c.name}')">${c.name}</a></li>`
).join("");


/* ════════════════════════════════════════════════════════════════
   START THE STORE
   ════════════════════════════════════════════════════════════════ */
renderHome();
renderCart();
