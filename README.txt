EMPIRE FURNITURE WORLD — FINAL 3-FILE PATCH

Replace ONLY these files in the existing GitHub site:

1. script.js                 -> site root
2. admin.html                -> site root
3. netlify/functions/products.mjs -> netlify/functions/

Do NOT replace style.css, index.html, assets, admin.mjs, images.mjs, netlify.toml or package.json.

What this patch fixes:
- Public catalogue is admin-only: the old 30 seeded products are no longer returned/displayed.
- Admin-uploaded products load into the public catalogue.
- Quick View opens the full product details.
- Add to Cart works with UUID/string product IDs.
- Cart quantity/remove buttons work with uploaded products.
- Buy Now opens checkout.
- Checkout sends the order to the existing WhatsApp number.
- Star ratings selected in Admin are saved and displayed from 1–5 stars.
- Categories defined in script.js are automatically listed in Admin.
- Categories used by uploaded products are also supported dynamically.
- Existing navigation/menu/search/cart logic is preserved.
