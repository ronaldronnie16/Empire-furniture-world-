import { getStore } from '@netlify/blobs';

const store = getStore('empire-furniture');
const PREFIX = 'products/';
const LEGACY_KEY = 'products';

const seed = [
  {"id":1,"name":"L-Shaped Fabric Sofa Set","category":"Sofa Sets","price":2850000,"old":3200000,"img":"assets/sofa.jpg","tag":"Best Seller","rating":5,"reviews":41,"desc":"Spacious 6-seater L-shaped sofa in premium beige fabric with plush cushioning — the heart of your living room."},
  {"id":2,"name":"Luxury Blue 3-Seater Sofa","category":"Sofa Sets","price":1650000,"old":null,"img":"assets/sofa1.jpg","tag":"New","rating":4,"reviews":18,"desc":"Bold navy 3-seater with contrast pillows, deep seats and solid hardwood frame."},
  {"id":3,"name":"Royal Chesterfield Sofa","category":"Sofa Sets","price":3200000,"old":null,"img":"assets/sofa2.jpg","tag":null,"rating":5,"reviews":26,"desc":"Classic tufted chesterfield in soft-touch fabric with rolled arms and golden legs."},
  {"id":4,"name":"Modern Recliner Sofa Set","category":"Sofa Sets","price":2400000,"old":2750000,"img":"assets/sofa3.jpg","tag":"Hot Deal","rating":4,"reviews":33,"desc":"3+2+1 recliner set with smooth manual recline — cinema comfort at home."},
  {"id":5,"name":"Beige Corner Sofa with Ottoman","category":"Sofa Sets","price":2950000,"old":null,"img":"assets/sofa4.jpg","tag":null,"rating":5,"reviews":12,"desc":"Generous corner configuration with matching ottoman, built for family gatherings."},
  {"id":6,"name":"Modern Upholstered Bed","category":"Beds","price":1950000,"old":null,"img":"assets/bed.jpg","tag":null,"rating":5,"reviews":37,"desc":"Elegant upholstered bed with tall channelled headboard and sturdy slatted base."},
  {"id":7,"name":"Grey Platform Bed with Linen","category":"Beds","price":1750000,"old":null,"img":"assets/bed1.jpg","tag":"New","rating":4,"reviews":21,"desc":"Low-profile platform bed wrapped in soft grey linen — minimalist luxury."},
  {"id":8,"name":"King Size Wingback Bed","category":"Beds","price":2600000,"old":2900000,"img":"assets/bed2.jpg","tag":"Hot Deal","rating":5,"reviews":29,"desc":"Majestic wingback headboard, king size, with padded side rails for premium comfort."},
  {"id":9,"name":"Storage Drawer Bed Frame","category":"Beds","price":2150000,"old":null,"img":"assets/bed3.jpg","tag":null,"rating":4,"reviews":16,"desc":"Clever 4-drawer underbed storage in a clean modern frame — space solved."},
  {"id":10,"name":"Luxury Padded Headboard Bed","category":"Beds","price":2300000,"old":null,"img":"assets/bed4.jpg","tag":null,"rating":5,"reviews":24,"desc":"Extra-thick padded headboard with diamond stitching and gold-tone feet."},
  {"id":11,"name":"Marble-Top Centre Table","category":"Centre Tables","price":850000,"old":980000,"img":"assets/centre.jpg","tag":"Hot Deal","rating":5,"reviews":52,"desc":"Genuine marble-look top on a brushed gold geometric base — pure elegance."},
  {"id":12,"name":"Nesting Coffee Table Set (2)","category":"Centre Tables","price":620000,"old":null,"img":"assets/centre1.jpg","tag":null,"rating":4,"reviews":19,"desc":"Two nested tables in graduated sizes — flexible style for any room."},
  {"id":13,"name":"Glass & Gold Centre Table","category":"Centre Tables","price":780000,"old":null,"img":"assets/centre2.jpg","tag":"New","rating":4,"reviews":14,"desc":"Tempered glass top with a sculptural gold frame that catches the light."},
  {"id":14,"name":"Rustic Wooden Coffee Table","category":"Centre Tables","price":540000,"old":null,"img":"assets/centre3.jpg","tag":null,"rating":4,"reviews":22,"desc":"Warm solid-wood top with industrial black legs — character in every grain."},
  {"id":15,"name":"6-Door Wooden Wardrobe","category":"Wardrobes","price":2400000,"old":null,"img":"assets/wardrobe.jpg","tag":null,"rating":5,"reviews":31,"desc":"Six doors, mirrored centre panel, shelves and hanging rails — family sized."},
  {"id":16,"name":"Sliding Door Wardrobe","category":"Wardrobes","price":2750000,"old":null,"img":"assets/wardrobe1.jpg","tag":"New","rating":5,"reviews":17,"desc":"Smooth-glide sliding doors with LED-ready interior and full-length mirror."},
  {"id":17,"name":"Mirrored 4-Door Wardrobe","category":"Wardrobes","price":1980000,"old":2250000,"img":"assets/wardrobe2.jpg","tag":"Hot Deal","rating":4,"reviews":28,"desc":"Four doors with twin mirrors, deep drawers and a rich walnut finish."},
  {"id":18,"name":"Walk-In Closet System","category":"Wardrobes","price":3500000,"old":null,"img":"assets/wardrobe3.jpg","tag":"Best Seller","rating":5,"reviews":9,"desc":"Custom-configured walk-in system — rails, shelves and drawers to your plan."},
  {"id":19,"name":"3-Door Compact Wardrobe","category":"Wardrobes","price":1450000,"old":null,"img":"assets/wardrobe4.jpg","tag":null,"rating":4,"reviews":35,"desc":"Space-smart 3-door wardrobe ideal for apartments and guest rooms."},
  {"id":20,"name":"Fluted Wooden Sideboard","category":"Sideboards","price":1300000,"old":null,"img":"assets/side.jpg","tag":null,"rating":5,"reviews":23,"desc":"Trend-setting fluted front with brass handles and soft-close doors."},
  {"id":21,"name":"Walnut Console Sideboard","category":"Sideboards","price":1450000,"old":null,"img":"assets/side1.jpg","tag":"New","rating":4,"reviews":15,"desc":"Rich walnut tones with round mirror pairing — hallway perfection."},
  {"id":22,"name":"Art Deco Buffet Cabinet","category":"Sideboards","price":1600000,"old":1800000,"img":"assets/side2.jpg","tag":"Hot Deal","rating":5,"reviews":11,"desc":"Glamorous art-deco lines with gold inlay detail and generous storage."},
  {"id":23,"name":"Slim Entryway Console","category":"Sideboards","price":890000,"old":null,"img":"assets/side3.jpg","tag":null,"rating":4,"reviews":27,"desc":"Narrow-profile console for tight entryways — big style, small footprint."},
  {"id":24,"name":"Bar Cabinet with Storage","category":"Sideboards","price":1750000,"old":null,"img":"assets/side4.jpg","tag":null,"rating":5,"reviews":8,"desc":"Entertain in style: glass racks, bottle storage and a serving top."},
  {"id":25,"name":"Walnut TV Stand Unit","category":"TV Stands","price":1150000,"old":null,"img":"assets/tv.jpg","tag":null,"rating":5,"reviews":44,"desc":"Solid walnut unit with cable management and media storage drawers."},
  {"id":26,"name":"Extended TV Entertainment Unit","category":"TV Stands","price":1500000,"old":null,"img":"assets/tv1.jpg","tag":"New","rating":5,"reviews":20,"desc":"Wall-length entertainment wall with shelving for soundbars & decor."},
  {"id":27,"name":"Floating Wall TV Console","category":"TV Stands","price":980000,"old":null,"img":"assets/tv2.jpg","tag":null,"rating":4,"reviews":16,"desc":"Wall-mounted floating console — a clean, airy look for modern homes."},
  {"id":28,"name":"Corner TV Stand","category":"TV Stands","price":720000,"old":850000,"img":"assets/tv3.jpg","tag":"Hot Deal","rating":4,"reviews":31,"desc":"Smart corner fit that saves space without skimping on storage."},
  {"id":29,"name":"TV Stand with Bookshelves","category":"TV Stands","price":1320000,"old":null,"img":"assets/tv4.jpg","tag":"Best Seller","rating":5,"reviews":25,"desc":"Entertainment centre meets library — flanking shelves for books & plants."},
  {"id":30,"name":"Low Profile Media Console","category":"TV Stands","price":1050000,"old":null,"img":"assets/tv5.jpg","tag":null,"rating":4,"reviews":13,"desc":"Sleek low-line console in dark oak that lets your TV shine."}
];

