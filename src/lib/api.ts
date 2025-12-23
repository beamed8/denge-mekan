// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
const API_BASE = `${API_URL}/api`;

// Cache variables for client-side
let cachedKategoriler: any[] | null = null;
let cachedSuggestions: any | null = null;

// Emlakları getir (with pagination)
export async function getEmlaklar(
  page: number = 1, 
  pageSize: number = 12, 
  sortField: string = "createdAt", 
  sortOrder: "asc" | "desc" = "desc",
  prioritizeFeatured: boolean = true
) {
  const sortParams = prioritizeFeatured 
    ? `sort[0]=featured:asc&sort[1]=${sortField}:${sortOrder}`
    : `sort[0]=${sortField}:${sortOrder}`;

  try {
    const res = await fetch(
      `${API_URL}/api/emlaks?populate[0]=kategoris&populate[1]=resimler&pagination[page]=${page}&pagination[pageSize]=${pageSize}&${sortParams}`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );

    if (!res.ok) {
      console.error("Emlaklar API çağrısı başarısız", res.status);
      return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 12, pageCount: 0 } } };
    }

    const response = await res.json();
    const data = response.data || [];

    const transformedData = data.map((item: any) => {
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
  } catch (error) {
    console.error("Emlaklar fetch error:", error);
    return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 12, pageCount: 0 } } };
  }
}

// Kategorileri getir
export async function getKategoriler() {
  if (cachedKategoriler) return cachedKategoriler;

  try {
    const res = await fetch(`${API_BASE}/kategoris`, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error("Kategoriler API çağrısı başarısız", res.status);
      return [];
    }

    const data = await res.json();
    const mappedData = data.data.map((item: any) => ({
      id: item.id,
      ad: item.ad ?? "",
      slug: item.slug ?? "",
    }));

    cachedKategoriler = mappedData;
    return mappedData;
  } catch (error) {
    console.error("Kategoriler fetch error:", error);
    return [];
  }
}

// Slug ile tek emlak getir
export async function getEmlakBySlug(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/emlaks?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 60 } }
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
  } catch (error) {
    console.error("Emlak by slug fetch error:", error);
    return null;
  }
}

// ID ile detaylı emlak getir
export async function getEmlakDetayById(id: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/emlaks/${id}?populate[kategori]=true&populate[resimler]=true`,
      { next: { revalidate: 60 } }
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
  } catch (error) {
    console.error("Emlak by id fetch error:", error);
    return null;
  }
}

// Arama önerileri için kategoriler, lokasyonlar ve başlıkları getir
export async function getSearchSuggestions() {
  if (cachedSuggestions) return cachedSuggestions;

  try {
    const [emlakRes, kategoriData] = await Promise.all([
      fetch(`${API_URL}/api/emlaks?fields[0]=baslik&fields[1]=lokasyon&pagination[pageSize]=100`, { next: { revalidate: 300 } }).then(r => r.json()),
      getKategoriler()
    ]);

    const emlakData = emlakRes.data || [];
    
    // Benzersiz lokasyonlar
    const locations = Array.from(new Set(emlakData.map((item: any) => item.lokasyon))).filter(Boolean);
    // Başlıklar
    const titles = emlakData.map((item: any) => item.baslik).filter(Boolean);

    const suggestions = {
      kategoriler: kategoriData,
      locations,
      titles
    };
    
    cachedSuggestions = suggestions;
    return suggestions;
  } catch (error) {
    console.error("Öneriler alınamadı:", error);
    return { kategoriler: [], locations: [], titles: [] };
  }
}
