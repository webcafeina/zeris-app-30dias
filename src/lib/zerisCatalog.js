// Cliente ligero contra la WP REST API de zeriscoffee.com.
// Aprovechamos que el endpoint /wp-json/wp/v2/product está expuesto
// públicamente para sacar la imagen destacada de cada café recomendado
// (y de paso el nombre y el link a la ficha del producto).
//
// El resultado se cachea en localStorage durante CACHE_TTL_MS, así no
// machacamos al servidor cada vez que el usuario abre TimelineScreen.
// Si el fetch falla o devuelve 404 (slug desconocido, REST API caída,
// CORS), se reporta error y el componente cae al placeholder SVG.

const REST_BASE = 'https://zeriscoffee.com/wp-json/wp/v2/product';
const CACHE_KEY = 'zeris.catalog.cache.v1';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24h

const memoryCache = new Map();
const inflight = new Map(); // slug -> Promise

function loadDiskCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

function saveDiskCache(map) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch {}
}

// Extrae la URL de la imagen destacada del payload `_embed` que devuelve
// la WP REST API. Maneja varios tamaños posibles y prioriza una versión
// razonablemente grande pero no enorme.
function pickImageUrl(post) {
  const media = post?._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  const sizes = media?.media_details?.sizes || {};
  // Preferencia: large → medium_large → medium → source_url
  return (
    sizes.large?.source_url ||
    sizes.medium_large?.source_url ||
    sizes.medium?.source_url ||
    media.source_url ||
    null
  );
}

// Devuelve un objeto normalizado del producto: { slug, name, link, image }.
// Si la API devuelve un array vacío (slug desconocido), resuelve a null.
async function fetchFromAPI(slug) {
  const url = `${REST_BASE}?slug=${encodeURIComponent(slug)}&_embed=1`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`WP REST ${res.status}`);
  const arr = await res.json();
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const p = arr[0];
  return {
    slug,
    id: p.id,
    name: p.title?.rendered ? stripHtml(p.title.rendered) : null,
    link: p.link || null,
    image: pickImageUrl(p),
    fetchedAt: Date.now(),
  };
}

function stripHtml(html) {
  return String(html).replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
}

// API pública. Cachea por slug en memoria + localStorage. Devuelve
// inmediatamente desde caché si está fresca (24h), si no dispara un fetch.
export async function getZerisProduct(slug) {
  if (!slug) return null;

  // Cache en memoria (proceso actual)
  if (memoryCache.has(slug)) {
    const v = memoryCache.get(slug);
    if (v && Date.now() - v.fetchedAt < CACHE_TTL_MS) return v;
  }

  // Cache en disco
  const disk = loadDiskCache();
  const cached = disk[slug];
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    memoryCache.set(slug, cached);
    return cached;
  }

  // Coalescing: si hay una petición en vuelo, devolver esa misma promise
  if (inflight.has(slug)) return inflight.get(slug);

  const p = fetchFromAPI(slug)
    .then((data) => {
      if (data) {
        memoryCache.set(slug, data);
        const d = loadDiskCache();
        d[slug] = data;
        saveDiskCache(d);
      }
      return data;
    })
    .catch((err) => {
      // No persistimos errores; lo intentaremos otra vez en la siguiente visita.
      console.debug('[zerisCatalog] fetch fallo:', slug, err?.message || err);
      return null;
    })
    .finally(() => {
      inflight.delete(slug);
    });

  inflight.set(slug, p);
  return p;
}

// Hook React (uso opcional desde fuera de este módulo). Mejor importar
// el hook desde lib/useZerisProduct.js para no tener React aquí.