async function listProductKeys() {
  const result = await store.list({ prefix: PREFIX });
  return (result.blobs || []).map(b => b.key);
}

async function migrateOrSeed() {
  const keys = await listProductKeys();
  if (keys.length) return;

  const legacy = await store.get(LEGACY_KEY, { type: 'json' });
  const source = Array.isArray(legacy) && legacy.length ? legacy : seed;
  for (const p of source) await store.setJSON(`${PREFIX}${p.id}`, p);
}

export async function getAllProducts() {
  await migrateOrSeed();
  const keys = await listProductKeys();
  const products = await Promise.all(keys.map(key => store.get(key, { type: 'json' })));
  return products.filter(Boolean);
}

export async function getProduct(id) {
  await migrateOrSeed();
  return store.get(`${PREFIX}${id}`, { type: 'json' });
}

export async function saveProduct(product) {
  await store.setJSON(`${PREFIX}${product.id}`, product);
}

export async function deleteProduct(id) {
  await store.delete(`${PREFIX}${id}`);
}

export default async (req) => {
  const url = new URL(req.url);
  const image = url.searchParams.get('image');
  if (image) return new Response('Not found', { status: 404 });
  if (req.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  return Response.json(await getAllProducts(), { headers: { 'Cache-Control': 'no-store' } });
};
