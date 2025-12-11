// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
const API_BASE = `${API_URL}/api`;

// Emlakları getir (with pagination)
export async function getEmlaklar(page: number = 1, pageSize: number = 12) {
  const res = await fetch(
    `${API_URL}/api/emlaks?populate=kategoris&populate=resimler&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

  if (!res.ok) {
    console.error("Emlaklar API çağrısı başarısız", res.status);
    return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 12, pageCount: 0 } } };
  }

  const response = await res.json();
  console.log("RAW emlaklar API response:", response);
  
  const data = response.data || [];
  data.forEach((item: any, idx: number) => {
    console.log(`Emlak #${idx} full object:`, item);
  });

  const transformedData = data.map((item: any) => {
    // Strapi relation: kategoris is a single object (not array)
    const kategori = item.kategoris
      ? [
          {
            id: item.kategoris.id,
            ad: item.kategoris.ad,
            slug: item.kategoris.slug,
          },
        ]
      : [];
    return {
      id: item.id,
      documentId: item.documentId,
      baslik: item.baslik,
      aciklama: item.aciklama,
      fiyat: item.fiyat,
      lokasyon: item.lokasyon,
      ilanTipi: item.ilanTipi,
      slug: item.slug,
      kategori,
      featured: item.featured ?? false,
      resimler: (item.resimler || []).map((img: any) => ({
        id: img.id,
        url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
        alternativeText: img.alternativeText,
      })),
    };
  });

  return {
    data: transformedData,
    meta: response.meta || { pagination: { total: 0, page: 1, pageSize: 12, pageCount: 0 } }
  };
}

// Kategorileri getir
export async function getKategoriler() {
  const res = await fetch(`${API_BASE}/kategoris`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Kategoriler API çağrısı başarısız", res.status);
    return [];
  }

  const data = await res.json();

  return data.data.map((item: any) => ({
    id: item.id,
    ad: item.ad ?? "",
    slug: item.slug ?? "",
  }));
}

// Slug ile tek emlak getir
export async function getEmlakBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/api/emlaks?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const emlak = data.data?.[0];

  if (!emlak) return null;

  return {
    id: emlak.id,
    documentId: emlak.documentId,
    baslik: emlak.baslik,
    aciklama: emlak.aciklama,
    fiyat: emlak.fiyat,
    lokasyon: emlak.lokasyon,
    ilanTipi: emlak.ilanTipi,
    slug: emlak.slug,
    kategori: Array.isArray(emlak.kategori) ? emlak.kategori : [],
    resimler: (emlak.resimler || []).map((img: any) => ({
      id: img.id,
      url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
      alternativeText: img.alternativeText,
    })),
  };
}

// ID ile detaylı emlak getir
export async function getEmlakDetayById(id: string) {
  const res = await fetch(
    `${API_URL}/api/emlaks/${id}?populate[kategori]=true&populate[resimler]=true`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const emlak = data.data;

  if (!emlak) return null;

  return {
    id: emlak.id,
    documentId: emlak.documentId,
    baslik: emlak.baslik,
    aciklama: emlak.aciklama,
    fiyat: emlak.fiyat,
    lokasyon: emlak.lokasyon,
    ilanTipi: emlak.ilanTipi,
    slug: emlak.slug,
    kategori: Array.isArray(emlak.kategori) ? emlak.kategori : [],
    resimler: (emlak.resimler || []).map((img: any) => ({
      id: img.id,
      url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
      alternativeText: img.alternativeText,
    })),
  };
}
