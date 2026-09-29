import { getStore } from '@netlify/blobs';

const store = getStore('empire-furniture');

export default async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response('Image not found', { status: 404 });
  const image = await store.get(`images/${id}`, { type: 'blob' });
  if (!image) return new Response('Image not found', { status: 404 });
  return new Response(image, {
    headers: {
      'Content-Type': image.type || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
