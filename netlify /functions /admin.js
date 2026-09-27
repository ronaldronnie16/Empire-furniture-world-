import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';

const store = getStore('empire-furniture');
const productKey = 'products';
const sessionPrefix = 'sessions/';
const COOKIE = 'empire_admin';
const SESSION_MS = 1000 * 60 * 60 * 8;

function token() { return crypto.randomBytes(32).toString('hex'); }
function cookie(v) { return `${COOKIE}=${v}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MS / 1000}`; }
function clearCookie() { return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`; }
function getToken(req) {
  const raw = req.headers.get('cookie') || '';
  const match = raw.match(new RegExp(`${COOKIE}=([^;]+)`));
  return match?.[1] || null;
}
async function isAuthed(req) {
  const t = getToken(req);
  if (!t) return false;
  const session = await store.get(`${sessionPrefix}${t}`, { type: 'json' });
  if (!session || session.expires < Date.now()) {
    if (session) await store.delete(`${sessionPrefix}${t}`);
    return false;
  }
  return true;
}
async function getProducts() { return (await store.get(productKey, { type: 'json' })) || []; }
async function saveProducts(products) { await store.setJSON(productKey, products); }

export default async (req) => {
  const url = new URL(req.url);
  const action = url.searchParams.get('action') || '';

  if (req.method === 'POST' && action === 'login') {
    const body = await req.json().catch(() => ({}));
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || body.password !== expected) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }
    const t = token();
    await store.setJSON(`${sessionPrefix}${t}`, { expires: Date.now() + SESSION_MS });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': cookie(t) }
    });
  }

  if (req.method === 'POST' && action === 'logout') {
    const t = getToken(req);
    if (t) await store.delete(`${sessionPrefix}${t}`);
    return new Response('{}', {
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': clearCookie() }
    });
  }

  if (!(await isAuthed(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  if (req.method === 'GET') return Response.json(await getProducts());

  if (req.method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const name = String(b.name || '').trim();
    const price = Number(b.price);
    if (!name || !Number.isFinite(price) || price <= 0) {
      return Response.json({ error: 'A valid product name and price are required.' }, { status: 400 });
    }
    const products = await getProducts();
    const product = {
      id: crypto.randomUUID(),
      name,
      category: String(b.category || 'Other').trim() || 'Other',
      price,
      old: b.old ? Number(b.old) : null,
      img: String(b.img || '').trim(),
      tag: ['Best Seller', 'Hot Deal', 'New'].includes(b.tag) ? b.tag : null,
      rating: Math.min(5, Math.max(1, Number(b.rating) || 5)),
      reviews: Math.max(0, Number(b.reviews) || 0),
      desc: String(b.desc || '').trim()
    };
    products.unshift(product);
    await saveProducts(products);
    return Response.json({ ok: true, products });
  }

  if (req.method === 'DELETE') {
    const id = url.searchParams.get('id');
    if (!id) return Response.json({ error: 'Product ID is required.' }, { status: 400 });
    const products = (await getProducts()).filter(p => String(p.id) !== String(id));
    await saveProducts(products);
    return Response.json({ ok: true, products });
  }

  return new Response('Method not allowed', { status: 405 });
};
