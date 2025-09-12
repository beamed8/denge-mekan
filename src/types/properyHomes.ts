export type PropertyHomes = {
  name: string;
  slug: string;
  location: string;
  rate: string;
  beds: number;
  baths: number;
  area: number;
  images: PropertyImage[];
  kategori?: {
    ad: string;
    [key: string]: any;
  };
  aciklama?: string;
};

interface PropertyImage {
  src: string;
  mime?: string;
  alt?: string;
}
