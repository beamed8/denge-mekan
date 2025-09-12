// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
const API_BASE = `${API_URL}/api`;

// Emlakları getir
export async function getEmlaklar() {
  const res = await fetch(
    `${API_URL}/api/emlaks?populate=kategoris&populate=resimler`
  );

  if (!res.ok) {
    console.error("Emlaklar API çağrısı başarısız", res.status);
    return [];
  }

  const data = await res.json();

  return data.data.map((item: any) => {
    return {
      id: item.id,
      documentId: item.documentId,
      baslik: item.baslik,
      aciklama: item.aciklama,
      fiyat: item.fiyat,
      lokasyon: item.lokasyon,
      ilanTipi: item.ilanTipi,
      slug: item.slug,
      kategori: Array.isArray(item.kategori) ? item.kategori : [],
      resimler: (item.resimler || []).map((img: any) => ({
        id: img.id,
        url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
        alternativeText: img.alternativeText,
      })),
    };
  });
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
