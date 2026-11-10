import { getStore } from '@netlify/blobs';

const store = getStore({ name: 'empire-furniture', consistency: 'strong' });
const PREFIX = 'stories/';

function normalizeStory(s) {
  if (!s || typeof s !== 'object') return null;
  return { id:String(s.id), title:String(s.title||'').trim(), img:String(s.img||''),
    desc:String(s.desc||'').trim(), created:Number(s.created)||0 };
}
export async function getAllStories() {
  const result = await store.list({ prefix: PREFIX });
  const items = await Promise.all((result.blobs||[]).map(b => store.get(b.key,{type:'json'})));
  return items.map(normalizeStory).filter(s => s && (s.desc || s.img || s.title)).sort((a,b)=>b.created-a.created);
}
export async function getStory(id) { return normalizeStory(await store.get(PREFIX+id,{type:'json'})); }
export async function saveStory(s) { await store.setJSON(PREFIX+s.id, normalizeStory(s)); }
export async function deleteStory(id) { await store.delete(PREFIX+id); }
export default async (req) => {
  if (req.method !== 'GET') return new Response('Method not allowed',{status:405});
  return Response.json(await getAllStories(),{headers:{'Cache-Control':'no-store'}});
};
