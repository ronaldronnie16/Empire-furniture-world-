import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';
import { getAllProducts, getProduct, saveProduct, deleteProduct, getCategoryNames, saveCategoryNames } from './products.mjs';
import { getAllStories, getStory, saveStory, deleteStory } from './stories.mjs';

const store = getStore({ name: 'empire-furniture', consistency: 'strong' });
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

  const resource = url.searchParams.get('resource') || 'products';

  async function readBody() {
    const ct = req.headers.get('content-type') || '';
    if (!ct.includes('multipart/form-data')) return await req.json().catch(() => ({}));
    const form = await req.formData();
    const data = Object.fromEntries(form.entries());
    const file = form.get('imageFile');
    if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
      if (!String(file.type || '').startsWith('image/')) throw new Error('Please choose an image file.');
      if (file.size > MAX_IMAGE_BYTES) throw new Error('Image is too large. Please use an image under 4 MB.');
      data.upload = file;
    }
    return data;
  }
  async function pickImage(id, data, existing) {
    let img = String(data.img || '').trim();
    if (data.upload) {
      await store.set(`${imagePrefix}${id}`, await data.upload.arrayBuffer(), { metadata: { contentType: data.upload.type || 'image/jpeg' } });
      img = `/.netlify/functions/images?id=${encodeURIComponent(id)}&v=${Date.now()}`;
    } else if (!img && existing) img = existing.img;
    return img;
  }

  try {
    if (resource === 'categories') {
      if (req.method === 'GET') return Response.json(await getCategoryNames());
      if (req.method === 'POST') {
        const { name } = await req.json().catch(() => ({}));
        const n = String(name || '').trim().slice(0, 60);
        if (!n) return Response.json({ error: 'Category name is required.' }, { status: 400 });
        const list = await getCategoryNames();
        if (!list.some(c => c.toLowerCase() === n.toLowerCase())) list.push(n);
        await saveCategoryNames(list);
        return Response.json(await getCategoryNames());
      }
      if (req.method === 'DELETE') {
        const n = String(url.searchParams.get('name') || '');
        const used = (await getAllProducts()).some(p => p.category === n);
        if (used) return Response.json({ error: 'This category still has products. Move or delete them first.' }, { status: 400 });
        await saveCategoryNames((await getCategoryNames()).filter(c => c !== n));
        return Response.json(await getCategoryNames());
      }
    }

    if (resource === 'stories') {
      if (req.method === 'GET') return Response.json(await getAllStories());
      if (req.method === 'POST') {
        const data = await readBody();
        const existing = data.id ? await getStory(String(data.id)) : null;
        const id = existing?.id || crypto.randomUUID();
        const story = { id, title: String(data.title || '').trim(), desc: String(data.desc || '').trim(),
          img: await pickImage(id, data, existing), created: existing?.created || Date.now() };
        if (!story.desc && !story.img) return Response.json({ error: 'Add a description or an image.' }, { status: 400 });
        await saveStory(story);
        return Response.json({ ok: true, story });
      }
      if (req.method === 'DELETE') {
        const id = url.searchParams.get('id');
        if (!id || !(await getStory(id))) return Response.json({ error: 'Story not found.' }, { status: 404 });
        await deleteStory(id); await store.delete(`${imagePrefix}${id}`);
        return Response.json({ ok: true });
      }
    }

    if (req.method === 'GET') return Response.json(await getAllProducts());

    if (req.method === 'POST') {
      const data = await readBody();
      const name = String(data.name || '').trim();
      const price = Number(data.price);
      if (!name || !Number.isFinite(price) || price <= 0) return Response.json({ error: 'A valid product name and price are required.' }, { status: 400 });
      const old = data.old ? Number(data.old) : null;
      if (old && old <= price) return Response.json({ error: 'Old price must be higher than the new price (or leave it empty).' }, { status: 400 });
      const existing = data.id ? await getProduct(String(data.id)) : null;
      const id = existing?.id || crypto.randomUUID();
      const category = String(data.category || 'Other').trim() || 'Other';
      const names = await getCategoryNames();
      if (!names.some(c => c === category)) await saveCategoryNames([...names, category]);
      const product = {
        id, name, category, price, old,
        img: await pickImage(id, data, existing),
        tag: ['Best Seller', 'Hot Deal', 'New'].includes(data.tag) ? data.tag : null,
        rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
        reviews: existing?.reviews || 0,
        desc: String(data.desc || '').trim()
      };
      await saveProduct(product);
      return Response.json({ ok: true, product });
    }

    if (req.method === 'DELETE') {
      const id = url.searchParams.get('id');
      if (!id) return Response.json({ error: 'Product ID is required.' }, { status: 400 });
      if (!(await getProduct(id))) return Response.json({ error: 'Product not found.' }, { status: 404 });
      await deleteProduct(id);
      await store.delete(`${imagePrefix}${id}`);
      return Response.json({ ok: true, products: await getAllProducts() });
    }
  } catch (err) {
    return Response.json({ error: err.message || 'Request failed.' }, { status: 400 });
  }

  return new Response('Method not allowed', { status: 405 });
};
