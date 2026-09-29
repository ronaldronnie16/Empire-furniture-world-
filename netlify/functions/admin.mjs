import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';
import { getAllProducts, saveProduct, deleteProduct } from './products.mjs';

const store = getStore('empire-furniture');
const sessionPrefix = 'sessions/';
const imagePrefix = 'images/';
const COOKIE = 'empire_admin';
const SESSION_MS = 1000 * 60 * 60 * 8;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function token() { return crypto.randomBytes(32).toString('hex'); }
function cookie(v) { return `${COOKIE}=${v}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MS / 1000}`; }
function clearCookie() { return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`; }
function getToken(req) {
  const raw = req.headers.get('cookie') || '';
  return raw.match(new RegExp(`${COOKIE}=([^;]+)`))?.[1] || null;
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

export default async (req) => {
  const url = new URL(req.url);
  const action = url.searchParams.get('action') || '';

  if (req.method === 'POST' && action === 'login') {
    const body = await req.json().catch(() => ({}));
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || body.password !== expected) {
      return Response.json({ error: 'Invalid password. Check ADMIN_PASSWORD in Netlify and redeploy.' }, { status: 401 });
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
    return new Response('{}', { headers: { 'Content-Type': 'application/json', 'Set-Cookie': clearCookie() } });
  }

  if (!(await isAuthed(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  if (req.method === 'GET') return Response.json(await getAllProducts());

  if (req.method === 'POST') {
    let data;
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      data = Object.fromEntries(form.entries());
      const file = form.get('imageFile');
      if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
        if (!String(file.type || '').startsWith('image/')) return Response.json({ error: 'Please choose an image file.' }, { status: 400 });
        if (file.size > MAX_IMAGE_BYTES) return Response.json({ error: 'Image is too large. Please use an image under 4 MB.' }, { status: 400 });
        data.upload = file;
      }
    } else {
      data = await req.json().catch(() => ({}));
    }

    const name = String(data.name || '').trim();
    const price = Number(data.price);
    if (!name || !Number.isFinite(price) || price <= 0) return Response.json({ error: 'A valid product name and price are required.' }, { status: 400 });

    const id = crypto.randomUUID();
    let img = String(data.img || '').trim();
    if (data.upload) {
      const file = data.upload;
      await store.set(`${imagePrefix}${id}`, await file.arrayBuffer(), { metadata: { contentType: file.type || 'image/jpeg' } });
      img = `/.netlify/functions/images?id=${encodeURIComponent(id)}`;
    }

    const product = {
      id,
      name,
      category: String(data.category || 'Other').trim() || 'Other',
      price,
      old: data.old ? Number(data.old) : null,
      img,
      tag: ['Best Seller', 'Hot Deal', 'New'].includes(data.tag) ? data.tag : null,
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      reviews: Math.max(0, Number(data.reviews) || 0),
      desc: String(data.desc || '').trim()
    };

    await saveProduct(product);
    return Response.json({ ok: true, product });
  }

  if (req.method === 'DELETE') {
    const id = url.searchParams.get('id');
    if (!id) return Response.json({ error: 'Product ID is required.' }, { status: 400 });
    const products = await getAllProducts();
    if (!products.some(p => String(p.id) === String(id))) return Response.json({ error: 'Product not found.' }, { status: 404 });
    await deleteProduct(id);
    await store.delete(`${imagePrefix}${id}`);
    return Response.json({ ok: true, products: await getAllProducts() });
  }

  return new Response('Method not allowed', { status: 405 });
};
