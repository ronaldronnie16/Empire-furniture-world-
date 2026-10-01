import { getStore } from '@netlify/blobs';

const store = getStore('empire-furniture');
const PREFIX = 'products/';

function normalizeProduct(p) {
  if (!p || typeof p !== 'object') return null;
  return {
    ...p, id:String(p.id), name:String(p.name||'').trim(),
    category:String(p.category||'Other').trim()||'Other', price:Number(p.price)||0,
    old:p.old==null||p.old===''?null:Number(p.old), img:String(p.img||''),
    tag:['Best Seller','Hot Deal','New'].includes(p.tag)?p.tag:null,
    rating:Math.max(1,Math.min(5,Number(p.rating)||5)), reviews:Math.max(0,Number(p.reviews)||0),
    desc:String(p.desc||'').trim()
  };
}
function isLegacySeed(p) { return /^\d+$/.test(String(p?.id||'')); }
async function listProductKeys() { const result=await store.list({prefix:PREFIX}); return (result.blobs||[]).map(b=>b.key); }
export async function getAllProducts() {
  const keys=await listProductKeys();
  const products=await Promise.all(keys.map(key=>store.get(key,{type:'json'})));
  return products.map(normalizeProduct).filter(p=>p&&p.name&&!isLegacySeed(p));
}
export async function getProduct(id) {
  const p=normalizeProduct(await store.get(`${PREFIX}${id}`,{type:'json'}));
  return p&&!isLegacySeed(p)?p:null;
}
export async function saveProduct(product) { await store.setJSON(`${PREFIX}${product.id}`,normalizeProduct(product)); }
export async function deleteProduct(id) { await store.delete(`${PREFIX}${id}`); }
export default async (req) => {
  if(req.method!=='GET') return new Response('Method not allowed',{status:405});
  return Response.json(await getAllProducts(),{headers:{'Cache-Control':'no-store'}});
};
