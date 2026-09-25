// src/services/productApi.ts

export type RookStatus =
  | 'accepted'
  | 'processing'
  | 'completed'
  | 'failed'
  | null;

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string | number | null;

  seo_title: string | null;
  meta_description: string | null;
  long_description: string | null;

  benefits: string[] | null;
  specifications: unknown[] | null;
  usage_tips: string[] | null;
  seo_tags: string[] | null;

  rook_job_id: string | null;
  rook_status: RookStatus;

  dates?: {
    created_at: string | null;
    updated_at: string | null;
    time_ago: string | null;
  };

  // Champs bruts (au cas où l'API les renvoie directement)
  created_at?: string | null;
  updated_at?: string | null;
}

const BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

/**
 * Normalise la réponse de l'API en tableau.
 * Tolère :
 *   [ ... ]
 *   { data: [ ... ] }
 *   { data: { data: [ ... ], meta: {...} } }
 *   { products: [ ... ] }
 */
function normalizeList<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];

  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>;

    if (Array.isArray(obj.data)) return obj.data as T[];

    if (
      obj.data &&
      typeof obj.data === 'object' &&
      Array.isArray((obj.data as Record<string, unknown>).data)
    ) {
      return (obj.data as Record<string, unknown>).data as T[];
    }

    if (Array.isArray(obj.products)) return obj.products as T[];
  }

  return [];
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text.slice(0, 300)}`);
  }

  return (await res.json()) as T;
}

export const productApi = {
  /**
   * Retourne TOUJOURS un tableau de produits, quelle que soit
   * la forme de la réponse backend.
   */
  async getProducts(): Promise<Product[]> {
    const json = await request<unknown>('/api/products');
    return normalizeList<Product>(json);
  },

  async getProduct(id: number | string): Promise<Product> {
    const json = await request<unknown>(`/api/products/${id}`);
    // Certaines API enveloppent l'objet dans { data: {...} }
    if (json && typeof json === 'object' && 'data' in (json as object)) {
      const d = (json as Record<string, unknown>).data;
      if (d && typeof d === 'object' && !Array.isArray(d)) {
        return d as Product;
      }
    }
    return json as Product;
  },

  async createProduct(payload: Partial<Product>): Promise<Product> {
    const json = await request<unknown>('/api/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (json && typeof json === 'object' && 'product' in (json as object)) {
      return (json as Record<string, unknown>).product as Product;
    }
    return json as Product;
  },

  async updateProduct(
    id: number | string,
    payload: Partial<Product>
  ): Promise<Product> {
    const json = await request<unknown>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return json as Product;
  },

  async deleteProduct(id: number | string): Promise<void> {
    await request<void>(`/api/products/${id}`, { method: 'DELETE' });
  },
};